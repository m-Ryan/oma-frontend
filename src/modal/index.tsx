import React from 'react';
import { createReactionStore } from './reaction';
import { useUser } from './useUser';
import { useTheme } from './useTheme';
import { useExtreHistory } from './useHistory';

export const { Provider, useStore, useSelector, useImmerState } = createReactionStore({
  extraHistory: useExtreHistory,
  user: useUser,
  theme: useTheme,
}, {

});

export type StoreType = ReturnType<typeof useStore>;

export function StoreProvider({ children }: { children: React.ReactNode; }) {

  return (
    <Provider>
      {children}
    </Provider>
  );
}
