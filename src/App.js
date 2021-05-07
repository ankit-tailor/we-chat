import "./App.css";
import Chatroom from "./components/Chatroom";
import Sidebar from "./components/Sidebar";
import SignIn from "./components/SignIn";
import { projectAuth } from "./firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import MobileChat from "./components/MobileChat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [user] = useAuthState(projectAuth);
  const [chatId, setChatId] = useState(null);
  const [chatName, setChatName] = useState(null);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            {user ? (
              <>
                <div className="section">
                  <Sidebar setChatId={setChatId} setChatName={setChatName} />
                  {chatId && (
                    <Chatroom
                      chatId={chatId}
                      setChatId={setChatId}
                      chatName={chatName}
                    />
                  )}
                </div>
              </>
            ) : (
              <SignIn />
            )}
          </Route>
          <Route path="/mobilechat" exact>
            <MobileChat
              chatId={chatId}
              setChatId={setChatId}
              chatName={chatName}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
