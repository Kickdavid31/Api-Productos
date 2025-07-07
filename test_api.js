const axios = require('axios');

const API_URL = 'http://localhost:3000/api';

async function main() {
    try {
        // Registro
        console.log('Registrando usuario...');
        await axios.post(`${API_URL}/auth/register`, {
            username: 'testuser',
            password: 'password123'
        });
        console.log('Registro OK (o usuario ya existe)');
    } catch (err) {
        if (err.response && err.response.status !== 400) {
            return console.error('Error en registro:', err.message);
        }
    }

    // Login
    let accessToken, refreshToken;
    try {
        console.log('Logueando usuario...');
        const res = await axios.post(`${API_URL}/auth/login`, {
            username: 'testuser',
            password: 'password123'
        });
        accessToken = res.data.accessToken;
        refreshToken = res.data.refreshToken;
        console.log('Login OK. accessToken:', accessToken);
    } catch (err) {
        return console.error('Error en login:', err.message);
    }

    // Listar productos (sin datos aún)
    try {
        console.log('Obteniendo productos...');
        const res = await axios.get(`${API_URL}/products`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        console.log('Lista de productos:', res.data);
    } catch (err) {
        console.error('Error al obtener productos:', err.message);
    }

    // Intentar crear producto (falla si no eres admin)
    try {
        console.log('Creando producto (test)...');
        const res = await axios.post(`${API_URL}/products`, {
            name: 'Televisor',
            description: 'Tele 55',
            price: 600
        }, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        console.log('Producto creado:', res.data);
    } catch (err) {
        // Esperamos 403 Forbidden si el usuario no es admin
        if (err.response && err.response.status === 403)
            console.log('No tienes permiso (solo admin puede crear productos: ¡Funciona el sistema de roles!)');
        else
            console.error('Error al crear producto:', err.message);
    }
}

main();

