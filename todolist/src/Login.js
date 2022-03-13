import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { users } from "./Users";
import { loginUser } from "./redux/actions/userAction";
import { TextField, Button } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState([]);

  const user = useSelector((state) => state.user.loginUser);
  const dispatch = useDispatch();

  useEffect(() => {
    users.map((user) => {
      setUserList((prevList) => [...prevList, user.name]);
    });
  }, []);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let selectedUser;

    if (userList.includes(username)) {
      selectedUser = users.find((user) => user.name === username.trim());
    } else {
      alert("Wrong username or password");
      return;
    }

    if (selectedUser.name === username && selectedUser.password === password) {
      console.log(username, password);
      dispatch(loginUser(username));
    } else {
      alert("Wrong username or password");
    }
  };

  return (
    <>
      <div className="sign-in-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          {/* <input
            type="text"
            placeholder="Enter Username"
            className="login-username"
            value={username}
            onChange={handleUsername}
          /> */}
          <TextField
            type="text"
            value={username}
            onChange={handleUsername}
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />
          <TextField
            type="password"
            value={password}
            onChange={handlePassword}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <Button type="submit" variant="outlined">
            Login
          </Button>
        </form>
      </div>
    </>
  );
}
