import { Params } from "../interfaces";

const esc = encodeURIComponent;

const getParamsValue = (obj: Params, key: string) => {
  let k: keyof typeof obj;
  for (k in obj) {
    if (k === key) {
      return obj[k];
    }
  }
  return "";
};

const queryBuilder = (params: Params) => {
  const query = Object.keys(params)
    .map(key => {
      let value = getParamsValue(params, key);
      if (!value) return null;

      return `${esc(key)}=${value}`;
    })
    .filter(i => i);

  return query.join("&");
};

export default queryBuilder;
