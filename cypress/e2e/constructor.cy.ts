import { TEST_SELECTORS } from '../support/selectors';

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.waitForIngredients();
  });

  it('добавление булки', () => {
    cy.addIngredientToConstructor('Флюоресцентная булка R2-D3');

    cy.get(TEST_SELECTORS.constructor.bunTop).should('contain', 'Флюоресцентная булка R2-D3');
    cy.get(TEST_SELECTORS.constructor.bunBottom).should('contain', 'Флюоресцентная булка R2-D3');
  });

  it('добавление начинки', () => {
    cy.addIngredientToConstructor('Говяжий метеорит (отбивная)');

    cy.get(TEST_SELECTORS.constructor.fillings).should('contain', 'Говяжий метеорит (отбивная)');
  });

  it('добавление нескольких ингредиентов', () => {
    cy.addIngredientToConstructor('Флюоресцентная булка R2-D3');
    cy.addIngredientToConstructor('Говяжий метеорит (отбивная)');

    cy.get(TEST_SELECTORS.constructor.bunTop).should('contain', 'Флюоресцентная булка R2-D3');
    cy.get(TEST_SELECTORS.constructor.fillings).children().should('have.length', 1);
  });
});