export const TEST_SELECTORS = {
  ingredients: {
    item: '[data-testid^="ingredient-"]',
    bun: '[data-testid="ingredient-bun"]',
    main: '[data-testid="ingredient-main"]',
    sauce: '[data-testid="ingredient-sauce"]'
  },
  modal: {
    window: '[data-testid="modal"]',
    close: '[data-testid="modal-close"]',
    overlay: '[data-testid="modal-overlay"]'
  },
  constructor: {
    bunTop: '[data-testid="constructor-bun-top"]',
    bunBottom: '[data-testid="constructor-bun-bottom"]',
    fillings: '[data-testid="constructor-fillings"]'
  },
  order: {
    number: '[data-testid="order-number"]'
  }
} as const;