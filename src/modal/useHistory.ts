import { useHistory, useLocation } from "react-router";
import { useRef, useMemo } from "react";

export function useExtreHistory() {
  const history = useHistory();
  const location = useLocation();
  const ref = useRef(history.length);

  const isFirstPage = useMemo(() => {
    return history.length === ref.current;
  }, [history.length]);

  const routeKey = useMemo(() => {
    return location.key;
  }, [location.key]);

  return {
    isFirstPage,
    history,
    routeKey
  };
}