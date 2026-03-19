import { TIngredient, TOrder, TOrdersData, TUser } from '@utils-types';

export const mockIngredients: TIngredient[] = [
  {
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
  },
  {
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
  }
];

export const mockBun: TIngredient = {
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

export const mockMain: TIngredient = {
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

export const mockSauce: TIngredient = {
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

export const mockFeedsData: TOrdersData = {
  orders: [
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
  ],
  total: 27021,
  totalToday: 80
};

export const mockOrder: TOrder = {
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

export const mockOrder2: TOrder = {
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

export const mockOrders: TOrder[] = [
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

export const mockUser: TUser = {
  email: 'user_1@yandex.ru',
  name: 'user_1'
};

export const mockUser2: TUser = {
  email: 'user_2@yandex.ru',
  name: 'user_2'
};
