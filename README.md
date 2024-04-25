# Table of Contents
- [Project Overview](#project-overview)
- [Evaluation Instructions](#evaluation-instructions)
- [Design Decisions](#design-decisions)
- [Test](#test)

# Project Overview
### Endpoints

``` bash
GET      http://localhost:4000/ # Health check
GET      http://localhost:4000/balance/:walletAddress # Get CRO balance of a wallet
GET      http://localhost:4000/token-balance/:walletAddress/:tokenAddress # Get CRC20 balance of a token in a wallet
POST     http://localhost:4000/users/ # Register a user
POST     http://localhost:4000/users/login # Login a user
GET      http://localhost:4000/api-docs/ # Swagger docs
```

### Folder structure

```
.
├── config            - Contains config files of project
├── controllers       - Specific logic to interact with database or blockchain
├── errors            - Custom Errors
├── middlewares       - Functions that are run on routes
├── prisma            - Handles the database ORM config, database schema and migration scripts for tracking changes
│   └── migrations    
│   └── schema.prisma 
├── routes            - Endpoints handling and configuration
├── service           - Reusable business logic such as common web3 logic
│   └── abi           
├── test              - Unit and integration tests
└── utils             
    └── types         - Contains project's typescript types
```

# Evaluation Instructions
### Installation
  ```bash
  yarn
  ```

### Set up
  ```bash
  yarn dev
  ```

### Run unit tests - (ensure Docker daemon is running)
  ```bash
  yarn test
  ```

## End point evaluation via Curl
### 1. Register a user request
  ```bash
  # Request
  curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"cronos_tester","password":"secret_password"}' \
  http://localhost:4000/users 

  # Response
  {
    "id":"13b9e106-2b5a-495d-90db-c92d61ecf9a0",
    "username":"cronos_tester"
  }
  ```

### 2. Login and obtain JWT
  ```bash
  # Request
  curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"cronos_tester","password":"secret_password"}' \
  http://localhost:4000/users/login
  
  # Response
  {
   "id":"13b9e106-2b5a-495d-90db-c92d61ecf9a0",
   "username":"cronos_tester",
   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzYjllMTA2LTJiNWEtNDk1ZC05MGRiLWM5MmQ2MWVjZjlhMCIsImlhdCI6MTcxMzg2NjA5MywiZXhwIjoxNzE2NDU4MDkzfQ.QnnHoKHv7tlCbE136BDvJqtPMpLHSNAVQVzunHWzPvg"
  } 
  ```

### 3. Obtain CRO balance of walletAddress (pass JWT into \<token\>)
  ```bash
  # Request
  curl -X GET \
  -H "Authorization: Bearer <token>" \
  http://localhost:4000/balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48

  # Response
  {
   "walletAddress":"0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48",
   "balance":"1749143036000495154",
   "formatBalance":"1.749"
  }
  ```

### 4. Obtain CRC20 token balance of walletAddress (pass JWT into \<token\>)
  ```bash
  # Request
  curl -X GET \
  -H "Authorization: Bearer <token>" \
  http://localhost:4000/token-balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48/0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23

  # Response
  {
   "walletAddress":"0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48",
   "tokenAddress":"0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23",
   "balance":"99022474168945204",
   "formatBalance":"0.099",
   "tokenName":"Wrapped CRO",
   "tokenSymbol":"WCRO"
  }
  ```

## Endpoint evaluation via Swagger 
TODO: WIP

# Design Decisions
## Project Tech Stack
- Web Server Framework - `Express.js` + `typescript`
- Database - `Postgres`
- Database ORM - `Prisma`
- Logger - `Pino`
- Testing Framework - `Jest` & `supertest`
- Containerisation - `Docker`
- Environment Handling - `Dotenv`
- API documentation - `Swagger`

## Initialization Process - `index.ts`
1. The `index.ts` file serves as the main entry point of the server, handling the initialization of the application.
2. **Environment Variables**: The application reads environment variables to configure its behavior. It logs out the corresponding information for debugging purposes.
3. **Database Connection**: Before proceeding, the application pings the database to ensure a stable connection. If the connection fails, the application panics.
4. **Middleware Setup**:
    - Body Parsing Middleware: Mount built-in middlewares such as `express.json()` and `express.urlencoded()` to parse data from body and html post form.
    - Router Middleware: Mounts various routers for handling different endpoints, such as `balance`, `token-balance`, and `user` endpoints.
    - Swagger Middleware: Sets up Swagger UI for API documentation at the `/api-docs` endpoint.
    - Error Handling Middleware: Handles all errors that are caught and returns appropriate error responses.
    - 404 Middleware: Handles requests to unknown routes and returns a 404 error response.

## Routes
1. All routes will be managed via the `routes/routes.ts` file.

## Routers
1. There are 3 routers, `balanceRouter`, `tokenBalanceRouter`, and `userRouter`, each corresponding to a file in the `routes/` folder.
1. Each router uses the `express.Router` class to create modular, mountable route handlers.
1. Each router will be mounted at their respective paths e.g. `/balance/...` and `/token-balance/...`.
1. Each router handles a variety of HTTP requests, path parameters and allows middlewares to be loaded in them.

## Controllers
1. Controllers are specific business logic to interact with the database or blockchain.
1. The `controllers/userController.ts` file contains all user-related logic such as register and login. `registerUser()` registers a user by creating a user in the Postgres database. Before it creates a user it will perform basic checks to ensure username is not taken, and will hash user's password before storing it. `loginUser()` verifies user credential input and returns a JWT.
1. The `controllers/tokenBalanceController.ts` and `controllers/balanceController.ts` file contains controllers to interact with the blockchain, via functions in the `service` folder.

## Service
The `service` folder contains reusable business logic such as common web3 logic. This includes the logic to build CRC20 contracts, obtain CRC20 contract information, as well as obtain CRO balance of a wallet.

## Middlewares
Middleware functions have access to the request and response objects, allowing the auth, sanitisation and verification functions to be performed on the request and response obects before they reach the main controller logic.

### AuthMiddleware
The `middlewares/authMiddleware.ts` file contains the `protect` middleware function that verifies the JWT token provided in the Authorization header of requests. JWT is placed in the Authorization header of requests instead of the URL as the JWT acts as an API key and might be exposed in the URL. It uses the `jsonweb token` package to verify the token's validity and expiry. The JWT is created with the `jsonwebtoken.sign()` function which signs the user's ID and the project's `JWT_SECREET`, during a successful user login. The JWT is verified with the `jsonwebtoken.verify()` function which verifies the JWT (if it is signed with the correct `JWT_SECRET`) and checks if it is expired.

### ErrorMiddleware
 The errorMiddleware handles errors that occur during the request-response cycle and returns appropriate error responses to the client. It first checks if the error is part of the project's `CustomError` and returns a custom error's information. Otherwise, it will returns a general 500 internal server error.  More information about `CustomError` can be found in this [section](#error-handling-and-logging)

### SanitizeMiddleware 
 The `middlewares/sanitizeMiddleware.ts` file contains the `sanitizePathParams` middleware function that sanitizes user path inputs

## Error handling and Monitoring
When working with API servers, it is important to handle errors properly to provide meaningful responses to clients.

There are 3 considerations surrounding Error handling and Monitoring:
1. CustomErrors
1. Errormiddleware
1. Logging

```ts
// Custom Error class
export class CustomError extends Error {
  statusCode: StatusCode;

  constructor(message: string, statusCode: StatusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}
```

`CustomErrors` are specifed in the `errors/customErrors.ts` file, laying out all possible errors that a server might occur in an organised manner. Every `CustomError` contains a corresponding `StatusCode` to be returned to the client and a well-defined error message. In order to provide meaningful error message to the client, each `CustomError` has a fixed message header (e.g. `User already exists:` and `Missing Input:`) that is unique to the `CustomError`, as well as an situation-specific argument that is passed in to the constructor when the error occurs (e.g. `  throw new UserExistsError(username)`). The arguments supplements the error message by information the client about the specifics of the error (e.g. `username` that already exists, or `input` that is missing).

```ts
// Error when username already exists
export class UserExistsError extends CustomError {
  constructor(username: string) {
    super(`User already exists: ${username}`, STATUS_CODE_409);
  }
}

// Error when a required input is missing
export class MissingInputError extends CustomError {
  constructor(input: string) {
    super(`Missing Input: ${input}`, STATUS_CODE_400);
  }
}
```

[Errormiddleware](#errormiddleware) helps to handle errors through the request lifecycle in a graceful manner, by catching all errors that a thrown during the request. This allows us to parse the error by first checking `if (err instanceof CustomError)` to provide meaningful error message to the client. Else, a general 500 Internal Server Error will be returned to the client.

Logging allows us to monitor the health of the server via helpful logs which provides valuable insights into troubleshooting issues as well as tracking of important events like unexpected errors. This project uses Pino as a light-weight logger, allows logging of different severity levels. `log.Info` for general server logs and `log.Error` during RPC errors or Internal Server Errors. Ideally, all `log.Error` should trigger a monitoring system to notify developers about the error.

## Database
This project use Postgres as it is a tried and tested solution. A database is needed to store user information to facilitate registeration and login. 

### Prisma
Prisma is used as a Postgres ORM for easy database modelling, migrations and querying.

Database modelling is done via the `prisma/schema.prisma` file, which allows us to specify constraints on the models that are used. 

Prisma's migration tool tracks changes in the database schema, allowing version control and consistency across different environments. When changes are made to the schema, Prisma generates migration files that contain SQL commands to update the database schema accordingly. Running npx prisma migrate dev applies these migration changes to the database, ensuring that the database schema matches the Prisma schema.

The PrismaClient class provides an interface for querying the database using Prisma's query builder. Example:
```ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Check if user exists
const userExists = await prisma.user.findUnique({
  where: {
    username,
  },
});
```


## Development lifecycle
This is the project's development lifecycle:
1. Run `docker-compose up -d` to provision a local postgres instance
2. 

CICD Decisions OR development lifecycle + web3 
- Start docker
- Prisma migrate

## Environment variables 
  - env variables --> talk about the different types
  - Segregation of concerns
  - test using dotenv-cli

  - local is for?
  - dev is for? what other changes would you make?
  - prod is for? what other changes would you make? (db URL stuff, cicd stuff)
  - test

  - Switching between chains

## Others
  - constants
  - Types.ts

## Develop Experience
In terms of developer experience

	- Swagger
	- Prisma? database migrations
	- nodemon
	- Prettier
	- developer flow > develop > prisma push > migrations > unit test

# Test

## Test set up
- jest
- docker-compose

- Clearing of test data 
- Use a different set of database credentials for api tests
- using docker
- using dotenv-cli for multiple environments 
- integration tests - https://www.prisma.io/docs/orm/prisma-client/testing/integration-testing
- Integration tests will be run against a database in a **dedicated test environment** instead of the production or development environments.
- `--volumes` removes volumes associated with containers.
- Explain the full procedure of the unit test
- test using dotenv-cli


## Test cases

```
==== Register user ====
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","password":"secretpassword"}' \
  http://localhost:4000/users

==== Login user ====
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"john_doe","password":"secretpassword"}' \
  http://localhost:4000/users/login

=== Normal request ===
curl -X GET \
  -H "Authorization: Bearer <token>" \
  http://localhost:4000/balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48
```

### Balance
Success - http://localhost:4000/balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48
Path params has spaces - http://localhost:4000/balance/%200xe208376740faa7b5c7ac4ce17b038bf8e1f15f48%20 

invalid wallet address - http://localhost:4000/balance/0e208376740faa7b5c7ac4ce17b038bf8e1f15f48
### Token Balance
Success - http://localhost:4000/token-balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48/0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23 
Path params has spaces - http://localhost:4000/token-balance/%200xe208376740faa7b5c7ac4ce17b038bf8e1f15f48%20/%200x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23

Invalid wallet address - http://localhost:4000/token-balance/0xe208376740faa75c7ac4ce17b038bf8e1f15f48/0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23
Invalid token address - http://localhost:4000/token-balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48/05c7f8a570d578ed84e63fdfa7b1ee72deae1ae23