import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import EmojiPicker, { Theme } from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <button
            className="emoji-button"
            onClick={handleEmojiPickerhideShow}
            ref={emojiPickerRef}
          >
            😊
          </button>
          {showEmojiPicker && (
            <EmojiPickerContainer>
              <Picker
                onEmojiClick={(emojiObject) =>
                  setMsg((prevMsg) => prevMsg + emojiObject.emoji)
                }
                theme={Theme.AUTO}
                height={350}
                width={250}
                size="20"
              />
            </EmojiPickerContainer>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: absolute;
      .emoji-button {
        font-size: 1.7rem;
        color: #ffff00c8;
        cursor: pointer;
        border: none;
        background-color: transparent;
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom:0.6rem;
      }
    }
  }
  .input-container {
    margin-left:10px;
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

const EmojiPickerContainer = styled.div`
  position: absolute;
  top: -380px;
  left: 0;
  background-color: #080420;
  box-shadow: 0 5px 10px #9a86f3;
  border-color: #9a86f3;
  font-size: 20px; /* Adjust the font size as needed */

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: #080420;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #9a86f3;
    border-radius: 4px;
  }
`;
