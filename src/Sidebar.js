import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import MicOutlinedIcon from "@material-ui/icons/MicOutlined";
import HeadsetOutlinedIcon from "@material-ui/icons/HeadsetOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import {auth} from './firebase' 
import db from './firebase' 
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
// import { IconButton } from "@material-ui/core";

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);
  useEffect(()=>{
    db.collection('channels').onSnapshot(snapshot=>{
      setChannels(snapshot.docs.map(doc=>({
        id: doc.id,
        data: doc.data(),
      })))
    })
  },[])
  const handleAddChannel = ()=>{
    const channelName = prompt("Enter Channel Name");
    if(channelName){
      db.collection('channels').add({
        channelName: channelName,
      })
    }
  }
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h3 onClick={()=>auth.signOut()}>Jai Golechha</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelHeader">
          <div className="sidebar__channelTop">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelList">
          {channels.map(({id, data})=>(
            <SidebarChannel key={id} id={id} channelName={data.channelName}/>
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <CallIcon />
          <InfoOutlinedIcon />
        </div>
      </div>

      <div className="sidebar__profile">
        <Avatar src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substr(0,5)}</p>
        </div>
        <div className="sidebar__profileIcons">
          <MicOutlinedIcon />
          <HeadsetOutlinedIcon />
          <SettingsOutlinedIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
