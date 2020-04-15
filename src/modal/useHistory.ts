import { useHistory } from "react-router";
import { useRef, useMemo } from "react";

export function useExtreHistory() {
  const history = useHistory();
  const ref = useRef(history.length);

  const isFirstPage = useMemo(() => {
    return history.length === ref.current;
  }, [history.length]);

  return {
    isFirstPage,
    history
  };
}