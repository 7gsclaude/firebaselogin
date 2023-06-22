import React from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";



const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate(); // Get the navigate function
//   const { signup } = useAuth();
  const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser, updatePassword, updateEmail } = useAuth();
  
 useEffect(() => {
   if (!currentUser) {
     // User is not logged in, redirect to login page
     navigate("/login");
   }
 }, [currentUser, navigate]);


  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords don't match");
    }
      
      
      const promises = [];
      setLoading(true);
      setError("");
      

      if (emailRef.current.value !== currentUser.email) {
        promises.push(updateEmail(emailRef.current.value));
      }
      
      if (passwordRef.current.value) { 
          promises.push(updatePassword(passwordRef.current.value));
      }
      
      Promise.all(promises).then(() => {
          navigate("/");
      }).catch(() => {
          setError("Failed to update account");
      }).finally(() => { 
          setLoading(false);
      })

   
  }
//required removed from the forms because it needs to have matching passwords to continue. 
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef}  />
            </Form.Group>
            <Form.Group id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef}  />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              Signup
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        Already have an account? Login here <Link to="/login">Login</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
