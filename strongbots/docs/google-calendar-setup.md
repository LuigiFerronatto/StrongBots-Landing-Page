# Configuração da API do Google Calendar

Este guia explica como configurar a API do Google Calendar para integração com o sistema de agendamento.

## Passo 1: Criar um projeto no Google Cloud Console

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Anote o ID do projeto para uso posterior

## Passo 2: Ativar a API do Google Calendar

1. No menu lateral, vá para "APIs e Serviços" > "Biblioteca"
2. Pesquise por "Google Calendar API"
3. Clique na API e depois em "Ativar"

## Passo 3: Criar uma conta de serviço

1. No menu lateral, vá para "APIs e Serviços" > "Credenciais"
2. Clique em "Criar Credenciais" > "Conta de serviço"
3. Preencha os detalhes da conta de serviço e clique em "Criar"
4. Adicione o papel "Editor" à conta de serviço
5. Clique em "Concluído"

## Passo 4: Criar uma chave para a conta de serviço

1. Na lista de contas de serviço, clique na conta que você acabou de criar
2. Vá para a aba "Chaves"
3. Clique em "Adicionar Chave" > "Criar nova chave"
4. Selecione o formato "JSON" e clique em "Criar"
5. Um arquivo JSON será baixado automaticamente - guarde-o com segurança

## Passo 5: Configurar o calendário

1. Acesse o [Google Calendar](https://calendar.google.com/)
2. Crie um novo calendário ou use um existente
3. Nas configurações do calendário, vá para "Compartilhar com pessoas específicas"
4. Adicione o email da conta de serviço (encontrado no arquivo JSON) com permissão "Fazer alterações e gerenciar compartilhamento"

## Passo 6: Configurar as variáveis de ambiente

Adicione as seguintes variáveis ao seu arquivo `.env`:

