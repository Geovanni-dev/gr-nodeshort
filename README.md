<div align="center">

# 🔗 GR-NodeShort

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/EJS-8B5A2B?style=for-the-badge&logo=ejs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zod-3E6B9E?style=for-the-badge&logo=zod&logoColor=white"/>
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
</p>

Interface web e API para encurtar links, redirecionar e monitorar acessos. Projeto Fullstack focado em simplicidade, design moderno e performance.

👉 **Acesse ao vivo:** [https://gr-s.onrender.com](https://gr-s.onrender.com)

</div>

---

## 🖥️ Demonstração

<p align="center">
  <img src="./public/images/Capa-Nodeshort.png" width="1400" alt="NodeShort Demo" />
</p>

---

## ⚡ Funcionalidades

| Funcionalidade | Descrição |
|----------------|-----------|
| 🔗 **Encurtar URLs** | Gera códigos aleatórios ou permite URLs personalizadas |
| ↪️ **Redirecionamento** | Encaminha o usuário para o link original instantaneamente |
| 📊 **Contador de Cliques** | Monitora quantas vezes cada link foi acessado |
| 🎨 **Interface Moderna** | UI responsiva com efeito Glassmorphism (EJS + CSS) |
| 🛡️ **Segurança** | Validação de URLs e bloqueio de caracteres especiais via Regex |
| 📋 **Quick Copy** | Copia o link gerado direto para a área de transferência com feedback visual |
| 🚦 **Rate Limit** | Proteção contra spam e uso abusivo da API |

---

## 🛠️ Tecnologias

| Categoria | Tecnologia | Finalidade |
|:----------|:-----------|:-----------|
| **Backend** | `Node.js + Express` | Servidor e roteamento |
| **Frontend** | `EJS` | View Engine / Templates |
| **Banco de Dados** | `MongoDB + Mongoose` | Persistência de dados |
| **Validação** | `Zod` | Validação de schemas e dados |
| **Segurança** | `Express Rate Limit` | Proteção contra spam e abuso |
| **Infra/Deploy**| `Docker + Docker Compose`| Containerização da aplicação |

---

## 🗂️ Arquitetura do Projeto

```text
NODEShort/
├── public/
├── views/
│   └── index.ejs
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── package.json                
```

---

## 🧠 Como Funciona — URL Personalizada

O sistema aceita um parâmetro opcional chamado `customUrl`:

- **Sem URL personalizada** → o servidor gera um ID aleatório único (ex: `abc123`)
- **Com URL personalizada** → valida se já existe no banco; se livre, o link assume esse nome
- **Limpeza automática** → o backend remove espaços e o HTML valida o formato para garantir compatibilidade.

---

## 🗃️ Estrutura do Banco

```javascript
{
  originalUrl: String, // Link de destino (URL longa)
  shortId: String,     // Código ou apelido personalizado
  clicks: Number,      // Contador de acessos (padrão: 0)
  createdAt: Date      // Data de criação automática
}
```

---

## 💻 Instalação e Uso

### Configuração Inicial
Clone o repositório e configure as variáveis de ambiente:

git clone [https://github.com/Geovanni-dev/gr-nodeshort](https://github.com/Geovanni-dev/gr-nodeshort)

cd encurtador-url

*Edite o arquivo `.env` e adicione sua `DATABASE_URL` do MongoDB.*

### Opção 1: Rodando com Docker 🐳
```bash
docker compose up -d --build
```

### Opção 2: Rodando com Node.js localmente
```bash
npm install
npm start
```

---

## 🌐 Deploy no Render

O projeto está hospedado no **Render** (plataforma cloud gratuita).

- ✅ Deploy gratuito e simples
- ✅ Integração direta com GitHub
- ✅ Suporte nativo a Node.js e Docker
- ✅ SSL automático (HTTPS)

---

## 📄 Licença

**MIT © Geovani Rodrigues**