# DinnerDraft

https://dinner-draft.vercel.app/login

## About

This application is designed to help individuals streamline the meal planning process by quickly creating and scheduling meals, importing recipes from the internet, and tracking stored favorite recipes for future use.

## Setup - frontend (React + Typescript)

1. `cd frontend`
2. `npm install`
3. Create a `.env` file in the root folder. You will need to request the contents of this file from the admin of this project.
4. `npm start`

## Setup - backend (Node JS)

1. `cd backend`
2. `npm install`
3. `npm start`

## Test - frontend (cypress)

1. `cd frontend`
2. `npm start` to start server
3. To view tests in the terminal run `npm test`, or run `npx cypress open` to open in the launchpad.

**Note: Frontend calls are being made to the live version of backend. You must change the axios requests to use backend localhost if you want to run everything completely local**
