import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

function isValidJSONString(str): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const useUrlQueryParams = ({ useNestedObjects }: { useNestedObjects?: boolean } = {}): {
  paramsBasedOnRoute: Record<string, any>;
} => {
  const location = useLocation();
  const paramsBasedOnRoute = queryString.parse(location.search, { parseBooleans: true });

  if (useNestedObjects) {
    const mapWithParsed = Object.keys(paramsBasedOnRoute).reduce(
      (acc, key) => ({
        ...acc,
        // URLs in detail pages have this shape: /profile?vehicle=12345
        // But any other page now filters in the following shape: /dashboard?vehicle={ in: [123, 456], min: 50 }
        // TODO we should change the shapeof the Details URL to something like: /profile/{ :id }? ...
        [key]: isValidJSONString(paramsBasedOnRoute[key])
          ? JSON.parse(paramsBasedOnRoute[key] as string)
          : paramsBasedOnRoute[key],
      }),
      {},
    );

    return { paramsBasedOnRoute: mapWithParsed };
  }
  // todo this extra parse should only happen in an case

  return { paramsBasedOnRoute };
};

export default useUrlQueryParams;
