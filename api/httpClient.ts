interface Options {
  baseURL?: string;
  headers?: Headers | string[][] | Record<string, string> | undefined;
  parseResponse?: boolean;
  Authorization?: string;
  method?: string;
  body?: string
}

const DefaultOptions: Options = {
  baseURL: '',
  headers: {
    'content-type': 'application/json',
  },
  Authorization: '',
  body: ''
};

class HttpClient {
  _baseURL: string;
  _headers: Headers | string[][] | Record<string, string>;

  constructor(options: Options = DefaultOptions) {
    this._baseURL = options.baseURL || '';
    this._headers = options.headers || {};
  }

  async _fetchJSON(endpoint: string, options: Options = DefaultOptions) {
    const res = await fetch(this._baseURL + endpoint, {
      ...options,
      headers: this._headers,
        
    });

    if (!res.ok) throw new Error(res.statusText);

    if (options.parseResponse !== false && res.status !== 204)
      return res.json();

    return undefined;
  }

  get(endpoint: string, options = {}) {
    return this._fetchJSON(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  post(endpoint: string, body = {}) {
    return this._fetchJSON(endpoint, {
      body: JSON.stringify(body),
      method: 'POST'
    })
  }
}

export default HttpClient;
