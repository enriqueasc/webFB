const router = require('express').Router();
const Mascota = require('../models/Macota_model');
const jwt = require('jsonwebtoken');


// validation
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    raza: Joi.string().min(3).max(255).required(),
    nombre: Joi.string().min(2).max(255).required(),
    edad: Joi.string().min(1).max(255).required(),
    descripcion: Joi.string().min(3).max(255).required(),
    idDuenio: Joi.string().min(3).max(255).required(),
    nombreDuenio: Joi.string().min(3).max(255).required(),
    telefonoDuenio: Joi.string().min(10).max(255).required(),
    direccion: Joi.string().min(3).max(255).required(),
    estatus: Joi.string().min(1).max(255).required()
});

//registrar mascota
router.post('/registroMascota', async(req, res)=>{
    //regresa un objeto validaciones y dentro viene
    const {error} = schemaRegister.validate(req.body);

    //return res.json({ validaciones })

    if(error){
        return res.status(400).json({error: error.details[0].message})
    }
   
    const mascota = new Mascota({
        raza: req.body.raza,
        nombre: req.body.nombre,
        edad: req.body.edad,
        descripcion: req.body.descripcion,
        idDuenio: req.body.idDuenio,
        nombreDuenio: req.body.nombreDuenio,
        telefonoDuenio: req.body.telefonoDuenio,
        direccion: req.body.direccion,
        estatus: req.body.estatus
    })

    try{

        const mascotaDB = await mascota.save();
        res.json({
            error: null,
            data: mascotaDB
        })

    }catch(error){
        res.status(400).json(error)
    }

})


//obtener mascotas
async function getMascotas(){
    const mascotas = await Mascota.find({});
    return mascotas;

};

router.get('/', async(req, res) => {

    getMascotas()
        .then((mascotas) => {
            res.json(mascotas);
        });

});

//obtener mascotas por id
async function getDetailMascota(id){
    const mascota = await Mascota.findById(id)
    
    return mascota;

};

router.get('/datail', async(req, res) => {

    const id = req.header('id');

    getDetailMascota(id)
        .then((mascotas) => {
            res.json(mascotas);
        });

});

module.exports = router;



