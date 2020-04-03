<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<p align="center">Este projeto é o fruto de longos 6 meses de estudos nas melhores tecnologias do mercado, onde fui incrivelmente instruído pela Rocketseat, para formação FullStack Developer. Foi um longo caminho até chegar aqui, com muitas dificuldades na estrada, onde venci e aprendi com todas elas.</p>

<p align="center">Este projeto não é somente mais um entre os inúmeros, pois significa muito para mim, onde alcancei muitos objetivos significativos na minha carreira como desenvolvedor. Este projeto é um compilado de inúmeras ferramentas que a partir de agora irão compor meus projetos, onde espero impactar vidas e empresas com o poder da informatização.</p>

<p align="center"><img alt="GoStack" title="GoStack" src=".github/gostack.png" width="300px" /></p>

<p align="center">*"A arte de programar consiste em organizar e dominar a complexidade"* - Edsger W. Dijkstra</p>

<p align="center">
  <a href="#">Contexto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#">Principais Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#">Desafios</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#">Instalação e Execução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#">Agradecimentos</a>
</p>

## :page_facing_up: Contexto

Este projeto constitui-se de uma aplicação completa, composta por backend, frontend e mobile para uma transportadora fictícia.</p>

As funcionalidades no frontend web desenvolvido em ReactJS são dedicadas a administradores da aplicação, onde podem realizar cadastro de entregadores, destinatários, encomendas, e realizar a conexão entre os três itens anteriores, acompanhando a encomenda desde sua criação até a entrega.

As funcionalidades no mobile desenvolvido em React Native destinam-se ao entregador, onde este pode visualizar as encomendas a ele encarregadas e suas respectivas atribuições, como destinatário, datas e funcionalidades para retirada e registro da entrega. Um destaque para esta aplicação é o envio de imagem obtida através da câmera do aparelho, que poderá ser visualizada pelo administrador no frontend web.</p>

O backend é único tanto para o frontend web quanto para o mobile. Desenvolvido em NodeJS, realiza o controle de fluxo informacional, comunicação com os bancos de dados, envio de e-mails, upload de arquivos, dentre outras funcionalidades, utilizando modernas bibliotecas para este fim.

## :bulb: Principais Tecnologias

Dentre as inúmeras tecnologias utilizadas para que este projeto se tornasse possível, destacam-se:

- [Node.js](https://nodejs.org/)
- [React](https://reactjs.org/)
- [React Native](https://reactnative.dev/)
- [Sequelize](https://sequelize.org/)
- [Redis](https://redis.io/)
- [Redux](https://redux.js.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com/)
- [Bee-Queue](https://bee-queue.com/)

## :books: Desafios

Este projeto foi criado durante o Bootcamp 10 da Rocketseat, orientado pelos seguintes enunciados:

- [Enunciado 01](https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/README.md)
- [Enunciado 02](https://github.com/Rocketseat/bootcamp-gostack-desafio-03/blob/master/README.md)
- [Enunciado 03](https://github.com/Rocketseat/bootcamp-gostack-desafio-10/blob/master/README.md)
- [Enunciado 04](https://github.com/Rocketseat/bootcamp-gostack-desafio-09/blob/master/README.md)

## :microscope: Instação e Execução

Faça um clone deste repositório.

### :zap: Backend

- A partir da raiz do projeto, acesse o diretório backend através do comando no terminal 'cd backend'
- Execute o comando 'yarn' para instalar as dependências
- Configure os bancos de dados PostgreSQL e Redis conforme sua preferência
- Execute o comando 'cp .env.example .env', em seguida, preencha o arquivo '.env' para definição das variáveis ambiente
- Execute o comando 'yarn sequelize db:migrate' para preparar o banco de dados PostgresSQL
- Execute o comando 'yarn sequelize db:seed:all' para criação do usuário admin
- Execute o comando 'yarn dev' para iniciar o servidor em ambiente de desenvolvimento
- Execute, em outra instância do terminal, o comando 'yarn queue' para iniciar o Bee-Queue

### :computer: Frontend

- A partir da raiz do projeto, acesse o diretório frontend através do comando no terminal 'cd frontend'
- Execute o comando 'yarn' para instalar as dependências
- Execute o comando 'yarn start' para inicializar a interface
- Autentique-se na aplicação utilizando o e-mail 'admin@fastfeet.com' e senha '123456'

### :calling: Mobile

- A partir da raiz do projeto, acesse o diretório mobile através do comando no terminal 'cd mobile'
- Execute o comando 'yarn' para instalar as dependências
- Execute o comando 'yarn android' para a compilação e inicialização da aplicação em seu emulador ou dispositivo físico

**Observação:** esta aplicação foi desenvolvida e testada apenas em ambiente Android

## :bookmark: Agradecimentos

Agradeço,

Principalmente a Deus, por ter me fortalecido e permitido chegar até aqui

A minha mãe e vó por me apoiarem em tudo o que faço

Ao meu amigo Ernesto Lavorini Jr. por ter acreditado em mim e sempre estar presente

A Rocketseat e todos instrutores, em especial o Diego Fernandes, por todo apoio que me deu durante toda esta jornada

Ao meu professor e mentor Nilton Freitas Jr. que me incentivou meu ingresso no curso de Sistemas de Informação e que me acompanha dia a dia nessa jornada de desenvolvimento

---

<p align="center"><img alt="Rocketseat" title="Rocketseat" src=".github/rocketseat.png" width="300px" /></p>

Feito com 💜 by [luizfelipelaviola](https://www.linkedin.com/in/luizfelipelaviola/)