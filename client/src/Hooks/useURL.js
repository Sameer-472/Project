import { useLayoutEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function useURL() {
  const [params, setParams] = useState(null);

  useLayoutEffect(() => {
    const params = getQuery();
    setParams(params);
  }, [window?.location?.href]);

  const getQuery = () => {
    const queryParams = {};
    let url = new URL(window.location.href);
    let searchParams = url.searchParams;

    for (const [index, entry] of searchParams.entries()) {
      queryParams[index] = entry;
    }
    return queryParams;
  };

  const generateQueryLink = (url = null, query) => {
    var str = [];

    for (var key in query)
      if (query.hasOwnProperty(key)) {
        str.push(
          encodeURIComponent(key) + "=" + encodeURIComponent(query[key])
        );
      }
    return `${url}?${str.join("&")}`;
  };

  return {
    getQuery,
    generateQueryLink,
    params,
  };
}

export default useURL;
