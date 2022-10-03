import React, { useState } from 'react'
import styled from 'styled-components';
import { BsFillEmojiWinkFill } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';

const DIVISION = styled.div`
width: 100%;
height: 4.7rem;
padding: 3px 7px;
background: rgb(255, 255, 255);
border-top: 2px solid rgba(0,0,0,0.5);
display: flex;
justify-content: center;
align-items: center;
position: relative;
.picker {
  .picker__btn {
    display: flex;
    background: none;
    border: none;
    padding: 1px 5px;
    margin-inline: 7px;
    cursor: pointer;
    .EmojiPickerReact {
      position: absolute;
      bottom: 72px;
      left: 9px;
    }
  }}`;

const FORM = styled.form`
display: flex;
align-items: center;
justify-content: center;
flex: 1;
`;

const INPUT = styled.input.attrs({
  type: "text",
})`
width: 100%;
outline: none;
font-size: 1.55rem;
border: none;
border: 2px solid rgba(0,0,0,0.2);
padding: 0.75rem 0.5rem;
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 1.1rem;
  }`;

const ChatChannelInput = ({ handleSend }) => {
  const [togglePicker, SetTogglePicker] = useState(false);
  const [text, setText] = useState("");

  const handleToggle = () => {
    SetTogglePicker(prev => !prev);
  };

  const addEmoji = (obj) => {
    let emojiVal = text;
    emojiVal += obj.emoji;
    setText(emojiVal);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length > 0) {
      handleSend(text);
      setText('');
    }
  };

  return (
    <DIVISION>
      <div className="picker">
        <span className='picker__btn'>
          <BsFillEmojiWinkFill onClick={handleToggle} size="1.85rem" />
          {togglePicker && <EmojiPicker onEmojiClick={addEmoji} />}
        </span>
      </div>
      <FORM className="input" onSubmit={handleSubmit}>
        <INPUT placeholder='Type to Send Message...' onChange={(e) => setText(e.target.value)} value={text} />
      </FORM>
    </DIVISION>
  )
}

export default ChatChannelInput