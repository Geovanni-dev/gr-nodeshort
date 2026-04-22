const rateLimit = require("express-rate-limit"); // Importa o express-rate-limit

// Configura o rate limit para 5 reqs por minuto
const limiter = rateLimit({ // Configura o rate limit
    windowMs: 60 * 1000, // 1 minuto
    max: 10, // Limite de 10 reqs por minuto
    message: "Limite de Urls encurtadas por minuto atingido, aguarde e tente novamente mais tarde.",
});

module.exports = limiter;