# Design Future — Landing Page Comercial

Landing page comercial profissional da **Design Future**, especializada em identidade visual, design para redes sociais, carrosséis de autoridade e desenvolvimento de landing pages focadas em conversão.

Desenvolvido com HTML5 semântico, CSS3 moderno (design system com CSS Custom Properties), JavaScript puro (ES Modules) e Vite.

---

## 🚀 Como Executar o Projeto Localmente

### 1. Pré-requisitos
- Node.js instalado (v18 ou superior).

### 2. Instalação e Execução
```bash
# Entre na pasta do projeto
cd site-design-future

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento local
npm run dev
```
Abra o navegador no endereço indicado (normalmente `http://localhost:5173`).

### 3. Build de Produção
```bash
npm run build
```
Os arquivos otimizados serão gerados na pasta `dist/`.

---

## ✉️ Como Ativar o Envio Real do Formulário (Formspree)

O formulário já possui validação de campos, feedback de erro, indicador de loading e mensagens de sucesso. Para receber os contatos diretamente no seu e-mail:

1. Acesse [formspree.io](https://formspree.io/) e crie uma conta gratuita.
2. Clique em **+ New Form** e dê o nome de `Design Future Contato`.
3. Copie o endpoint fornecido (ex: `https://formspree.io/f/seu_codigo_aqui`).
4. Abra o arquivo `src/main.js` e cole seu endpoint na constante:
   ```javascript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/seu_codigo_aqui';
   ```
5. Salve o arquivo e faça um teste no formulário. A confirmação chegará no seu e-mail.

---

## 🌐 Publicação no GitHub e na Vercel

### Passo 1: Instalar o Git no Windows
Se ainda não possuir o Git configurado no terminal:
1. Baixe o instalador no site oficial: [git-scm.com/download/win](https://git-scm.com/download/win).
2. Execute a instalação padrão (marque a opção de adicionar ao PATH).
3. Feche e reabra o terminal.

### Passo 2: Criar Repositório no GitHub
1. Acesse [github.com](https://github.com/) e crie um novo repositório chamado `design-future-site`.
2. Na pasta do projeto (`site-design-future`), execute:
   ```bash
   git init
   git add .
   git commit -m "feat: landing page completa Design Future"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/design-future-site.git
   git push -u origin main
   ```

### Passo 3: Deploy Gratuito na Vercel
1. Acesse [vercel.com](https://vercel.com/) e faça login com sua conta do GitHub.
2. Clique em **Add New...** > **Project**.
3. Importe o repositório `design-future-site`.
4. A Vercel detectará o Vite automaticamente:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **Deploy**. Em cerca de 30 segundos sua landing page estará no ar com HTTPS gratuito!
