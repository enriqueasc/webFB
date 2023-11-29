import React from 'react'
import { Link } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik';

// importamos una imagen
import pet_auth from '../../assets/pets_auth.jpg'


export default function LoginScreen() {
  return (
    <section className="contact-area pt-50 pb-50">
      <div className="container">
        <div className="container-inner-wrap">
          <div class="card" style={{ borderRadius: '15px' }}>
            <div className="row justify-content-center justify-content-lg-between">
              <div className="col-lg-6 col-md-8 order-2 order-lg-0 pt-50 pb-50 pr-50 pl-50">
                <div className="contact-title mb-20">
                  <h5 className="sub-title">Contact Us</h5>
                  <h2 className="title">Iniciar sesión<span>.</span></h2>
                </div>
                <div className="contact-wrap-content">
                  <p>Ingresa tus datos para poder acceder a la plataforma.</p>
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                      const errors = {};
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
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="contact-form">
                        <div className="form-grp">
                          <label htmlFor="email">Correo <span>*</span></label>
                          <Field type="email" name="email" placeholder="info.example@.com" />
                          <ErrorMessage name="email" component="div" style={{ color: 'red' }}/>
                        </div>
                        <div className="form-grp">
                          <label htmlFor="password">Contraseña <span>*</span></label>
                          <Field type="password" name="password" placeholder="Ingresa contraseña" />
                          <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
                        </div>
                        <button type="submit" className="btn rounded-btn" disabled={isSubmitting}>
                          Iniciar sesión
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
                <div class="pt-20">
                  <Link to="/register">Registrate</Link>
                </div>
              </div>

              <div className="col-lg-6">
                <img src={pet_auth} alt="pet_auth" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
