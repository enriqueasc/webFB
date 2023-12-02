import { ENV } from '../utils/constants';

async function getMascotas() {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GET_PETS}`;
        const params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const response = await fetch(url, params);

        if (response.status !== 200) throw response;
        return await response.json();
    }
    catch (error) {
        throw error
    }
}

export const Mascotas = {
    getMascotas,
}