import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { AuthenticationContext, AuthenticationContextProvider } from '../context/AuthenticationContext';
import { User } from '../types/User';

function TestComponent() {
    const context = React.useContext(AuthenticationContext);
    if (!context) throw new Error('Missing context');
    const user: User = { id: 1, username: 'Alice', email: 'alice@example.com' };
    React.useEffect(() => {
        context.setValue(user);
    }, []);
    return <>{context.value ? <>{context.value.username}</> : <>no user</>}</>;
}

test('provides user context with username', async () => {
    render(
        <AuthenticationContextProvider>
            <TestComponent />
        </AuthenticationContextProvider>
    );
    expect(await screen.findByText('Alice')).toBeTruthy();
});
