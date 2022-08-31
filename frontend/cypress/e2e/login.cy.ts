describe("login page", () => {
  beforeEach(() => {
    cy.fixture("userInfo").then(function (data) {
      this.data = data;
    });
  });

  it("entering existing user credentials should login user", function () {
    cy.visit("/");
    cy.get('input[name="email"]').type(this.data.email);
    cy.get('input[name="password"]').type(`${this.data.password}{enter}`);
    cy.url().should("equal", "http://localhost:3000/");
  });

  it("logging in should navigate to dashboard", () => {
    cy.login();
    cy.visit("/");
    cy.url().should("equal", "http://localhost:3000/");
  });

  afterEach(() => {
    cy.logout();
  });
});
