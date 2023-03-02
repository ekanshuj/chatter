import React, { useState } from 'react'
import styled from 'styled-components';
import { BsEmojiSmile } from 'react-icons/bs';
import EmojiPicker from 'emoji-picker-react';

const DIVISION = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
padding: 7px;
.picker {
    /* filter: invert(100); */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1px 5px;
    margin-inline: 7px;
    cursor: pointer;
    position: relative;
    .EmojiPickerReact {
      position: absolute;
      bottom: 72px;
      left: 9px;
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
background: #2B2C32;
color: #CCD1D1;
width: 100%;
outline: none;
border: none;
font-size: 1.1rem;
letter-spacing: 1px;
padding: 0.75rem 0.5rem;
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 0.9rem;
    letter-spacing: 1px;
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
        <BsEmojiSmile onClick={handleToggle} size="1.85rem" />
        {togglePicker && <EmojiPicker onEmojiClick={addEmoji} />}
      </div>
      <FORM className="input" onSubmit={handleSubmit}>
        <INPUT placeholder='Type to Send Message...' onChange={(e) => setText(e.target.value)} value={text} />
      </FORM>
    </DIVISION>
  )
}

export default ChatChannelInput