import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hasToken } from '../../api/Token';
import { Productos } from '../../api/Productos';

function ShopArea() {
  const [productos, setProductos] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    try {
      const getProducts = async () => {
        const response = await Productos.getProducts();
        console.log(response);
        setProductos(response);
      };
      getProducts();
    }
    catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <div className="shop-area pt-110 pb-110">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-8 order-2 order-lg-0">
            <aside className="shop-sidebar">

              <div className="widget">
                <h5 className="sub-title">¿Deseas publicar un producto?</h5>
                {hasToken() ?
                  <button className="btn" onClick={handleShow2}>Publicar</button>
                  :
                  <Link to="/login" className="btn">Iniciar sesión</Link>
                }
                {/* <button className="btn" onClick={handleShow2}>¿Deseas vender?</button> */}
              </div>

              <div className="widget shop-widget-banner">
                <Link to="/shop"><img src="img/product/shop_add.jpg" alt="" /></Link>
              </div>

            </aside>
          </div>

          <div className="col-lg-9">
            <div className="shop-wrap">
              <h4 className="title">Tienda</h4>
              <div className="row justify-content-center">
                {productos.map((producto) => (
                  <div key={producto._id} className="col-lg-4 col-sm-6">
                    <div className="shop-item mb-55">
                      <div className="shop-thumb">
                        <img src="img/product/shop_item01.jpg" alt="" />
                      </div>
                      <div className="shop-content">
                        {/* <span>Dog toy’s</span> */}
                        <h4 className="title"><a className='' onClick={handleShow}>{producto.nombre}</a></h4>
                        <div className="shop-content-bottom">
                          <span className="price">${producto.precio}</span>
                        </div>
                      </div>
                    </div>

                    <Modal show={show} onHide={handleClose} animation={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Información del producto</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <ul>
                          <li>Detalle: {producto.descripcion}</li>
                          <li>Teléfono: {producto.telefono}</li>
                          <li>Dirección: {producto.direccion}</li>
                        </ul>
                      </Modal.Body>
                      {/* <Modal.Footer>
                        <button variant="secondary" onClick={handleClose}>
                          Close
                        </button>
                        <button variant="primary" onClick={handleClose}>
                          Save Changes
                        </button>
                      </Modal.Footer> */}
                    </Modal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              nombre: '',
              descripcion: '',
              precio: '',
              telefono: '',
              direccion: '',
              estatus: '1',
            }}
            validate={(valores) => {
              let errores = {};

              if (!valores.nombre) {
                errores.nombre = 'Por favor ingresa el nombre del producto';
              }
              if (!valores.descripcion) {
                errores.descripcion = 'Por favor ingresa la descripción del producto';
              }
              if (!valores.precio) {
                errores.precio = 'Por favor ingresa el precio del producto';
              }
              if (!valores.telefono) {
                errores.telefono = 'Por favor ingresa el teléfono de contacto';
              }
              if (!valores.direccion) {
                errores.direccion = 'Por favor ingresa la dirección del contacto';
              }

              return errores;
            }}
            onSubmit={(valores) => {
              try {
                const nuevoProducto = {
                  nombre: valores.nombre,
                  descripcion: valores.descripcion,
                  precio: valores.precio,
                  telefono: valores.telefono,
                  direccion: valores.direccion,
                  estatus: valores.estatus,
                };
                Productos.registerProduct(nuevoProducto)
                  .then(res => {
                    console.log(res);
                    toast('Producto registrado exitosamente!', {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });

                    // Cerrar modal
                    handleClose();
                  })
                  .catch(error => {
                    console.log(error);
                    toast.error('Error al registrar producto!', {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });

                    // Cerrar modal
                    handleClose2();
                  });
              } catch (error) {
                console.log(error);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="contact-form">
                <div className="row">
                  <div className="form-grp col-6">
                    <label htmlFor="nombre">Nombre del producto <span>*</span></label>
                    <Field type="text" name="nombre" placeholder="Ingresa nombre" />
                    <ErrorMessage name="nombre" component="div" style={{ color: 'red' }} />
                  </div>
                  <div className="form-grp col-6">
                    <label htmlFor="precio">Precio <span>*</span></label>
                    <Field type="text" name="precio" placeholder="Ingresa precio" />
                    <ErrorMessage name="precio" component="div" style={{ color: 'red' }} />
                  </div>
                </div>
                <div className="row">
                </div>
                <div className="form-grp">
                  <label htmlFor="descripcion">Descripción <span>*</span></label>
                  <Field type="text" name="descripcion" placeholder="Ingresa descripción" />
                  <ErrorMessage name="descripcion" component="div" style={{ color: 'red' }} />
                </div>
                <div className="row">
                  <div className="form-grp col-6">
                    <label htmlFor="telefono">Teléfono <span>*</span></label>
                    <Field type="text" name="telefono" placeholder="Ingresa el teléfono" />
                    <ErrorMessage name="telefono" component="div" style={{ color: 'red' }} />
                  </div>
                  <div className="form-grp col-6">
                    <label htmlFor="direccion">Dirección <span>*</span></label>
                    <Field type="text" name="direccion" placeholder="Ingresa dirección" />
                    <ErrorMessage name="direccion" component="div" style={{ color: 'red' }} />
                  </div>
                </div>
                <Modal.Footer>
                  <button type="submit" className="btn rounded-btn">
                    Registrar producto
                  </button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>


        </Modal.Body>

      </Modal>
    </div>
  )
}

export default ShopArea;
