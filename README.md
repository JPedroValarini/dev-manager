
# Dev Manager

Dev Manager é uma aplicação full-stack construída com **Laravel** (backend) e **React** (frontend), com o uso de **Docker** para facilitar a configuração do ambiente de desenvolvimento. O sistema oferece CRUD completo para gerenciar **Níveis** e **Desenvolvedores**.

## 🛠 Tecnologias Utilizadas

- **Backend**: Laravel 8 (PHP 8.2)
- **Frontend**: React (SPA)
- **Banco de Dados**: PostgreSQL
- **CSS**: Tailwind CSS
- **Containers**: Docker
- **Gerenciador de Pacotes**: Composer (para o backend) e npm (para o frontend)

## 🚀 Pré-requisitos

Antes de rodar o projeto, certifique-se de ter o **Docker** e o **Docker Compose** instalados na sua máquina.

## 🧑‍💻 Instalação

### Passo 1: Clone o repositório

```bash
git clone https://github.com/JPedroValarini/dev-manager.git
cd backend/dev-manager
```

### Passo 2: Rodando o Docker

Com o **Docker Compose**, podemos rodar tanto o backend quanto o frontend facilmente.

No diretório principal do projeto (onde o `docker-compose.yml` está localizado), execute o comando:

```bash
docker-compose up --build
```

Isso irá:
- Construir os containers necessários para o backend (Laravel) e frontend (React).
- Rodar o banco de dados PostgreSQL.
- Criar os containers de desenvolvimento.

### Passo 3: Rodar o Composer (Backend)

Após o Docker estar em funcionamento, é necessário rodar o Composer dentro do container do backend para configurar o ambiente PHP (instalar dependências e gerar autoload). 

Para fazer isso, execute o seguinte comando:

```bash
docker-compose exec devmanager-backend bash
```

Isso irá te colocar dentro do container do backend. Agora, rode o Composer para instalar as dependências:

```bash
composer install
```

### Passo 4: Configurar o Ambiente

Antes de rodar a aplicação, você precisa configurar o banco de dados no Laravel. Para isso, execute os seguintes comandos dentro do container do backend:

```bash
php artisan migrate
php artisan db:seed
```

### Passo 5: Rodar o Frontend

Agora, o frontend (React) também está configurado. Para garantir que o ambiente de desenvolvimento esteja pronto, abra uma nova aba no terminal e rode:

```bash
docker-compose exec devmanager-frontend bash
npm install
npm start
```

Isso iniciará o servidor de desenvolvimento do React e você poderá acessar a aplicação no navegador.

## 🖥 Acessando a Aplicação

- **Backend** (Laravel API): `http://localhost:8000`
- **Frontend** (React SPA): `http://localhost:3000`

## 💡 Funcionalidades

### Backend (Laravel)
- **API para Níveis**: CRUD completo para gerenciar os níveis de desenvolvedores.
- **API para Desenvolvedores**: CRUD completo para gerenciar os dados dos desenvolvedores.

### Frontend (React)
- **Página de Níveis**: Listagem, criação, edição e exclusão de níveis.
- **Página de Desenvolvedores**: Listagem, criação, edição e exclusão de desenvolvedores com confirmação de exclusão.

## 🤖 Comandos úteis

- **Rodar o Docker Compose**: `docker-compose up --build`
- **Acessar o container do backend**: `docker-compose exec devmanager-backend bash`
- **Acessar o container do frontend**: `docker-compose exec devmanager-frontend bash`
- **Rodar o frontend**: `npm start`
- **Rodar o backend com o Artisan**: `php artisan serve`

## 🔧 Variáveis de Ambiente

A aplicação backend (Laravel) utiliza o arquivo `.env` para configuração das variáveis de ambiente. Certifique-se de configurar corretamente os valores para o banco de dados, como o seguinte exemplo:

```ini
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=devmanager
DB_USERNAME=USER
DB_PASSWORD=PASSWORD
```

## 📝 Contribuindo
