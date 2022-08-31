/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
  apiKey: "AIzaSyC1klSYrS4aa9r5Ur2B7VvPoFkoZ0Fe8vQ",
  authDomain: process.env.REACT_APP_FirebaseAuthDomain,
  projectId: process.env.REACT_APP_FirebaseProjectId,
  storageBucket: process.env.REACT_APP_FirebaseStorageBucket,
  messagingSenderId: process.env.REACT_APP_FirebaseMessagingSenderId,
  appId: process.env.REACT_APP_FirebaseAppId,
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
