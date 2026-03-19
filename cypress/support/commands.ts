/// <reference types="cypress" />
import { TEST_SELECTORS } from './selectors';

Cypress.Commands.add('waitForIngredients', () => {
  cy.intercept('GET', '**/ingredients', {
    statusCode: 200,
    fixture: 'ingredients.json'
  }).as('getIngredients');

  cy.visit('/');
  cy.wait('@getIngredients');
  cy.get(TEST_SELECTORS.ingredients.item, { timeout: 15000 })
    .should('have.length.at.least', 1)
    .as('ingredients');
});

Cypress.Commands.add(
  'addIngredientToConstructor',
  { prevSubject: false },
  (ingredientName: string) => {
    cy.get('@ingredients')
      .contains(ingredientName)
      .closest(TEST_SELECTORS.ingredients.item)
      .find('button')
      .contains('Добавить')
      .click();
  }
);

Cypress.Commands.add(
  'openIngredientModal',
  { prevSubject: false },
  (ingredientName: string) => {
    cy.get('@ingredients')
      .contains(ingredientName)
      .closest(TEST_SELECTORS.ingredients.item)
      .find('a')
      .click();
    cy.get(TEST_SELECTORS.modal.window, { timeout: 5000 })
      .should('exist')
      .should('be.visible')
      .as('modal');
  }
);

Cypress.Commands.add('closeModal', () => {
  cy.get(TEST_SELECTORS.modal.close).click();
  cy.get(TEST_SELECTORS.modal.window).should('not.exist');
});

declare global {
  namespace Cypress {
    interface Chainable {
      waitForIngredients(): Chainable<void>;
      addIngredientToConstructor(ingredientName: string): Chainable<void>;
      openIngredientModal(ingredientName: string): Chainable<void>;
      closeModal(): Chainable<void>;
    }
  }
}