import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DIVISION = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100vh;
  width: 100vw;
  background: #1C1C25;
  .bottom {
  margin: 10px 0px;
  padding: 15px 10px;
  color: #ffff;
  span {
  font-size: 1.255rem;
  }
  button {
    border: none;
  background: none;
  font-size: 1.235rem;
  margin-inline: 7px;
  font-weight: bold;
  color: #ffff;
  text-decoration: underline;
  cursor: pointer;
  }}
`
const CONTAINER = styled.div`
  padding: 19px;
  background: #1C1C25;
  width: 400px;
  border-radius: 7px;
  border: 2px solid #edd1d1;
  .head {
    padding: 17px 0px;
    font-weight: bold;
    h1 {
      color: #ffff;
      text-decoration: underline;
    }
  }
  `;
const FORM = styled.form.attrs(props => ({
  action: "#"
}))`
  padding: 7px 0px;
.name,
.username,
.number,
.password,
.confirmPassword {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
}

.span {
  margin: 5px 0px;
  font-size: 0.755rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bolder;
  color: #fff;
}

.inputs {
  padding: 11px 7px;
  width: 100%;
  font-size: 15px;
  border-radius: 5px;
  background: #2B2C32;
  color: #CCD1D1;
  outline: none;
  ::placeholder {
  color: #CCD1D1;
  }
}
`
const CONTROL = styled.div`
  padding: 25px 0px;

button {
  width: 100%;
  padding: 10px 0px;
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  border-radius: 7px;
  cursor: pointer;
  background: #CCD1D1;
}
`

const Signin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const toggleHandle = (elem) => {
    setForm({ ...form, [elem.target.name]: elem.target.value })
  }

  useEffect(() => {
    if (localStorage.getItem(import.meta.env.VITE_USER_CREDENTIALS)) navigate("/chat");
  }, []);

  const TOAST = {
    position: "top-right",
    autoclose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  const handleValidate = () => {
    const { username, password } = form;
    if (password === '') {
      toast.error("Passwords is required", TOAST)
      return false;
    }
    else if (username === '') {
      toast.error("Username is required", TOAST)
      return false;
    }
    return true;
  }

  const handleSubmit = async (elem) => {
    elem.preventDefault();
    if (handleValidate()) {
      const { username, password } = form;
      // const URL = 'http://localhost:5000/api/v1/users';
      const URL = 'https://chatter-backend-qu7r.onrender.com/api/v1/users';

      const { data } = await Axios.post(`${URL}/signin`, { username, password });
      if (data.status === true) {
        localStorage.setItem(import.meta.env.VITE_USER_CREDENTIALS, JSON.stringify(data.user));
        navigate("/chat");
      };
    }
  };

  return (
    <>
      <DIVISION>
        <CONTAINER>
          <div className="head">
            <h1>Sign In</h1>
          </div>
          <FORM onSubmit={handleSubmit}>
            <div className="username">
              <span className='span'>Username</span>
              <input
                type="text"
                placeholder='@username'
                name='username'
                className='inputs'
                onChange={toggleHandle} required />
            </div>
            <div className="password">
              <span className='span'>Password</span>
              <input
                type="password"
                placeholder='Password'
                name='password'
                className='inputs'
                onChange={toggleHandle} required />
            </div>
            <CONTROL>
              <button type="submit">get in</button>
            </CONTROL>
          </FORM>
        </CONTAINER>
        <div className="bottom">
          <span>New here !</span>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>
      </DIVISION>
      <ToastContainer />
    </>
  )
}

export default Signin