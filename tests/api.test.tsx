import api from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { authenticateUser } from '../services/api';

const mock = new MockAdapter(api);
const BASE_URL = 'http://192.168.1.84:3333';

describe('authenticateUser()', () => {
    afterEach(() => mock.reset());

    it('returns user with username field normalized', async () => {
        const mockResponse = {
            user: { id: 1, name: 'Alice' },
            accessToken: 'token123'
        };

        mock.onPost(`${BASE_URL}/login`).reply(200, mockResponse);

        const result = await authenticateUser('alice@example.com', 'password');
        expect(result.data.user.username || result.data.user.name).toBe('Alice');
        expect(result.data.accessToken).toBe('token123');
    });

    it('throws when API fails', async () => {
        mock.onPost(`${BASE_URL}/login`).reply(500);
        await expect(authenticateUser('a', 'b')).rejects.toThrow();
    });
});
