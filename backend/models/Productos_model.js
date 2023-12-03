const mongoose = require('mongoose');

const productosSchema = new mongoose.Schema({
    fechaRegistro:{
        type: Date,
        default: Date.now
    },
    nombre:{
        type: String,
        required: [true, 'La raza es obligatoria'],
        min: 3,
        max: 255,
    },
    descripcion:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        min: 2,
        max: 450,
    },
   
    precio:{
        type: String,
        required: [true, 'El nombre del duenio es obligatorio'],
        min: 3,
        max: 255,
    },
    telefono:{
        type: String,
        required: [true, 'El telefono del duenio es obligatorio'],
        min: 10,
        max: 10,
    },
    direccion:{
        type: String,
        required: [true, 'La direccion es obligatoria'],
        min: 3,
        max: 255,
    },
    estatus:{
        type: String,
        required: [true, 'El estatus es obligatorio'],
        min: 1,
        max: 255,
    },
});

module.exports = mongoose.model('Productos', productosSchema);