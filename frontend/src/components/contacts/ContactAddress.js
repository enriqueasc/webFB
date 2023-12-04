import React from 'react';

function ContactAddress() {
  return (
    <div className="col-xl-12 col-lg-12 col-md-8">
      <div className="contact-info-wrap">
        <div className="contact-img">
          <img src="img/images/contact_img.png" alt="" />
        </div>
        <div className="contact-info-list">
          <ul>
            <li>
              <div className="icon"><i className="fas fa-map-marker-alt" /></div>
              <div className="content">
                <a href='https://maps.app.goo.gl/n1F75BArGkeCH67o7' target='_blank'>Av. Pie de la Cuesta 2501, Nacional, 76148 Santiago de Querétaro, Qro.</a>
              </div>
            </li>
            <li>
              <div className="icon"><i className="fas fa-phone-alt" /></div>
              <div className="content">
                <a href="https://wa.me/4423228881" target='_blank'>+52 (442)322 8881</a>
              </div>
            </li>
            <li>
              <div className="icon"><i className="fas fa-envelope-open" /></div>
              <div className="content">
                <p>Contact@ info.com</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="contact-social">
          <ul>
            <li><a href="/#"><i className="fab fa-facebook-f" /></a></li>
            <li><a href="/#"><i className="fab fa-twitter" /></a></li>
            <li><a href="/#"><i className="fab fa-linkedin-in" /></a></li>
          </ul>
        </div>
      </div>
    </div>

  )
}

export default ContactAddress;
