// scripts/deploy-hostinger.cjs
// Usa credenciais do ambiente para evitar expor segredos
const path = require('path');
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const {
  FTP_USER,
  FTP_PASSWORD,
  FTP_HOST = 'ftp.seudominio.com',
  FTP_PORT = '21',
  FTP_REMOTE_ROOT = '/public_html/',
} = process.env;

if (!FTP_USER || !FTP_PASSWORD) {
  console.error('❌ Faltam variáveis de ambiente FTP_USER e/ou FTP_PASSWORD');
  console.error('Defina-as antes de rodar: setx FTP_USER "usuario" && setx FTP_PASSWORD "senha" (Windows)');
  process.exit(1);
}

const config = {
  user: FTP_USER,
  password: FTP_PASSWORD,
  host: FTP_HOST,
  port: Number(FTP_PORT),
  localRoot: path.resolve(__dirname, '..', 'dist'),
  remoteRoot: FTP_REMOTE_ROOT,
  include: ['*', '**/*'],
  deleteRemote: false,
  forcePasv: true,
};

console.log('🚀 Iniciando deploy para Hostinger...');
console.log(`Host: ${config.host} | Remote: ${config.remoteRoot}`);

ftpDeploy
  .deploy(config)
  .then(() => console.log('✅ Deploy concluído!'))
  .catch((err) => {
    console.error('❌ Erro no deploy:', err);
    process.exit(1);
  });