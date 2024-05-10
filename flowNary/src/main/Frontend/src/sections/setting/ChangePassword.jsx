import React, { useState } from "react";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import SnsBar from '../common/aside&bar/SnsBar';
import Aside from "../common/aside&bar/Aside";

export default function FindPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    }
  };

  const auth = getAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (loading || email === "") return;
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      alert("Success sending email!");
      navigate("/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code, error.message);
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{position:'absolute', top:'30%'}}>
      <Typography variant="h4" gutterBottom style={{ color: 'rgb(102,103,171)' }}>
        Change Password
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              style={{ backgroundColor: 'rgb(102,103,171)', color: "#fff" }}
            >
              {loading ? "Loading..." : "Send Email"}
            </Button>
          </Grid>
        </Grid>
      </form>
      {error !== "" && (
        <Typography variant="body1" style={{ color: "red" }}>
          {error}
        </Typography>
      )}
      <Typography variant="body1">
        Don't have an account? <Link to="/register">Create one &rarr;</Link>
      </Typography>
      <Typography variant="body1">
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Typography>
    </div>
  );
}