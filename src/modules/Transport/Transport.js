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

	static Put(adr, body) {
		return Transport.FSend(urlBack + adr, 'PUT', body);
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
		const url = adr;
		const fPar = {
			method: method,
			headers: {
				Host: 'localhost',
			},
			mode: 'cors',
			credentials: 'include',
		};
		if (method === 'POST') {
			fPar.body = JSON.stringify(body);
			fPar.headers = {
				'Content-Type': 'application/json; charset=utf-8',
			};
		}
		return fetch(url, fPar);
	}
}
