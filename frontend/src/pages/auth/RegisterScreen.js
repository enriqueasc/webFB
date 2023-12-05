import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hasToken } from '../../api/Token';

// importamos una imagen
import pet_auth from '../../assets/pets_auth.jpg'
import { authApi } from '../../api/Auth';

export default function RegisterScreen() {
  const history = useHistory();

  return (
    <section className="contact-area pt-50 pb-50">
      <div className="container">
        <div className="container-inner-wrap">
          <div class="card" style={{ borderRadius: '15px' }}>
            <div className="row justify-content-center justify-content-lg-between">
              <div className="col-lg-6 col-md-8 order-2 order-lg-0 pt-50 pb-50 pr-50 pl-50">
                <div className="contact-title mb-20">
                  <h5 className="sub-title">Contact Us</h5>
                  <h2 className="title">Registra tu cuenta<span>.</span></h2>
                </div>
                <div className="contact-wrap-content">
                  <p>Registra tu cuenta para poder acceder a la plataforma.</p>
                  <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    validate={values => {
                      const errors = {};

                      if (!values.name) {
                        errors.name = 'El nombre es requerido';
                      }

                      if (!values.email) {
                        errors.email = 'El correo es requerido';
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                      ) {
                        errors.email = 'Correo invalido, el correo debe tener el formato: example@.com';
                      }

                      if (!values.password) {
                        errors.password = 'La contraseña es requerida';
                      }

                      return errors;
                    }}
                    onSubmit={(values) => {
                      try {
                        authApi.registerUser(values.name, values.email, values.password)
                          .then(response => {
                            console.log(response);
                            // Redireccionar a la pagina de login despues de 3s para mostrar el mensaje de exito
                            toast('🦄 Registro exitoso!', {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                            });

                            setTimeout(() => {
                              history.push('/login');
                            }, 3000);

                          })
                          .catch(error => {
                            console.log(error);
                            toast.error('Error al registrar');
                          });
                      } catch (error) {
                        console.log(error);
                        toast.error('Error al registrar');
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="contact-form">
                        <div className="form-grp">
                          <label htmlFor="name">Nombre completo <span>*</span></label>
                          <Field type="text" name="name" placeholder="Ingresa nombre" />
                          <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                        </div>
                        <div className="form-grp">
                          <label htmlFor="email">Correo <span>*</span></label>
                          <Field type="email" name="email" placeholder="info.example@.com" />
                          <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                        </div>
                        <div className="form-grp">
                          <label htmlFor="password">Contraseña <span>*</span></label>
                          <Field type="password" name="password" placeholder="Ingresa contraseña" />
                          <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                        </div>
                        <button type="submit" className="btn rounded-btn" disabled={isSubmitting}>
                          Registrar cuenta
                        </button>
                      </Form>
                    )}
                  </Formik>
                  {/* <form className="contact-form">
                    <div className="form-grp">
                      <label htmlFor="name">Nombre completo <span>*</span></label>
                      <input type="text" id="name" placeholder="Ingresa nombre" />
                    </div>
                    <div className="form-grp">
                      <label htmlFor="email">Correo <span>*</span></label>
                      <input type="text" id="email" placeholder="info.example@.com" />
                    </div>
                    <div className="form-grp">
                      <label htmlFor="password">Contraseña <span>*</span></label>
                      <input type="password" id="password" placeholder="Ingresa contraseña" />
                    </div>
                    <button type="button" className="btn rounded-btn">Registrate</button>
                  </form> */}
                </div>
                <div class="pt-20">
                  <Link to="/login">Inicia sesión</Link>
                </div>
              </div>

              <div className="col-lg-6">
                <img src={pet_auth} alt="pet_auth" />
              </div>

            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}
