# 🔗 GR-NODESHORT

Interface web e API para encurtar links, redirecionar e monitorar acessos. Projeto Fullstack focado em simplicidade, design moderno e performance.

## 🖥️ **Demonstração**

<p align="center">
<img src="./public/images/GR-NODESHORT.png" width="300" alt="NodeShort Demo" />
</p>

## 🚀 Funcionalidades

- ✅ **Encurtar URLs:** Gera códigos aleatórios ou permite URLs personalizados.
- ✅ **Redirecionamento:** Encaminha o usuário para o link original instantaneamente.
- ✅ **Contador de Cliques:** Monitora quantas vezes cada link foi acessado.
- ✅ **Interface Moderna:** UI responsiva com efeito Glassmorphism (EJS + CSS).
- ✅ **Segurança:** Validação de URLs e bloqueio de caracteres especiais em apelidos via Regex.
- ✅ **Quick Copy:** Botão para copiar o link gerado direto para a área de transferência com feedback visual.

## 🛠 Tecnologias

- **Node.js + Express** (Backend)
- **EJS** (View Engine / Frontend)
- **MongoDB + Mongoose** (Banco de dados)
- **Zod** (Validação de dados e schemas)
- **shortid** (Geração de IDs únicos)
- **valid-url** (Validação de links)

## 📁 Estrutura do Projeto


```
encurtador-url/
├── public/              # Arquivos estáticos (CSS, Imagens)
├── views/               # Templates da interface (EJS)
├── models/              # Schema do banco de dados (Mongoose)
│ └── Url.js             # Modelo de dados da URL
├── routes/              # Definição das rotas
│ └── urlRoutes.js       # Rotas do encurtador
├── controllers/         # Lógica de negócio
│ └── urlController.js   # Controlador com validação Zod
├── server.js            # Arquivo principal do servidor
└── .env                 # Variáveis de ambiente (Mongo URI)
```

## 🧠 Como Funciona (Lógica de Url personalizada)

O sistema aceita um parâmetro opcional chamado `customUrl`:

- **Sem Url personalizada:** O servidor gera um ID aleatório único (ex: `abc123`).
- **Com Url personalizada:** O servidor valida se a Url personalizada já existe no banco. Se estiver livre, o link curto assume esse nome.
- **Limpeza Automática:** O backend limpa espaços vazios e o HTML valida o formato para garantir que o link funcione em qualquer navegador.


## 📦 Instalação e Uso

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/encurtador-url

# Entre na pasta
cd encurtador-url

# Instale as dependências
npm install

# Configure seu .env com a string de conexão do MongoDB
# Rode o projeto
npm start
```

## 🗃️ Estrutura do Banco (Model)

```javascript
{
  originalUrl: String,  // Link de destino (URL longa)
  shortId: String,      // Código ou apelido personalizado
  clicks: Number,       // Contador de acessos (padrão: 0)
  createdAt: Date       // Data de criação automática
}
```
## 🌐 Deploy no Render

O projeto está hospedado no **Render** (plataforma cloud gratuita).

👉 **Acesse a versão ao vivo:** [https://gr-u.onrender.com](https://gr-u.onrender.com)


### ☁️ Por que escolhi o Render?

- ✅ Deploy gratuito e simples
- ✅ Integração direta com GitHub
- ✅ Suporte nativo a Node.js
- ✅ SSL automático (HTTPS)


## 📄 Licença

MIT © Geovani Rodrigues

---

<p align="center"> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" /> <img src="https://img.shields.io/badge/EJS-8B5A2B?style=for-the-badge&logo=ejs&logoColor=white" /> <img src="https://img.shields.io/badge/Zod-3E6B9E?style=for-the-badge&logo=zod&logoColor=white" /> <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" /> </p> 
