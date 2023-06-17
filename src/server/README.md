# User Account Management API

The API provides endpoints for user authentication and CRUD features for user profile.

# Table of Contents

- [Features](#features)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Credits](#credits)
- [License](#license)

## Features

The API comes with the following features:

- Endpoints for user authentication.
- Data stored in a PostgreSQL database.
- Authentication using JSON Web Tokens (JWT).
- Input validation using Joi.
- Error handling and logging using Winston.

## Installation

To install the API, clone this repository and create a .env file with the following variables:

```makefile
NODE_ENV=development
PORT=3000
PGHOST=your_host_here
PGPORT=your_port_here
PGDATABASE=your_database_here
PGUSER=your_username_here
PGPASSWORD=your_password_here
JWT_SECRET=your_secret_key_here
```

Postgres should be installed, and run the following commands:

```sh
npm install
npm run prepare
```

Before running the next commands, postgresql service needs to be started
(you can do that by running

```sh
pg_ctl start
```

or using GUI if available)

```sh
npm run db:push
npm run dev
```

To add user with admin role, prisma studio can be used by running

```sh
npx prisma studio
```

## License

The API is licensed under the [MIT License](https://opensource.org/license/mit/).
