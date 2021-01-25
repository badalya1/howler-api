# Howler API

> 

## About

Howler is a twitter ~~clone~~ alternative. Howler users do not tweet simply because they are not birds. Instead,
they howl like powerful wolfs🐺. Everyone will hear them. 

howler-api is a server side web application  (using [express](https://expressjs.com)) made in [typescript](https://www.typescriptlang.org).

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/howler-api
    npm install
    ```
3. Create a .env file [(How .env works)](https://www.npmjs.com/package/dotenv)
   
   [Check](howler-api/tree/master/src/util/validateEnv.ts) which variables are required and their types.

4. Start your app 
  
    ```
    npm run dev
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Other commands


```
$ npm start                               # Build and run in production
$ npm build                               # Build
$ npm lint:fix                            # Lint and fix all the files
```

## Documentation

While the server is running, visit `/api-docs` for documentation.

## Help

If there are any questions about this project, don't hesitate to ask ☺
