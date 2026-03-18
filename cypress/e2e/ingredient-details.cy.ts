import { TEST_SELECTORS } from '../support/selectors';

describe('Модальное окно с деталями ингредиента', () => {
  beforeEach(() => {
    cy.waitForIngredients();
  });

  it('открытие по клику', () => {
    cy.openIngredientModal('Флюоресцентная булка R2-D3');

    cy.get('@modal').contains('Флюоресцентная булка R2-D3').should('exist');
  });

  it('отображение данных ингредиента', () => {
    cy.openIngredientModal('Говяжий метеорит (отбивная)');

    cy.get('@modal').within(() => {
      cy.contains('Говяжий метеорит (отбивная)').should('exist');
      cy.contains('2674').should('exist');
      cy.contains('800').should('exist');
      cy.contains('800').should('exist');
      cy.contains('300').should('exist');
    });
  });

  it('закрытие через крестик', () => {
    cy.openIngredientModal('Флюоресцентная булка R2-D3');
    cy.closeModal();
  });

  it('закрытие через оверлей', () => {
    cy.openIngredientModal('Флюоресцентная булка R2-D3');

    cy.get(TEST_SELECTORS.modal.overlay).click({ force: true });
    cy.get(TEST_SELECTORS.modal.window).should('not.exist');
  });
});