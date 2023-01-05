import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiLogoutCircleLine } from 'react-icons/ri';
import styled from 'styled-components';

import menu from '../assets/menu.png';
import logout from '../assets/logout.svg';
import { ChatSearch } from './';

const ASIDE = styled.div`
background : rgb(255, 255, 255);
width : 22rem;
height: 100vh;
font-weight : bold;
font-size : 1.355rem;
.hello__section {
  height: inherit;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 99;
  width: 5rem;
  display: none;
  background : rgb(255, 255, 255);
  align-items: flex-start;
  justify-content: center;
  padding-top: 20px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
    aspect-ratio: 1;
    width: 18px;
    margin: 5px 12px;
    cursor : pointer;
  }
  p {
    color : red;
    font-size: 0.9rem;
  }
  }
}
.blocker {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  content: ' ';
  background: rgba(0,0,0,0.2);
  z-index: 99;
}
`;

const SECTION = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: inherit;
  .navigation {
  display : flex;
  align-items : center;
  justify-content : center;
  padding : 3px 7px;
  position: fixed;
  left: 0px;
  top: 0px;
  width: inherit;
  z-index: 9;
  border-right: 2px solid rgba(0,0,0,0.5);
  .menu {
    background : url(${menu}) no-repeat center center/cover;
    aspect-ratio: 1;
    width: 25px;
    cursor : pointer;
    margin: 0px 9px;
    z-index: 999;
  }}
  .users {
    border-right: 2px solid rgba(0,0,0,0.5);
    width: inherit;
  position: fixed;
  top: 58px;
  left: 0px;
  bottom: 0px;
  z-index : 9;
  overflow-y: scroll;
  cursor: pointer;
  -ms-overflow-style: none;
  scrollbar-width: none;
   ::-webkit-scrollbar {
    width: 10px;
    display: none;
  }
  .column {
    padding : 5px 7px;
    font-size : 0.9rem;
    letter-spacing : 1px;
    display: flex;
    align-items: center;
    .avatar {
      font-size: 1.5rem;
      border: 2px solid black;
      border-radius: 50%;
      padding: 7px;
      aspect-ratio: 1;
      width: 3.315rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    div {
      margin-inline: 3px;
      h3 {
        font-weight: 500;
      }
    }
  }
  .selected {
    box-shadow: 4px 6px #000000;
    div {
      h3 {
        font-weight: bold;
        font-size: 1.3rem;
      }
    }
  }}`;

const toggle = () => {
  const helloSection = document.querySelector('.hello__section');
  const blocker = document.querySelector('.blocker');
  helloSection.style.display = 'flex';
  blocker.style.display = 'block';
}

const hide = () => {
  const helloSection = document.querySelector('.hello__section');
  const blocker = document.querySelector('.blocker');
  helloSection.style.display = 'none';
  blocker.style.display = 'none';
}

const ChatList = ({ currentUserData, userDetails }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(undefined);

  const toggleSelected = (i, name, number, _id, username) => {
    setSelected(i);
    userDetails({ name, number, _id, username });
  }

  const handleLogout = () => {
    if (localStorage.getItem(import.meta.env.VITE_USER_CREDENTIALS)) {
      localStorage.removeItem(import.meta.env.VITE_USER_CREDENTIALS);
      navigate("/");
    }
    else {
      navigate("/");
    }
  };

  return (
    <>
      <ASIDE>
        <div className="blocker" onClick={hide}></div>
        <div className="hello__section">
          <div>
            <img onClick={handleLogout} src={logout} />
            <p>Log Out</p>
          </div>
        </div>
        <SECTION>
          <div className='navigation'>
            <div className='menu' onClick={toggle}></div>
            <ChatSearch />
          </div>
          {/* {
            currentUserData?.map(({ name, _id, number, username }, i) => {
              return (
                <div className={`column ${i === selected ? 'selected' : ''}`} key={_id} onClick={() => toggleSelected(i, name, number, _id, username)}>
                  <div className='avatar'>{name.charAt(0)}</div>
                  <div>
                    <h3>{name.split(" ")[0]}</h3>
                  </div>
                </div>
              )
            })
          } */}
          <div className="users">
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
            <div className="column">
              <div className="avatar">E</div>
              <div>
                <h3>
                  Ekanshu
                </h3>
              </div>
            </div>
          </div>
        </SECTION>
      </ASIDE >
    </>
  )
}

export default ChatList






// const ASIDE = styled.div`
//   display : flex;
//   align-items : center;
//   justify-content : center;
//   flex : 1;
//   padding : 7px 3px;
// `;

// const Input = styled.input.attrs(props => ({
//   type: "search",
// }))`
// flex : 1;
// padding : 9px;

// ::placeholder,
// ::-webkit-input-placeholder {
//   color : rgb(61, 60, 60);
//   font-size : 1rem;
// }

// &:focus  {
// background : rgb(255, 255, 255);
// }

// background : #e7e7e7;
// border: none;
// border-radius : 3px;
// `;

// const HelloSearch = () => {

//   const [value, setValue] = useState('');
//   const toggleChange = (elem) => {
//     elem.preventDefault();
//     setValue(elem.target.value);
//   }

//   return (
//     <ASIDE>
//       <Input placeholder="search"
//         name="search"
//         id="search"
//         value={value}
//         onChange={toggleChange} />
//     </ASIDE>
//   )
// }
