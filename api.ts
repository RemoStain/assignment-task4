import axios, { AxiosResponse } from 'axios';

// Create an Axios instance for your API
const api = axios.create({
    // Before running your 'json-server', get your computer's IP address and
    // update your baseURL to `http://your_ip_address_here:3333` and then run:
    // `npx json-server --watch db.json --port 3333 --host your_ip_address_here`
    //
    // To access your server online without running json-server locally,
    // you can set your baseURL to:
    // `https://my-json-server.typicode.com/<your-github-username>/<your-github-repo>`
    //
    // To use `my-json-server`, make sure your `db.json` is located at the repo root.

    baseURL: 'http://192.168.1.84:3333',
});

/**
 * Authenticate a user with email and password.
 * The response is normalized to always include a username field in user data.
 */
export const authenticateUser = async (email: string, password: string): Promise<AxiosResponse> => {
    const response = await api.post(`/login`, { email, password });

    // Normalize user object to always include username
    const user = response.data.user || {};
    const normalizedUser = {
        ...user,
        username: user.username || user.name || user.user_name || '',
    };

    // Return normalized response so downstream code always has a consistent structure
    return {
        ...response,
        data: {
            ...response.data,
            user: normalizedUser,
        },
    };
};

// Export the api instance for reuse in other parts of the app
export default api;
