import { ENV } from '../utils/constants';

async function getProducts() {
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GET_PRODUCTS}`;
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

// Register product
async function registerProduct(productos) {
    // Accedems a cada uno de los valores del objeto productos
    const { nombre, descripcion, precio, telefono, direccion, estatus} = productos;
    try {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.REGISTER_PRODUCTS}`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, descripcion, precio, telefono, direccion, estatus }) 
        }

        const response = await fetch(url, params);

        if (response.status !== 200) throw response;
        return await response.json();
    }
    catch (error) {
        throw error
    }
}

export const Productos = {
    getProducts,
    registerProduct,
}