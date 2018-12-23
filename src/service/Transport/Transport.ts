const urlBack = '/api';

/**
 * Module with methods for HTTP-requests
 * @module Transport
 */
export default class Transport {
    /**
     ** Perform Get requests with specified address
     * @param {string} adr - address of request
     * @return {Promise}
     */
    public static Get(adr) {
        return Transport.FSend(urlBack + adr, 'GET');
    }

    /**
     * Perform Post requests with specified address
     * @param {string} adr - address of request
     * @param {*} body - body of request
     * @return {Promise}
     */
    public static Post(adr, body) {
        return Transport.FSend(urlBack + adr, 'POST', body);
    }

    public static Put(adr, body) {
        return Transport.FSend(urlBack + adr, 'PUT', body);
    }

    public static Delete(adr, body) {
        return Transport.FSend(urlBack + adr, 'DELETE', body);
    }

    /**
     * Perform requests with specified address
     * @param {string} adr - address of request
     * @param {string} methodName - method of request
     * @param {*} [body={}] - body of request
     * @return {Promise}
     */
    private static FSend(adr: string, methodName: string, body = {}) {
        const url = adr;
        const fPar: RequestInit = {
            method: methodName,
            headers: {},
            credentials: 'include',
        };
        if (methodName === 'POST') {
            fPar.body = JSON.stringify(body);
            fPar.headers['Content-Type'] = 'application/json; charset=utf-8';
        }
        return fetch(url, fPar);
    }
}