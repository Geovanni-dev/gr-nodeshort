<div align="right">
  <a href="./README.md">🇺🇸 English</a>
</div>

<div align="center">

# 🔗 GR-NodeShort

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/EJS-8B5A2B?style=for-the-badge&logo=ejs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zod-3E6B9E?style=for-the-badge&logo=zod&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white"/>
</p>

Interface web e API para encurtar links, redirecionar e monitorar acessos. Projeto Fullstack focado em simplicidade, design moderno e performance.

👉 **Acesse ao vivo:** [https://ns.grdev.app.br](https://ns.grdev.app.br)

</div>

---

## 🖥️ Demonstração

<p align="center">
  <img src="./public/images/Capa-Nodeshort.png" width="1400" alt="NodeShort Demo" />
</p>

---

## ⚡ Funcionalidades

| Funcionalidade | Descrição |
|---|---|
| 🔗 **Encurtar URLs** | Gera códigos aleatórios ou permite URLs personalizadas |
| ↪️ **Redirecionamento** | Encaminha o usuário para o link original instantaneamente |
| 📊 **Contador de Cliques** | Monitora quantas vezes cada link foi acessado |
| 🎨 **Interface Moderna** | UI responsiva com efeito Glassmorphism (EJS + CSS) |
| 🛡️ **Segurança** | Validação de URLs e bloqueio de caracteres especiais via Regex |
| 📋 **Quick Copy** | Copia o link gerado direto para a área de transferência com feedback visual |
| 🚦 **Rate Limit** | Proteção contra spam e uso abusivo da API |

---

## 🛠 Tecnologias

| Camada | Tecnologia | Finalidade |
|---|---|---|
| **Backend** | `Node.js + Express` | Servidor e roteamento |
| **Frontend** | `EJS` | View Engine / Templates |
| **Banco de Dados** | `MongoDB + Mongoose` | Persistência de dados |
| **Validação** | `Zod` | Validação de schemas e dados |
| **Segurança** | `Express Rate Limit` | Proteção contra spam e abuso |
| **Infra** | `Docker + Docker Compose` | Containerização da aplicação |
| **CI/CD** | `GitHub Actions` | Pipeline de build e deploy automatizados |

---

## 🗂️ Estrutura do Projeto

```text
NODEShort/
├── .github/
│   └── workflows/
│       └── deploy.yml            # Pipeline de CI/CD via GitHub Actions
├── public/                       # Assets estáticos (CSS, imagens, JS)
├── views/
│   └── index.ejs                 # Template EJS principal
├── src/
│   ├── controllers/              # Lógica dos handlers de rota
│   ├── middleware/               # Rate limiting e validações de requisição
│   ├── models/                   # Definições de schema do Mongoose
│   ├── routes/                   # Declarações de rotas Express
│   └── server.js                 # Ponto de entrada da aplicação
├── .env.example                  # Template de referência das variáveis de ambiente
├── docker-compose.yml            # Orquestração de múltiplos containers
├── Dockerfile                    # Instruções de build da imagem de produção
└── package.json
```

---

## 🧠 Como Funciona — URL Personalizada

O sistema aceita um parâmetro opcional chamado `customUrl`:

- **Sem URL personalizada** → o servidor gera um ID aleatório único (ex: `abc123`)
- **Com URL personalizada** → valida se já existe no banco; se livre, o link assume esse nome
- **Limpeza automática** → o backend remove espaços e o HTML valida o formato para garantir compatibilidade

---

## 🗃️ Estrutura do Banco

```javascript
{
  originalUrl: String, // Link de destino (URL longa)
  shortId: String,     // Código aleatório ou apelido personalizado
  clicks: Number,      // Contador de acessos (padrão: 0)
  createdAt: Date      // Data de criação automática
}
```

---

## ⚙️ Pipeline de CI/CD

O projeto utiliza **GitHub Actions** para automatizar build e deploy a cada push na branch `master`.

```
Push para master
    │
    ▼
Build da imagem Docker
    │
    ▼
Push para o Docker Hub
    │
    ▼
SSH na VPS → pull da nova imagem → recriação do container
```

### Secrets necessários no repositório

| Secret | Descrição |
|---|---|
| `DOCKERHUB_USERNAME` | Usuário no Docker Hub |
| `DOCKERHUB_TOKEN` | Token de acesso do Docker Hub |
| `SSH_HOST` | IP público da VPS |
| `SSH_USER` | Usuário SSH da VPS |
| `SSH_KEY` | Chave privada SSH completa |

Cadastre em **Settings → Secrets and variables → Actions**.

---

## 🚀 Instalação e Uso

### Configuração inicial

```bash
git clone https://github.com/Geovanni-dev/gr-nodeshort
cd encurtador-url
```

Edite o arquivo `.env.example` e adicione sua `DATABASE_URL` do MongoDB.

### Opção 1 — Docker 🐳

```bash
docker compose up -d --build
```

### Opção 2 — Node.js local

```bash
npm install
npm start
```

---

## 🌐 Deploy

Hospedado em um **VPS Linux** com deploys totalmente automatizados via **GitHub Actions**. A cada push na branch `master`, a imagem é reconstruída, enviada ao Docker Hub e o container é atualizado no servidor sem nenhuma intervenção manual.

- ✅ Infraestrutura conteinerizada com **Docker**
- ✅ Pipeline de CI/CD com **GitHub Actions**
- ✅ Domínio e subdomínio personalizados (`ns.grdev.app.br`)

---

## 📄 Licença

**MIT © Geovani Rodrigues**
