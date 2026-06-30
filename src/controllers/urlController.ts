import Url, { type UrlDocument } from '../models/Url.js'; // Importa o model do banco
import shortid from 'shortid'; // Importa a lib pra gerar ID aleatorio
import validUrl from 'valid-url'; // Importa a lib pra validar URL
import { z } from 'zod'; // Importa o Zod pra validar a URL personalizada
import type { Request, Response } from 'express';
import type { QueryFilter } from 'mongoose';

//===================================== Esquemas de validação usando Zod

// Esquema de validação para a URL personalizada usando Zod
const shortenUrlSchema = z.object({
  customUrl: z
    .string()
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'A URL personalizada só pode conter letras, números, hífens e underscores.',
    )
    .optional()
    .or(z.literal('')), // Permite que seja opcional ou uma string vazia
});

// Esquema de validação para o shortId na rota de redirecionamento
const redirectUrlSchema = z.object({
  shortId: z
    .string()
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'O ID da URL só pode conter letras, números, hífens e underscores.',
    ),
});

//==========================================Fuçoes dos controllers

// FUNÇÃO PRA CRIAR O LINK ENCURTADO
const shortenController = async (req: Request, res: Response) => {
  try {
    const baseUrl = process.env.BASE_URL || 'https://ns.grdev.app.br';
    const url = req.body.url; // Pega a URL que vieram do formulario
    let customUrl = req.body.customUrl; // Pega a URL personalizada que vieram do formulario
    if (customUrl) {
      customUrl = customUrl.replace(/\s+/g, ''); // Remove espaços em branco
    }
    const validation = shortenUrlSchema.safeParse({ customUrl });
    if (!validation.success) {
      return res.status(400).json({
        error: validation.error.issues[0]?.message ?? 'URL inválida!',
      });
    }
    if (!validUrl.isUri(url)) {
      // Verifica se a URL é válida usando a lib valid-url
      return res.status(400).json({ error: 'URL inválida!' });
    }
    let shortUrl; // Variavel pra guardar o link curto que vai ser criado

    if (customUrl) {
      // Se tiver uma URL personalizada, verifica se ela já existe no banco
      const customUrlExists = await Url.findOne({ shortId: customUrl });
      if (customUrlExists) {
        return res
          .status(400)
          .json({ error: 'URL em uso. Por favor escolha outra.' }); // Se existir, avisa o user
      }
      shortUrl = customUrl; // Se a URL personalizada for válida e não existir, usa ela como shortId
      const newUrl = new Url({
        // Prepara o objeto com o model do db
        originalUrl: url,
        shortId: shortUrl,
      });
      await newUrl.save();
      return res.json({ linkGerado: `${baseUrl}/${shortUrl}` });
    }

    // Verifica se a URL já existe no banco, para n criar outra igual
    const urlExists = await Url.findOne({ originalUrl: url });
    // se existir nao cria uma nova e devolve a que ja tem
    if (urlExists) {
      return res.json({ linkGerado: `${baseUrl}/${urlExists.shortId}` });
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
    return res.json({ linkGerado: `${baseUrl}/${shortUrl}` }); // aqui retorna o link curto pro front via AJAX
  } catch {
    // se der erro, mostra no console e avisa o user
    return res
      .status(500)
      .json({ error: 'Ops, algo deu errado. Tente novamente.' }); // retorna o erro via JSON
  }
};

// FUNÇÃO PRA MOSTRAR O FORMULARIO
const startController = (_req: Request, res: Response) => {
  res.render('index', {
    // renderiza a página inicial com o formulario vazio
    linkGerado: null,
    error: null,
  });
};

// FUNÇÃO PRA REDIRECIONAR E CONTAR CLIQUE
const redirectController = async (req: Request, res: Response) => {
  const { shortId } = req.params; // Pega o shortId que veio na URL
  const validation = redirectUrlSchema.safeParse({ shortId }); //usei sefaParse pra validar o shortId usando o esquema do Zod, pra garantir que ele só tenha caracteres permitidos
  if (!validation.success) {
    return res.status(400).send('ID de URL inválida!');
  }

  const filter: QueryFilter<UrlDocument> = { shortId: validation.data.shortId }; // Cria o filtro com o shortId

  const foundUrl = await Url.findOneAndUpdate(
    // Acha o link, soma +1 no click e traz o dado atualizado
    filter,
    { $inc: { clicks: 1 } },
    { new: true },
  );
  if (foundUrl) {
    // Se achou no db, redireciona. Senao, avisa o user
    return res.redirect(foundUrl.originalUrl);
  } else {
    // Se nao achou, mostra erro
    return res.status(404).send('URL não encontrada!');
  }
};

// Exporta pra usar nas rotas
export default { shortenController, startController, redirectController };
