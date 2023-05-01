import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const MyAddress = () => {

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <form className="form-horizontal" role="form">

            <h2>Address:- </h2>

            <div className="form-group">
              <label htmlFor="inputFullName" className="col-sm-2 control-label">Full Name:-</label>
              <div className="col-sm-10">
               
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="inputAddressLine1" className="col-sm-2 control-label">Address:-</label>
              <div className="col-sm-10">
               
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="inputCityTown" className="col-sm-2 control-label">City / Town:-</label>
              <div className="col-sm-10">
                
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="inputStateProvinceRegion" className="col-sm-2 control-label">State:-</label>
              <div className="col-sm-10">
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="inputZipPostalCode" className="col-sm-2 control-label">Postal Code:-</label>
              <div className="col-sm-10">
               
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="selectCountry" className="col-sm-2 control-label">Country:-</label>
              <div className="col-sm-10">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyAddress