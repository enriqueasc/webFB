const router = require('express').Router();
const Productos = require('../models/Productos_model');
const jwt = require('jsonwebtoken');


// validation
const Joi = require('@hapi/joi');

const schemaRegister = Joi.object({
    nombre: Joi.string().min(3).max(255).required(),
    descripcion: Joi.string().min(2).max(450).required(),
    precio: Joi.string().min(3).max(255).required(),
    telefono: Joi.string().min(10).max(10).required(),
    direccion: Joi.string().min(3).max(255).required(),
    estatus: Joi.string().min(1).max(2).required()
});

//registrar mascota
router.post('/registroProducto', async(req, res)=>{
    //regresa un objeto validaciones y dentro viene
    const {error} = schemaRegister.validate(req.body);

    //return res.json({ validaciones })

    if(error){
        return res.status(400).json({error: error.details[0].message})
    }
   
    const producto = new Productos({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        estatus: req.body.estatus
    })

    try{

        const productoDB = await producto.save();
        res.json({
            error: null,
            data: productoDB
        })

    }catch(error){
        res.status(400).json(error)
    }

})


//obtener mascotas
async function getProductos(){
    const productos = await Productos.find({});
    return productos;

};

router.get('/', async(req, res) => {

    getProductos()
        .then((productos) => {
            res.json(productos);
        });

});

//obtener mascotas por id
async function getDetailProducto(id){
    const producto = await Productos.findById(id)
    
    return producto;

};

router.get('/datail', async(req, res) => {

    const id = req.header('id');

    getDetailProducto(id)
        .then((producto) => {
            res.json(producto);
        });

});

module.exports = router;



