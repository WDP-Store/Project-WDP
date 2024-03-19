import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import React, { useState } from 'react';
import OTPModal from './../components/OTPForm';

const forgotSchema = yup.object({
    user_email: yup
        .string()
        .email('Please enter a valid email')
        .required('This field is required'),
});

const Forgotpassword = () => {
    const [showOTPModal, setShowOTPModal] = useState(false);
    const [email, setEmail] = useState("");

    const formik = useFormik({
        initialValues: {
            user_email: '',
        },
        validationSchema: forgotSchema,
        onSubmit: async (values) => {
            try {
                setEmail(values.user_email);
                const response = await axios.post(`https://app.vinamall.vn//users/forgot-password`, { email: values.user_email })
                console.log("testResponseForgotPassword", response.data);
                // Handle response
                toast.success('Code send to your email');
                setShowOTPModal(true); // Show the OTP modal
                // nagivate("/")
            } catch (error) {
                // Handle error
                toast.error('Failed to send password reset email');
            }
        },
    });


    return (
        <>
            <Meta title={'Forgot Password'} />
            <BreadCrumb title="Forgot Password" />
            <Container class1="login-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className="text-center mb-3">
                                Reset Your Password
                            </h3>
                            <p className="text-center mt-2 mb-3">
                                We will send you an email to reset your password
                            </p>
                            <form
                                onSubmit={formik.handleSubmit}
                                className="d-flex flex-column gap-15"
                            >
                                <CustomInput
                                    type="text"
                                    name="user_email"
                                    placeholder="Email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.user_email}
                                    errMes={
                                        formik.touched.user_email &&
                                        formik.errors.user_email
                                    }
                                />

                                <div>
                                    <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                                        <button
                                            className="button border-0"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                        <Link to="/login">Back</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
            <OTPModal show={showOTPModal} onClose={() => setShowOTPModal(false)} email={email} />
        </>
    );
};

export default Forgotpassword;
