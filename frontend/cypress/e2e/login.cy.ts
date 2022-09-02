describe("login page", () => {
  beforeEach(() => {
    cy.fixture("userInfo").then(function (data) {
      this.data = data;
    });
  });

  it("should show register page", () => {
    cy.visit("/register");
    cy.contains("Register");
  });

  it("should show forgot password page", () => {
    cy.visit("/reset");
    cy.contains("Forgot");
  });

  it("should login existing user", function () {
    cy.visit("/");
    cy.get('input[name="email"]').type(this.data.email);
    cy.get('input[name="password"]').type(`${this.data.password}{enter}`);
    cy.url().should("equal", "http://localhost:3000/");
  });

  it("should navigate to dashboard on login", () => {
    cy.login();
    cy.visit("/");
    cy.url().should("equal", "http://localhost:3000/");
  });

  afterEach(() => {
    cy.logout();
  });
});
