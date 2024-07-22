# MercadoList

MercadoList é uma aplicação de lista de compras desenvolvida com React e Firebase. Este projeto permite aos usuários gerenciar suas compras de forma eficiente com funcionalidades de autenticação, CRUD de itens e proteção de rotas.

## Índice

1. [Visão Geral](#visão-geral)
2. [Funcionalidades](#funcionalidades)
3. [Componentes](#componentes)
4. [Tecnologias](#tecnologias)
5. [Instalação e Configuração](#instalação-e-configuração)
6. [Uso](#uso)
7. [Contribuição](#contribuição)
8. [Licença](#licença)

## Visão Geral

MercadoList é um aplicativo para gerenciar uma lista de compras, permitindo adicionar, atualizar e excluir itens, bem como filtrar e buscar por categoria. O aplicativo inclui autenticação de usuário com Firebase e proteção de rotas para garantir segurança.

## Funcionalidades

- **Autenticação de Usuário**: Login e cadastro usando email e senha ou Google.
- **Gerenciamento de Itens**: Adicionar, atualizar e excluir itens da lista de compras.
- **Filtragem e Pesquisa**: Filtrar itens por categoria e pesquisar por nome.
- **Proteção de Rotas**: Rotas protegidas que requerem autenticação e verificação de e-mail.
- **Tratamento de Erro 404**: Página personalizada para URLs não encontradas.

## Componentes

### `App.js`

Configura as rotas principais da aplicação, incluindo proteção de rotas com o componente `ProtectedRoute`.

### `ProtectedRoute.js`

Protege rotas específicas, garantindo que apenas usuários autenticados com e-mail verificado possam acessar certas páginas.

### `NotFound.js`

Exibe uma página de erro 404 quando uma URL não é encontrada. Inclui um link para retornar à página inicial.

### `LoginComponent.js`

Formulário de login para autenticação de usuários com suporte para login com Google.

### `ListaCompra.js`

Página principal onde os itens da lista de compras são exibidos, com opções de filtro e pesquisa.

### `UpdateItemComponent.js`

Formulário para atualizar detalhes de um item existente, incluindo campos para nome, preço, quantidade e categoria.

### `Footer.js`

Exibe o rodapé da página com links para Política de Privacidade, Termos de Uso e Sobre.

### `Navbar.js`

Barra de navegação que exibe links dinâmicos baseados no estado de autenticação do usuário, incluindo opções para login, cadastro, lista de compras e logout.

### `Loader.js`

Componente de carregamento que exibe um spinner e uma mensagem de carregamento enquanto o conteúdo está sendo carregado.

## Tecnologias

- **React**: Biblioteca JavaScript para construção da interface do usuário.
- **Firebase**: Plataforma para autenticação e armazenamento de dados.
- **React-Bootstrap**: Biblioteca de componentes Bootstrap para React.
- **React Hook Form**: Biblioteca para gerenciamento de formulários.
- **react-number-format**: Biblioteca para formatação de números.

## Instalação e Configuração

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/seu-usuario/mercado-list.git
   cd mercado-list
   ```

2. **Instale as Dependências**

   ```bash
   npm install
   ```

3. **Configuração do Firebase**

   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
   - Configure a autenticação e o Firestore.
   - Substitua as credenciais no arquivo `firebase/config.js`.

4. **Inicie o Servidor de Desenvolvimento**

   ```bash
   npm start
   ```

## Uso

1. **Autenticação**

   - Faça login com seu e-mail e senha ou use o login do Google para acessar a aplicação.

2. **Gerenciamento de Itens**

   - Adicione novos itens à lista de compras.
   - Atualize ou exclua itens existentes.

3. **Filtragem e Pesquisa**

   - Utilize os filtros e a barra de pesquisa para encontrar itens específicos.

4. **Navegação**

   - Navegue pelas páginas usando a barra de navegação e o rodapé.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
