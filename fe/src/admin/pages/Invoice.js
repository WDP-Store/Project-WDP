import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { PrinterOutlined } from '@ant-design/icons';
import { ReactToPrint } from 'react-to-print';
import { State } from './context/stateContext';
import axios from "axios";
import styles from './invoice.css';
import { useParams } from "react-router-dom";

export default function Invoice() {
  const { id } = useParams();
  const { componentRef } = useContext(State);
  const [order, setOrder] = useState({});

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`https://wdp.bachgiaphat.vn/orders/${id}`);
      const data = await response.data;
      setOrder(data);
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <div
        className="m-auto pb-5"
        style={{
          boxShadow: "0 0 17px 0 rgba(16, 40, 73, .09)",
          width: '700px',
          background: 'white',
          fontFamily: "Nunito, sans-serif"
        }}>
        <div className="p-4 mt-6" ref={componentRef}>
          <div className="d-flex justify-content-between align-items-center">
            <h3>WDP Store</h3>
            <h1 style={{ fontWeight: 600 }}>INVOICE</h1>
          </div>
          <div>
            <p>Khu Công Nghệ Cao Hòa Lạc, km 29 <br></br>Đại lộ, Thăng Long, Hà Nội</p>
          </div>

          <div className="row mt-5">
            <div className="col-md-6">
              <h6>Bill to: </h6>
              <p>Client's Name: {order?.user?.name}</p>
              <p>Client's Address: {order?.address?.detailAddress + ', ' + order?.address?.country}</p>
              <p>City, State Zip: {order?.address?.city + ', ' + order?.address?.state + ', ' + order?.address?.zipcode}</p>
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center mb-2">
                <h6 className="m-0">Invoice#: </h6>
                <p className="m-0 mx-2">{order?._id}</p>
              </div>
              <div className="d-flex align-items-center mb-2">
                <h6 className="m-0">Invoice Date: </h6>
                <p className="m-0 mx-2">{formatDate(new Date(order?.date))}</p>
              </div>
              <div className="d-flex align-items-center mb-2">
                <h6 className="m-0">Payment method: </h6>
                <p className="m-0 mx-2">{order?.paymentMethod}</p>
              </div>
            </div>
          </div>

          <table className="table mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th className="text-end">Total</th>
              </tr>
            </thead>
            <tbody>
              {order?.productList?.map((p, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{p.productName}</td>
                  <td>{p.unitPrice}</td>
                  <td>{p.quantity}</td>
                  <td className="text-end">{Number(p.unitPrice) * p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="row">
            <div className="col-6"></div>
            <div className="col-6">
              <div className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#e3e3e3' }}>
                <p className="m-0" style={{ fontWeight: 700 }}>Total</p>
                <p className="m-0" style={{ fontWeight: 700 }}>$ {Number(order?.totalAmount).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <h6 className="mt-3">Notes</h6>
          <p>It was great doing business with you.</p>
          <h6 className="mt-5">Terms & Conditions</h6>
          <p>Please make the payment by the due date.</p>
        </div>

        <div className="text-end px-4">
          <ReactToPrint
            trigger={() => (
              <Button variant="primary" >
                <PrinterOutlined className="" style={{ fontSize: "16px", marginRight: '6px' }} /> Print
              </Button>
            )}
            onBeforePrint={() => console.log("before printing...")}
            content={() => componentRef.current}
            documentTitle="Invoice"
          />
        </div>
      </div>
    </>
  );
}
