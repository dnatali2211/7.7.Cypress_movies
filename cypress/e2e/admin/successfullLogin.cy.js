import dataTests from "../../fixtures/credentials.json";

describe("successfull login to the administrator's account", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should login with valid email and password", () => {
    cy.get(dataTests.selectors.email).type(dataTests.validEmail);
    cy.get(dataTests.selectors.password).type(dataTests.validPassword);
    cy.contains(dataTests.selectors.loginButton).click();
    cy.contains("Управление залами").should("be.visible");
  })
})