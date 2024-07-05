import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import { toast } from "react-toastify";
import axios from 'axios';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tạo một đối tượng contact mới từ thông tin người dùng
    const newContact = {
      name,
      email,
      phone,
      comment,
    };

    // Gửi yêu cầu POST để lưu dữ liệu mới
    axios.post("https://wdp.bachgiaphat.vn/contacts", newContact)
      .then((response) => response.data)
      .then((data) => {
        toast.success("Successfully submit contact");
        setName("");
        setEmail("");
        setPhone("");
        setComment("");
      })
      .catch((error) => {
        console.error("Lỗi khi lưu dữ liệu:", error);
      });

  };

  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d17203.559753557965!2d105.65720065343093!3d21.089531991133203!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345668db46eef1%3A0x4c74965fe0a7091e!2zMzQtMzYgUGhhbiDEkMOsbmggUGjDuW5nIChUaOG7iyBUcuG6pW4gUGjDuW5nKSAtIFF14buRYyBM4buZIDMy!5e0!3m2!1sen!2sin!4v1720172577097!5m2!1sen!2sin"
              width="600"
              height="450"
              className="border-0 w-100"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-6 mt-5">
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-15">
              <div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  name=""
                  id=""
                  className="w-100 form-control"
                  cols="30"
                  rows="4"
                  placeholder="Comments"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div>
                <button type="submit" className="button border-0">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-6 mt-5">
            <h3 className="contact-title mb-4">Get in touch with us</h3>
            <div>
              <ul className="ps-0">
                <li className="mb-3 d-flex gap-15 align-items-center">
                  <AiOutlineHome className="fs-5" />
                  <address className="mb-0">
                    Hoa Lac, Thach That, Ha Noi
                  </address>
                </li>
                <li className="mb-3 d-flex gap-15 align-items-center">
                  <BiPhoneCall className="fs-5" />
                  <a href="tel:+91 8264954234">0363841238</a>
                </li>
                <li className="mb-3 d-flex gap-15 align-items-center">
                  <AiOutlineMail className="fs-5" />
                  <a href="mailto:quannhhe123456@fpt.edu.vn">
                    quannhhe123456@fpt.edu.vn
                  </a>
                </li>
                <li className="mb-3 d-flex gap-15 align-items-center">
                  <BiInfoCircle className="fs-5" />
                  <p className="mb-0">Monday – Friday 10 AM – 8 PM</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
