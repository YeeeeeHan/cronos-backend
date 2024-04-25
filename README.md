# cronos-backend

## Table of Contents
- [Project Overview](#project-overview)
- [Evaluation Instructions](#evaluation-instructions)
- [Design Decisions](#design-decisions)
- [Test](#test)

## Project Overview
### Endpoints

``` bash
# Get CRO balance of a wallet
GET      /balance/:walletAddress
# Get CRC20 balance of a token in a wallet
GET      /token-balance/:walletAddress/:tokenAddress
# Register a user
POST     /users/
# Login a user
POST     /users/login
# Health check
GET      /
```

### Folder structure

```
.
├── config            - Contains config files of project
├── controllers       - Specific logic to interact with database or blockchain
├── errors            - Custom Errors
├── middlewares       - Functions that are run on routes
├── prisma            - Postgres ORM
│   └── migrations    - Migration scripts to track database config changes
├── routes            - Endpoints
├── service           - Reusable business logic such as common web3 logic
│   └── abi           
├── test              - Unit and integration tests
└── utils             
    └── types         - Contains typescript types
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


### End point evaluation
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


4. 

  - Installation instructions
  - env variables --> talk about the different types
  - run unit test
  - swagger set up 
  - login
  - test token balance
  - test balance

## Design Decisions
### Project stack

### Package.json and docker files & starting project
- Start docker
- Prisma migrate
- 

### API management
  - auth -> Sanitsation -> Validation -> 
  - routes
  - middleware
  - auth API keys - why in header and not URL - https://stackoverflow.com/questions/5517281/place-api-key-in-headers-or-url, Why JWT?
  - 
### Web3
### Environment variables 
  - Segregation of concerns
  - test using dotenv-cli

  - local is for?
  - dev is for? what other changes would you make?
  - prod is for? what other changes would you make? (db URL stuff, cicd stuff)
  - test

  - Switching between chains


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