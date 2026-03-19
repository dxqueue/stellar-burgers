import { mockUser, mockUser2 } from './mock';
import userReducer, {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
  setAuthChecked,
  initialState
} from '../userSlice';

describe('обработка userSlice', () => {
  describe('обработка registerUser', () => {
    test('должен включать индикатор загрузки при отправке данных регистрации', () => {
      const startLoadingAction = { type: registerUser.pending.type };
      const updatedState = userReducer(initialState, startLoadingAction);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBeNull();
    });

    test('должен завершать загрузку и сохранять данные пользователя при успешной регистрации', () => {
      const startLoadingAction = { type: registerUser.pending.type };
      const loadingState = userReducer(initialState, startLoadingAction);

      const successAction = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const resultState = userReducer(loadingState, successAction);

      expect(resultState.isLoading).toBe(false);
      expect(resultState.user).toEqual(mockUser);
      expect(resultState.isAuthChecked).toBe(true);
      expect(resultState.error).toBeNull();
    });

    test('должен завершать загрузку и сохранять сообщение об ошибке при неудачной регистрации', () => {
      const startLoadingAction = { type: registerUser.pending.type };
      const loadingState = userReducer(initialState, startLoadingAction);

      const errorAction = {
        type: registerUser.rejected.type,
        error: { message: 'Ошибка регистрации' }
      };
      const errorState = userReducer(loadingState, errorAction);

      expect(errorState.isLoading).toBe(false);
      expect(errorState.error).toBe('Ошибка регистрации');
    });
  });

  describe('обработка loginUser', () => {
    test('должен включать индикатор загрузки при попытке входа', () => {
      const startLoadingAction = { type: loginUser.pending.type };
      const updatedState = userReducer(initialState, startLoadingAction);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBeNull();
    });

    test('должен завершать загрузку и сохранять данные пользователя при успешной авторизации', () => {
      const startLoadingAction = { type: loginUser.pending.type };
      const loadingState = userReducer(initialState, startLoadingAction);

      const successAction = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const resultState = userReducer(loadingState, successAction);

      expect(resultState.isLoading).toBe(false);
      expect(resultState.user).toEqual(mockUser);
      expect(resultState.isAuthChecked).toBe(true);
      expect(resultState.error).toBeNull();
    });

    test('должен завершать загрузку и сохранять сообщение об ошибке при неудачном входе', () => {
      const startLoadingAction = { type: loginUser.pending.type };
      const loadingState = userReducer(initialState, startLoadingAction);

      const errorAction = {
        type: loginUser.rejected.type,
        error: { message: 'Ошибка входа' }
      };
      const errorState = userReducer(loadingState, errorAction);

      expect(errorState.isLoading).toBe(false);
      expect(errorState.error).toBe('Ошибка входа');
    });
  });

  describe('обработка getUser', () => {
    test('должен включать индикатор загрузки при запросе данных пользователя', () => {
      const startLoadingAction = { type: getUser.pending.type };
      const updatedState = userReducer(initialState, startLoadingAction);

      expect(updatedState.isLoading).toBe(true);
    });

    test('должен завершать загрузку и сохранять данные пользователя при успешном получении', () => {
      const startLoadingAction = { type: getUser.pending.type };
      const loadingState = userReducer(initialState, startLoadingAction);

      const successAction = {
        type: getUser.fulfilled.type,
        payload: mockUser
      };
      const resultState = userReducer(loadingState, successAction);

      expect(resultState.isLoading).toBe(false);
      expect(resultState.user).toEqual(mockUser);
      expect(resultState.isAuthChecked).toBe(true);
    });

    test('должен завершать загрузку и сбрасывать данные пользователя при ошибке', () => {
      const stateWithExistingUser = { ...initialState, user: mockUser };
      const startLoadingAction = { type: getUser.pending.type };
      const loadingState = userReducer(
        stateWithExistingUser,
        startLoadingAction
      );

      const errorAction = {
        type: getUser.rejected.type
      };
      const errorState = userReducer(loadingState, errorAction);

      expect(errorState.isLoading).toBe(false);
      expect(errorState.user).toBeNull();
      expect(errorState.isAuthChecked).toBe(true);
    });
  });

  describe('обработка updateUser', () => {
    test('должен включать индикатор загрузки при отправке обновленных данных', () => {
      const startLoadingAction = { type: updateUser.pending.type };
      const updatedState = userReducer(initialState, startLoadingAction);

      expect(updatedState.isLoading).toBe(true);
      expect(updatedState.error).toBeNull();
    });

    test('должен завершать загрузку и обновлять данные пользователя при успешном изменении', () => {
      const stateWithExistingUser = { ...initialState, user: mockUser };
      const startLoadingAction = { type: updateUser.pending.type };
      const loadingState = userReducer(
        stateWithExistingUser,
        startLoadingAction
      );

      const successAction = {
        type: updateUser.fulfilled.type,
        payload: mockUser2
      };
      const resultState = userReducer(loadingState, successAction);

      expect(resultState.isLoading).toBe(false);
      expect(resultState.user).toEqual(mockUser2);
      expect(resultState.error).toBeNull();
    });

    test('должен завершать загрузку и сохранять сообщение об ошибке при неудачном обновлении', () => {
      const startLoadingAction = { type: updateUser.pending.type };
      const loadingState = userReducer(initialState, startLoadingAction);

      const errorAction = {
        type: updateUser.rejected.type,
        error: { message: 'Ошибка обновления данных' }
      };
      const errorState = userReducer(loadingState, errorAction);

      expect(errorState.isLoading).toBe(false);
      expect(errorState.error).toBe('Ошибка обновления данных');
    });
  });

  describe('обработка logoutUser', () => {
    test('должен удалять данные пользователя при успешном выходе из системы', () => {
      const stateWithAuthenticatedUser = {
        ...initialState,
        user: mockUser,
        isAuthChecked: true
      };

      const successAction = { type: logoutUser.fulfilled.type };
      const updatedState = userReducer(
        stateWithAuthenticatedUser,
        successAction
      );

      expect(updatedState.user).toBeNull();
      expect(updatedState.isAuthChecked).toBe(true);
    });
  });

  describe('обработка setAuthChecked', () => {
    test('должен устанавливать флаг проверки аутентификации в true', () => {
      const setAuthAction = setAuthChecked(true);
      const updatedState = userReducer(initialState, setAuthAction);

      expect(updatedState.isAuthChecked).toBe(true);
    });

    test('должен устанавливать флаг проверки аутентификации в false', () => {
      const stateWithAuthChecked = { ...initialState, isAuthChecked: true };
      const setAuthAction = setAuthChecked(false);
      const updatedState = userReducer(stateWithAuthChecked, setAuthAction);

      expect(updatedState.isAuthChecked).toBe(false);
    });
  });
});
