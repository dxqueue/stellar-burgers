import { rootReducer, RootState } from '../store';

describe('обработка rootReducer', () => {
  let initialState: RootState;

  beforeEach(() => {
    initialState = rootReducer(undefined, { type: '@@INIT' });
  });

  test('должен возвращать корректное состояние при вызове неизвестного экшена', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(initialState, unknownAction);

    expect(state).toEqual(initialState);
  });

  test('должен правильно инициализировать состояние', () => {
    expect(initialState.ingredients).toEqual({
      items: [],
      isLoading: false,
      error: null
    });

    expect(initialState.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(initialState.order).toEqual({
      order: null,
      orderModalData: null,
      isLoading: false,
      error: null
    });
  });

  test('должен правильно инициализировать состояние, если передано undefined', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, unknownAction);

    expect(state).toBeDefined();
    expect(state.burgerConstructor).toBeDefined();
    expect(state.feed).toBeDefined();
    expect(state.ingredients).toBeDefined();
    expect(state.order).toBeDefined();
    expect(state.profileOrders).toBeDefined();
    expect(state.user).toBeDefined();
  });
});
