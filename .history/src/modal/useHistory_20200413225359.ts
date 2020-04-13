import { useHistory as uHistory } from "react-router-dom";

export function useHistory() {
  const history = uHistory();

  return history;
}