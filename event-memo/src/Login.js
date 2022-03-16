import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { users } from "./Users";
import { loginUser } from "./redux/actions/userAction";
import { TextField, Button } from "@mui/material";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        exit={{ x: -100, opacity: 0 }}
        className="sign-in-container"
      >
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            value={username}
            onChange={handleUsername}
            id="outlined-basic"
            label="Username"
            variant="outlined"
            style={{ overflow: "visible" }}
          />
          <TextField
            type="password"
            value={password}
            onChange={handlePassword}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            style={{ overflow: "visible" }}
          />
          <Button type="submit" variant="outlined">
            Login
          </Button>
        </form>
      </motion.div>
    </>
  );
}
