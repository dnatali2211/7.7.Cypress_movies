import dataTests from "../fixtures/credentials.json";
import seats from "../fixtures/seats.json";

describe("main page", () => {
  it("should open main page", () => {
    // Авторизация и получение списка залов из админки
    cy.visit("/");
    cy.get(dataTests.selectors.email).type(dataTests.validEmail);
    cy.get(dataTests.selectors.password).type(dataTests.validPassword);
    cy.contains(dataTests.selectors.loginButton).click();
    cy.get(dataTests.selectors.hallNames).should("have.length", 7);

    // Подготовка объекта с пустыми значениями для списка залов
    const hallNamesText = {};

    // Извлечение текста из элементов и запись в соответствующие ключи
    cy.get(dataTests.selectors.hallNames)
      .each(($el, index) => {
        hallNamesText[`hall${index + 1}`] = $el.text();
      })
      .then(() => {
        cy.writeFile("cypress/fixtures/hallNames.json", hallNamesText);
      });

    // Бронирование билетов пользователем
    cy.visit("http://qamid.tmweb.ru/");
    cy.get(dataTests.selectors.days).should("have.length", 7);
    cy.get(dataTests.selectors.days).eq(1).click();
    cy.get(dataTests.selectors.movie).last().contains("16:00").click();

    // Проверка названия зала из админки
    cy.fixture("hallNames").then((halls) => {
      cy.get(dataTests.selectors.buyingHall).contains(halls.hall2).should("be.visible");
    });

    // Бронирование мест
    seats.forEach((booking) => {
      cy.get(
        `.buying-scheme__wrapper > :nth-child(${booking.row}) > :nth-child(${booking.seat})`
      ).click();
    });
  });
});
