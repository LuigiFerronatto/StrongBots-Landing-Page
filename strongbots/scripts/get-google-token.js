const { google } = require("googleapis")
const fs = require("fs")
const readline = require("readline")

// Carregar credenciais do arquivo
const credentials = JSON.parse(fs.readFileSync("./credentials.json", "utf8"))

const { client_id, client_secret } = credentials.web

// Criar cliente OAuth2
const oauth2Client = new google.auth.OAuth2(client_id, client_secret, credentials.web.redirect_uris[0])

// Gerar URL de autorização
const scopes = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events"]

const authUrl = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  prompt: "consent",
})

console.log("Abra o seguinte URL no seu navegador:")
console.log(authUrl)
console.log("\n")

// Criar interface de linha de comando
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// Solicitar código de autorização
rl.question("Digite o código de autorização: ", async (code) => {
  try {
    // Trocar código por token
    const { tokens } = await oauth2Client.getToken(code)

    // Salvar tokens em um arquivo
    fs.writeFileSync("./tokens.json", JSON.stringify(tokens, null, 2))

    console.log("\nToken obtido e salvo com sucesso!")
    console.log("Access Token:", tokens.access_token)
    console.log("Refresh Token:", tokens.refresh_token)
    console.log("Expira em:", new Date(tokens.expiry_date).toLocaleString())

    console.log("\nAdicione o seguinte ao seu arquivo .env:")
    console.log(`GOOGLE_ACCESS_TOKEN="${tokens.access_token}"`)

    if (tokens.refresh_token) {
      console.log(`GOOGLE_REFRESH_TOKEN="${tokens.refresh_token}"`)
    }
  } catch (error) {
    console.error("Erro ao obter token:", error)
  } finally {
    rl.close()
  }
})

