document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const downloadAppMenuBtn = document.getElementById('downloadAppMenuBtn');
    const downloadAppBannerBtn = document.getElementById('downloadAppBannerBtn');
    const downloadDialog = document.getElementById('downloadDialog');
    const closeDialogBtn = document.getElementById('closeDialogBtn');
    const selectModelBtn = document.getElementById('selectModelBtn');
    const modelSelectModal = document.getElementById('modelSelectModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modelBtns = document.querySelectorAll('.model-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    // Elementos do menu
    const menuItems = document.querySelectorAll('.menu-item, .menu-grid-item');
    
    // Elementos da página principal
    const gameCards = document.querySelectorAll('.game-card');
    const promoBadges = document.querySelectorAll('.promo-badge');
    const categories = document.querySelectorAll('.category');
    const viewAllLinks = document.querySelectorAll('.view-all');
    const navItems = document.querySelectorAll('.nav-item');

    // Menu lateral
    menuToggle.addEventListener('click', function() {
        sideMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', function() {
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    menuOverlay.addEventListener('click', function() {
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Abrir diálogo de download
    function openDownloadDialog() {
        downloadDialog.style.display = 'flex';
    }

    // Fechar diálogo de download
    function closeDownloadDialog() {
        downloadDialog.style.display = 'none';
    }

    // Abrir modal de seleção de modelo
    function openModelSelectModal() {
        downloadDialog.style.display = 'none';
        modelSelectModal.style.display = 'flex';
    }

    // Fechar modal de seleção de modelo
    function closeModelSelectModal() {
        modelSelectModal.style.display = 'none';
    }

    // Função para mostrar mensagem para iPhone
    function showIPhoneMessage() {
        // Criar o modal de mensagem
        const messageModal = document.createElement("div");
        messageModal.className = "modal";
        messageModal.style.display = "flex";

        // Conteúdo do modal
        messageModal.innerHTML = `
            <div class="modal-content system-select-modal">
                <div class="modal-header">
                    <h2>Aviso - iPhone</h2>
                    <button class="close-btn" id="closeIPhoneMessageBtn">&times;</button>
                </div>
                <div class="modal-body" style="text-align: center; padding: 30px;">
                    <div class="system-icon iphone-icon" style="margin: 0 auto 20px auto;">
                        <img src="images/icons/iphone.png" alt="iPhone" style="width: 70%; height: 70%;">
                    </div>
                    <p style="font-size: 1.1rem; margin-bottom: 15px;">No momento, o aplicativo Papi Bet não está disponível para dispositivos iPhone.</p>
                    <p style="color: #ccc; margin-bottom: 15px;">Nossa equipe está trabalhando para disponibilizar o app na App Store em breve.</p>
                    <p style="color: #ff6600; font-weight: bold;">Agradecemos sua compreensão e interesse!</p>
                </div>
            </div>
        `;

        // Adicionar o modal ao corpo do documento
        document.body.appendChild(messageModal);

        // Fechar o modal de seleção de modelo
        modelSelectModal.style.display = 'none';

        // Configurar o botão de fechar
        const closeIPhoneMessageBtn = document.getElementById("closeIPhoneMessageBtn");
        closeIPhoneMessageBtn.addEventListener("click", () => {
            messageModal.remove();
        });

        // Fechar ao clicar fora do modal
        messageModal.addEventListener("click", (e) => {
            if (e.target === messageModal) {
                messageModal.remove();
            }
        });
    }

    // Botões de login e registro
    loginBtn.addEventListener('click', openDownloadDialog);
    registerBtn.addEventListener('click', openDownloadDialog);

    // Botões de download
    downloadAppMenuBtn.addEventListener('click', openDownloadDialog);
    downloadAppBannerBtn.addEventListener('click', openDownloadDialog);
    
    // Botão para fechar o diálogo de download
    closeDialogBtn.addEventListener('click', function() {
        closeDownloadDialog();
    });
    
    // Botão para selecionar modelo
    selectModelBtn.addEventListener('click', openModelSelectModal);
    
    // Botão para fechar o modal de seleção de modelo
    closeModalBtn.addEventListener('click', closeModelSelectModal);
    
    // Fechar modais ao clicar fora
    downloadDialog.addEventListener('click', function(e) {
        if (e.target === downloadDialog) {
            closeDownloadDialog();
        }
    });
    
    modelSelectModal.addEventListener('click', function(e) {
        if (e.target === modelSelectModal) {
            closeModelSelectModal();
        }
    });
    
    // Selecionar modelo e redirecionar para a página de tutorial
    const systemBtns = document.querySelectorAll('.system-btn');
    systemBtns.forEach((btn) => {
        btn.addEventListener('click', function() {
            const model = this.getAttribute('data-model');
            
            // Verificar se é iPhone
            if (model === 'iphone') {
                showIPhoneMessage();
                return;
            }
            
            // Armazenar o modelo selecionado no localStorage
            localStorage.setItem('currentModel', model);
            
            // Redirecionar para a página de tutorial específica do modelo
            window.location.href = `tutorial-${model}.html`;
        });
    });
    
    // Adicionar eventos para itens do menu
    menuItems.forEach(item => {
        item.addEventListener('click', openDownloadDialog);
    });
    
    // Adicionar eventos para cards de jogos
    gameCards.forEach(card => {
        card.addEventListener('click', openDownloadDialog);
    });
    
    // Adicionar eventos para badges de promoção
    promoBadges.forEach(badge => {
        badge.addEventListener('click', openDownloadDialog);
    });
    
    // Adicionar eventos para categorias
    categories.forEach(category => {
        category.addEventListener('click', openDownloadDialog);
    });
    
    // Adicionar eventos para links "Ver todos"
    viewAllLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openDownloadDialog();
        });
    });
    
    // Adicionar eventos para itens de navegação inferior
    navItems.forEach(item => {
        item.addEventListener('click', openDownloadDialog);
    });
    
    // Carrossel de banners
    const bannerSlides = document.querySelectorAll('.banner-slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        // Esconder todos os slides
        bannerSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remover classe ativa de todos os indicadores
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Mostrar o slide atual
        bannerSlides[index].classList.add('active');
        
        // Ativar o indicador correspondente
        indicators[index].classList.add('active');
        
        // Atualizar o índice atual
        currentSlide = index;
    }
    
    function nextSlide() {
        let nextIndex = (currentSlide + 1) % bannerSlides.length;
        showSlide(nextIndex);
    }
    
    // Adicionar evento de clique aos indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Iniciar carrossel automático
    setInterval(nextSlide, 5000);

    // Renomear o segundo jogo para "Futebol Studio"
    const gameBlackjack = document.getElementById('gameBlackjack');
    if (gameBlackjack) {
        const gameTitle = gameBlackjack.querySelector('.game-title');
        if (gameTitle) {
            gameTitle.textContent = 'FUTEBOL STUDIO';
        }
    }
});