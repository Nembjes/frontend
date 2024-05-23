import React from 'react';

const Contact = () => {
    return (
        <div>
            {/* Breadcrumb Area Start */}
      <div className="breadcrumb-area" style={{ backgroundImage: `url(https://template.hasthemes.com/hmart/hmart/assets/images/about/breadcrunb-bg.webp)` }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 text-center">
              <h2 className="breadcrumb-title">Contact Us</h2>
              {/* Breadcrumb List Start */}
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Contact</li>
              </ul>
              {/* Breadcrumb List End */}
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Area End */}
            {/* Contact Area Start */}
            <div className="contact-area">
                <div className="container">
                    <div className="contact-wrapper">
                        <div className="row">
                            <div className="col-12">
                                <div className="contact-form">
                                    <div className="contact-title mb-30">
                                        <h2 className="title">Send A Quest</h2>
                                    </div>
                                    <form className="contact-form-style" id="contact-form" action="https://whizthemes.com/nazmul/php/mail.php" method="post">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <input name="con_firstName" placeholder="First Name*" type="text" required />
                                            </div>
                                            <div className="col-lg-6">
                                                <input name="con_lastName" placeholder="Last Name*" type="text" required />
                                            </div>
                                            <div className="col-lg-6">
                                                <input name="con_email" placeholder="Email*" type="email" required />
                                            </div>
                                            <div className="col-lg-12">
                                                <textarea name="con_message" placeholder="Your Message*" required></textarea>
                                                <button className="btn btn-primary" type="submit">Send Message</button>
                                            </div>
                                        </div>
                                    </form>
                                    <p className="form-messege"></p>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="contact-info">
                                    <div className="single-contact">
                                        <div className="icon-box">
                                            <img src="https://template.hasthemes.com/hmart/hmart/assets/images/icons/contact-1.png" alt="" />
                                        </div>
                                        <div className="info-box">
                                            <h5 className="title">Address</h5>
                                            <p>Tallinn, Punane tee 56</p>
                                        </div>
                                    </div>
                                    <div className="single-contact">
                                        <div className="icon-box">
                                            <img src="https://template.hasthemes.com/hmart/hmart/assets/images/icons/contact-2.png" alt="" />
                                        </div>
                                        <div className="info-box">
                                            <h5 className="title">Phone No</h5>
                                            <p><a href="tel:0123456789">+372 5555 5555</a></p>
                                            <p><a href="tel:0123456789">+372 5555 5555</a></p>
                                        </div>
                                    </div>
                                    <div className="single-contact m-0">
                                        <div className="icon-box">
                                            <img src="https://template.hasthemes.com/hmart/hmart/assets/images/icons/contact-3.png" alt="" />
                                        </div>
                                        <div className="info-box">
                                            <h5 className="title">Email/Web</h5>
                                            <p><a href="mailto:demo@example.com">elshop@store.com</a></p>
                                            <p><a href="https://www.example.com">elshop@store.com</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact Area End */}
            {/* map Area Start */}
            <div className="contact-map">
                <div id="mapid">
                    <div className="mapouter">
                        <div className="gmap_canvas">
                            <iframe id="gmap_canvas" src="https://maps.google.com/maps?q=121%20King%20St%2C%20Melbourne%20VIC%203000%2C%20Australia&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
                            <a href="https://sites.google.com/view/maps-api-v2/mapv2"></a>
                        </div>
                    </div>
                </div>
            </div>
            {/* map Area End */}
        </div>
    );
};

export default Contact;
