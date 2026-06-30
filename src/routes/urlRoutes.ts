import express from 'express'; // Importa o express
const router = express.Router(); // Cria um router do express
import controller from '../controllers/urlController.js'; // Importa o controller
import limiter from '../middleware/rateLimit.js'; // Importa o middleware de rate limit

// ROTA PRA RENDERIZAR A PAGINA INICIAL COM O FORMULARIO
router.get('/', controller.startController);

// ROTA PRA CRIAR O LINK ENCURTADO
router.post('/shorten', limiter, controller.shortenController);

// ROTA PARA REDIRECIONAR E CONTAR CLIQUE
router.get('/:shortId', controller.redirectController);

// Exporta pra usar nas rotas
export default router;
