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
        
        // HTML do mascote com sistema de chat interativo
        this.mascoteElement.innerHTML = `
            <!-- Chat Container -->
            <div id="chatContainer" class="chat-container">
                <!-- Header do Chat -->
                <div class="chat-header">
                    <div class="chat-title">
                        <span class="chat-avatar">🤖</span>
                        <div class="chat-info">
                            <strong>Assistente IA</strong>
                            <small>Clube Qualidade</small>
                        </div>
                    </div>
                    <button id="chatToggle" class="chat-toggle">
                        <span class="toggle-icon">−</span>
                    </button>
                </div>
                
                <!-- Área de mensagens -->
                <div id="chatMessages" class="chat-messages">
                    <div class="message bot-message">
                        <div class="message-content">
                            Olá! 👋 Como posso te ajudar hoje?
                        </div>
                    </div>
                </div>
                
                <!-- Menu de perguntas rápidas -->
                <div id="quickQuestions" class="quick-questions">
                    <button class="quick-btn" data-question="ebooks">📚 Qual eBook é melhor?</button>
                    <button class="quick-btn" data-question="agentes">🤖 Como funcionam os agentes?</button>
                    <button class="quick-btn" data-question="precos">💰 Preços das mentorias?</button>
                    <button class="quick-btn" data-question="iniciante">🎯 Sou iniciante, por onde começar?</button>
                    <button class="quick-btn" data-question="contato">📞 Quero falar com vocês</button>
                </div>
                
                <!-- Campo de input -->
                <div class="chat-input-container">
                    <input type="text" id="chatInput" class="chat-input" placeholder="Digite sua pergunta..." maxlength="200">
                    <button id="chatSend" class="chat-send">
                        <span>➤</span>
                    </button>
                </div>
                
                <!-- Indicador de digitação -->
                <div id="typingIndicator" class="typing-indicator" style="display: none;">
                    <span>Ana está digitando</span>
                    <div class="typing-dots">
                        <span>.</span><span>.</span><span>.</span>
                    </div>
                </div>
            </div>
            
            <!-- Balão de fala (modo compacto) -->
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
            
            <!-- Badge de notificação -->
            <div class="notification-badge" id="notificationBadge">!</div>
        `;
        
        // Adicionar ao body
        document.body.appendChild(this.mascoteElement);
        
        // Referenciar elementos
        this.balaoElement = this.mascoteElement.querySelector('#balaoFala');
        this.chatContainer = this.mascoteElement.querySelector('#chatContainer');
        this.chatMessages = this.mascoteElement.querySelector('#chatMessages');
        this.chatInput = this.mascoteElement.querySelector('#chatInput');
        this.chatSend = this.mascoteElement.querySelector('#chatSend');
        this.chatToggle = this.mascoteElement.querySelector('#chatToggle');
        this.quickQuestions = this.mascoteElement.querySelector('#quickQuestions');
        this.typingIndicator = this.mascoteElement.querySelector('#typingIndicator');
        this.notificationBadge = this.mascoteElement.querySelector('#notificationBadge');
        
        // Inicializar chat
        this.initializeChat();
        this.initializeKnowledgeBase();
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
        // Evento de clique no avatar (abre/fecha chat)
        const robotHead = this.mascoteElement.querySelector('.robo-cabeca');
        robotHead.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleChat();
        });
        
        // Evento de hover no avatar
        robotHead.addEventListener('mouseenter', () => {
            this.aoHover();
        });
        
        // Evento de saída do hover
        robotHead.addEventListener('mouseleave', () => {
            this.aoSairHover();
        });
        
        // Eventos de toque para mobile
        robotHead.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.toggleChat();
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
    }
    
    // Novo sistema de chat
    initializeChat() {
        this.chatHistory = [];
        this.chatExpanded = false;
        this.chatContainer.style.display = 'none';
        
        // Configurar eventos do chat
        this.setupChatEvents();
    }
    
    setupChatEvents() {
        // Toggle do chat
        this.chatToggle.addEventListener('click', () => {
            this.toggleChat();
        });
        
        // Enviar mensagem
        this.chatSend.addEventListener('click', () => {
            this.sendMessage();
        });
        
        // Enter para enviar
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Botões de perguntas rápidas
        this.quickQuestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const question = e.target.dataset.question;
                this.handleQuickQuestion(question);
            }
        });
    }
    
    toggleChat() {
        this.chatExpanded = !this.chatExpanded;
        
        if (this.chatExpanded) {
            this.chatContainer.style.display = 'block';
            this.balaoElement.style.display = 'none';
            this.chatToggle.querySelector('.toggle-icon').textContent = '−';
            this.notificationBadge.style.display = 'none';
            this.chatInput.focus();
        } else {
            this.chatContainer.style.display = 'none';
            this.balaoElement.style.display = 'block';
            this.chatToggle.querySelector('.toggle-icon').textContent = '+';
        }
        
        this.rastrearInteracao('chat_toggled', {
            expanded: this.chatExpanded,
            pagina: this.paginaAtual
        });
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        // Adicionar mensagem do usuário
        this.addMessage(message, 'user');
        
        // Limpar input
        this.chatInput.value = '';
        
        // Mostrar indicador de digitação
        this.showTypingIndicator();
        
        // Processar resposta
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response.text, 'bot');
            
            if (response.action) {
                setTimeout(() => {
                    this.executeAction(response.action);
                }, 1000);
            }
        }, 1500);
        
        this.rastrearInteracao('message_sent', {
            message: message,
            pagina: this.paginaAtual
        });
    }
    
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `
            <div class="message-content">${text}</div>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        // Salvar no histórico
        this.chatHistory.push({
            text: text,
            sender: sender,
            timestamp: new Date()
        });
    }
    
    showTypingIndicator() {
        this.typingIndicator.style.display = 'block';
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }
    
    handleQuickQuestion(questionType) {
        const questions = {
            'ebooks': '📚 Qual eBook é melhor para mim?',
            'agentes': '🤖 Como funcionam os agentes de IA?',
            'precos': '💰 Quanto custam as mentorias?',
            'iniciante': '🎯 Sou iniciante, por onde começar?',
            'contato': '📞 Quero falar com vocês'
        };
        
        const questionText = questions[questionType];
        if (questionText) {
            this.addMessage(questionText, 'user');
            
            setTimeout(() => {
                this.showTypingIndicator();
                setTimeout(() => {
                    this.hideTypingIndicator();
                    const response = this.getQuickResponse(questionType);
                    this.addMessage(response.text, 'bot');
                    
                    if (response.action) {
                        setTimeout(() => {
                            this.executeAction(response.action);
                        }, 1000);
                    }
                }, 1000);
            }, 500);
        }
    }
    
    initializeKnowledgeBase() {
        this.knowledgeBase = {
            // eBooks
            ebooks: {
                keywords: ['ebook', 'livro', 'claude', 'landing', 'página', 'maestro', 'mobile'],
                responses: [
                    {
                        text: "📚 Temos eBooks incríveis! Para iniciantes, recomendo o **Claude Code** (R$ 9,90) - ensina automação com IA. Para quem quer criar páginas que convertem, o **Landing Page** é perfeito. E para testes mobile, o **Maestro** é nosso best-seller!",
                        action: { type: 'redirect', url: 'produtos.html#ebooks' }
                    }
                ]
            },
            
            // Agentes IA
            agentes: {
                keywords: ['agente', 'automação', 'ia', 'jira', 'swagger', 'testes'],
                responses: [
                    {
                        text: "🤖 Os agentes de IA automatizam suas tarefas repetitivas! Temos o **Agente JIRA** que cria cenários automaticamente, e o **Agente Swagger** que testa APIs sozinho. Eles economizam 75% do seu tempo!",
                        action: { type: 'redirect', url: 'demonstracoes.html' }
                    }
                ]
            },
            
            // Preços e mentorias
            precos: {
                keywords: ['preço', 'valor', 'custo', 'mentoria', 'consultoria'],
                responses: [
                    {
                        text: "💰 Os eBooks começam em **R$ 9,90**. As mentorias têm valores personalizados conforme sua necessidade. A **primeira consulta é gratuita** para entendermos seu caso!",
                        action: { type: 'contact' }
                    }
                ]
            },
            
            // Iniciantes
            iniciante: {
                keywords: ['iniciante', 'começar', 'primeiro', 'emprego', 'carreira'],
                responses: [
                    {
                        text: "🎯 Para iniciantes, recomendo começar com o eBook **Claude Code** (R$ 9,90) para aprender automação. Depois, o **Maestro para Mobile** te dará uma base sólida. Ana e Pablo estão aqui para te guiar!",
                        action: { type: 'redirect', url: 'produtos.html#iniciantes' }
                    }
                ]
            },
            
            // Contato
            contato: {
                keywords: ['contato', 'falar', 'whatsapp', 'ajuda', 'suporte'],
                responses: [
                    {
                        text: "📞 Claro! Você pode falar conosco por:\n• **WhatsApp**: (81) 98196-9163\n• **Email**: evelynholanda@gmail.com\n• **Instagram**: @clubequalidade\n\nA primeira conversa é sempre gratuita! 😊",
                        action: { type: 'contact' }
                    }
                ]
            }
        };
    }
    
    generateResponse(message) {
        const messageLower = message.toLowerCase();
        
        // Buscar na base de conhecimento
        for (const [category, data] of Object.entries(this.knowledgeBase)) {
            if (data.keywords.some(keyword => messageLower.includes(keyword))) {
                const response = data.responses[Math.floor(Math.random() * data.responses.length)];
                return response;
            }
        }
        
        // Resposta padrão
        return {
            text: "Interessante! 🤔 Para te ajudar melhor, que tal usar os botões de perguntas rápidas acima? Ou me conte mais sobre o que você precisa em QA e automação!",
            action: null
        };
    }
    
    getQuickResponse(questionType) {
        const responses = {
            ebooks: {
                text: "📚 **Nossos eBooks mais populares:**\n\n• **Claude Code** (R$ 9,90) - Automação com IA\n• **Landing Page** (R$ 29,90) - Páginas que convertem\n• **Maestro Mobile** (R$ 49,90) - Testes mobile completo\n\nQual área te interessa mais? Posso explicar qualquer um deles!",
                action: { type: 'continue', message: "Quer saber mais sobre algum eBook específico? Digite qual te interessou!" }
            },
            agentes: {
                text: "🤖 **Nossos Agentes IA fazem mágica:**\n\n• **Agente JIRA**: Lê tickets e cria cenários automaticamente\n• **Agente Swagger**: Testa todas as APIs sem supervisão\n• **Economia de 75% do tempo** em tarefas repetitivas\n\nTem alguma dúvida específica sobre os agentes?",
                action: { type: 'continue', message: "Para ver demonstrações dos agentes, me pergunte sobre um específico ou digite 'demonstrações'!" }
            },
            precos: {
                text: "💰 **Nossos preços:**\n\n• **eBooks**: R$ 9,90 a R$ 49,90\n• **Agentes IA**: Sob consulta (customizados)\n• **Mentorias**: Valores personalizados\n• **Primeira consulta**: GRATUITA! 🎁\n\nQuer saber o preço de algo específico?",
                action: { type: 'continue', message: "Digite qual produto te interessa e te dou mais detalhes sobre preços!" }
            },
            iniciante: {
                text: "🎯 **Roadmap para iniciantes:**\n\n1️⃣ Comece com **Claude Code** (R$ 9,90)\n2️⃣ Pratique com **Maestro Mobile** \n3️⃣ Agende uma mentoria gratuita\n4️⃣ Ana e Pablo te guiam no resto!\n\n**Sua chave para o primeiro emprego em QA! 🗝️**",
                action: { type: 'continue', message: "Tem alguma dúvida sobre como começar? Posso te ajudar com o primeiro passo!" }
            },
            contato: {
                text: "📞 **Vamos conversar! Escolha a forma:**\n\n🔸 **WhatsApp**: (81) 98196-9163\n🔸 **Email**: evelynholanda@gmail.com  \n🔸 **Instagram**: @clubequalidade\n\n**Primeira conversa sempre gratuita!** ☕",
                action: { type: 'contact' }
            }
        };
        
        return responses[questionType] || responses.contato;
    }
    
    executeAction(action) {
        switch(action.type) {
            case 'redirect':
                // Em vez de redirecionar imediatamente, oferecer opção
                this.addMessage(`🔗 Quer ir para a página específica? <a href="${action.url}" target="_blank" style="color: var(--primary-green); text-decoration: underline;">Clique aqui</a> ou continue conversando comigo!`, 'bot');
                break;
            case 'contact':
                this.addMessage("💬 Use os links de contato acima ou clique em qualquer seção 'Contato' no site!", 'bot');
                break;
            case 'continue':
                // Apenas adiciona uma mensagem de continuação da conversa
                setTimeout(() => {
                    this.addMessage(action.message, 'bot');
                }, 2000);
                break;
        }
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