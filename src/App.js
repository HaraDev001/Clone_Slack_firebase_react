import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import {Route, Routes } from "react-router-dom";
import Chat from './components/Chat';
import Login from "./components/Login";
import { useStateValue } from "./StateProvider";

function App() {

  const [{user}, dispatch] = useStateValue();

  return (
    <div className="app">
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className="app__body">
              <Sidebar user={user} />
              <Routes>
                <Route path="/rooms/:roomId" element={<Chat user={user}/>} />  
                <Route path="/" element={<h1>Welcome to Slack Clone</h1>}/>
              </Routes>
            </div>
          </>
        )}
    </div>
  );
      }
    
export default App
