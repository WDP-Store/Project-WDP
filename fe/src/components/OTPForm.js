import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import OtpInput from 'react-otp-input';
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
    console.log('Submitting OTP:', otp);

    // Close the modal after form submission
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enter OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="otpInput">Enter OTP:</label>
            <input
              type="text"
              className="form-control"
              id="otpInput"
              value={otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              required
            />
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form> */}
        <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
      </Modal.Body>
    </Modal>
  );
};

export default OTPModal;
