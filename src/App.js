import axios from "axios";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Context } from "./Context";
import Header from "./components/Header";
import Users from "./components/Users";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

function App() {
  const [users, setUsers] = useState([]);

  // fucntion to get user data
  let getUsers = async () => {
    const { data } = await axios.get(
      "https://611f263e9771bf001785c72a.mockapi.io/crud"
    );
    console.log(data);
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
    console.log("rendered");
  }, []);

  return (
    <div>
      <Context.Provider
        value={{
          users,
          setUsers,
        }}
      >
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Users} />
            <Route path="/createuser" component={CreateUser} />
            <Route path="/edituser/:id" component={EditUser} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/edit-profile/:id" component={EditProfile} />
          </Switch>
        </BrowserRouter>
      </Context.Provider>
    </div>
  );
}

export default App;
