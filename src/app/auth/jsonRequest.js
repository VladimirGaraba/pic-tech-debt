/**
 * json Request
 */


const jsonRequest = {
  /**
   * Pretends to post to a remote server
   * @param  {string}  endpoint The endpoint of the server that should be contacted
   * @param  {?object} data     The data that should be transferred to the server
   */
  post(URL, headers, body) {
    const options = {
      method: 'POST',
      headers,
      credentials: 'include',
      body,
    };
    return fetch(URL, options)
      .then((response) => {
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            return response.json();
          }
          throw new TypeError("Oops, we haven't got JSON!");
        }
        throw new Error(`${response.status} ${response.statusText}`);
      });
  },
};

export default jsonRequest;
