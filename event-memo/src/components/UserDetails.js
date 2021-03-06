import React from "react";
import { motion } from "framer-motion";

export default function UserDetails() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      exit={{ x: -100, opacity: 0 }}
      className="user-details-container"
    >
      <h2>User Details</h2>
      <h3>Bob</h3>
      <h5>Username: Bob</h5>
      <h5>Password: Bob123</h5>
      <h3>Robert</h3>
      <h5>Username: Robert</h5>
      <h5>Password: Robert123</h5>
    </motion.div>
  );
}
