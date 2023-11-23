export const getUrlParams = (url: string): Record<string, string> => {
  const queryString = url.split("?")[1];
  const queryParams: Record<string, string> = {};
  if (queryString) {
    const params = queryString.split("&");
    for (const param of params) {
      const [key, value] = param.split("=");
      if (key && value) queryParams[key] = decodeURIComponent(value);
    }
  }

  return queryParams;
};
