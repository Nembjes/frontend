import React from 'react';

const Thanks = () => {


    return (
        <>
                    {/* Breadcrumb Area Start */}
      <div className="breadcrumb-area" style={{ backgroundImage: `url(https://template.hasthemes.com/hmart/hmart/assets/images/about/breadcrunb-bg.webp)` }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 text-center">
              <h2 className="breadcrumb-title">Thank you</h2>
              {/* Breadcrumb List Start */}
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Thanks page</li>
              </ul>
              {/* Breadcrumb List End */}
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Area End */}
        <div className="thank-you-area">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8">
                        <div className="inner_complated">
                            <div className="img_cmpted"><img src="https://template.hasthemes.com/hmart/hmart/assets/images/icons/cmpted_logo.png" alt="" /></div>
                            <p className="dsc_cmpted">Thank you for ordering in our store. You will receive a confirmation
                                email shortly.</p>
                            <div className="btn_cmpted">
                                <a href="shop-left-sidebar" className="shop-btn" title="Go To Shop">Continue Shopping </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Thanks;
