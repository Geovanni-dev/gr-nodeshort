require('dotenv').config();

const urlRoutes = require('./routes/urlRoutes');
const mongoose = require('mongoose');
const express = require('express');

const app = express();

// Conecta ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Atlas conectou"))
  .catch(err => console.error("erro ao conectar:", err));

// Middleware para o Express entender JSON que vem no body das reqs
app.use(express.json());

// Injeta as rotas de encurtamento q criei no app
app.use(urlRoutes);

// Rota padrao so pra testar se o servidor ta on
app.get ('/', (req, res ) => {
    res.send('Servidor está funcionando')
});

// Define a porta do ambiente (Heroku/Render) ou a 3000 pra dev local
port = process.env.PORT || 3000;

// Sobe o servidor e deixa ele ouvindo as requs
app.listen(port,() => {
    console.log(`Servidor rodando na porta ${port}`);
});