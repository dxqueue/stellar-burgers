import { mockIngredients } from './mock';
import ingredientsReducer, {
  fetchIngredients,
  initialState
} from '../ingredientsSlice';

describe('обработка ingredientSlice', () => {
  describe('обработка fetchIngredients.pending', () => {
    test('должен устанавливать флаг загрузки и сбрасывать ошибку', () => {
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('должен очищать предыдущую ошибку перед новым запросом', () => {
      const stateWithError = { ...initialState, error: 'Предыдущая ошибка' };
      const action = { type: fetchIngredients.pending.type };
      const state = ingredientsReducer(stateWithError, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('обработка fetchIngredients.fulfilled', () => {
    test('должен завершать загрузку и сохранять полученные ингредиенты', () => {
      const startLoadingAction = { type: fetchIngredients.pending.type };
      const loadingState = ingredientsReducer(initialState, startLoadingAction);

      const successAction = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const resultState = ingredientsReducer(loadingState, successAction);

      expect(resultState.isLoading).toBe(false);
      expect(resultState.items).toEqual(mockIngredients);
      expect(resultState.items).toHaveLength(2);
      expect(resultState.error).toBeNull();
    });

    test('должен перезаписывать существующие ингредиенты новыми данными', () => {
      const previousState = {
        items: [
          {
            _id: 'old-id',
            name: 'Старый ингредиент',
            type: 'main',
            proteins: 0,
            fat: 0,
            carbohydrates: 0,
            calories: 0,
            price: 0,
            image: '',
            image_mobile: '',
            image_large: ''
          }
        ],
        isLoading: false,
        error: null
      };

      const successAction = {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      };
      const updatedState = ingredientsReducer(previousState, successAction);

      expect(updatedState.items).toEqual(mockIngredients);
      expect(updatedState.items).toHaveLength(2);
      expect(updatedState.items[0]._id).toBe('643d69a5c3f7b9001cfa093d');
    });
  });

  describe('обработка fetchIngredients.rejected', () => {
    test('должен завершать загрузку и сохранять сообщение об ошибке', () => {
      const startLoadingAction = { type: fetchIngredients.pending.type };
      const loadingState = ingredientsReducer(initialState, startLoadingAction);

      const errorAction = {
        type: fetchIngredients.rejected.type,
        error: { message: 'Ошибка загрузки ингредиентов' }
      };
      const errorState = ingredientsReducer(loadingState, errorAction);

      expect(errorState.isLoading).toBe(false);
      expect(errorState.error).toBe('Ошибка загрузки ингредиентов');
      expect(errorState.items).toEqual([]);
    });

    test('должен использовать стандартное сообщение, если ошибка не содержит текст', () => {
      const startLoadingAction = { type: fetchIngredients.pending.type };
      const loadingState = ingredientsReducer(initialState, startLoadingAction);

      const errorAction = {
        type: fetchIngredients.rejected.type,
        error: {}
      };
      const errorState = ingredientsReducer(loadingState, errorAction);

      expect(errorState.isLoading).toBe(false);
      expect(errorState.error).toBe('Ошибка загрузки ингредиентов');
    });

    test('должен сохранять ранее загруженные данные при ошибке', () => {
      const stateWithExistingData = {
        items: mockIngredients,
        isLoading: true,
        error: null
      };

      const errorAction = {
        type: fetchIngredients.rejected.type,
        error: { message: 'Ошибка сети' }
      };
      const resultState = ingredientsReducer(
        stateWithExistingData,
        errorAction
      );

      expect(resultState.items).toEqual(mockIngredients);
      expect(resultState.isLoading).toBe(false);
      expect(resultState.error).toBe('Ошибка сети');
    });
  });
});
