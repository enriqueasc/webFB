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

// Register mascota
async function registerMascota(mascotas) {
    // Accedems a cada uno de los valores del objeto mascotas
    const { raza, nombre, edad, descripcion, idDuenio, nombreDuenio, telefonoDuenio, direccion, estatus } = mascotas;
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.REGISTER_PETS}`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ raza, nombre, edad, descripcion, idDuenio, nombreDuenio, telefonoDuenio, direccion, estatus }) 
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
    registerMascota,
}