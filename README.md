# 🎵 React Media Downloader 🎥

React Media Downloader é uma aplicação web que permite buscar e baixar músicas e vídeos do YouTube. A aplicação oferece uma interface amigável para pesquisar mídia, visualizar resultados e baixar arquivos de áudio e vídeo.

## 📋 Índice

- [Contexto](#contexto)
- [Funcionalidades](#funcionalidades)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🌟 Contexto

Este projeto foi desenvolvido para facilitar o download de mídia do YouTube, permitindo que os usuários baixem facilmente arquivos de áudio e vídeo diretamente de seus navegadores. A aplicação utiliza a API do YouTube para buscar vídeos e a biblioteca `ytdl-core` para fazer o download dos arquivos.

## 🚀 Funcionalidades

- 🔍 Busca de vídeos e músicas no YouTube
- 📄 Exibição de resultados de busca com informações detalhadas
- 🎧 Download de arquivos de áudio (MP3)
- 📹 Download de arquivos de vídeo (MP4)
- 📈 Exibição de progresso de download


### 📁 Módulos

- **server/**: Contém o código do servidor Express para lidar com as requisições de busca e download.
- **src/**: Contém o código-fonte da aplicação React.
  - **components/**: Componentes React utilizados na aplicação.
  - **lib/**: Funções utilitárias.
  - **services/**: Serviços para interagir com a API do servidor e o YouTube.

## 🛠️ Tecnologias Utilizadas

- **Frontend**:
  - [React](https://reactjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Vite](https://vitejs.dev/)
  - [Lucide React](https://lucide.dev/)
  - [React Hot Toast](https://react-hot-toast.com/)

- **Backend**:
  - [Express](https://expressjs.com/)
  - [yt-search](https://www.npmjs.com/package/yt-search)
  - [ytdl-core](https://www.npmjs.com/package/ytdl-core)
  - [Axios](https://axios-http.com/)

## 📦 Instalação

1. Clone o repositório:
    ```sh
    git clone https://github.com/thejoaomoura/react-media-downloader.git
    cd atrox-media-downloader
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

## ▶️ Uso

1. Inicie o servidor e a aplicação:
    ```sh
    npm run dev
    ```
2. Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000).

## 🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença
Este projeto está licenciado sob a Licença MIT. Veja o arquivo LICENSE para mais detalhes.



