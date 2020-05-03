import { useCallback } from 'react';
import { useImmerState } from '..';

export function useLoading() {
  const [state, setState] = useImmerState<any>({});

  const startLoading = useCallback(
    (name: any, mark: any = '') => {
      setState(newState => {
        newState[name + JSON.stringify(mark)] = true;
        return newState;
      });
    },
    [setState]
  );

  const finishLoading = useCallback(
    (name: any, mark: any = '') => {
      setState(newState => {
        newState[name + JSON.stringify(mark)] = false;
        return newState;
      });
    },
    [setState]
  );

  const getLoading = useCallback(
    (name: any, mark: any = '') => {
      return state[name + JSON.stringify(mark)];
    },
    [state]
  );

  return {
    startLoading,
    finishLoading,
    getLoading
  };
}
