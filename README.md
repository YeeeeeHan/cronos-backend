# cronos-backend

## Table of Contents
- [Project Overview](#project-overview)
- [Evaluation Instructions](#evaluation-instructions)
- [Design Decisions](#design-decisions)
- [Test](#test)

## Project Overview
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

## Evaluation Instructions
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

### End point evaluation via Curl
  1. Register a user request
  ```bash
  # Request
  curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"cronos_tester","password":"secret_password"}' \
  http://localhost:4000/users 
  ```

  ```json
  // Response
  {
    "id":"13b9e106-2b5a-495d-90db-c92d61ecf9a0",
    "username":"cronos_tester"
  }
  ```

  2. Login and obtain JWT
  ```bash
  # Request
  curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"cronos_tester","password":"secret_password"}' \
  http://localhost:4000/users/login
  ```

  ```json
  // Response
  {
   "id":"13b9e106-2b5a-495d-90db-c92d61ecf9a0",
   "username":"cronos_tester",
   "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzYjllMTA2LTJiNWEtNDk1ZC05MGRiLWM5MmQ2MWVjZjlhMCIsImlhdCI6MTcxMzg2NjA5MywiZXhwIjoxNzE2NDU4MDkzfQ.QnnHoKHv7tlCbE136BDvJqtPMpLHSNAVQVzunHWzPvg"
  } 
  ```

  3. Obtain CRO balance of walletAddress (pass JWT into \<token\>)
  ```bash
  # Request
  curl -X GET \
  -H "Authorization: Bearer <token>" \
  http://localhost:4000/balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48
  ```
  ```json
  // Response
  {
   "walletAddress":"0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48",
   "balance":"1749143036000495154",
   "formatBalance":"1.749"
  }
  ```

  4. Obtain CRC20 token balance of walletAddress (pass JWT into \<token\>)
  ```bash
  # Request
  curl -X GET \
  -H "Authorization: Bearer <token>" \
  http://localhost:4000/token-balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48/0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23
  ```
  ```json
  // Response
  {
   "walletAddress":"0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48",
   "tokenAddress":"0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23",
   "balance":"99022474168945204",
   "formatBalance":"0.099",
   "tokenName":"Wrapped CRO",
   "tokenSymbol":"WCRO"
  }
  ```

### Endpoint evaluation via Swagger 
TODO: WIP

## Design Decisions
### Project Tech Stack
- Web Server Framework - `Express.js` + `typescript`
- Database - `Postgres`
- Database ORM - `Prisma`
- Logger - `Pino`
- Testing Framework - `Jest` & `supertest`
- Containerisation - `Docker`
- Environment Handling - `Dotenv`
- API documentation - `Swagger`

### Initialization Process - `index.ts`
1. The `index.ts` file serves as the main entry point of the server, handling the initialization of the application.
2. **Environment Variables**: The application reads environment variables to configure its behavior. It logs out the corresponding information for debugging purposes.
3. **Database Connection**: Before proceeding, the application pings the database to ensure a stable connection. If the connection fails, the application panics.
4. **Middleware Setup**:
    - Body Parsing Middleware: Mount built-in middlewares such as `express.json()` and `express.urlencoded()` to parse data from body and html post form.
    - Router Middleware: Mounts various routers for handling different endpoints, such as `balance`, `token-balance`, and `user` endpoints.
    - Swagger Middleware: Sets up Swagger UI for API documentation at the `/api-docs` endpoint.
    - Error Handling Middleware: Handles all errors that are caught and returns appropriate error responses.
    - 404 Middleware: Handles requests to unknown routes and returns a 404 error response.

### API management

### Routes
1. All routes will be managed via the `routes/routes.ts` file.

### Routers
1. There are 3 routers, `balanceRouter`, `tokenBalanceRouter`, and `userRouter`, each corresponding to a file in the `routes/` folder.
1. Each router uses the `express.Router` class to create modular, mountable route handlers.
1. Each router will be mounted at their respective paths e.g. `/balance/...` and `/token-balance/...`.
1. Each router handles a variety of HTTP requests, path parameters and allows middlewares to be loaded in them.

### Controllers


## Middlewares
Middleware functions have access to the request and response objects, allowing the auth, sanitisation and verification functions to be performed on the request and response obects before they reach the main controller logic.

### AuthMiddleware
1. The `middlewares/authMiddleware.ts` file contains the `protect` middleware function that verifies the JWT token provided in the Authorization header of requests.
1. It uses the `jsonwebtoken` package to verify the token's validity and expiry.
1. The JWT is created with the `jsonwebtoken.sign()` function which signs the user's ID and the project's `JWT_SECREET`, during a successful user login.
1. The JWT is verified with the `jsonwebtoken.verify()` function which verifies the JWT (if it is signed with the correct `JWT_SECRET`) and checks if it is expired.

### Error

### SanitizeMiddleware 
1. The `middlewares/sanitizeMiddleware.ts` file contains the `sanitizePathParams` middleware function that sanitizes user path inputs


protect Middleware: This middleware protects routes by verifying the JWT token provided in the Authorization header. It uses the jsonwebtoken package to verify the token's validity and retrieve the user information from the database based on the token's payload. If the token is valid, it attaches the user object to the request (req.user) for further processing in the route handler. If the token is invalid or missing, it throws an AuthorizationError.
Input: Request, Response, NextFunction
Output: Attaches user object to req if token is valid, else throws AuthorizationError.

This middleware ensures that only authenticated users can access protected routes by verifying the JWT token provided in the request header. If the token is valid, it allows the request to proceed; otherwise, it returns an authorization error.

___
  - auth -> Sanitsation -> Validation -> 
  - routes
  - middleware
  - auth API keys - why in header and not URL - https://stackoverflow.com/questions/5517281/place-api-key-in-headers-or-url, Why JWT?

### Web3



### Error handling & Logging
	- custom vs generic errors
	- allows for Main error type + specific error message
	- Logging practice in error handling -> only notify us if there are unhandled internal server errors
  - RPC errors -> log out error.log
  
### Status code handling

### Database
  - Different types of database
  - Database migrations
  - schema considerations - UUID for ID
### Develop Experience
	- Swagger
	- Prisma? database migrations
	- nodemon
	- Prettier
	- developer flow > develop > prisma push > migrations > unit test

### CICD Decisions OR development lifecycle
- Start docker
- Prisma migrate

### Environment variables 
  - env variables --> talk about the different types
  - Segregation of concerns
  - test using dotenv-cli

  - local is for?
  - dev is for? what other changes would you make?
  - prod is for? what other changes would you make? (db URL stuff, cicd stuff)
  - test

  - Switching between chains

### Others
	- Hashing of passwords
  - constants
  - Types.ts


## Test

### Test set up
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


### Test cases

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

#### Balance
Success - http://localhost:4000/balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48
Path params has spaces - http://localhost:4000/balance/%200xe208376740faa7b5c7ac4ce17b038bf8e1f15f48%20 

invalid wallet address - http://localhost:4000/balance/0e208376740faa7b5c7ac4ce17b038bf8e1f15f48
#### Token Balance
Success - http://localhost:4000/token-balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48/0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23 
Path params has spaces - http://localhost:4000/token-balance/%200xe208376740faa7b5c7ac4ce17b038bf8e1f15f48%20/%200x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23

Invalid wallet address - http://localhost:4000/token-balance/0xe208376740faa75c7ac4ce17b038bf8e1f15f48/0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23
Invalid token address - http://localhost:4000/token-balance/0xe208376740faa7b5c7ac4ce17b038bf8e1f15f48/05c7f8a570d578ed84e63fdfa7b1ee72deae1ae23