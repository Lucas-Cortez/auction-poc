# Auction-test

## Installation

```bash
$ npm install
```

## Running the app

First, to run the app, you need to start the database:

```bash
$ docker-compose up -d
```

> Remember, once you don't need the database anymore, you can stop it with the command `docker-compose down`.

Once the database is running, you need to create a `.env` file in the root directory of the project, with the following content:

```bash
DATABASE_URL=mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?retryWrites=true&w=majority&authSource=admin&directConnection=true

DATABASE_USERNAME=root
DATABASE_PASSWORD=password
DATABASE_HOST=localhost
DATABASE_PORT=27017
DATABASE_NAME=auction

JWT_SECRET=85e4ed962b831b0a0b9baa5aad87467055e7e17bf9869cd372bf50d06587b60f
BCRYPT_GENERATED_PASSWORD=$2a$12$yXTtsZgAa6aus1W31xU41udR.eDUmUwtBQTM8sUC0J7kFP13dVojm
```

Then, to populate the database with the structure, you need to run these following commands:

```bash
$ npm run db:generate
$ npm run db:push
```

With all configurations done, you can run the app:

```bash
# watch mode
$ npm run start:dev

# development
$ npm run start

# production mode
$ npm run build
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```

## Documentation

To see the documentation of the project, it's necessary to run the app.

> You can access the documentation via browser through the following link: [http://localhost:3030/api](http://localhost:3030/api)

## Functionalities

To authenticate as a ADMIN, you can use the following credentials:

```json
{
  "email": "root@admin.com",
  "password": "Senha@123"
}
```

> With the **ADMIN** role, you can finish auctions.
