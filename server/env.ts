// Carrega variáveis do .env antes de qualquer outro módulo do servidor.
// Deve ser o primeiro import em server/index.ts.
try {
  process.loadEnvFile();
} catch {
  // .env opcional: em produção as variáveis vêm do ambiente
}
