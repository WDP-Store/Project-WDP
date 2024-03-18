import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import OtpInput from "react-otp-input";
import OTPForm from "./OTPForm"; // Import your OTPForm component here

const OTPModal = ({ show, onClose }) => {
  const [otp, setOtp] = useState("");
  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // For example, you can send the OTP value to your server for verification
    console.log("Submitting OTP:", otp);

    // Close the modal after form submission
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
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
        <Button>OK</Button>
    </Modal>
  );
};

export default OTPModal;
