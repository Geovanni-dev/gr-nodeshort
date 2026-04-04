// Função para copiar o link (versão async/await)
async function aoCopiar() {  
    const endereco = document.getElementById('url').href; // Obtém o endereço do link
    const botao = document.getElementById('btnCopiar'); // Obtém o botão
    
    try {
        await navigator.clipboard.writeText(endereco); // Copia o endereço para a área de transferência
        
        const textoOriginal = botao.innerText; // Armazena o texto original do botão
        
        botao.innerText = "Copiado!"; // Muda o texto do botão
        botao.style.background = "#28a745"; // Muda a cor de fundo do botão
        
        setTimeout(() => { // Muda o texto e a cor de fundo do botão depois de 2 segundos
            botao.innerText = textoOriginal; // Muda o texto do botão
            botao.style.background = ""; 
        }, 2000); // muda a cor de fundo do botão depois de 2000ms = 2 segundos
        
    } catch (err) { // se der erro ao copiar
        console.error("Erro ao copiar: ", err); // Exibe um erro no console
        botao.innerText = "Erro!"; // Muda o texto do botão para indicar erro
        botao.style.background = "#dc3545"; // Muda a cor de fundo do botão para vermelho
        setTimeout(() => { 
            botao.innerText = "Copiar"; // volta pro testo padrao do botão apos 2 segundos
            botao.style.background = ""; // volta a cor de fundo do botão para o padrao apos 2 segundos
        }, 2000);
    }
}


//==============================================


    // Efeito de clique nas badges para mobile
    const badgeLinks = document.querySelectorAll('.tech-badges a'); // Seleciona todos os links das badges
    
    badgeLinks.forEach(link => { // Para cada link das badges
        link.addEventListener('touchstart', function() { // Quando o link for tocado
            this.style.transform = 'scale(0.95)'; // Aplica o efeito de clique
        });
        
        link.addEventListener('touchend', function() { // Quando o link for soltado
            this.style.transform = 'scale(1)'; // Volta ao estado original
        });
        
        link.addEventListener('touchcancel', function() { // Quando o toque for cancelado
            this.style.transform = 'scale(1)'; // Volta ao estado original
        });
    });