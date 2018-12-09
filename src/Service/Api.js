class Api {
    fetchAsync(url, method, headers, body) {
        if (method === 'get' || method === 'GET') {
            return fetch(
url,
                {
                    method,
                    headers,
                },
).then(response => response.json());
        }
            return fetch(
url,
                {
                    method,
                    headers,
                    body: JSON.stringify(body),
                },
).then(response => response.json());
    }
}

export default Api;
