import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const MyAddress = () => {

  return (
    <Dropdown>
      <Dropdown.Toggle as={NavLink} to="" id="my-dropdown">
        My Dropdown
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <ul>
          <li>
          <Dropdown.Item as={NavLink} to="/my-account">Option 1</Dropdown.Item>
          </li>
          <li>
          <Dropdown.Item as={NavLink} to="/option1">Option 1</Dropdown.Item>
          </li>
          <li>
          <Dropdown.Item as={NavLink} to="/option3">Option 3</Dropdown.Item>
          </li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default MyAddress