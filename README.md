This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Calculadora de Parcelas
Este repositório contém a solução completa para o teste técnico **Calculadora de Parcelas** desenvolvido para o GrupoFlex (FlexLabs). A aplicação foi construída em **Next.js** com **TypeScript**, seguindo boas práticas de desenvolvimento web e garantindo persistência de dados no browser.


## Tecnologias e Ferramentas
* **Next.js (App Router)**: framework React para SSR/SSG e API Routes.
* **TypeScript**: tipagem estática para maior segurança e previsibilidade.
* **React Hooks** (`useState`, `useEffect`): gerenciamento de estado e ciclos de vida no Client Component.
* **LocalStorage**: persistência de submissões diretamente no navegador, sem necessidade de backend.
* **CSS Inline Modules**: estilos simples inline para manter o exemplo autocontido (pode ser trocado por Tailwind ou CSS Modules).


## Estratégias de Implementação
1. **Formulário de Cadastro**:
   * Campos de dados pessoais (nome, e-mail, telefone, data de nascimento) com validações HTML5 e regex.
   * Máscara manual de telefone `(DD) NNNNN-NNNN` implementada em JavaScript puro no `onChange`.
     
2. **Calculadora de Parcelas**:
   * Campos adicionais para dados da dívida (valor total, valor da parcela, total de parcelas, parcelas pagas).
   * Cálculo da nova parcela conforme fórmula: `(valorParcela / 2) + 7.50`.
   * Exibição imediata do resultado na interface.
     
3. **Persistência de Dados**:
   * Uso de `localStorage` para salvar cada submissão (todos os campos + valor calculado + timestamp).
   * Recuperação automática ao montar o componente via `useEffect`.
     
4. **Exibição de Resultados**:
   * Página separada (`/resultados`) com tabela completa de todas as submissões.
   * Navegação simples de volta ao formulário.


## Como Rodar
1. Instalar dependências:
   ```bash
   npm install
   # ou yarn
   ```
   
2. Iniciar o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   
3. Acessar em `http://localhost:3000`


## Possíveis Melhorias
* Substituir `localStorage` por uma API (Next.js API Routes + banco de dados).
* Adicionar testes unitários e de integração.
* Utilizar Tailwind CSS ou CSS Modules para estilos mais robustos.
* Melhorar acessibilidade e responsividade.

```
