// store/index.ts
import { Action } from 'redux';

interface FooAction extends Action<'FOO'> {
  payload: string;
}

export const reducer = (state = { foo: '' }, action: FooAction) => {
  switch (action.type) {
    case 'FOO':
      return { ...state, foo: action.payload };
    default:
      return state;
  }
};

export type RootState = ReturnType<typeof reducer>;