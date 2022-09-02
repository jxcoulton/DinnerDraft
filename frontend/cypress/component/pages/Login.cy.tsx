import React from "react";
import Login from "../../../src/components/pages/Login";
import { mount } from "cypress/react";
import { BrowserRouter } from "react-router-dom";

describe("Should render login page", () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  it("login button should be disabled", () => {
    cy.get("button").contains("Login").should("be.disabled");
  });

  it("entering only username should NOT enable login button", function () {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get("button").contains("Login").should("be.disabled");
  });

  it("entering only password should NOT enable login button", function () {
    cy.get('input[name="password"]').type("password");
    cy.get("button").contains("Login").should("be.disabled");
  });

  it("entering username AND password should enable login button", function () {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("password");
    cy.get("button").contains("Login").should("not.disabled");
  });

  it("clicking register now should navigate to registration page", () => {
    cy.get("a").contains("Register").click();
    cy.url().should("include", "/register");
  });
});
