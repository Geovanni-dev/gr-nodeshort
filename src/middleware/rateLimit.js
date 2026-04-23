const rateLimit = require("express-rate-limit"); // Importa o express-rate-limit

// Configura o rate limit para 5 reqs por minuto
const limiter = rateLimit({ // Configura o rate limit
    windowMs: 60 * 1000, // 1 minuto
    max: 15, // Limite de 15 reqs por minuto
   
   handler: (req, res) => {
    res.set("Retry-After", "60");

    res.status(429).json({ // Responde com um status 429 
        success: false,
        error: "Muitas tentativas",
        message: "Muitas Urls encurtadas, tente novamente em:",
        retryAfter: 60,
    });
    }
});

module.exports = limiter;



