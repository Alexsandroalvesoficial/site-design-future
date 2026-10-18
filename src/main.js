/**
 * DESIGN FUTURE — MAIN JAVASCRIPT
 * Lógica modular: Portfólio dinâmico, animações, menu mobile e formulário real
 */

import { portfolioProjects } from './data/projects.js';
import logoPuro from './data/logo_df_estrela_verde_puro.svg';
import logoGradiente from './data/logo_df_estrela_verde_gradiente.svg';

// Atualiza as logos no DOM automaticamente
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.brand-symbol').forEach(img => img.src = logoPuro);
  const heroLogo = document.querySelector('.floating-logo');
  if (heroLogo) heroLogo.src = logoGradiente;
});
/* ==========================================================================
   CONFIGURAÇÃO DO ENDPOINT DO FORMULÁRIO (Formspree / Getform)
   ==========================================================================
   COMO ATIVAR:
   1. Crie uma conta gratuita em https://formspree.io
   2. Crie um novo formulário (ex: "Contato Design Future")
   3. Copie o endpoint gerado (ex: "https://formspree.io/f/mvoegkzy")
   4. Cole abaixo na constante FORMSPREE_ENDPOINT substituindo a string vazia:
*/
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xljgvrwv'; // Endpoint real do Formspree integrado

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initMobileMenu();
  initPortfolio();
  initServicePreselection();
  initScrollAnimations();
  initContactForm();
});

/* 1. Atualizar Ano Dinâmico no Footer */
function initYear() {
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* 2. Menu Mobile Acessível */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-menu-cta a');

  if (!menuToggle || !mobileMenu) return;

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : menuToggle.getAttribute('aria-expanded') === 'true';
    const newState = !isOpen;

    menuToggle.setAttribute('aria-expanded', String(newState));
    menuToggle.classList.toggle('active', newState);
    mobileMenu.setAttribute('aria-hidden', String(!newState));
    mobileMenu.classList.toggle('active', newState);

    if (newState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  menuToggle.addEventListener('click', () => toggleMenu());

  // Fechar menu ao clicar em qualquer link interno
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Fechar com a tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      toggleMenu(false);
      menuToggle.focus();
    }
  });
}

/* 3. Renderização e Filtro do Portfólio Conceitual */
function initPortfolio() {
  const grid = document.getElementById('portfolioGrid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (!grid) return;

  function renderProjects(category = 'all') {
    const filtered = category === 'all' 
      ? portfolioProjects 
      : portfolioProjects.filter(p => p.category === category);

    grid.innerHTML = filtered.map(p => `
      <article class="project-card animate-on-scroll is-visible" data-category="${p.category}">
        <div class="project-mockup">
          <span class="project-badge">${p.badge}</span>
          ${p.image ? `
            <img src="${p.image}" alt="${p.title}" class="project-img" />
          ` : `
            <div class="project-mockup-inner">
              <span class="mockup-tag">01 / PROJETO</span>
              <h4 class="mockup-headline">${p.title}</h4>
            </div>
          `}
        </div>
        <div class="project-details">
          <span class="project-category">${p.categoryLabel}</span>
          <h3 class="project-name">${p.title}</h3>
          <p class="project-description">${p.description}</p>
          <div class="project-goal">
            <strong>Objetivo:</strong> ${p.goal}
          </div>
          <div class="project-tags">
            ${p.deliverables.map(d => `<span class="project-tag">${d}</span>`).join('')}
          </div>
        </div>
      </article>
    `).join('');
  }

  // Render inicial
  renderProjects('all');

  // Eventos de filtro
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      renderProjects(filter);
    });
  });
}

/* 4. Pré-seleção do Serviço no Formulário ao Clicar nos Botões de Serviços */
function initServicePreselection() {
  const serviceButtons = document.querySelectorAll('.select-service-btn');
  const selectElement = document.getElementById('servico');

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetService = btn.dataset.serviceName;
      if (selectElement && targetService) {
        selectElement.value = targetService;
        
        // Destacar campo com leve foco visual
        selectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        selectElement.focus();
        selectElement.style.borderColor = 'var(--color-primary)';
      }
    });
  });
}

/* 5. Revelação Suave de Elementos (IntersectionObserver) */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  if (!('IntersectionObserver' in window)) {
    // Fallback se navegador antigo não suportar
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // Não precisa reanimar
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* 6. Validação e Envio Real do Formulário */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');
  const formNotice = document.getElementById('formNotice');

  if (!form) return;

  // Atualizar aviso se endpoint real foi fornecido
  if (FORMSPREE_ENDPOINT && FORMSPREE_ENDPOINT.trim() !== '') {
    formNotice.innerHTML = `
      <span class="notice-icon">✓</span>
      <span><strong>Formulário Conectado:</strong> As solicitações enviadas aqui serão entregues diretamente na sua caixa de entrada através do Formspree.</span>
    `;
    formNotice.style.background = 'rgba(16, 185, 129, 0.12)';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Limpar erros anteriores
    clearErrors();
    statusEl.style.display = 'none';
    statusEl.className = 'form-status';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validação de Campos
    let isValid = true;

    if (!data.nome || data.nome.trim().length < 2) {
      showError('nome', 'Por favor, informe seu nome completo.');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email.trim())) {
      showError('email', 'Por favor, informe um endereço de e-mail válido.');
      isValid = false;
    }

    if (!data.servico) {
      showError('servico', 'Por favor, selecione uma das opções de serviço.');
      isValid = false;
    }

    if (!data.mensagem || data.mensagem.trim().length < 10) {
      showError('mensagem', 'Por favor, descreva seu projeto com pelo menos 10 caracteres.');
      isValid = false;
    }

    if (!form.consentimento.checked) {
      showError('consentimento', 'Você precisa autorizar o contato para envio da proposta.');
      isValid = false;
    }

    if (!isValid) return;

    // Estado de Loading
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    try {
      if (FORMSPREE_ENDPOINT && FORMSPREE_ENDPOINT.trim() !== '') {
        // Envio HTTP real para o Formspree
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            nome: data.nome,
            email: data.email,
            empresa: data.empresa || 'Não informado',
            servico: data.servico,
            orcamentoFaixa: data.orcamentoFaixa || 'A combinar',
            prazo: data.prazo || 'Não especificado',
            mensagem: data.mensagem
          })
        });

        if (response.ok) {
          showSuccessMessage('✓ Solicitação de orçamento enviada com sucesso! Entraremos em contato com você em breve.');
          form.reset();
        } else {
          const resJson = await response.json().catch(() => ({}));
          let errMsg = 'Ocorreu um erro ao enviar para o servidor. Tente novamente.';
          
          if (resJson.errors && Array.isArray(resJson.errors)) {
            errMsg = resJson.errors.map(err => err.message).join('; ');
          } else if (resJson.error) {
            errMsg = resJson.error;
          }
          
          showErrorMessage(errMsg);
        }
      } else {
        // Simulação realista para testes locais antes de colocar o endpoint
        await new Promise(resolve => setTimeout(resolve, 1200));

        showSuccessMessage(
          'Solicitação simulada com sucesso! (Modo Local: configure sua conta no Formspree e insira seu endpoint em src/main.js para receber e-mails reais).'
        );
        form.reset();
      }
    } catch (err) {
      console.error('Erro de envio:', err);
      showErrorMessage('Falha na conexão de rede. Verifique sua internet e tente novamente.');
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });

  function showError(fieldId, message) {
    const errEl = document.getElementById(`${fieldId}-error`);
    if (errEl) errEl.textContent = message;
    const inputEl = document.getElementById(fieldId);
    if (inputEl) inputEl.style.borderColor = '#ef4444';
  }

  function clearErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => {
      el.style.borderColor = '';
    });
  }

  function showSuccessMessage(msg) {
    statusEl.textContent = msg;
    statusEl.className = 'form-status success';
    statusEl.style.display = 'block';
  }

  function showErrorMessage(msg) {
    statusEl.textContent = msg;
    statusEl.className = 'form-status error';
    statusEl.style.display = 'block';
  }
}
