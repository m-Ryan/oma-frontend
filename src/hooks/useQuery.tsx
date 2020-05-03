import { useLocation, useHistory } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import qs from 'qs';

export function useQuery() {
  const location = useLocation();
  const history = useHistory();

  const query = useMemo(() => {
    return qs.parse(location.search, { ignoreQueryPrefix: true });
  }, [location.search]);

  const setSearch = useCallback(
    (
      newQuery: { [key: string]: string | number },
      options: { replace?: boolean } = {}
    ) => {
      const url = qs.stringify(
        { ...query, ...newQuery },
        {
          addQueryPrefix: true
        }
      );
      if (options.replace) {
        history.replace(url);
      } else {
        history.push(url);
      }
    },
    [history, query]
  );

  return {
    query,
    setSearch
  };
}
