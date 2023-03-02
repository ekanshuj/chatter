import styled from 'styled-components';
import chat from '../assets/chat.svg';

const DIVISION = styled.div`
background: #1C1C25;
.gif {
  height: 91vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    aspect-ratio: 1;
    width: 30rem;
  }
  p {
    color: #ffff;
    text-decoration: underline;
    text-decoration-color: gray;
    padding: 4px 9px;
    border-radius: 10px;
    font-weight: semi-bold;
    letter-spacing: 1px;
    font-size: 1rem;
  }
}
`;


const PreviewChannel = () => {
  return (
    <DIVISION>
      <div className="gif">
        <img src={chat} />
        <p>Select a chat to start messaging</p>
      </div>
    </DIVISION>
  )
}

export default PreviewChannel