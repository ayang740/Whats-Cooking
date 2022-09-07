import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-page-wrapper'>
      <div className='login-page-title'>
        Sign in to your account
      </div>
      <form className='login-page-form' onSubmit={onLogin}>
        <div className='login-page-form-errors'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='login-page-form-info'>
          <label className='login-page-form-label' htmlFor='email'>Email</label>
          <input
            className='login-page-form-input'
            name='email'
            type='text'
            placeholder='Enter your email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='login-page-form-info'>
          <label className='login-page-form-label' htmlFor='password'>Password</label>
          <input
            className='login-page-form-input'
            name='password'
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className='login-page-form-button-container'>
          <button className='login-page-form-button' type='submit'>Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
