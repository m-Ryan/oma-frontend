import React, { useContext, useState, useCallback } from 'react';
import produce from "immer";

interface StoreType {
  [key: string]: any,
}



export interface StoreParams {
  debug?: boolean;
}

export function createReactionStore<T extends Partial<StoreType>, K extends keyof T>(store: T, initStore: Partial<{ [key in keyof T]: any }> = {}, params: StoreParams = {}) {
  const { debug = false } = params;
  let storeRef: { current?: { [key in keyof T]: ReturnType<T[key]> }; } = {
    current: undefined
  };
  const storeContext = React.createContext<any>({});

  return {
    Provider({ children }: { children: React.ReactNode; }) {

      const mapStore: any = {};
      Object.keys(store).forEach((key) => {
        const initState = initStore[key];
        mapStore[key] = store[key](initState);
      });
      storeRef.current = mapStore;
      return (
        <storeContext.Provider
          value={mapStore}
        >
          {children}
        </storeContext.Provider>
      );
    },
    useImmerState<S>(initState: S): [S, (dispatch: (newState: S) => S) => void] {
      const [state, setState] = useState<S>(initState);

      const debuggerLog = useCallback((nextState: S) => {
        // debugger
        return nextState;
      }, []);

      const setEnhanceState = useCallback((setData: (newState: S) => S) => {

        setState((newState) => {
          return debug ? debuggerLog(produce<S>(newState, setData as any)) : produce<S>(newState, setData as any);
        });
      }, [debuggerLog]);

      return [state, setEnhanceState];
    },
    useStore() {
      return useContext<{ [key in keyof T]: ReturnType<T[key]> }>(storeContext);
    },
    useSelector<P extends K>(selector: P) {
      return useContext(storeContext)[selector] as ReturnType<T[P]>;
    },
    getStore() {
      return storeRef.current!;
    }
  };
}
