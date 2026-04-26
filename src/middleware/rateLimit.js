const rateLimit = require("express-rate-limit"); // Importa o express-rate-limit

const blockedIps = []; // Array para armazenar IPs bloqueados

// Configura o rate limit para 5 reqs por minuto
const limiter = rateLimit({ // Configura o rate limit
    windowMs: 60 * 1000, // 1 minuto
    max: 15, // Limite de 15 reqs por minuto
    
    handler: (req, res) => {
    const ip = req.ip;
    const now = Date.now();

   // se o IP já esta registrado e o bloqueio ainda não acabou
        if (blockedIps[ip] && now < blockedIps[ip]) {
            const secondsLeft = Math.ceil((blockedIps[ip] - now) / 1000);
            return res.status(429).json({
                success: false,
                error: "Ainda bloqueado",
                message: "Tente novamente em:",
                retryAfter: secondsLeft,
            });
        }

        // registra o IP com o tempo de término do bloqueio que defini 5 minutos
        blockedIps[ip] = now + (5 * 60 * 1000);

        return res.status(429).json({ 
            success: false,
            error: "Muitas tentativas",
            message: "Muitas Urls encurtadas, tente novamente em:",
            retryAfter: 300, // 5 minutos em segundos
        });
    }
});

module.exports = limiter;



