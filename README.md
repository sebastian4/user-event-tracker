user-event-tracker
==================

This is my attempt to solve the exercise from link: https://github.com/ns8inc/ns8-tech-assessment

# Notes 

- used the starter app: Nodejs + Typescript + Webpack app starter
- as the exercise suggest, the data is not persisted between server restarts.
- the .env file has the jwt secret and duration 

## Prerequisites 
- Node js (I used node v8.11.2 from nvm)
- yarn build tool 

## Features

- **typescript**: transpiling from .ts to ES5
- **webpack**: bundling the source to a bundle.js
- **live compiling**: as well as live reload 
- **custom .vscode**: added custom vscode configuration to allow easy debugging of the source inside Visual Studio Code
- **express**: one of the most popular nodejs rest and web framework
- **jsonwebtoken**: to make securely transfer data between client and server, and for keeping sessions
- **overnightjs**: a library to add TypeScript decorators to express routes
- **lokijs**: a javascript in-memory database

## App Usage

- go to the command line in the root directory of the app
- to install all dependencies: `yarn install`
- to start the server in dev mode: `yarn start`
- the server runs in port 3003, but that can be changed easily to port 80 in the .env file
- to build the code: `yarn build`

## Client Usage / endpoints

- create a user: POST /user (user body)(returns the jwt token, login the user)
- create an event: POST /event (event body, just the type)(jwt token necessary)
- login a user (the only different event): POST /event/login (body has user email and password)(returns the jwt token)
- get all events from all users: GET /event/all (needs a user currently login, so with jwt token)
- get all events from single user: GET /event/single/:useremail (needs a user currently login, so with jwt token)
- get all events from the last day: GET /event/all/lastday (from user currently login, so with jwt token)

## Postman test

- I am including a postman test set:
- the test set needs 2 global variables: webhost - which is either localhost or the url section where the app is running, and jwtauth - which can be left blank and will be filled by the test scripts after a user creation or event login for a user
- the test set assumes the port is going to be 3003

## Future Considerations 

- definitely have the server be reachable via https, not http, specially when creating a user or when login user
- the endpoints seem to be for an admin user, so there probably needs to be a level of authorization, eg. an admin can see all the users events, but a user can only see his/her events.
- in the future the postman test set could be more official and with more test assertions, so they could run using postman's cli tool: newman, and included as a continous delivery test set
- add something like openapi to the rest api, to better explain the endpoints
