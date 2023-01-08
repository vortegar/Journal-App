import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth';
import { startGoogleSignIn } from '../../../src/store/auth/thunks';
import { MemoryRouter } from 'react-router-dom';


const mockstartGoogleSignIn = jest.fn();
const mockstartLoginWhitEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockstartGoogleSignIn,
    startLoginWhitEmailPassword: ({ email, password }) => {
        return () => mockstartLoginWhitEmailPassword({ email, password })
    }
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState:{
        auth: 'not-authenticated',
    }
})
describe('Pruebas en <LoginPage />', () => {

    beforeEach( () => jest.clearAllMocks() ); 

    test('debe de mostrar el componente correctamente', () => {
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1)
    });
    
    test('boton de google debe de llamar el startGoogleSignIn', () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click( googleBtn );
        expect( mockstartGoogleSignIn ).toHaveBeenCalled();
    });
    test('submit debe de llamar startLoginWithEmailPassword', () => {

        const email = 'victorio@google.com';
        const password = '123456';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo'});
        fireEvent.change( emailField, { target: { name: 'email', value: email } });
    
        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

    });
    
})
