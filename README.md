# 🔗 Encurtador de URL

API simples pra encurtar links, redirecionar e contar quantas vezes cada link foi acessado. Feita com Node.js, Express e MongoDB.

## 🚀 Funcionalidades

- ✅ Encurtar URLs longas
- ✅ Redirecionar pelo código curto
- ✅ Contador de cliques por link
- ✅ Validar se é URL mesmo

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
Redireciona pra URL original e conta +1 clique

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

Pensa num sistema bem simples: você tem um link gigante e quer um menor.

1. O usuário manda o link longo pelo `POST /shorten`
2. O servidor verifica se é uma URL válida (nada de enviar texto qualquer)
3. Depois gera um código aleatório com o `shortid`, tipo "abc123"
4. Salva no MongoDB com esse código e começa o contador de cliques em 0
5. Quando alguém acessa `http://localhost:3000/abc123`, o servidor:
   - Procura no banco esse código
   - Soma +1 nos cliques
   - Joga o usuário direto pro link original

É tipo um "atalho" que ainda te conta quantas pessoas usaram.

## 📌 Exemplo

```bash
curl -X POST http://localhost:3000/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}'
```

## 🗃️ Model do banco

```javascript
{
  originalUrl: String,  // link original
  shortId: String,      // código único tipo "abc123"
  clicks: Number,       // contador de acessos
  createdAt: Date       // quando foi criado
}
```

## 🚀 Próximos passos (quem sabe um dia)

- [ ] Listar todas as URLs criadas
- [ ] Deletar links
- [ ] Estatísticas de cliques (por dia, mês)
- [ ] Uma página front-end simples pra testar
- [ ] Subir pro Render ou Railway

## 📄 Licença

MIT © Geovani Rodrigues

---

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />
</p>

---

