const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
    fechaRegistro:{
        type: Date,
        default: Date.now
    },
    raza:{
        type: String,
        required: [true, 'La raza es obligatoria'],
        min: 3,
        max: 255,
    },
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        min: 2,
        max: 255,
    },
    edad:{
        type: String,
        required: [true, 'La edad es obligatoria'],
        min: 1,
        max: 255,
    },
    descripcion:{
        type: String,
        required: [true, 'La descripcion es obligatoria'],
        min: 3,
        max: 255,
    },
    idDuenio:{
        type: String,
        required: [true, 'El duenio es obligatorio'],
        min: 3,
        max: 255,
    },
    nombreDuenio:{
        type: String,
        required: [true, 'El nombre del duenio es obligatorio'],
        min: 3,
        max: 255,
    },
    telefonoDuenio:{
        type: String,
        required: [true, 'El telefono del duenio es obligatorio'],
        min: 10,
        max: 255,
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
    fechaAdopcion:{
        type: Date,
        default: null,
        
    },
    idUsuarioAdopta:{
        type: String,
        default: null,
    },
    nombreUsuarioAdopta:{
        type: String,
        default: null,
        
    },

});

module.exports = mongoose.model('Mascota', mascotaSchema);