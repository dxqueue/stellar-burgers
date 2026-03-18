import { TEST_SELECTORS } from '../support/selectors';

describe('Оформление заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('postOrder');

    cy.setCookie('accessToken', 'fake');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'fake');
    });

    cy.waitForIngredients();
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('создание заказа с показом номера', () => {
    cy.addIngredientToConstructor('Флюоресцентная булка R2-D3');
    cy.addIngredientToConstructor('Говяжий метеорит (отбивная)');

    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@postOrder');

    cy.get(TEST_SELECTORS.modal.window, { timeout: 5000 })
      .should('be.visible')
      .as('orderModal');

    cy.get(TEST_SELECTORS.order.number).should('contain', '103026');
  });

  it('закрытие модального окна', () => {
    cy.addIngredientToConstructor('Флюоресцентная булка R2-D3');

    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@postOrder');

    cy.get(TEST_SELECTORS.modal.window, { timeout: 5000 }).should('be.visible');
    cy.closeModal();
  });
});