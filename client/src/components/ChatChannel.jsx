import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CgMoreVertical } from 'react-icons/cg';
import Axios from 'axios';

import { ChatChannelInput } from './';


const DIVISION = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 100%;
`;

const USER = styled.header`
width: inherit;
background: #ffffff;
box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
-webkit-box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
-moz-box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
padding: 11px 9px;
display: flex;
align-items: center;
justify-content: space-between;
.user__info {
  position: relative;
  span {
    cursor: pointer;
  }
  template {
    display: block;
    background: #ffffff;
    box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
    -webkit-box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
    -moz-box-shadow: 0px 7px 7px -1px rgba(0,0,0,0.4);
    border-radius: 0px 0px 4px 4px;
    padding: 11px 7px;
    margin-top: 7px;
    position: absolute;
    right: 0%;
    width: 278px;
    p {
      font-size: 1.3rem;
      padding: 3px 0px;
    }
  }
}
`;

const CONTAINER = styled.div`
height: calc(100% - 4rem);
width: 100%;
background: #297373;
`;

const MESSAGES = styled.section`
width: 100%;
padding: 9px 17px;
.messages {
  width: 100%;
  .message {
    display: flex;
    align-items: center;
    div {
      margin-inline: 5px;
      font-size: 1.45rem;
      padding: 3px 0px;
    }
  }
  .sender {
      justify-content: flex-end;
      margin: 3px 0px;
      div {
        background: gray;
        color: white;
        padding: 7px 17px;
        border-radius: 17px;
      }
    }
  .receiver {
      justify-content: flex-start;
      margin: 3px 0px;
      div {
        background: gray;
        color: white;
        padding: 7px 17px;
        border-radius: 17px;
      }
    }
}
`;

const ChatChannel = () => {
  // const ChatChannel = ({ currentUserChat, currentUser, socket }) => {
  // const URL1 = 'http://localhost:5000/api/v1/chats/allmsg'
  // const URL2 = 'http://localhost:5000/api/v1/chats/newmsg'
  const [toggle, setToggle] = useState(false);
  // const [userData, setUserData] = useState([]);
  // const [activeData, setActiveData] = useState(null);

  const toggleHandle = () => {
    setToggle((prev) => !prev);
  }

  // useEffect(() => {
  //   const handleReceive = async () => {
  //     const response = await Axios.post(URL1, {
  //       from: currentUser._id,
  //       to: currentUserChat._id,
  //     });
  //     const { data: { messages } } = response;
  //     setUserData(messages);
  //   };
  //   handleReceive();
  // }, [currentUserChat]);


  // const handleSend = async (text) => {
  //   await socket.current.emit("send__messages", {
  //     to: currentUserChat._id,
  //     from: currentUser._id,
  //     message: text,
  //   })
  //   await Axios.post(URL2, {
  //     from: currentUser._id,
  //     to: currentUserChat._id,
  //     message: text
  //   });
  //   setUserData(userData => [...userData, { sender: true, message: text }]);
  // };

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("receive__messages", (data) => {
  //       setActiveData({ message: data })
  //     });
  //   }
  // }, [])

  // useEffect(() => {
  //   activeData && setUserData(prev => [...prev, activeData])
  // }, [activeData])

  return (
    <DIVISION>
      <USER>
        <div className="user__name">
          <h1>Ekanshu</h1>
          {/* <h1>{currentUserChat.name.split(' ').slice(0, 1)}</h1> */}
        </div>
        <div className="user__info">
          <span onClick={toggleHandle}>
            <CgMoreVertical size={"1.75rem"} />
          </span>
          {
            toggle && (
              <template>
                <p>Ekanshu</p>
                <p>ekanshuj</p>
                <p>0000000000</p>
                {/* <p>{currentUserChat.name}</p>
                <p>{currentUserChat.username}</p>
                <p>{currentUserChat.number}</p> */}
              </template>
            )
          }
        </div>
      </USER>
      <CONTAINER>
        <MESSAGES>
          <div className="messages">
            {/* {userData?.map((data, i) => {
              return (
                <div key={i} className={`message ${data.sender === true ? 'sender' : 'receiver'}`}>
                  <div>{data.message}</div>
                </div>
              )
            })} */}
            <div>hello</div>
          </div>
        </MESSAGES>
      </CONTAINER>
      {/* <ChatChannelInput handleSend={handleSend} /> */}
      <ChatChannelInput />
    </DIVISION>
  )
}

export default ChatChannel

