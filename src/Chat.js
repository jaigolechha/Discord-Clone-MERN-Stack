import React from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import { useState } from "react";
import db from "./firebase";
import { useEffect } from "react";
import firebase from "firebase";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [channelId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("channels").doc(channelId).collection("messages").add({
      message: input,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            message={message.message}
            user={message.user}
            timestamp={message.timestamp}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form action="">
          <input
            type="text"
            placeholder={`Message #${channelName}`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!channelId}
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="chat__inputButton"
          >
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
          <GifIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
