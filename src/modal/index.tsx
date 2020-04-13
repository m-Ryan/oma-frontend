import React from 'react';
import { createReactionStore } from './reaction';
import { useUser } from './useUser';
import { useTheme } from './useTheme';
import { useHistory } from './useHistory';

export const { Provider, useStore, useSelector, useImmerState } = createReactionStore({
  user: useUser,
  theme: useTheme,
  history: useHistory
});

export function StoreProvider({ children }: { children: React.ReactNode; }) {

  return (
    <Provider>
      {children}
    </Provider>
  );
}
