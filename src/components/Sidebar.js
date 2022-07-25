import React, { useEffect, useState } from 'react';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import {
  InsertComment as InsertCommentIcon,
  Inbox as InboxIcon,
  Drafts as DraftsIcon,
  BookmarkBorder as BookmarkBorderIcon,
  PeopleAlt as PeopleAltIcon,
  Apps as AppsIcon,
  FileCopy as FileCopyIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon
} from "@mui/icons-material";
import SidebarOption from './SidebarOption';
import './Sidebar.css'; 
import db from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useStateValue } from '../StateProvider';

export default function Sidebar() {
  const [channels, setChannels] = useState([]);
  const [{user}] = useStateValue();
    
  useEffect(() => {
    const colRef = collection(db, 'rooms');
    onSnapshot(colRef, snapshot => (setChannels(
snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
}))
    )
   ))
  }, [])
  
  return <div className="sidebar">
        <div className="sidebar__header">
            <div className="sidebar__info">
                  <h2>Welcome to Slack CLone</h2>
            <h3>
                <FiberManualRecordIcon />
                {user?.displayName}
            </h3>
            </div>
            <CreateIcon />
             </div>
            <SidebarOption Icon={InsertCommentIcon} title="Threads" />
           <SidebarOption Icon={InboxIcon} title="Mentions & Reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved Items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & User Groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File Browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show Less" />
      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
        <hr />
    <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
    {channels.map(channel => (
       <SidebarOption title={channel.name} id={channel.id} />
    ))}
    </div>;
}

