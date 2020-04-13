import { useHistory } from "react-router-dom";

export function useNavigator() {
  const history = useHistory();

  return history;
}