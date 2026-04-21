const Url = require("../models/Url"); // Importa o model do banco
const shortid = require("shortid"); // Importa a lib pra gerar ID aleatorio
const validUrl = require("valid-url"); // Importa a lib pra validar URL
const { z } = require("zod"); // Importa o Zod pra validar a URL personalizada

//===================================== Esquemas de validação usando Zod


// Esquema de validação para a URL personalizada usando Zod
const shortenUrlSchema = z.object({
  customUrl: z
    .string()
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "A URL personalizada só pode conter letras, números, hífens e underscores.",
    ).optional().or(z.literal("")), // Permite que seja opcional ou uma string vazia
});


// Esquema de validação para o shortId na rota de redirecionamento
const redirectUrlSchema = z.object({
  shortId: z.string().regex(
    /^[a-zA-Z0-9_-]+$/,
    "O ID da URL só pode conter letras, números, hífens e underscores.",
  ),
});


//==========================================Fuçoes dos controllers


// FUNCAO PRA CRIAR O LINK ENCURTADO
const shortenController = async (req, res) => {
  try {
    let { url, customUrl } = req.body; // Pega a URL e a URL personalizada (se tiver) que vieram do formulario
    if (customUrl) {
      customUrl = customUrl.replace(/\s+/g, ""); // Remove espaços em branco
    }
    const validation = shortenUrlSchema.safeParse({ customUrl });
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors[0].message });
    }
    if (!validUrl.isUri(url)) {
      // Verifica se a URL é válida usando a lib valid-url
      return res.status(400).json({ error: "URL inválida!" });
    }
    let shortUrl; // Variavel pra guardar o link curto que vai ser criado
    
    if (customUrl) {
      // Se tiver uma URL personalizada, verifica se ela já existe no banco
      const customUrlExists = await Url.findOne({ shortId: customUrl });
      if (customUrlExists) {
        return res.status(400).json({ error: "URL em uso. Por favor escolha outra." }); // Se existir, avisa o user
      }
      shortUrl = customUrl; // Se a URL personalizada for válida e não existir, usa ela como shortId
      const newUrl = new Url({
        // Prepara o objeto com o model do db
        originalUrl: url,
        shortId: shortUrl,
      });
      await newUrl.save();
      return res.json({ linkGerado: `https://gr-u.onrender.com/${shortUrl}` });
    }
    
    // Verifica se a URL já existe no banco, para n criar outra igual
    const urlExists = await Url.findOne({ originalUrl: url });
    // se existir nao cria uma nova e devolve a que ja tem
    if (urlExists) {
      return res.json({ linkGerado: `https://gr-u.onrender.com/${urlExists.shortId}` });
    }
    
    // Gera o ID aleatorio pro encurtador
    shortUrl = shortid.generate();
    // Prepara o objeto com o model do db
    const newUrl = new Url({
      originalUrl: url,
      shortId: shortUrl,
    });
    // Salva no banco e avisa se funcionou ou n
    await newUrl.save(); // aqui usa o await pq é uma funcao assincrona, entao ele espera salvar pra depois mandar a resposta
    return res.json({ linkGerado: `https://gr-u.onrender.com/${shortUrl}` }); // aqui retorna o link curto pro front via AJAX
    
  } catch (err) {
    // se der erro, mostra no console e avisa o user
    console.error(err);
    return res.status(500).json({ error: "Ops, algo deu errado. Tente novamente." }); // retorna o erro via JSON
  }
};


// FUNCAO PRA MOSTRAR O FORMULARIO
const startController = (req, res) => {
  res.render("index", { // renderiza a página inicial com o formulario vazio
    linkGerado: null,
    error: null,
  });
};

// FUNCAO PRA REDIRECIONAR E CONTAR CLIQUE
const redirectController = async (req, res) => {
  const { shortId } = req.params; // Pega o shortId que veio na URL
  const validation = redirectUrlSchema.safeParse({ shortId }); //usei sefaParse pra validar o shortId usando o esquema do Zod, pra garantir que ele só tenha caracteres permitidos
  if (!validation.success) {
    return res.status(400).send("ID de URL inválida!");
  }
  const foundUrl = await Url.findOneAndUpdate( // Acha o link, soma +1 no click e traz o dado atualizado
    { shortId },
    { $inc: { clicks: 1 } },
    { new: true }
  );
  if (foundUrl) { // Se achou no db, redireciona. Senao, avisa o user
    return res.redirect(foundUrl.originalUrl);
  } else { // Se nao achou, mostra erro
    return res.status(404).send("URL não encontrada!");
  }
};

// Exporta pra usar nas rotas
module.exports = {
  shortenController,
  startController,
  redirectController,
};
