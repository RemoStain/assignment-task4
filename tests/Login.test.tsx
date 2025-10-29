import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../pages/Login';
import { AuthenticationContext } from '../context/AuthenticationContext';
import * as api from '../services/api';

jest.mock('../services/api');

describe('Login', () => {
    const mockSetValue = jest.fn();
    const mockNavigate = jest.fn();

    const renderLogin = () =>
        render(
            <AuthenticationContext.Provider value={{ value: null, setValue: mockSetValue }}>
                <Login navigation={{ navigate: mockNavigate } as any} />
            </AuthenticationContext.Provider>
        );

    beforeEach(() => jest.clearAllMocks());

    it('calls API and sets user on success', async () => {
        (api.authenticateUser as jest.Mock).mockResolvedValueOnce({
            data: { user: { id: 1, username: 'Alice' }, accessToken: 'token' },
        });

        const { getByText, getAllByRole } = renderLogin();
        const inputs = getAllByRole('textbox');
        fireEvent.changeText(inputs[0], 'alice@example.com');
        fireEvent.changeText(inputs[1], 'password');
        fireEvent.press(getByText('Log in'));

        await waitFor(() => {
            expect(mockSetValue).toHaveBeenCalledWith({ id: 1, username: 'Alice' });
            expect(mockNavigate).toHaveBeenCalledWith('EventsMap');
        });
    });

    it('shows alert on authentication error', async () => {
        (api.authenticateUser as jest.Mock).mockRejectedValueOnce({
            response: { data: 'Invalid credentials' },
        });

        const { getByText, getAllByRole } = renderLogin();
        const inputs = getAllByRole('textbox');
        fireEvent.changeText(inputs[0], 'bad@example.com');
        fireEvent.changeText(inputs[1], 'wrong');
        fireEvent.press(getByText('Log in'));

        await waitFor(() => {
            expect(api.authenticateUser).toHaveBeenCalled();
            expect(mockSetValue).not.toHaveBeenCalled();
        });
    });
});
