import { useCallback } from "react";
import { useImmerState } from '..';

export function useLoading() {
  const [state, setState] = useImmerState<any>({});

  const startLoading = useCallback((name: any) => {
    setState(newState => {
      newState[name] = true;
      return newState;
    });
  }, [setState]);

  const finishLoading = useCallback((name: any) => {
    setState(newState => {
      newState[name] = false;
      return newState;
    });
  }, [setState]);

  const getLoading = useCallback((name: any) => {
    return state[name];
  }, [state]);

  return {
    startLoading,
    finishLoading,
    getLoading,
    loadingMap: state
  };
}