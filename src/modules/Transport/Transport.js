const server = '';

const urlBack = 'https://20182codeloft-ofiwkfumvq.now.sh';
//const urlBack = 'https://20182codeloft-iasahymkzp.now.sh';

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
        return Transport.FSend(urlBack + adr, 'GET');
    }

    /**
     * Perform Post requests with specified address
     * @param {string} adr - address of request
     * @param {*} body - body of request
     * @return {Promise}
     */
    static Post(adr, body) {
        return Transport.FSend(urlBack + adr, 'POST', body);
    }

    static Delete(adr, body) {
        return Transport.FSend(urlBack + adr, 'DELETE', body);
    }
    /**
     * Perform requests with specified address
     * @param {string} adr - address of request
     * @param {string} method - method of request
     * @param {*} [body={}] - body of request
     * @return {Promise}
     */
    static FSend(adr, method, body = {}) {
        const url = server + adr;
        const fPar = {
            method: method,
            headers: {
                Host: 'localhost',
                Cookie: 'session_id=testCookie; Expires=Sun, 11 Nov 2018 21:27:04 GMT',
            },
            mode: 'cors',
            credentials: 'same-origin'
        };
        if (method === 'POST') {
            fPar.body = JSON.stringify(body);
            fPar.headers = {
                'Content-Type': 'application/json; charset=utf-8',
            };
        }
        return fetch(url, fPar);
    }

    static GetHTML(template, context) {
        const url = 'http://localhost:3000/template';
        const fPar = {
            method: 'GET',
            headers: {
                Host: 'localhost'
            },
            mode: 'cors',
            credentials: 'same-origin'
        };
        let params = `?template=${template}`;
        for (const field in context) {
            params += `&${field}=${context[field]}`;
        }
        return fetch(url + params, fPar);
    }
}
