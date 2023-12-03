const express = require('express');  //para iniciar express
const mongoose = require('mongoose'); // para conectarnos a la base de datos
const bodyparser = require('body-parser');  // para capturar el body
const cors = require('cors'); // para permitir peticiones desde cualquier frontend
require('dotenv').config(); // es una configuracion  de nuestras variables de entornos

const app = express();  //para apartir de esta cosntante realizar todas nustras configuraciones

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));  // configuramos el body parser
app.use(bodyparser.json());
app.use(cors()); // configuramos cors

// Conexión a Base de datosS
const uri = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.ryzbzxd.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

const option =  { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(uri, option)
.then(() => console.log('Base de datoss conectada'))
.catch(e => console.log('error db:', e))

// import routes

const authRoutes = require('./routes/auth');
const verifyToken = require('./routes/validate-token');
const dashboardRoutes = require('./routes/dashboard');
const mascotaRoutes = require('./routes/mascota');
const productosRoutes = require('./routes/productos');


// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/dashboard', verifyToken, dashboardRoutes);
<<<<<<< HEAD
// app.use('/api/mascota', verifyToken, mascotaRoutes);
app.use('/api/mascota', mascotaRoutes);
=======
app.use('/api/mascota', mascotaRoutes);
app.use('/api/productos', productosRoutes);
>>>>>>> eascencio

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})