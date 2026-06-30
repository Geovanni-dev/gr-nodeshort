import dns from 'dns'; // Importa o módulo dns do Node pra validar URLs
dns.setServers(['8.8.8.8', '8.8.4.4']); // Define os servidores DNS do Google
dns.setDefaultResultOrder('ipv4first'); // Configura o DNS pra priorizar IPv4, evitando erros de validação
import dotenv from 'dotenv'; // Importa o módulo dotenv

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

import path from 'path'; // Importa o módulo path
import { fileURLToPath } from 'url';

// desativa os logs em produção
if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
}

import urlRoutes from './routes/urlRoutes.js';
import mongoose from 'mongoose'; // Importa o mongoose
import express from 'express'; // Importa o express pra criar o servidor e lidar com as rotas

const app = express(); // Cria o servidor

// Conecta ao MongoDB Atlas
const databaseUrl = process.env.DATABASE_URL; // Pega a URL do banco de dados

// Se a URL do banco de dados não for definida, exibe um erro
if (!databaseUrl) {
  throw new Error('DATABASE_URL não foi definido no env');
}

mongoose
  .connect(databaseUrl)
  .then(() => console.log('Atlas conectou'))
  .catch((err: unknown) => console.error('erro ao conectar:', err));

// Middleware para o Express entender JSON que vem no body das reqs
app.use(express.json());

// Middleware para o Express entender dados de formulários
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url); // Pega o caminho do arquivo
const __dirname = path.dirname(__filename); // Pega o caminho da pasta

// Configura o EJS como template engine para renderizar as views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); // Define o caminho das views

// Isso faz o Node sair da pasta 'src' e encontrar a 'public' na raiz
app.use(express.static(path.join(__dirname, '../public')));

// Injeta as rotas de encurtamento q criei no app
app.use(urlRoutes);

// Define a porta do ambiente (Heroku/Render) ou a 3000 pra dev local
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // Inicia o servidor e mostra a mensagem no console
  console.log(`Servidor rodando na porta ${port}`);
});
