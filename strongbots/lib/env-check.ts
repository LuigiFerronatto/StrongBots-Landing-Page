// Função para verificar se as variáveis de ambiente necessárias estão configuradas
export function checkRequiredEnvVars() {
  const requiredVars = ["OPENAI_API_KEY", "OPENAI_ENDPOINT", "OPENAI_MODEL", "OPENAI_API_VERSION"]

  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    console.warn(`Warning: Missing environment variables: ${missingVars.join(", ")}`)
    return false
  }

  return true
}

// Verificar variáveis no carregamento do módulo em desenvolvimento
if (process.env.NODE_ENV === "development") {
  const isConfigValid = checkRequiredEnvVars()
  if (!isConfigValid) {
    console.warn("Some required environment variables are missing. Check .env.example for required variables.")
  }
}

