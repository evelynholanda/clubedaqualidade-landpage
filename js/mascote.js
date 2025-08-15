/**
 * Mascote Interativo 3D - Clube Qualidade
 * Sistema de mascote animado para landing page de QA e IA
 * Personalizado para Ana Evelyn e Pablo Andrade
 */

class MascoteIA {
    constructor(options = {}) {
        this.options = {
            // Frases específicas do Clube Qualidade
            frases: [
                "Olá! Sou o assistente do Clube Qualidade! 🤖",
                "Precisa de ajuda para escolher um produto?",
                "Conheça nossos eBooks, Agentes IA e Mentorias!",
                "Quer saber mais sobre automação com IA?",
                "Ana Evelyn e Pablo estão aqui para te ajudar!",
                "Vamos transformar sua carreira em QA?",
                "Que tal começar com um eBook de R$ 9,90?",
                "Nossos agentes IA podem otimizar 75% das suas tarefas!",
                "Primeira consulta de mentoria gratuita! 🎓",
                "Pegue sua chave para o primeiro emprego em QA! 🗝️",
                "Especialistas em automação inteligente desde 2019!",
                "Transforme dados em insights valiosos!",
                "Acelere sua produtividade com nossos agentes!",
                "Descubra o poder da IA para seu negócio! 🚀"
            ],
            frasesContextuais: {
                'index': [
                    "Bem-vindo ao Clube Qualidade! Como posso ajudar?",
                    "Conheça nossa expertise em QA e IA!",
                    "Ana e Pablo têm +8 anos de experiência combinados!",
                    "Pegue sua chave para o sucesso em QA! 🗝️"
                ],
                'produtos': [
                    "Qual categoria te interessa mais?",
                    "eBooks a partir de R$ 9,90!",
                    "Agentes IA que automatizam 80% das tarefas!",
                    "Mentorias personalizadas disponíveis!",
                    "Precisa de ajuda para escolher?"
                ]
            },
            intervaloBalaoPadrao: 25000, // 25 segundos para não ser intrusivo
            duracaoBalao: 5000, // 5 segundos
            posicao: 'bottom-right',
            autoIniciar: true,
            ...options
        };
        
        this.mascoteElement = null;
        this.balaoElement = null;
        this.timeoutId = null;
        this.intervalId = null;
        this.isInitialized = false;
        this.paginaAtual = this.detectarPagina();
        this.contadorCliques = 0;
        
        if (this.options.autoIniciar) {
            this.init();
        }
    }
    
    detectarPagina() {
        const url = window.location.pathname;
        if (url.includes('produtos.html') || url.includes('produtos')) {
            return 'produtos';
        }
        return 'index';
    }
    
    init() {
        if (this.isInitialized) return;
        
        this.criarMascote();
        this.configurarEventos();
        this.configurarEventosEspecificos();
        this.iniciarComportamentoAutomatico();
        this.isInitialized = true;
        
        console.log('🤖 Mascote Clube Qualidade inicializado com sucesso!');
        
        // Analytics de inicialização
        this.rastrearInteracao('mascote_inicializado', {
            pagina: this.paginaAtual,
            timestamp: new Date().toISOString()
        });
    }
    
    criarMascote() {
        // Criar container principal
        this.mascoteElement = document.createElement('div');
        this.mascoteElement.className = 'mascote-container';
        this.mascoteElement.id = 'mascoteIA';
        this.mascoteElement.setAttribute('aria-label', 'Assistente virtual do Clube Qualidade');
        
        // Aplicar posicionamento
        this.aplicarPosicionamento();
        
        // HTML do mascote com cores Clube Qualidade
        this.mascoteElement.innerHTML = `
            <!-- Balão de fala -->
            <div class="balao-fala" id="balaoFala" role="status" aria-live="polite">
                Olá! Sou o assistente do Clube Qualidade! 🤖
            </div>
            
            <!-- Cabeça do robô -->
            <div class="robo-cabeca">
                <!-- Antenas -->
                <div class="antena antena-esquerda"></div>
                <div class="antena antena-direita"></div>
                
                <!-- Olhos -->
                <div class="olhos">
                    <div class="olho"></div>
                    <div class="olho"></div>
                </div>
                
                <!-- Boca -->
                <div class="boca"></div>
            </div>
            
            <!-- Corpo do robô -->
            <div class="robo-corpo">
                <!-- Braços -->
                <div class="braco braco-esquerdo">
                    <div class="mao"></div>
                </div>
                <div class="braco braco-direito">
                    <div class="mao"></div>
                </div>
                
                <!-- Painel no peito com LEDs Clube Qualidade -->
                <div class="painel-peito">
                    <div class="led-status led-verde" title="Sistema ativo"></div>
                    <div class="led-status led-azul" title="IA conectada"></div>
                    <div class="led-status led-amarelo" title="Processando"></div>
                </div>
                
                <!-- Pernas -->
                <div class="perna perna-esquerda">
                    <div class="pe"></div>
                </div>
                <div class="perna perna-direita">
                    <div class="pe"></div>
                </div>
            </div>
        `;
        
        // Adicionar ao body
        document.body.appendChild(this.mascoteElement);
        
        // Referenciar balão
        this.balaoElement = this.mascoteElement.querySelector('#balaoFala');
    }
    
    aplicarPosicionamento() {
        const posicoes = {
            'bottom-right': { bottom: '20px', right: '20px' },
            'bottom-left': { bottom: '20px', left: '20px' },
            'top-right': { top: '20px', right: '20px' },
            'top-left': { top: '20px', left: '20px' }
        };
        
        const pos = posicoes[this.options.posicao] || posicoes['bottom-right'];
        Object.assign(this.mascoteElement.style, pos);
    }
    
    configurarEventos() {
        // Evento de clique principal
        this.mascoteElement.addEventListener('click', (e) => {
            e.preventDefault();
            this.aoClicar();
        });
        
        // Evento de hover
        this.mascoteElement.addEventListener('mouseenter', () => {
            this.aoHover();
        });
        
        // Evento de saída do hover
        this.mascoteElement.addEventListener('mouseleave', () => {
            this.aoSairHover();
        });
        
        // Eventos de toque para mobile
        this.mascoteElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.aoClicar();
        }, { passive: false });
        
        // Prevenir scroll em mobile quando tocar no mascote
        this.mascoteElement.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
    }
    
    configurarEventosEspecificos() {
        // Detectar scroll para mensagens contextuais
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.onScroll();
            }, 1000);
        });
        
        // Detectar hover nos produtos (se existirem)
        const produtoCards = document.querySelectorAll('.product-card');
        produtoCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.onProdutoHover(card);
            });
        });
        
        // Detectar cliques em CTAs
        const ctaButtons = document.querySelectorAll('.buy-button, .btn-primary, .banner-cta');
        ctaButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.onCTAClick(button);
            });
        });
    }
    
    onScroll() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Mensagens baseadas na posição do scroll
        if (scrollPosition > windowHeight * 2 && !this.balaoElement.classList.contains('ativo')) {
            const frasesScroll = [
                "Viu algum produto interessante?",
                "Posso te ajudar a decidir!",
                "Que tal dar uma olhada nos eBooks?",
                "Os agentes IA são incríveis! 🤖"
            ];
            const frase = frasesScroll[Math.floor(Math.random() * frasesScroll.length)];
            this.mostrarBalao(frase);
        }
    }
    
    onProdutoHover(card) {
        const productTitle = card.querySelector('.product-title');
        if (productTitle) {
            const titulo = productTitle.textContent;
            let mensagem = "Ótima escolha!";
            
            if (titulo.includes('Claude')) {
                mensagem = "Claude é nosso best-seller! 🌟";
            } else if (titulo.includes('Landing Page')) {
                mensagem = "Aprenda a criar páginas que convertem!";
            } else if (titulo.includes('Maestro')) {
                mensagem = "Domine os testes mobile!";
            } else if (titulo.includes('JIRA')) {
                mensagem = "Automatize seus cenários de teste!";
            } else if (titulo.includes('Swagger')) {
                mensagem = "APIs testadas automaticamente! 🚀";
            }
            
            if (!this.balaoElement.classList.contains('ativo')) {
                this.mostrarBalao(mensagem, 3000);
            }
        }
    }
    
    onCTAClick(button) {
        const mensagensCTA = [
            "Excelente escolha! 🎉",
            "Você está no caminho certo!",
            "Vamos transformar sua carreira!",
            "Sucesso garantido! ⭐"
        ];
        const mensagem = mensagensCTA[Math.floor(Math.random() * mensagensCTA.length)];
        this.mostrarBalao(mensagem, 2000);
        
        this.rastrearInteracao('cta_clicked', {
            button: button.textContent,
            pagina: this.paginaAtual
        });
    }
    
    aoClicar() {
        this.contadorCliques++;
        
        // Adicionar classes de animação
        this.mascoteElement.classList.add('clicado', 'feliz');
        
        // Escolher frase baseada no contexto
        let frase;
        if (this.contadorCliques === 1) {
            frase = "Olá! Como posso ajudar você hoje? 😊";
        } else if (this.contadorCliques % 5 === 0) {
            frase = "Já clicou " + this.contadorCliques + " vezes! Gosta de mim? 🤖💕";
        } else {
            frase = this.obterFraseContextual();
        }
        
        this.mostrarBalao(frase);
        
        // Ação contextual
        if (this.contadorCliques % 3 === 0) {
            // A cada 3 cliques, sugerir ação
            setTimeout(() => {
                if (this.paginaAtual === 'index') {
                    this.mostrarBalao("Que tal conhecer nossos produtos? 🛍️", 4000);
                } else {
                    this.mostrarBalao("Precisa de ajuda para escolher? 🤔", 4000);
                }
            }, 3000);
        }
        
        // Remover classes após animação
        setTimeout(() => {
            this.mascoteElement.classList.remove('clicado', 'feliz');
        }, 500);
        
        // Rastrear clique
        this.rastrearInteracao('mascote_clicked', {
            clique_numero: this.contadorCliques,
            pagina: this.paginaAtual
        });
        
        // Ação personalizada baseada na página
        this.acaoPersonalizada();
    }
    
    acaoPersonalizada() {
        if (this.contadorCliques % 7 === 0) {
            // A cada 7 cliques, abrir produtos ou WhatsApp
            if (this.paginaAtual === 'index') {
                setTimeout(() => {
                    const resposta = confirm("Quer conhecer nossos produtos agora?");
                    if (resposta) {
                        window.location.href = 'produtos.html';
                    }
                }, 2000);
            } else {
                setTimeout(() => {
                    const resposta = confirm("Quer falar conosco no WhatsApp?");
                    if (resposta) {
                        const mensagem = encodeURIComponent("Olá! Vim do site e gostaria de saber mais sobre os produtos do Clube Qualidade!");
                        window.open(`https://wa.me/5581981969163?text=${mensagem}`);
                    }
                }, 2000);
            }
        }
    }
    
    aoHover() {
        if (!this.balaoElement.classList.contains('ativo')) {
            const frasesHover = [
                "Clique em mim! 👆",
                "Olá! Precisa de ajuda?",
                "Sou seu assistente virtual! 🤖",
                "Vamos conversar?"
            ];
            const frase = frasesHover[Math.floor(Math.random() * frasesHover.length)];
            this.mostrarBalao(frase, 2000);
        }
        
        this.rastrearInteracao('mascote_hover', {
            pagina: this.paginaAtual
        });
    }
    
    aoSairHover() {
        // Pode implementar ações específicas ao sair do hover se necessário
    }
    
    mostrarBalao(texto, duracao = null) {
        if (!this.balaoElement) return;
        
        duracao = duracao || this.options.duracaoBalao;
        
        this.balaoElement.textContent = texto;
        this.balaoElement.classList.add('ativo');
        
        // Esconder após duração especificada
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
            this.esconderBalao();
        }, duracao);
    }
    
    esconderBalao() {
        if (this.balaoElement) {
            this.balaoElement.classList.remove('ativo');
        }
    }
    
    obterFraseContextual() {
        const frasesContextuais = this.options.frasesContextuais[this.paginaAtual];
        if (frasesContextuais && frasesContextuais.length > 0) {
            return frasesContextuais[Math.floor(Math.random() * frasesContextuais.length)];
        }
        return this.obterFraseAleatoria();
    }
    
    obterFraseAleatoria() {
        const frases = this.options.frases;
        return frases[Math.floor(Math.random() * frases.length)];
    }
    
    iniciarComportamentoAutomatico() {
        // Mostrar balão inicial após 4 segundos (menos intrusivo)
        setTimeout(() => {
            const fraseInicial = this.paginaAtual === 'index' 
                ? "Bem-vindo ao Clube Qualidade! 👋"
                : "Precisa de ajuda para escolher um produto?";
            this.mostrarBalao(fraseInicial);
        }, 4000);
        
        // Balão automático em intervalos maiores para não ser intrusivo
        this.intervalId = setInterval(() => {
            if (!this.balaoElement.classList.contains('ativo')) {
                const fraseAleatoria = this.obterFraseContextual();
                this.mostrarBalao(fraseAleatoria);
            }
        }, this.options.intervaloBalaoPadrao);
    }
    
    pararComportamentoAutomatico() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    
    // Métodos públicos para controle externo
    falar(texto, duracao = null) {
        this.mostrarBalao(texto, duracao);
    }
    
    adicionarFrase(frase) {
        this.options.frases.push(frase);
    }
    
    definirFrases(novasFrases) {
        this.options.frases = novasFrases;
    }
    
    mudarPosicao(novaPosicao) {
        this.options.posicao = novaPosicao;
        this.aplicarPosicionamento();
    }
    
    mostrar() {
        if (this.mascoteElement) {
            this.mascoteElement.style.display = 'block';
        }
    }
    
    esconder() {
        if (this.mascoteElement) {
            this.mascoteElement.style.display = 'none';
        }
    }
    
    destruir() {
        this.pararComportamentoAutomatico();
        clearTimeout(this.timeoutId);
        
        if (this.mascoteElement && this.mascoteElement.parentNode) {
            this.mascoteElement.parentNode.removeChild(this.mascoteElement);
        }
        
        this.isInitialized = false;
        console.log('🤖 Mascote Clube Qualidade destruído');
    }
    
    // Analytics e rastreamento
    rastrearInteracao(tipo, dados = {}) {
        const evento = {
            tipo: tipo,
            timestamp: new Date().toISOString(),
            pagina: this.paginaAtual,
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...dados
        };
        
        // Log para debug
        console.log('📊 Interação do mascote:', evento);
        
        // Enviar para Google Analytics se disponível
        if (typeof gtag !== 'undefined') {
            gtag('event', tipo, {
                event_category: 'mascote_interacao',
                event_label: this.paginaAtual,
                custom_map: dados
            });
        }
        
        // Callback personalizado se configurado
        if (this.options.analytics && typeof this.options.analytics === 'function') {
            this.options.analytics(evento);
        }
    }
    
    // Método para integração com outras funcionalidades do site
    integrarComSite() {
        // Detectar mudanças de seção na página de produtos
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.onSecaoVisivel(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        // Observar seções se existirem
        const secoes = document.querySelectorAll('.carousel-container, .section-header');
        secoes.forEach(secao => {
            observer.observe(secao);
        });
    }
    
    onSecaoVisivel(secao) {
        const titulo = secao.querySelector('.section-title');
        if (titulo && !this.balaoElement.classList.contains('ativo')) {
            const textoTitulo = titulo.textContent;
            let mensagem = "";
            
            if (textoTitulo.includes('eBooks')) {
                mensagem = "eBooks práticos a partir de R$ 9,90! 📚";
            } else if (textoTitulo.includes('Agentes')) {
                mensagem = "Agentes IA que automatizam tudo! 🤖";
            } else if (textoTitulo.includes('Cursos')) {
                mensagem = "Cursos sob demanda disponíveis! 🎓";
            } else if (textoTitulo.includes('Mentoria')) {
                mensagem = "Mentoria personalizada com especialistas! 💡";
            }
            
            if (mensagem) {
                this.mostrarBalao(mensagem);
            }
        }
    }
}

// Configuração específica do Clube Qualidade
window.mascoteIAConfig = {
    frases: [
        "Olá! Sou o assistente do Clube Qualidade! 🤖",
        "Ana Evelyn e Pablo são especialistas reconhecidos!",
        "Transforme sua carreira em QA com nossos produtos!",
        "eBooks, Agentes IA e Mentorias disponíveis!",
        "Primeira consulta de mentoria gratuita! 🎓",
        "Nossos agentes IA otimizam 75% das suas tarefas!",
        "Pegue sua chave para o primeiro emprego em QA! 🗝️",
        "Expertise comprovada em Samsung e Ferreira Costa!",
        "Automação inteligente é nossa especialidade! ⚡",
        "Vamos juntos revolucionar sua produtividade!"
    ],
    intervaloBalaoPadrao: 30000, // 30 segundos
    duracaoBalao: 6000, // 6 segundos
    posicao: 'bottom-right',
    analytics: function(evento) {
        // Integração com analytics personalizado se necessário
        console.log('📈 Analytics:', evento);
    }
};

// Função de inicialização global
window.inicializarMascoteIA = function(options = {}) {
    const configFinal = { ...window.mascoteIAConfig, ...options };
    
    // Aguardar carregamento do DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.mascoteIA = new MascoteIA(configFinal);
            window.mascoteIA.integrarComSite();
        });
    } else {
        window.mascoteIA = new MascoteIA(configFinal);
        window.mascoteIA.integrarComSite();
    }
    
    return window.mascoteIA;
};

// Auto-inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se já existe uma instância
    if (!window.mascoteIA) {
        window.mascoteIA = new MascoteIA(window.mascoteIAConfig);
        window.mascoteIA.integrarComSite();
    }
});

// Exportar para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MascoteIA;
}

// Métodos globais para controle externo
window.controlarMascote = {
    falar: (texto, duracao) => window.mascoteIA && window.mascoteIA.falar(texto, duracao),
    esconder: () => window.mascoteIA && window.mascoteIA.esconder(),
    mostrar: () => window.mascoteIA && window.mascoteIA.mostrar(),
    destruir: () => window.mascoteIA && window.mascoteIA.destruir()
};