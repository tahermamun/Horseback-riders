import React, { createContext, useState } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './Components/Home/Home';
import NotMatch from './Components/NotMatch/NotMatch';
import Destination from './Components/Destination/Destination'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'

// use createContext for get signIn user Details
export const UserContext = createContext()

function App(props) {
// useState use for store signed User Value
  const [signedInUser, setSignedInUser] = useState({})
  return (
    <div>
      <UserContext.Provider value={[signedInUser, setSignedInUser]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/destination/:id">
              <Destination></Destination>
            </PrivateRoute>
            <Route path="*">
              <NotMatch></NotMatch>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div >
  );
}

export default App;
