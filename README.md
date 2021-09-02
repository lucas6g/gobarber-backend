<p align="center">
    <img width="300" align="center" src="https://camo.githubusercontent.com/16835b1a5f23e90f29511dda2b27f599216ff2db217e2ae9bda1906b6ae2fc02/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f6d61782f313430302f312a4158704f706242507438464a43444e6a79524f6878412e706e67">   
</p>

<h1 align="center">
   GoBarber Backend
</h1>

<h3 align="center">
Plataforma de agendamento e gerenciamento para barbearias
</h3>

<p align="center">
  <a href="#rocket-sobre-o-projeto">Sobre o projeto</a> | <a href="#computer-tecnologias">Tecnologias</a> | <a href="#books-guia-de-instalação-e-execução">Guia de instalação e execução</a> 
</p>

<img src="https://user-images.githubusercontent.com/49662901/81240473-e8881c00-8fdd-11ea-9d47-740980f0eb6c.png">


## :rocket: Sobre o projeto

<p>Esta é uma plataforma completa onde o cliente pode visualizar a agenda de barbeiros e agendar um horário, 
e para barbeiros, permite gerenciar os horários marcados.</p> 

<p>Este é o repositório da API do projeto.</p>
<ul>
  <li>Para a versão web, <a href="https://github.com/lucas6g/gobarber-web">clique aqui</a>.</li>
  <li>Para a versão mobile, <a href="https://github.com/lucas6g/gobarber-mobile">aqui</a>.</li>
</ul>

## :computer: Tecnologias

Além das tecnologias abaixo, esta aplicação foi desenvolvida com as melhores práticas de desenvolvimento! 


    
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [ESLint-Airbnb](https://eslint.org/), [Prettier](https://prettier.io/) e [EditorConfig](https://editorconfig.org/)
- [Celebrate](https://github.com/arb/celebrate)
- [Jest](https://jestjs.io/) 
- [Multer](https://github.com/expressjs/multer)
- [Datefns](https://date-fns.org/)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js/)
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [TypeORM](https://typeorm.io/#/)
- [Handlebars](https://handlebarsjs.com/)
- [Nodemailer](https://nodemailer.com/about/)
- [Ioredis](https://github.com/luin/ioredis)
- [Cors](https://github.com/expressjs/cors)
- [Aws-sdk](https://github.com/aws/aws-sdk-js)
- [Class-transformer](https://github.com/typestack/class-transformer)
- [Rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible)
- [Tsyringe](https://github.com/microsoft/tsyringe)
- [Uuidv4](https://github.com/thenativeweb/uuidv4)

## :books: Guia de instalação e execução

### Pré-requisitos

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/) v10.20 ou maior
- [Yarn](https://yarnpkg.com/)
- Uma instância de [PostgreSQL](https://www.postgresql.org/), [Mongodb](https://www.mongodb.com/) e [Redis](https://redis.io/) **

** Ou [Docker](https://www.docker.com/) 

### Como executar

<i>Antes de executar estes passos, você precisa ter uma instância dos bancos listados acima ou um Docker com as imagens e os databases e schemas criados.</i>

- Clone o repositório ```git clone https://github.com/lucas6g/gobarber-backend.git```
- Vá até o diretório ```cd gostack-gobarber-server```
- Execute ```yarn``` para instalar as dependências
- Crie um arquivo .env e preencha com suas variáveis de ambiente
- Copie o arquivo de configuração do orm executando ```cp ormconfig.example.json ormconfig.json``` para linux ou mac e ```copy ormconfig.example.json ormconfig.json``` para windows
- Abra o arquivo ormconfig.json e preencha com suas credenciais das instâncias dos bancos de dados
- Execute ```yarn typeorm migration:run``` para rodar as migrations 
- Execute ```yarn dev:server``` para rodar o servidor

Você pode realizar requisições REST através do Insomnia
Caso deseje executar os testes unitários e de integração basta executar ```yarn test``` em seu terminal. Você poderá ver um relatório da cobertura acessando o arquivo ```coverage/lcov-report/index.html```.


