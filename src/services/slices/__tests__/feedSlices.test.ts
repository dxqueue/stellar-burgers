import { TOrdersData } from '@utils-types';
import feedReducer, { fetchFeeds, initialState } from '../feedSlices';
import { mockFeedsData } from './mock';

describe('обработка feedSlice', () => {
  describe('обработка fetchFeeds.pending', () => {
    test('должен включать индикатор загрузки и сбрасывать ошибку', () => {
      const startLoadingAction = { type: fetchFeeds.pending.type };
      const updatedState = feedReducer(initialState, startLoadingAction);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBeNull();
    });

    test('должен очищать предыдущую ошибку перед новым запросом', () => {
      const stateWithPreviousError = {
        ...initialState,
        error: 'Предыдущая ошибка'
      };
      const startLoadingAction = { type: fetchFeeds.pending.type };
      const updatedState = feedReducer(
        stateWithPreviousError,
        startLoadingAction
      );

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBeNull();
    });
  });

  describe('обработка fetchFeeds.fulfilled', () => {
    test('должен завершать загрузку и обновлять данные ленты', () => {
      const startLoadingAction = { type: fetchFeeds.pending.type };
      const loadingState = feedReducer(initialState, startLoadingAction);

      const successAction = {
        type: fetchFeeds.fulfilled.type,
        payload: mockFeedsData
      };
      const resultState = feedReducer(loadingState, successAction);

      expect(resultState.isLoading).toBe(false);
      expect(resultState.orders).toEqual(mockFeedsData.orders);
      expect(resultState.total).toBe(mockFeedsData.total);
      expect(resultState.totalToday).toBe(mockFeedsData.totalToday);
      expect(resultState.error).toBeNull();
    });

    test('должен перезаписывать существующие данные ленты новыми', () => {
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
        total: 1,
        totalToday: 1,
        isLoading: false,
        error: null
      };

      const successAction = {
        type: fetchFeeds.fulfilled.type,
        payload: mockFeedsData
      };
      const updatedState = feedReducer(previousState, successAction);

      expect(updatedState.orders).toEqual(mockFeedsData.orders);
      expect(updatedState.orders).toHaveLength(2);
      expect(updatedState.total).toBe(27021);
      expect(updatedState.totalToday).toBe(80);
    });
  });

  describe('обрабокта fetchFeeds.rejected', () => {
    test('должен завершать загрузку и сохранять сообщение об ошибке', () => {
      const startLoadingAction = { type: fetchFeeds.pending.type };
      const loadingState = feedReducer(initialState, startLoadingAction);

      const errorAction = {
        type: fetchFeeds.rejected.type,
        error: { message: 'Ошибка загрузки ленты заказов' }
      };
      const errorState = feedReducer(loadingState, errorAction);

      expect(errorState.isLoading).toBe(false);
      expect(errorState.error).toBe('Ошибка загрузки ленты заказов');
      expect(errorState.orders).toEqual([]);
    });

    test('должен использовать стандартное сообщение, если ошибка не содержит текст', () => {
      const startLoadingAction = { type: fetchFeeds.pending.type };
      const loadingState = feedReducer(initialState, startLoadingAction);

      const errorAction = {
        type: fetchFeeds.rejected.type,
        error: {}
      };
      const errorState = feedReducer(loadingState, errorAction);

      expect(errorState.isLoading).toBe(false);
      expect(errorState.error).toBe('Ошибка загрузки ленты заказов');
    });

    test('должен сохранять ранее загруженные данные при ошибке', () => {
      const stateWithExistingData = {
        orders: mockFeedsData.orders,
        total: mockFeedsData.total,
        totalToday: mockFeedsData.totalToday,
        isLoading: true,
        error: null
      };

      const errorAction = {
        type: fetchFeeds.rejected.type,
        error: { message: 'Ошибка сети' }
      };
      const resultState = feedReducer(stateWithExistingData, errorAction);

      expect(resultState.orders).toEqual(mockFeedsData.orders);
      expect(resultState.total).toBe(mockFeedsData.total);
      expect(resultState.totalToday).toBe(mockFeedsData.totalToday);
      expect(resultState.isLoading).toBe(false);
      expect(resultState.error).toBe('Ошибка сети');
    });
  });
});
