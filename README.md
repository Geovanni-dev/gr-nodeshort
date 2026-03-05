# 🔗 Encurtador de URL

API simples para encurtar links, redirecionar e contar cliques. Feita com Node.js, Express e MongoDB.

## 🚀 Funcionalidades

- ✅ Encurtar URLs longas
- ✅ Redirecionar pelo código curto
- ✅ Contador de cliques por link
- ✅ Validação de URL

## 🛠 Tecnologias

- Node.js + Express
- MongoDB + Mongoose
- shortid (gerar códigos únicos)
- valid-url (validar links)

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/encurtador-url
cd encurtador-url
npm install
npm start
```

## 📡 Endpoints

### POST /shorten
Encurta uma URL

**Body:**
```json
{
  "url": "https://google.com"
}
```

**Resposta:**
```
URL encurtada com sucesso!
```

### GET /:shortId
Redireciona para a URL original e conta +1 clique

**Exemplo:**
```
http://localhost:3000/abc123
```

## 📁 Estrutura

```
encurtador-url/
├── models/
│   └── Url.js
├── routes/
│   └── urlRoutes.js
├── server.js
└── package.json
```

## 🧠 Como funciona

1. Usuário envia URL via POST /shorten
2. API valida e gera código único com shortid
3. Salva no MongoDB: { originalUrl, shortId, clicks: 0 }
4. Ao acessar GET /:shortId, a API:
   - Busca o link no banco
   - Incrementa clicks +1
   - Redireciona para URL original

## 📌 Exemplo

```bash
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}'
```

## 🗃️ Model

```javascript
{
  originalUrl: String,
  shortId: String,
  clicks: Number,
  createdAt: Date
}
```
## 📄 Licença

MIT © Geovani Rodrigues

---

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

