const server='';

const urlBack = 'https://apoj.herokuapp.com';

/**
 * Module with methods for HTTP-requests
 * @module Transport
 */
export default class Transport {
    /**
     * Perform Get requests with specified address
     * @param {string} adr - address of request
     * @return {Promise}
     */
    static Get(adr) {
        return Transport.FSend(urlBack + adr, 'get');
    }

    /**
     * Perform Post requests with specified address
     * @param {string} adr - address of request
     * @param {*} body - body of request
     * @return {Promise}
     */
    static Post(adr, body) {
        return Transport.FSend(urlBack + adr, 'post', body);
    }

    /**
     * Perform requests with specified address
     * @param {string} adr - address of request
     * @param {string} method - method of request
     * @param {*} [body={}] - body of request
     * @return {Promise}
     */
    static FSend(adr, method, body = {}) {
        const url = server+adr;
        const fPar = {
            method: method,
            // mode: 'cors',
            credentials: 'include',
        };
        if (method === 'post') {
            fPar.body = JSON.stringify(body);
            fPar.headers = {
                'Content-Type': 'application/json; charset=utf-8',
            };
        }
        return fetch(url, fPar)
            .then((response) => {
                if (response.status >= 400) {
                    throw response;
                }

                return response.json();
            });
    }
}