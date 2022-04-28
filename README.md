# API for the test
> Rot13 Encrypter API (Challenge)

## Development Environment Setup

1.  Make sure you have `nvm`, node `v16.3.0` or `LTS` version of node installed
2.  Install `yarn` - `npm install -g yarn`.

## Docker support

**Prerequisites**
1. [Docker](https://www.docker.com/products/docker-engine) Community Edition v17 or higher
2. [Make](https://makefile.site/) Makefile handler

```sh
$ make dev
```
Access `http://localhost:3000/api/` and you're ready to go!
> http://localhost:3000/api


## Quick Start

1. Clone the repository with `git clone --depth=1 https://github.com/lucaslk10/ftf-api.git`
2. Install the dependencies with [Yarn](https://yarnpkg.com/en/docs/install/) `yarn install`
6. Run the application in development mode with `yarn dev`
7. Access `http://localhost:<PORT>/api` and you're ready to go!
    > http://localhost:3000/api
8. Encrypt/decrypt your text:
```sh
curl --location --request POST 'http://localhost:3000/api/encrypter/rot13' \
--header 'Content-Type: application/json' \
--data-raw '{
    "text": "some text"
}'
```

### Database Setup (Development)

1. Create a Mongo Database at [Mongo Atlas](https://www.mongodb.com/atlas/database) Cloud
2. Now you will just need to setup an `MONGODB_CONN` variable at your `.env` with the MongoDB URI

## Overview

- uses Node.js >= v16.3
- design inspired on DDD & Clean Architecture
- written using ES6
- graceful shutdown
  > closes app and disconnect from db after all clients requests is finished
- uses Yarn for package dependency management
- uses [JavaScript Standard Style](http://standardjs.com/)
- uses `mongoose` as ODM
  > can change easily to diffrent ODM.
- Filename convention - `kebab-case`

## CLI Tools

- `yarn start` - start the API for production
- `yarn dev` - start the API locally/development
- `yarn test:unit` - run Unit tests
- `yarn test:unit:cov` - run Unit tests Coverage
- `yarn test:integ` - run Integration tests

## Tech

- [Express](https://expressjs.com/) - Http Framework
- [Express-async-errors](https://www.npmjs.com/package/express-async-errors) - For being able to handle async errors with express
- [Express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - For limiting requests and being DDoS safe
- [CORS](https://github.com/expressjs/cors) - a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [Compression](https://github.com/expressjs/compression) - Node.js compression middleware.
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM Tool
- [Nodemon](https://nodemon.io/) - Use for development file reload.
- [Joi](https://joi.dev/) - For schema validation on routes
- [Tcomb](https://github.com/gcanti/tcomb) - Is a library for Node.js and the browser which allows you to check the types of JavaScript values at runtime with a simple and concise syntax
- [Ramda](http://ramdajs.com/) - A practical functional library for JavaScript programmers.
- [Dotenv](https://www.npmjs.com/package/dotenv) - Set-up environment variables
- [uuid](https://www.npmjs.com/package/uuid) - Generate Unique IDs


### Logging
- Hand maded 'App-Monitor' for intercepting requests and logging infos about it, like his performance and requested data.
- Simple logger adapter with native 'console.info,console.error...'
  > can easily evolve implementing a library like winston for storing logs, without affecting the code basis

### Tests
- [jest](https://jestjs.io/) - JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun
- [supertest](https://github.com/visionmedia/supertest) - HTTP assertions made easy via superagent.
- [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server) - MongoDB memory server for integrations test

