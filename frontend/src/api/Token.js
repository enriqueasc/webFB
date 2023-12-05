// Función para obtener el token del localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Función para almacenar el token en el localStorage
function setToken(token) {
    localStorage.setItem('token', token);
}

// Función para eliminar el token del localStorage
function removeToken() {
    localStorage.removeItem('token');
}

// Función para verificar si hay un token almacenado
function hasToken() {
    return !!localStorage.getItem('token');
}

export { getToken, setToken, removeToken, hasToken };
