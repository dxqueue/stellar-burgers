import { TOrder } from '@utils-types';
import orderReducer, {
  createOrder,
  fetchOrderByNumber,
  clearOrder,
  setOrderModalData,
  clearOrderModalData,
  initialState
} from '../orderSlice';

const mockOrder: TOrder = {
  _id: '69bad816a64177001b330077',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0943',
    '643d69a5c3f7b9001cfa093c'
  ],
  status: 'done',
  name: 'Space краторный бургер',
  createdAt: '2026-03-18T16:51:34.583Z',
  updatedAt: '2026-03-18T16:51:34.797Z',
  number: 103026
};

const mockOrder2: TOrder = {
  _id: '69bad681a64177001b330076',
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa0943',
    '643d69a5c3f7b9001cfa093d'
  ],
  status: 'done',
  name: 'Space флюоресцентный бургер',
  createdAt: '2026-03-18T16:44:49.819Z',
  updatedAt: '2026-03-18T16:44:50.071Z',
  number: 103025
};

describe('обработка orderSlice', () => {
  describe('обработка createOrder', () => {
    describe('начало запроса (pending)', () => {
      test('должен включать индикатор загрузки при отправке заказа', () => {
        const startLoadingAction = { type: createOrder.pending.type };
        const updatedState = orderReducer(initialState, startLoadingAction);

        expect(updatedState.isLoading).toBe(true);
        expect(updatedState.error).toBeNull();
      });

      test('должен очищать предыдущую ошибку перед созданием нового заказа', () => {
        const stateWithPreviousError = {
          ...initialState,
          error: 'Предыдущая ошибка'
        };
        const startLoadingAction = { type: createOrder.pending.type };
        const updatedState = orderReducer(
          stateWithPreviousError,
          startLoadingAction
        );

        expect(updatedState.isLoading).toBe(true);
        expect(updatedState.error).toBeNull();
      });
    });

    describe('успешное создание заказа (fulfilled)', () => {
      test('должен завершать загрузку и сохранять данные созданного заказа', () => {
        const startLoadingAction = { type: createOrder.pending.type };
        const loadingState = orderReducer(initialState, startLoadingAction);

        const successAction = {
          type: createOrder.fulfilled.type,
          payload: mockOrder
        };
        const resultState = orderReducer(loadingState, successAction);

        expect(resultState.isLoading).toBe(false);
        expect(resultState.order).toEqual(mockOrder);
        expect(resultState.orderModalData).toEqual(mockOrder);
        expect(resultState.error).toBeNull();
      });
    });

    describe('ошибка при создании заказа (rejected)', () => {
      test('должен завершать загрузку и сохранять сообщение об ошибке', () => {
        const startLoadingAction = { type: createOrder.pending.type };
        const loadingState = orderReducer(initialState, startLoadingAction);

        const errorAction = {
          type: createOrder.rejected.type,
          error: { message: 'Ошибка создания заказа' }
        };
        const errorState = orderReducer(loadingState, errorAction);

        expect(errorState.isLoading).toBe(false);
        expect(errorState.error).toBe('Ошибка создания заказа');
        expect(errorState.order).toBeNull();
        expect(errorState.orderModalData).toBeNull();
      });

      test('должен использовать стандартное сообщение, если ошибка не содержит текст', () => {
        const startLoadingAction = { type: createOrder.pending.type };
        const loadingState = orderReducer(initialState, startLoadingAction);

        const errorAction = {
          type: createOrder.rejected.type,
          error: {}
        };
        const errorState = orderReducer(loadingState, errorAction);

        expect(errorState.isLoading).toBe(false);
        expect(errorState.error).toBe('Ошибка создания заказа');
        expect(errorState.order).toBeNull();
      });
    });
  });

  describe('обработка fetchOrderByNumber', () => {
    describe('начало запроса (pending)', () => {
      test('должен включать индикатор загрузки при запросе заказа по номеру', () => {
        const startLoadingAction = { type: fetchOrderByNumber.pending.type };
        const updatedState = orderReducer(initialState, startLoadingAction);

        expect(updatedState.isLoading).toBe(true);
        expect(updatedState.error).toBeNull();
      });

      test('должен очищать предыдущую ошибку перед новым запросом', () => {
        const stateWithPreviousError = {
          ...initialState,
          error: 'Предыдущая ошибка'
        };
        const startLoadingAction = { type: fetchOrderByNumber.pending.type };
        const updatedState = orderReducer(
          stateWithPreviousError,
          startLoadingAction
        );

        expect(updatedState.isLoading).toBe(true);
        expect(updatedState.error).toBeNull();
      });
    });

    describe('успешное получение заказа (fulfilled)', () => {
      test('должен завершать загрузку и сохранять заказ в orderModalData', () => {
        const startLoadingAction = { type: fetchOrderByNumber.pending.type };
        const loadingState = orderReducer(initialState, startLoadingAction);

        const successAction = {
          type: fetchOrderByNumber.fulfilled.type,
          payload: mockOrder
        };
        const resultState = orderReducer(loadingState, successAction);

        expect(resultState.isLoading).toBe(false);
        expect(resultState.orderModalData).toEqual(mockOrder);
        expect(resultState.order).toBeNull();
        expect(resultState.error).toBeNull();
      });

      test('должен сохранять заказ только в orderModalData, не затрагивая order', () => {
        const stateWithExistingOrder = { ...initialState, order: mockOrder };

        const startLoadingAction = { type: fetchOrderByNumber.pending.type };
        const loadingState = orderReducer(
          stateWithExistingOrder,
          startLoadingAction
        );

        const successAction = {
          type: fetchOrderByNumber.fulfilled.type,
          payload: mockOrder
        };
        const resultState = orderReducer(loadingState, successAction);

        expect(resultState.orderModalData).toEqual(mockOrder);
        expect(resultState.order).toEqual(mockOrder);
      });
    });

    describe('ошибка при получении заказа (rejected)', () => {
      test('должен завершать загрузку и сохранять сообщение об ошибке', () => {
        const startLoadingAction = { type: fetchOrderByNumber.pending.type };
        const loadingState = orderReducer(initialState, startLoadingAction);

        const errorAction = {
          type: fetchOrderByNumber.rejected.type,
          error: { message: 'Ошибка загрузки заказа' }
        };
        const errorState = orderReducer(loadingState, errorAction);

        expect(errorState.isLoading).toBe(false);
        expect(errorState.error).toBe('Ошибка загрузки заказа');
      });

      test('должен использовать стандартное сообщение, если ошибка не содержит текст', () => {
        const startLoadingAction = { type: fetchOrderByNumber.pending.type };
        const loadingState = orderReducer(initialState, startLoadingAction);

        const errorAction = {
          type: fetchOrderByNumber.rejected.type,
          error: {}
        };
        const errorState = orderReducer(loadingState, errorAction);

        expect(errorState.isLoading).toBe(false);
        expect(errorState.error).toBe('Ошибка загрузки заказа');
      });

      test('должен сохранять существующие данные заказа при ошибке', () => {
        const stateWithOrderData = {
          ...initialState,
          order: mockOrder,
          orderModalData: mockOrder
        };

        const startLoadingAction = { type: fetchOrderByNumber.pending.type };
        const loadingState = orderReducer(
          stateWithOrderData,
          startLoadingAction
        );

        const errorAction = {
          type: fetchOrderByNumber.rejected.type,
          error: { message: 'Ошибка загрузки заказа' }
        };
        const errorState = orderReducer(loadingState, errorAction);

        expect(errorState.order).toEqual(mockOrder);
        expect(errorState.orderModalData).toEqual(mockOrder);
        expect(errorState.error).toBe('Ошибка загрузки заказа');
      });
    });
  });

  describe('обработка clearOrder', () => {
    test('должен удалять данные заказа из обоих полей состояния', () => {
      const stateWithExistingOrder = {
        ...initialState,
        order: mockOrder,
        orderModalData: mockOrder
      };

      const clearOrderAction = clearOrder();
      const updatedState = orderReducer(
        stateWithExistingOrder,
        clearOrderAction
      );

      expect(updatedState.order).toBeNull();
      expect(updatedState.orderModalData).toBeNull();
    });
  });

  describe('обработка setOrderModalData', () => {
    test('должен сохранять заказ в поле orderModalData', () => {
      const setModalDataAction = setOrderModalData(mockOrder);
      const updatedState = orderReducer(initialState, setModalDataAction);

      expect(updatedState.orderModalData).toEqual(mockOrder);
      expect(updatedState.order).toBeNull();
    });
  });

  describe('обработка clearOrderModalData', () => {
    test('должен удалять данные из поля orderModalData', () => {
      const stateWithModalData = {
        ...initialState,
        orderModalData: mockOrder
      };

      const clearModalDataAction = clearOrderModalData();
      const updatedState = orderReducer(
        stateWithModalData,
        clearModalDataAction
      );

      expect(updatedState.orderModalData).toBeNull();
    });
  });
});
