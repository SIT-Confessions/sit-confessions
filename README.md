# sit-confessions
Confessions web application built on MERN.  
**Database:** MongoDB  
**Frontend:** ReactJS  
**Backend:** NodeJS

## Project setup

Install packages

```
// Root folder
npm i

// Frontend folder
cd frontend
npm i

// Backend folder
cd ../backend
npm i
```

Run both frontend and backend

```
// In root folder
npm run dev
```

## Frontend folder structure

src/actions - store all actions for Redux

src/api - axios implementation (connection to server)

src/assets - store all images or files needed for project

src/components - create a folder for each component inside this folder

src/constants - store constant variables to be used throughout the app

src/reducers - redux implementation (global app state)

## Backend folder structure

controllers - functions to handle each request

models - models for each class

routes - routing for each request call

## Recommended conventions

variables/function names: camelCase  
component/model names: PascalCase
