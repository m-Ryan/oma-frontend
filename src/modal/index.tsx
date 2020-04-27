import React from 'react';
import { createReactionStore } from './reaction';
import { useUser } from './useUser';
import { useTheme } from './useTheme';
import { useExtreHistory } from './useHistory';
import { useProject } from './useProject';
import { useSSH } from './useSSH';
import { useLoading } from './reaction/useLoading';

export const { Provider, useStore, useSelector, useImmerState, getStore } = createReactionStore({
  loading: useLoading,
  extraHistory: useExtreHistory,
  user: useUser,
  theme: useTheme,
  project: useProject,
  ssh: useSSH,
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
