# 🚀 Clube Qualidade - Landing Page Profissional

> Landing page de vendas completa para especialistas em QA e IA - **Ana Evelyn** e **Pablo Andrade**

## 📋 Sobre o Projeto

Esta landing page profissional foi desenvolvida para o **Clube Qualidade**, representando **Ana Evelyn** (Especialista Sênior em QA e IA) e **Pablo Andrade** (QA Estratégico e Automação), com foco em **autoridade, conversão e vendas de produtos digitais**.

### 🎯 Objetivos
- Apresentar expertise de dois especialistas renomados em QA e IA
- Vender **eBooks, cursos, workshops e mentorias** especializadas
- Oferecer **agentes de IA personalizados** para empresas
- Demonstrar autoridade no setor de automação e testes
- Converter visitantes em clientes através de **4 jornadas distintas**

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Design responsivo com +100 linhas de animações avançadas
- **JavaScript** - Sistema modular de múltiplos carrosséis
- **GitHub Pages** - Hospedagem gratuita e confiável
- **Hotmart** - Integração ativa para vendas

## 🎨 Características do Design

### Paleta de Cores Expandida
- **Verde Primário**: #10B981 (confiança, crescimento)
- **Azul Tecnológico**: #3B82F6 (profissionalismo)
- **Laranja Chamativo**: #ff6b35 (urgência, ação)
- **Gradientes Premium**: Azul escuro para seções empresariais

### Layout Multi-Seção
- **4 carrosséis independentes** com designs únicos
- **Banner piscante** chamativo na página inicial
- **Responsividade total** para todos os dispositivos
- **Animações síncronas** em elementos interativos

## 🗝️ Banner Chamativo (NOVO!)

### Funcionalidades do Banner
- **5 animações simultâneas**: gradiente, pulso, bounce, shine, button-pulse
- **Localização estratégica**: Entre Hero e About sections
- **Mensagem impactante**: "Pegue a chave para abrir a porta do seu primeiro emprego na área"
- **CTA otimizado**: Direciona diretamente para produtos.html

### Tecnologias do Banner
```css
- gradientShift (gradiente animado)
- bannerPulse (pulso do banner)
- keyBounce (movimento da chave 🗝️)
- shine (efeito brilho passando)
- buttonPulse (animação do botão CTA)
```

## 📁 Estrutura Completa do Projeto

```
page_evelyn/
├── index.html                    # Landing page com banner chamativo
├── produtos.html                 # 4 seções de carrossel de vendas
├── CLAUDE.md                     # Instruções para IA
├── css/
│   └── style.css                # 970+ linhas de CSS com animações
├── js/
│   └── script.js                # Sistema modular de carrosséis
├── assets/
│   └── images/
│       ├── ana-evelyn.jpg        # Foto Ana Evelyn
│       ├── pablo-andrade.jpg     # Foto Pablo Andrade
│       ├── claude.png            # eBook Claude IA
│       ├── ladinpage.jpg         # eBook Landing Page
│       ├── maestro.png           # eBook Maestro Mobile
│       ├── jira_teste.jpeg       # Agente JIRA
│       ├── apiswagger.jpeg       # Agente Swagger
│       ├── cursos_mentorias.png  # Imagem padrão cursos/mentorias
│       ├── ebook_novo2.png       # eBook adicional
│       ├── gmail.jpg             # Ícone Gmail
│       ├── linkedin.jpg          # Ícone LinkedIn
│       └── insta.jpg             # Ícone Instagram
├── produtos/
│   └── ebook-claude/
│       └── README.txt
└── README.md                     # Este arquivo
```

## 🌟 Funcionalidades Avançadas

### Landing Page Principal (index.html)
- **Hero Section Duplo** com carrossel Ana + Pablo
- **Banner Mega Chamativo** com 5 animações simultâneas 🗝️
- **Seções Sobre** para ambos os especialistas
- **Proposta de Valor** com benefícios por categoria
- **CTAs estratégicos** direcionando para 4 jornadas diferentes

### Sistema de Carrosséis Múltiplos (produtos.html)

#### 📚 **Seção 1: eBooks Práticos para QA e IA**
- **3 produtos** com preços acessíveis (R$ 9,90 - R$ 49,90)
- **Foco**: Aprendizado individual e crescimento profissional
- **Produtos**:
  1. 🤖 **Dicas do Dia a Dia com Claude** - R$ 9,90
  2. 🎯 **Landing Page com IA** - R$ 29,90
  3. 📱 **Maestro Testes Mobile** - R$ 49,90

#### 🤖 **Seção 2: Agentes de IA Personalizados**
- **2 produtos** premium com imagens específicas (R$ 199,00 - R$ 499,00)
- **Tags piscantes**: "Personalize conosco se preferir"
- **Foco**: Automação profissional e eficiência
- **Produtos**:
  1. ⚡ **Agente JIRA** - R$ 199,00 (jira_teste.jpeg)
  2. 💎 **Agente Swagger** - R$ 499,00 (apiswagger.jpeg)

#### 🎓 **Seção 3: Cursos e Workshops**
- **3 produtos** sob demanda com imagem padronizada
- **Foco**: Desenvolvimento de habilidades práticas
- **Produtos**:
  1. 🎯 **Workshop QA e Automação** - Sob Demanda
  2. 🤖 **Curso IA Aplicada ao QA** - Sob Demanda
  3. 🏢 **Workshop Corporativo** - Sob Demanda

#### 🚀 **Seção 4: Mentoria Empresarial IA**
- **4 produtos** premium com fundo exclusivo azul escuro
- **Foco**: Transformação digital empresarial
- **Produtos**:
  1. ⚡ **Implementação Completa** - Sob Consulta
  2. 🎯 **Consultoria Estratégica** - Sob Consulta
  3. 🚀 **Workshop Executivo** - Sob Consulta
  4. 🛠️ **Workshop Ferramentas IA** - Sob Consulta

## 🎯 Sistema de Navegação e CTAs

### CTAs Personalizados por Categoria
- **eBooks**: "Comprar por R$ X,XX" → Links diretos Hotmart
- **Agentes IA**: "Entre em Contato" → Seção de contato
- **Cursos/Workshops**: "Entre em Contato" → Formulário específico
- **Mentoria Empresarial**: "Agendar Reunião" → Contato executivo

### JavaScript Modularizado
```javascript
// 4 carrosséis independentes
new ProductCarousel('ebooksCarouselTrack')
new ProductCarousel('agentsCarouselTrack')
new ProductCarousel('coursesCarouselTrack')
new ProductCarousel('aiMentoringCarouselTrack')
```

## 🎨 Animações e Efeitos Especiais

### Banner Chamativo
- **🗝️ Ícone animado** com keyBounce
- **Gradiente dinâmico** com shift infinito
- **Efeito shine** passando pelo banner
- **Pulso sincronizado** banner + botão

### Tags Piscantes
- **Classe .highlight** para badges especiais
- **Cores personalizadas** por seção
- **Animação pulse-glow** com intensidade variável
- **Text-shadow** para melhor legibilidade

### Hover Effects Avançados
- **Transform + Scale** nos botões
- **Box-shadow dinâmica** com intensificação
- **Transições suaves** em todos os elementos

## 🎯 Integração com Plataformas de Venda

### Status das Integrações
- **🔥 Hotmart** - ✅ **ATIVA** - "Plataforma líder em produtos digitais"
- **🥝 Kiwify** - ⏳ **Em breve** - Checkout otimizado
- **🛒 Gumroad** - ⏳ **Em breve** - Plataforma internacional

### Links de Produtos Ativos
- eBook Claude: `https://pay.hotmart.com/M101119125T`
- eBook Landing Page: `https://go.hotmart.com/S101318267C`
- eBook Maestro: `https://go.hotmart.com/I101319315K`

## 📊 Otimizações Técnicas Implementadas

### Performance
- **4 carrosséis otimizados** com lazy loading
- **Animações CSS puras** sem dependências
- **Imagens otimizadas** para web
- **JavaScript modular** para melhor cache

### SEO Avançado
- **Meta tags específicas** para cada seção
- **Schema markup** para produtos
- **Alt text descritivo** em todas as imagens
- **URLs semânticas** e navegação clara

### Conversão
- **4 jornadas de compra** distintas
- **Prova social** com depoimentos
- **Urgência visual** com animações
- **CTAs específicos** por público-alvo

## 🌐 Acesso Online

**URL Principal**: https://evelynholanda.github.io/clubedaqualidade-landpage/  
**Página de Produtos**: https://evelynholanda.github.io/clubedaqualidade-landpage/produtos.html

## 👥 Equipe Clube Qualidade

### 🎯 **Ana Evelyn** - Especialista Sênior QA e IA
- **Email**: evelynholanda@gmail.com
- **Celular**: (81) 98196-9163
- **LinkedIn**: [/in/anaevelynqa](https://linkedin.com/in/anaevelynqa)
- **Especialidades**: Agentes de IA, Automação, Mentoria 50+

### 🚀 **Pablo Andrade** - QA Estratégico e Automação
- **Email**: pcraveirodeandrade@gmail.com
- **Celular**: (81) 98363-7148
- **LinkedIn**: [/in/pablo-andrade-577109218/](https://linkedin.com/in/pablo-andrade-577109218/)
- **Especialidades**: QA Estratégico, Produtividade com IA

### 📱 **Clube Qualidade - Redes Sociais**
- **Instagram**: [@clubequalidade](https://www.instagram.com/clubequalidade?igsh=aGhvaTJ5YmEwbWQ=)
- **Email**: clubequalidade@gmail.com
- **LinkedIn**: [Clube da Qualidade](https://www.linkedin.com/in/clube-da-qualidade-448120379/)

## 💼 Experiência Profissional Combinada

### Ana Evelyn - 5+ Anos
- **Samsung** (via Cesar) - Testes inteligentes
- **Ferreira Costa** - Engenharia de Qualidade Senior
- **Projetos críticos** com redução de pegada de carbono
- **Especialidades**: 75% otimização de tarefas, 30% redução AWS

### Pablo Andrade - 3+ Anos  
- **QA Estratégico** em squads ágeis
- **Automação inteligente** com IA
- **Produtividade** e otimização de processos
- **Colaboração** em soluções inovadoras

## 📈 Resultados e Métricas

- **4 jornadas de conversão** implementadas
- **13+ imagens otimizadas** para produtos
- **5 animações simultâneas** no banner principal
- **4 carrosséis independentes** funcionais
- **Mobile-first** com 100% responsividade

## 🚀 Tecnologias de Ponta

- **CSS Grid + Flexbox** para layouts complexos
- **Intersection Observer** para animações
- **Touch/Swipe support** em todos os carrosséis
- **Lazy loading** para performance
- **Accessibility** com foco em WCAG

---

**© 2024 Clube Qualidade - Ana Evelyn & Pablo Andrade**  
*Transformando carreiras através da automação inteligente* 🚀🗝️