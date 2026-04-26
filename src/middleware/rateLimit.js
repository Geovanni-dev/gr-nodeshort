const rateLimit = require("express-rate-limit"); // Importa o express-rate-limit

const blockedIps = {}; // Objeto para armazenar os IPs bloqueados

// Configura o rate limit para 5 reqs por minuto
const limiter = rateLimit({ // Configura o rate limit
    windowMs: 60 * 1000, // 1 minuto
    max: 15, // Limite de 15 reqs por minuto
    
    handler: (req, res) => { // Funcao para lidar com o bloqueio
    const ip = req.ip;
    const now = Date.now();

    // se o IP já esta registrado e o bloqueio ainda não acabou
        if (blockedIps[ip] && now < blockedIps[ip]) {
            const secondsLeft = Math.ceil((blockedIps[ip] - now) / 1000);
            return res.status(429).json({ 
            error: "Ainda bloqueado, tente novamente mais tarde!"
        });
        }

        // registra o IP com o tempo de término do bloqueio que defini 5 minutos
        blockedIps[ip] = now + (5 * 60 * 1000);

        return res.status(429).json({ 
            error: "Muitas Urls encurtadas, tente novamente mais tarde!"
        });
    }
});

module.exports = limiter;



