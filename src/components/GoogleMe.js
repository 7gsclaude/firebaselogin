import React from "react";
import Button from "react-bootstrap/Button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../FireConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function GoogleMe() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setValue(user);
        navigate("/");
      })
      .catch((error) => {
        setValue(error.message);
      });
  };

  return (
    <Button
      onClick={handleGoogle}
      variant="outline-secondary"
      type="submit"
      className="w-100"
    >
      Login With Google
    </Button>
  );
}

export default GoogleMe;
