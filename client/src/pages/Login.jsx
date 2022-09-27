import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DIVISION = styled.div`
  display: grid;
  place-items: center;
  place-content: center;
  height: 100vh;
  width: 100vw;
  background: rgb(250, 250, 250);

  .bottom {
  margin: 10px 0px;
  padding: 15px 10px;

  span {
  font-size: 1.255rem;
  }
  button {
  border: none;
  background: none;
  font-size: 1.235rem;
  margin-inline: 7px;
  font-weight: bold;

  :hover {
  text-decoration: underline;
  }}}
`
const CONTAINER = styled.div`
  padding: 20px;
  background: rgb(255, 255, 255);
  width: 500px;
  box-shadow: 7px 9px 5px -1px #edd1d1;
  border-radius: 7px;

  .head {
    padding: 25px 20px;
    font-weight: bold;  
  }

`
const FORM = styled.form.attrs(props => ({
  action: "#"
}))`
.name,
.username,
.number,
.password,
.confirmPassword {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 20px;
}

.span {
  margin: 5px 0px;
  font-size: 0.755rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bolder;
  color: rgb(191, 191, 191);
}

.inputs {
  padding: 16px 15px;
  width: 100%;
  font-size: 15px;
  border-radius: 5px;
  outline-color: gray;
  border: 1px solid rgb(191, 191, 191);

  ::placeholder {
  color: rgb(191, 191, 191);
  }

}
`
const CONTROL = styled.div`
  padding: 25px 20px;

button {
  width: 100%;
  padding: 10px 0px;
  border: 2px solid #09363f;
  background: transparent;
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  border-radius: 7px;
  cursor: pointer;

  :hover {
  background: #09363f;
  color: ghostwhite;
  }
}
`

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const toggleHandle = (elem) => {
    setForm({ ...form, [elem.target.name]: elem.target.value })
  }

  useEffect(() => {
    localStorage.getItem(import.meta.env.VITE_USER_CREDENTIALS) && navigate("/chat");
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
      const URL = 'http://localhost:5000/api/v1/users';

      const { data } = await Axios.post(`${URL}/login`, { username, password });
      const { token } = data;
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

export default Login