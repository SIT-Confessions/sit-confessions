# sit-confessions
Confessions web application built on MERN.

## Project setup
Install packages in both frontend and backend folders
```
cd frontend
npm i
cd ../backend
npm i
```
Run application
```
npm start
```
## Frontend folder structure
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
component names: PascalCase
