import fetch, { Headers } from 'node-fetch';

/**
 * Generic helper module to create curl request objects.
 *
 * @param accessToken user specific API Key
 * @param method HTTP Method (e.g GET,POST,PUT,DELETE) to be used while making a request
 * @param url API Endpoint URL
 * @param body API request body
 * @returns {Promise<unknown>} API Response object
 */
const makeRequest = async (accessToken, method, url, body = null) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
    });

    const params = {
        method: method,
        headers: headers
    };
    // if body is passed on as a parameter add it to the request params
    if (body) {
        params['body'] = JSON.stringify(body);
    }

    const response = await fetch(url, params);

    return await response.json();
};

export default makeRequest;
