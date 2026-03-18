import { TIngredient } from '@utils-types';
import constructorReducer, {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  initialState
} from '../constructorSlice';

const mockBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const mockMain: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0940',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
};

const mockSauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0944',
  name: 'Соус традиционный галактический',
  type: 'sauce',
  proteins: 42,
  fat: 24,
  carbohydrates: 42,
  calories: 99,
  price: 15,
  image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
};

describe('обработка constructorSlice', () => {
  describe('обрабокта addBun', () => {
    test('должен добавлять булку в конструктор', () => {
      const addBunAction = addBun(mockBun);
      const updatedState = constructorReducer(initialState, addBunAction);

      expect(updatedState.bun).toBeDefined();
      expect(updatedState.bun?._id).toBe(mockBun._id);
      expect(updatedState.bun?.name).toBe(mockBun.name);
      expect(updatedState.bun?.id).toBeDefined();
    });

    test('должен заменять существующую булку новой', () => {
      const firstAddBunAction = addBun(mockBun);
      const stateAfterFirstBun = constructorReducer(
        initialState,
        firstAddBunAction
      );

      const newBun: TIngredient = {
        ...mockBun,
        _id: 'bun-2',
        name: 'Новая булка'
      };
      const secondAddBunAction = addBun(newBun);
      const stateAfterSecondBun = constructorReducer(
        stateAfterFirstBun,
        secondAddBunAction
      );

      expect(stateAfterSecondBun.bun?._id).toBe('bun-2');
      expect(stateAfterSecondBun.bun?.name).toBe('Новая булка');
    });
  });

  describe('обработка addIngredient', () => {
    test('должен добавлять один ингредиент в список начинки', () => {
      const addIngredientAction = addIngredient(mockMain);
      const updatedState = constructorReducer(
        initialState,
        addIngredientAction
      );

      expect(updatedState.ingredients).toHaveLength(1);
      expect(updatedState.ingredients[0]._id).toBe(mockMain._id);
      expect(updatedState.ingredients[0].name).toBe(mockMain.name);
      expect(updatedState.ingredients[0].id).toBeDefined();
    });

    test('должен добавлять несколько ингредиентов в список начинки', () => {
      const addFirstIngredientAction = addIngredient(mockMain);
      const stateAfterFirstIngredient = constructorReducer(
        initialState,
        addFirstIngredientAction
      );

      const addSecondIngredientAction = addIngredient(mockSauce);
      const stateAfterSecondIngredient = constructorReducer(
        stateAfterFirstIngredient,
        addSecondIngredientAction
      );

      expect(stateAfterSecondIngredient.ingredients).toHaveLength(2);
      expect(stateAfterSecondIngredient.ingredients[0]._id).toBe(mockMain._id);
      expect(stateAfterSecondIngredient.ingredients[1]._id).toBe(mockSauce._id);
    });

    test('должен добавлять ингредиенты в конец списка', () => {
      const addFirstAction = addIngredient(mockMain);
      const stateAfterFirst = constructorReducer(initialState, addFirstAction);

      const addSecondAction = addIngredient(mockSauce);
      const stateAfterSecond = constructorReducer(
        stateAfterFirst,
        addSecondAction
      );

      const addThirdAction = addIngredient(mockMain);
      const stateAfterThird = constructorReducer(
        stateAfterSecond,
        addThirdAction
      );

      expect(stateAfterThird.ingredients).toHaveLength(3);
      expect(stateAfterThird.ingredients[2]._id).toBe(mockMain._id);
    });
  });

  describe('обработка removeIngredient', () => {
    describe('удаление по идентификатору', () => {
      test('должен удалять конкретный ингредиент по его временному id', () => {
        const addFirstAction = addIngredient(mockMain);
        const stateAfterFirstAdd = constructorReducer(
          initialState,
          addFirstAction
        );
        const firstIngredientId = stateAfterFirstAdd.ingredients[0].id;

        const addSecondAction = addIngredient(mockSauce);
        const stateAfterSecondAdd = constructorReducer(
          stateAfterFirstAdd,
          addSecondAction
        );
        const secondIngredientId = stateAfterSecondAdd.ingredients[1].id;

        const removeAction = removeIngredient(firstIngredientId);
        const stateAfterRemoval = constructorReducer(
          stateAfterSecondAdd,
          removeAction
        );

        expect(stateAfterRemoval.ingredients).toHaveLength(1);
        expect(stateAfterRemoval.ingredients[0].id).toBe(secondIngredientId);
        expect(stateAfterRemoval.ingredients[0]._id).toBe(mockSauce._id);
      });

      test('должен делать массив пустым при удалении единственного ингредиента', () => {
        const addAction = addIngredient(mockMain);
        const stateWithOneIngredient = constructorReducer(
          initialState,
          addAction
        );
        const ingredientId = stateWithOneIngredient.ingredients[0].id;

        const removeAction = removeIngredient(ingredientId);
        const stateAfterRemoval = constructorReducer(
          stateWithOneIngredient,
          removeAction
        );

        expect(stateAfterRemoval.ingredients).toHaveLength(0);
        expect(stateAfterRemoval.ingredients).toEqual([]);
      });
    });

    describe('обработка граничных случаев', () => {
      test('должен возвращать состояние без изменений, если ингредиент с указанным id не найден', () => {
        const addAction = addIngredient(mockMain);
        const stateWithIngredient = constructorReducer(initialState, addAction);

        const removeAction = removeIngredient('non-existent-id');
        const stateAfterRemoval = constructorReducer(
          stateWithIngredient,
          removeAction
        );

        expect(stateAfterRemoval).toEqual(stateWithIngredient);
        expect(stateAfterRemoval.ingredients).toHaveLength(1);
        expect(stateAfterRemoval.ingredients[0]._id).toBe(mockMain._id);
      });

      test('должен корректно обрабатывать удаление из пустого массива', () => {
        const removeAction = removeIngredient('some-id');
        const stateAfterRemoval = constructorReducer(
          initialState,
          removeAction
        );

        expect(stateAfterRemoval).toEqual(initialState);
        expect(stateAfterRemoval.ingredients).toHaveLength(0);
      });

      test('должен удалять только первый найденный ингредиент (если есть дубликаты с одинаковым id)', () => {
        const addFirstAction = addIngredient(mockMain);
        const stateAfterFirst = constructorReducer(
          initialState,
          addFirstAction
        );
        const firstId = stateAfterFirst.ingredients[0].id;

        const addSecondAction = addIngredient(mockMain);
        const stateAfterSecond = constructorReducer(
          stateAfterFirst,
          addSecondAction
        );
        const secondId = stateAfterSecond.ingredients[1].id;

        const removeAction = removeIngredient(firstId);
        const stateAfterRemoval = constructorReducer(
          stateAfterSecond,
          removeAction
        );

        expect(stateAfterRemoval.ingredients).toHaveLength(1);
        expect(stateAfterRemoval.ingredients[0].id).toBe(secondId);
      });
    });
  });

  describe('обработка moveIngredient', () => {
    describe('перемещение ингредиентов', () => {
      test('должен перемещать ингредиент с начальной позиции на целевую', () => {
        const addFirstAction = addIngredient(mockMain);
        const stateAfterFirstAdd = constructorReducer(
          initialState,
          addFirstAction
        );

        const addSecondAction = addIngredient(mockSauce);
        const stateAfterSecondAdd = constructorReducer(
          stateAfterFirstAdd,
          addSecondAction
        );

        const mockSecondMain: TIngredient = {
          ...mockMain,
          _id: 'main-2',
          name: 'Вторая котлета'
        };
        const addThirdAction = addIngredient(mockSecondMain);
        const stateAfterThirdAdd = constructorReducer(
          stateAfterSecondAdd,
          addThirdAction
        );

        const firstIngredientId = stateAfterThirdAdd.ingredients[0].id;
        const secondIngredientId = stateAfterThirdAdd.ingredients[1].id;
        const thirdIngredientId = stateAfterThirdAdd.ingredients[2].id;

        const moveAction = moveIngredient({ dragIndex: 0, hoverIndex: 2 });
        const stateAfterMove = constructorReducer(
          stateAfterThirdAdd,
          moveAction
        );

        expect(stateAfterMove.ingredients).toHaveLength(3);
        expect(stateAfterMove.ingredients[0].id).toBe(secondIngredientId);
        expect(stateAfterMove.ingredients[1].id).toBe(thirdIngredientId);
        expect(stateAfterMove.ingredients[2].id).toBe(firstIngredientId);
      });

      test('должен перемещать ингредиент с последней позиции на первую', () => {
        const addFirstAction = addIngredient(mockMain);
        const stateAfterFirstAdd = constructorReducer(
          initialState,
          addFirstAction
        );

        const addSecondAction = addIngredient(mockSauce);
        const stateAfterSecondAdd = constructorReducer(
          stateAfterFirstAdd,
          addSecondAction
        );

        const firstIngredientId = stateAfterSecondAdd.ingredients[0].id;
        const secondIngredientId = stateAfterSecondAdd.ingredients[1].id;

        const moveAction = moveIngredient({ dragIndex: 1, hoverIndex: 0 });
        const stateAfterMove = constructorReducer(
          stateAfterSecondAdd,
          moveAction
        );

        expect(stateAfterMove.ingredients[0].id).toBe(secondIngredientId);
        expect(stateAfterMove.ingredients[1].id).toBe(firstIngredientId);
      });
    });

    describe('обработка граничных случаев', () => {
      test('должен оставлять порядок без изменений при одинаковых индексах', () => {
        const addFirstAction = addIngredient(mockMain);
        const stateAfterFirstAdd = constructorReducer(
          initialState,
          addFirstAction
        );

        const addSecondAction = addIngredient(mockSauce);
        const stateAfterSecondAdd = constructorReducer(
          stateAfterFirstAdd,
          addSecondAction
        );

        const moveAction = moveIngredient({ dragIndex: 0, hoverIndex: 0 });
        const stateAfterMove = constructorReducer(
          stateAfterSecondAdd,
          moveAction
        );

        expect(stateAfterMove.ingredients).toEqual(
          stateAfterSecondAdd.ingredients
        );
        expect(stateAfterMove.ingredients).toEqual(
          stateAfterSecondAdd.ingredients
        );
      });

      test('должен корректно обрабатывать перемещение в конец списка', () => {
        const addFirstAction = addIngredient(mockMain);
        const stateAfterFirstAdd = constructorReducer(
          initialState,
          addFirstAction
        );

        const addSecondAction = addIngredient(mockSauce);
        const stateAfterSecondAdd = constructorReducer(
          stateAfterFirstAdd,
          addSecondAction
        );

        const addThirdAction = addIngredient(mockMain);
        const stateAfterThirdAdd = constructorReducer(
          stateAfterSecondAdd,
          addThirdAction
        );

        const secondIngredientId = stateAfterThirdAdd.ingredients[1].id;
        const thirdIngredientId = stateAfterThirdAdd.ingredients[2].id;

        const moveAction = moveIngredient({ dragIndex: 1, hoverIndex: 2 });
        const stateAfterMove = constructorReducer(
          stateAfterThirdAdd,
          moveAction
        );

        expect(stateAfterMove.ingredients).toHaveLength(3);
        expect(stateAfterMove.ingredients[0].id).toBe(
          stateAfterThirdAdd.ingredients[0].id
        );
        expect(stateAfterMove.ingredients[1].id).toBe(thirdIngredientId);
        expect(stateAfterMove.ingredients[2].id).toBe(secondIngredientId);
      });

      test('должен корректно обрабатывать перемещение в начало списка', () => {
        const addFirstAction = addIngredient(mockMain);
        const stateAfterFirstAdd = constructorReducer(
          initialState,
          addFirstAction
        );

        const addSecondAction = addIngredient(mockSauce);
        const stateAfterSecondAdd = constructorReducer(
          stateAfterFirstAdd,
          addSecondAction
        );

        const addThirdAction = addIngredient(mockMain);
        const stateAfterThirdAdd = constructorReducer(
          stateAfterSecondAdd,
          addThirdAction
        );

        const firstIngredientId = stateAfterThirdAdd.ingredients[0].id;
        const secondIngredientId = stateAfterThirdAdd.ingredients[1].id;
        const thirdIngredientId = stateAfterThirdAdd.ingredients[2].id;

        const moveAction = moveIngredient({ dragIndex: 2, hoverIndex: 0 });
        const stateAfterMove = constructorReducer(
          stateAfterThirdAdd,
          moveAction
        );

        expect(stateAfterMove.ingredients).toHaveLength(3);
        expect(stateAfterMove.ingredients[0].id).toBe(thirdIngredientId);
        expect(stateAfterMove.ingredients[1].id).toBe(firstIngredientId);
        expect(stateAfterMove.ingredients[2].id).toBe(secondIngredientId);
      });
    });

    describe('иммутабельность при перемещении', () => {
      test('должен создавать новый массив при изменении порядка', () => {
        const addFirstAction = addIngredient(mockMain);
        const stateAfterFirstAdd = constructorReducer(
          initialState,
          addFirstAction
        );

        const addSecondAction = addIngredient(mockSauce);
        const stateAfterSecondAdd = constructorReducer(
          stateAfterFirstAdd,
          addSecondAction
        );

        const originalIngredientsRef = stateAfterSecondAdd.ingredients;

        const moveAction = moveIngredient({ dragIndex: 0, hoverIndex: 1 });
        const stateAfterMove = constructorReducer(
          stateAfterSecondAdd,
          moveAction
        );

        expect(stateAfterMove.ingredients).not.toBe(originalIngredientsRef);
        expect(originalIngredientsRef).toHaveLength(2);
      });
    });
  });

  describe('обработка clearConstructor', () => {
    test('должен удалять булку и все добавленные ингредиенты', () => {
      const addBunAction = addBun(mockBun);
      const stateWithBun = constructorReducer(initialState, addBunAction);

      const addIngredientAction = addIngredient(mockMain);
      const stateWithBunAndIngredient = constructorReducer(
        stateWithBun,
        addIngredientAction
      );

      const clearConstructorAction = clearConstructor();
      const stateAfterClear = constructorReducer(
        stateWithBunAndIngredient,
        clearConstructorAction
      );

      expect(stateAfterClear.bun).toBeNull();
      expect(stateAfterClear.ingredients).toHaveLength(0);
      expect(stateAfterClear.ingredients).toEqual([]);
    });

    test('должен возвращать конструктор в исходное состояние', () => {
      const addBunAction = addBun(mockBun);
      const stateWithBun = constructorReducer(initialState, addBunAction);

      const addIngredientAction = addIngredient(mockMain);
      const stateWithItems = constructorReducer(
        stateWithBun,
        addIngredientAction
      );

      const clearConstructorAction = clearConstructor();
      const stateAfterClear = constructorReducer(
        stateWithItems,
        clearConstructorAction
      );

      expect(stateAfterClear).toEqual(initialState);
    });

    test('должен корректно обрабатывать очистку пустого конструктора', () => {
      const clearConstructorAction = clearConstructor();
      const stateAfterClear = constructorReducer(
        initialState,
        clearConstructorAction
      );

      expect(stateAfterClear).toEqual(initialState);
      expect(stateAfterClear.bun).toBeNull();
      expect(stateAfterClear.ingredients).toHaveLength(0);
    });
  });
});
