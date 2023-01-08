import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedStated, demoUser, initialState, notAuthenticatedStated } from "../../fixtures/authFixtures";


describe('Prueba}s en el authSlice', () => {
    test('debe de regresar el estado inicial y llamarse "auth"', () => {
        
        const state = authSlice.reducer( initialState, {} );

        expect( authSlice.name ).toBe('auth');
        expect( state ).toEqual( initialState );
    });

    test('debe de realizara la autenticación', () => {

        const state = authSlice.reducer( initialState, login( demoUser ) );
        expect( state ).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    })

    test('debe de realizar el logout sin argumentos', () => {

        const state = authSlice.reducer( authenticatedStated, logout( demoUser ) );
        console.log(state)
        console.log(logout( demoUser ))
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,

        });
    })
    test('debe de realizar el logout y mostrar un mensaje de error', () => {

        const errorMessage = 'Credenciales no son correctas' 

        const state = authSlice.reducer( authenticatedStated, logout({ errorMessage }) );
       
        expect( state ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,

        });
    });

    test('debe de cambiar el estado a checking', () => {

        const state =  authSlice.reducer( authenticatedStated, checkingCredentials() );
        expect( state.status ).toBe('checking');
    });
})

