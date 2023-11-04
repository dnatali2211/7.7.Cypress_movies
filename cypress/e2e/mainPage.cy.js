import dataTests from "../fixtures/credentials.json";

describe("main page", () => {
  it("should open main page", () => {
    cy.visit("http://qamid.tmweb.ru/");
    cy.get(".page-header__title").contains("Идём").should("exist");
    cy.get(dataTests.selectors.movie).should("have.length", 3);
  });
});
