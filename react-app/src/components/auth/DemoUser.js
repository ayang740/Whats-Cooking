import React, { useState } from 'react';
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { login } from '../../store/session';
import './auth.css'

function DemoUser() {

  const dispatch = useDispatch();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('demo@aa.io');
  const [password, setPassword] = useState('password');

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <>
      <button className='demouser-button' onClick={handleDemoLogin}>Demo User</button>
      <ul className="login-form-errors">
      {errors.length ? errors.map((error, idx) => (
        <li key={idx}>{error}</li>
      )) : null}
      </ul>
    </>
  );
}

export default DemoUser;