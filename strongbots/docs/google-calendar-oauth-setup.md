# Configuração do OAuth2 para Google Calendar

Este guia explica como configurar a autenticação OAuth2 para integração com o Google Calendar.

## Passo 1: Configurar o Projeto

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. No menu lateral, vá para "APIs e Serviços" > "Biblioteca"
4. Pesquise por "Google Calendar API" e ative-a

## Passo 2: Configurar Credenciais OAuth2

1. No menu lateral, vá para "APIs e Serviços" > "Credenciais"
2. Clique em "Criar Credenciais" > "ID do Cliente OAuth"
3. Selecione "Aplicativo da Web" como tipo de aplicativo
4. Dê um nome ao cliente OAuth2
5. Em "URIs de redirecionamento autorizados", adicione:
   - `https://strongbots.chat`
   - `http://localhost:3000/admin/google-auth` (para desenvolvimento)
6. Clique em "Criar"
7. Salve o ID do cliente e o segredo do cliente

## Passo 3: Configurar a Tela de Consentimento OAuth

1. No menu lateral, vá para "APIs e Serviços" > "Tela de consentimento OAuth"
2. Selecione o tipo de usuário (Externo ou Interno)
3. Preencha as informações necessárias:
   - Nome do aplicativo
   - Email de suporte
   - Domínios autorizados
4. Adicione os escopos necessários:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`
5. Adicione usuários de teste (se for tipo Externo)
6. Revise e publique a tela de consentimento

## Passo 4: Obter Token de Acesso

1. Acesse a página de autenticação em `/admin/google-auth`
2. Clique no botão "Autenticar com Google"
3. Faça login com a conta do Google associada ao calendário
4. Conceda as permissões solicitadas
5. Você será redirecionado de volta para a página de administração
6. O token de acesso será obtido e salvo automaticamente

## Passo 5: Configurar Variáveis de Ambiente

Adicione a seguinte variável ao seu arquivo `.env`:

