import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import OtpInput from "react-otp-input";
import OTPForm from "./OTPForm"; // Import your OTPForm component here
import axios from "axios";

const OTPModal = ({ show, onClose, email }) => {
  const [otp, setOtp] = useState("");

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
  };

  const handleSubmit = () => {

    console.log(otp);
    console.log(email);
    axios
      .post("https://app.vinamall.vn//users/verify-otp", { email, otp })
      .then((res) => {
        console.log(res.data);
        // Handle successful OTP verification (e.g., show success message)
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error (e.g., show error message)
      })
      .finally(() => {
        setOtp("");
        onClose(); // Close the modal regardless of the result
      });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton style={{ display: "flex", justifyContent: "center" }}>
        <Modal.Title className="text-center">OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={5}
          renderSeparator={<span>-</span>}
          renderInput={(props) => (
            <input
              {...props}
              style={{
                width: "40px",
                height: "40px",
                margin: "0 5px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                textAlign: "center",
              }}
            />
          )}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OTPModal;
