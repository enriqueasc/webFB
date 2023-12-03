import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Mascotas } from "../api/Mascotas";
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hasToken } from '../api/Token';


function AdoptionShop() {
  const [mascotas, setMascotas] = useState([]); // Estado para almacenar las mascotas

  // Modal para agregar una mascota
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Función para obtener las mascotas
  useEffect(() => {
    try {
      const getMascotas = async () => {
        const response = await Mascotas.getMascotas();
        console.log(response);
        setMascotas(response);
      };
      getMascotas();
    } catch (error) {
      console.log(error);
    }
  }, [])

  return (
    <section className="adoption-shop-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9">
            <div className="section-title text-center mb-65">
              <div className="mb-100">
                <div className="section-icon"><img src="img/icon/pawprint.png" alt="" /></div>
                <h5 className="sub-title">¿Deseas dar un cachorro en adopción?</h5>
                {/* Si el usuario ya inicio sesion puede agregar una mascota y de lo contrario puede registrar una mascota y todo esto lo verificamos con el token almacenado */}
                {hasToken() ? (
                  <button onClick={handleShow} className="btn">Agregar cachorro <img src="img/icon/w_pawprint.png" alt="" /></button>
                ) : (
                  <Link to="/login" className="btn">Debes iniciar sesión <img src="img/icon/w_pawprint.png" alt="" /></Link>
                )}
                {/* <button onClick={handleShow} className="btn">Registrar cachorro <img src="img/icon/w_pawprint.png" alt="" /></button> */}
              </div>
              <h2 className="title">Cachorros en espera de adopción</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">

          {/* Listado de las mascotas */}
          {mascotas.map((mascota) => (
            <div key={mascota._id} className="col-lg-4 col-md-6">
              <div className="adoption-shop-item">
                <div className="adoption-shop-thumb">
                  <img src="img/product/adoption_shop_thumb01.jpg" alt="" />
                  <Link to="/shop-details" className="btn">Adoptar <img src="img/icon/w_pawprint.png" alt="" /></Link>  {/* Cambiar el link */}
                </div>
                <div className="adoption-shop-content">
                  <h4 className="title"><Link to="/shop-details">{mascota.nombre}</Link></h4>
                  <div className="adoption-meta">
                    <ul>
                      <li><i className="fas fa-cog" /><a href="/#">{mascota.raza}</a></li>
                      <li><i className="far fa-calendar-alt" /> Edad: {mascota.edad}</li>
                    </ul>
                  </div>
                  <div className="adoption-rating">
                    <ul>
                      <li className="price">Dueño: <span>{mascota.nombreDuenio}</span></li>
                    </ul>
                    <ul>
                      <li className="price">Dirección: <span>{mascota.direccion}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar mascota para adopción</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                nombre: '',
                raza: '',
                edad: '',
                descripcion: '',
                idDuenio: '655000089e5fd49c9d047b6d',
                nombreDuenio: 'Enrique Ascencio Martínez',
                telefonoDuenio: '',
                direccion: '',
                estatus: '1',
              }}
              validate={(valores) => {
                let errores = {};
                // Validar nombre
                if (!valores.nombre) {
                  errores.nombre = 'Por favor ingresa el nombre de la mascota';
                }
                // Validar raza
                if (!valores.raza) {
                  errores.raza = 'Por favor ingresa la raza de la mascota';
                }
                // Validar edad
                if (!valores.edad) {
                  errores.edad = 'Por favor ingresa la edad de la mascota';
                } else if (valores.edad < 0) {
                  errores.edad = 'La edad no puede ser menor a 0';
                }
                // Validar teléfono
                if (!valores.telefonoDuenio) {
                  errores.telefonoDuenio = 'Por favor ingresa el teléfono';
                }
                // Validar descripción
                if (!valores.descripcion) {
                  errores.descripcion = 'Por favor ingresa la descripción de la mascota';
                }
                // Validar nombre del dueño
                if (!valores.nombreDuenio) {
                  errores.nombreDuenio = 'Por favor ingresa el nombre del dueño';
                }
                // Validar dirección
                if (!valores.direccion) {
                  errores.direccion = 'Por favor ingresa la dirección';
                }
                return errores;
              }}
              onSubmit={(valores) => {
                try {
                  const nuevaMascota = {
                    raza: valores.raza,
                    nombre: valores.nombre,
                    edad: valores.edad,
                    descripcion: valores.descripcion,
                    idDuenio: valores.idDuenio,
                    nombreDuenio: valores.nombreDuenio,
                    telefonoDuenio: valores.telefonoDuenio,
                    direccion: valores.direccion,
                    estatus: valores.estatus,
                  };
                  console.log(nuevaMascota);
                  Mascotas.registerMascota(nuevaMascota)
                    .then(res => {
                      console.log(res);
                      toast('Mascota registrada exitosamente!', {
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
                      toast.error('Error al registrar mascota!', {
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
                    });
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="contact-form">
                  <div className="form-grp">
                    <label htmlFor="nombre">Nombre <span>*</span></label>
                    <Field type="text" name="nombre" placeholder="Ingresa nombre" />
                    <ErrorMessage name="nombre" component="div" style={{ color: 'red' }} />
                  </div>
                  <div className="row">
                    <div className="form-grp col-6">
                      <label htmlFor="raza">Raza <span>*</span></label>
                      <Field type="text" name="raza" placeholder="Ingresa raza" />
                      <ErrorMessage name="raza" component="div" style={{ color: 'red' }} />
                    </div>
                    <div className="form-grp col-6">
                      <label htmlFor="edad">Edad <span>*</span></label>
                      <Field type="text" name="edad" placeholder="Ingresa edad" />
                      <ErrorMessage name="edad" component="div" style={{ color: 'red' }} />
                    </div>
                  </div>
                  <div className="form-grp">
                    <label htmlFor="descripcion">Descripción <span>*</span></label>
                    <Field type="text" name="descripcion" placeholder="Ingresa descripción" />
                    <ErrorMessage name="descripcion" component="div" style={{ color: 'red' }} />
                  </div>
                  <div className="row">
                    <div className="form-grp col-6">
                      <label htmlFor="telefonoDuenio">Teléfono <span>*</span></label>
                      <Field type="text" name="telefonoDuenio" placeholder="Ingresa el teléfono" />
                      <ErrorMessage name="telefonoDuenio" component="div" style={{ color: 'red' }} />
                    </div>
                    <div className="form-grp col-6">
                      <label htmlFor="direccion">Dirección <span>*</span></label>
                      <Field type="text" name="direccion" placeholder="Ingresa dirección" />
                      <ErrorMessage name="direccion" component="div" style={{ color: 'red' }} />
                    </div>
                  </div>
                  {/* <button type="submit" className="btn rounded-btn">
                    Registrar
                  </button> */}
                  <Modal.Footer>
                    <button type="submit" className="btn rounded-btn">
                      Registrar
                    </button>
                  </Modal.Footer>
                </Form>
              )}
            </Formik>


          </Modal.Body>

        </Modal>
      </div>
      <ToastContainer />
    </section>

  )
}

export default AdoptionShop;
