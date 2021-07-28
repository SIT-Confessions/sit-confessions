# SIT Confessions
This is a confessions web application built on the MERN stack. It allows SIT students to post their confessions anonymously. There is also an admin panel to moderate each confession, which will be auto-posted to the SIT Confessions Facebook page once it has been approved.  

## Tech Stack (MERN)
**Frontend:** ReactJS  
**Backend:** NodeJS, ExpressJS  
**Database:** MongoDB  

## Project setup

Install packages in both frontend and backend folders

```
// In root folder
npm install
```

Run both frontend and backend applications concurrently

```
// In root folder
npm run dev
```

## Frontend folder structure

actions - store all actions for Redux

api - axios implementation (connection to server)

assets - store all images or files needed for project

components - create a folder for each component inside this folder

constants - store constant variables to be used throughout the app

reducers - redux implementation (global app state)

utils - stores utility/helper codes

## Backend folder structure

config - database configurations and connections

constants - store constant variables to be used througout the app  

controllers - functions to handle each request  

middleware - middleware such as api authorization and rate limiter modules

models - models for each class

routes - routing for each request call

## Recommended naming conventions

variables/function names: camelCase  
component/model names: PascalCase

## Contributors

| [<img src="https://avatars.githubusercontent.com/u/20179273?v=4" style="border-radius: 50%" width="75px;"/><br /><sub><b>Gabriel Kok</b></sub>](https://gabrielkok.com/)<br />Frontend  | [<img src="https://avatars.githubusercontent.com/u/19357352?v=4" style="border-radius: 50%" width="75px;"/><br /><sub><b>Ng Han Yi</b></sub>](https://nghanyi.com)<br />Backend |
| :---: | :---: |