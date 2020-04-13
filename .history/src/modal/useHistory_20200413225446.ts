import { useHistory as uHistory } from "react-router-dom";

export function useHistory() {
  const history = uHistory();
  console.log('history', history)
  return history;
}