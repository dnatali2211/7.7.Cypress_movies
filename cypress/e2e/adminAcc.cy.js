import dataTests from "../fixtures/credentials.json";

describe("login to the administrator's account", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should login with valid email and password", () => {
    cy.get(dataTests.selectors.email).type(dataTests.validEmail);
    cy.get(dataTests.selectors.password).type(dataTests.validPassword);
    cy.contains(dataTests.selectors.loginButton).click();
    cy.contains("Управление залами").should("be.visible");
  });
  it("should fail with invalid email", () => {
    cy.get(dataTests.selectors.email).type(dataTests.invalidEmail);
    cy.get(dataTests.selectors.password).type(dataTests.validPassword);
    cy.error(dataTests.selectors.loginButton, "Ошибка авторизации!");
  });
  it("should fail with invalid password", () => {
    cy.get('[name="password"]').type(dataTests.invalidPassword);
    cy.get('[name="email"]').type(dataTests.validEmail);
    cy.error(dataTests.selectors.loginButton, "Ошибка авторизации!");
  });
  it("should fail with empty email", () => {
    cy.get('[name="password"]').type(dataTests.validPassword);
    cy.contains("Авторизоваться").click();
    cy.get('[name="email"]').then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });
  it("should fail with empty password", () => {
    cy.get('[name="email"]').type(dataTests.validEmail);
    cy.contains("Авторизоваться").click();
    cy.get('[name="password"]').then((elements) => {
      expect(elements[0].checkValidity()).to.be.false;
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
    });
  });
});
