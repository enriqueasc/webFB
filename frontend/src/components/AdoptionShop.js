import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { Mascotas } from "../api/Mascotas";

function AdoptionShop() {
  const [mascotas, setMascotas] = useState([]); // Estado para almacenar las mascotas

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
                <Link to="/adoption" className="btn">Registrar cachorro <img src="img/icon/w_pawprint.png" alt="" /></Link>
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
                  <Link to="/shop-details" className="btn">Adoptar <img src="img/icon/w_pawprint.png" alt="" /></Link>
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
      </div>
    </section>

  )
}

export default AdoptionShop;
