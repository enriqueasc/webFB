import { ENV } from '../utils/constants';
import { setToken } from './Token';

async function registerUser(name, email, password) {
    console.log('registerUser', name, email, password);
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.REGISTER}`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        }
        const response = await fetch(url, params);

        if (response.status !== 200) throw response;
        return response.json();
    }
    catch (error) {
        throw error
    }
}



// async function login(email, password) {
//     try {
//         const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LOGIN}`;
//         const params = {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ email, password })
//         }

//         const response = await fetch(url, params);

//         if (response.status !== 200) throw response;
//         return await response.json();
//     }
//     catch (error) {
//         throw error
//     }
// }

async function login(email, password) {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LOGIN}`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }

        const response = await fetch(url, params);

        if (response.status !== 200) throw response;

        const responseData = await response.json();

        if (responseData && responseData.data && responseData.data.token) {
            // Almacenar el token en el localStorage
            setToken(responseData.data.token);
            console.log('Token almacenado con éxito:', responseData.data.token);
        } else {
            throw new Error('Token no recibido en la respuesta del login');
        }

        return responseData; // Devuelve la respuesta del servidor
    } catch (error) {
        throw error;
    }
}

export const authApi = {
    registerUser,
    login
}
