import React from "react";
import Register from "../../../src/components/pages/Register";
import { mount } from "cypress/react";
import { BrowserRouter } from "react-router-dom";

describe("Should render login page", () => {
  beforeEach(() => {
    mount(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  it("sign up button should be disabled", () => {
    cy.get("button").contains("Sign up").should("be.disabled");
  });

  it("entering only username should NOT enable sign up button", function () {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get("button").contains("Sign up").should("be.disabled");
  });

  it("entering only password should NOT enable sign up button", function () {
    cy.get('input[name="password"]').type("password");
    cy.get("button").contains("Sign up").should("be.disabled");
  });

  it("entering username AND password should enable sign up button", function () {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("password");
    cy.get("button").contains("Sign up").should("not.disabled");
  });

  it("clicking login should navigate to login page", () => {
    cy.get("a").contains("Login").click();
    cy.url().should("include", "/login");
  });
});
