import { TOrder } from '@utils-types';
import profileOrdersReducer, {
  fetchProfileOrders,
  initialState
} from '../profileOrderSlice';

const mockOrders: TOrder[] = [
  {
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
  },

  {
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
  }
];

describe('обработка profileOrdersSlice', () => {
  describe('обработка fetchProfileOrders.pending', () => {
    test('должен включать индикатор загрузки при запросе заказов профиля', () => {
      const startLoadingAction = { type: fetchProfileOrders.pending.type };
      const updatedState = profileOrdersReducer(
        initialState,
        startLoadingAction
      );

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBeNull();
    });

    test('должен очищать предыдущую ошибку перед новым запросом', () => {
      const stateWithPreviousError = {
        ...initialState,
        error: 'Предыдущая ошибка'
      };
      const startLoadingAction = { type: fetchProfileOrders.pending.type };
      const updatedState = profileOrdersReducer(
        stateWithPreviousError,
        startLoadingAction
      );

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBeNull();
    });

    test('должен сохранять существующие заказы при повторной загрузке', () => {
      const stateWithOrders = {
        ...initialState,
        orders: mockOrders,
        isLoading: false
      };

      const startLoadingAction = { type: fetchProfileOrders.pending.type };
      const updatedState = profileOrdersReducer(
        stateWithOrders,
        startLoadingAction
      );

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.orders).toEqual(mockOrders);
      expect(updatedState.error).toBeNull();
    });
  });

  describe('обработка fetchProfileOrders.fulfilled', () => {
    test('должен завершать загрузку и сохранять полученные заказы профиля', () => {
      const startLoadingAction = { type: fetchProfileOrders.pending.type };
      const loadingState = profileOrdersReducer(
        initialState,
        startLoadingAction
      );

      const successAction = {
        type: fetchProfileOrders.fulfilled.type,
        payload: mockOrders
      };
      const resultState = profileOrdersReducer(loadingState, successAction);

      expect(resultState.isLoading).toBe(false);
      expect(resultState.orders).toEqual(mockOrders);
      expect(resultState.orders).toHaveLength(2);
      expect(resultState.error).toBeNull();
    });

    test('должен перезаписывать существующие заказы новыми данными', () => {
      const previousState = {
        orders: [
          {
            _id: 'old-order',
            status: 'done',
            name: 'Старый заказ',
            createdAt: '2026-03-18T22:00:00.000Z',
            updatedAt: '2026-03-18T22:01:00.000Z',
            number: 1,
            ingredients: []
          }
        ],
        isLoading: false,
        error: null
      };

      const successAction = {
        type: fetchProfileOrders.fulfilled.type,
        payload: mockOrders
      };
      const updatedState = profileOrdersReducer(previousState, successAction);

      expect(updatedState.orders).toEqual(mockOrders);
      expect(updatedState.orders).toHaveLength(2);
      expect(updatedState.orders[0]._id).toBe('69bad816a64177001b330077');
      expect(updatedState.orders[0].name).toBe('Space краторный бургер');
    });

    test('должен обновлять список заказов, даже если он был пустым', () => {
      const emptyState = {
        orders: [],
        isLoading: true,
        error: null
      };

      const successAction = {
        type: fetchProfileOrders.fulfilled.type,
        payload: mockOrders
      };
      const updatedState = profileOrdersReducer(emptyState, successAction);

      expect(updatedState.orders).toEqual(mockOrders);
      expect(updatedState.orders).toHaveLength(2);
      expect(updatedState.isLoading).toBe(false);
    });
  });

  describe('обработка fetchProfileOrders.rejected', () => {
    test('должен завершать загрузку и сохранять сообщение об ошибке', () => {
      const startLoadingAction = { type: fetchProfileOrders.pending.type };
      const loadingState = profileOrdersReducer(
        initialState,
        startLoadingAction
      );

      const errorAction = {
        type: fetchProfileOrders.rejected.type,
        error: { message: 'Ошибка загрузки заказов' }
      };
      const errorState = profileOrdersReducer(loadingState, errorAction);

      expect(errorState.isLoading).toBe(false);
      expect(errorState.error).toBe('Ошибка загрузки заказов');
      expect(errorState.orders).toEqual([]);
    });

    test('должен использовать стандартное сообщение, если ошибка не содержит текст', () => {
      const startLoadingAction = { type: fetchProfileOrders.pending.type };
      const loadingState = profileOrdersReducer(
        initialState,
        startLoadingAction
      );

      const errorAction = {
        type: fetchProfileOrders.rejected.type,
        error: {}
      };
      const errorState = profileOrdersReducer(loadingState, errorAction);

      expect(errorState.isLoading).toBe(false);
      expect(errorState.error).toBe('Ошибка загрузки заказов');
    });

    test('должен сохранять ранее загруженные заказы при возникновении ошибки', () => {
      const stateWithExistingOrders = {
        orders: mockOrders,
        isLoading: true,
        error: null
      };

      const errorAction = {
        type: fetchProfileOrders.rejected.type,
        error: { message: 'Ошибка сети' }
      };
      const resultState = profileOrdersReducer(
        stateWithExistingOrders,
        errorAction
      );

      expect(resultState.orders).toEqual(mockOrders);
      expect(resultState.isLoading).toBe(false);
      expect(resultState.error).toBe('Ошибка сети');
    });
  });
});
