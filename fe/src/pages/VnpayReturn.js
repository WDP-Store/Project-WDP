import { toast } from "react-toastify";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';

const VnpayReturn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Simulated code response from Vnpay, replace with actual logic to retrieve the code
  const vnpayResponseCode = searchParams.get("vnp_ResponseCode")

  useEffect(() => {
    if (vnpayResponseCode === '00') {
      axios
        .get(`https://app.vinamall.vn//orders/vnpay-return${location.search}`)
        .then((res) => {
          console.log("res return")
          console.log(res)
          if (res.data.code === '00') {
            axios
              .get(`https://app.vinamall.vn//orders/find-by-order-vnpay-id/${searchParams.get('vnp_OrderInfo')}`)
              .then((res) => {
                if (res.data) {
                  axios
                    .patch(`https://app.vinamall.vn//orders/${res.data._id}`, {
                      isPaid: true
                    },)
                    .then(() => {
                      // localStorage.removeItem('cart')
                      // toast.success('Success payment');
                      // navigate('/myOrder');
                    })
                    .catch((err) => {
                      console.log(err)
                      // toast.success('Failed to update paid status. Please contact to admin!');
                      navigate('/myOrder');
                    })
                }
              })

            localStorage.removeItem('cart')
            toast.success('Success payment');
            navigate('/myOrder');
          } else {
            toast.error('Failed payment');
            navigate('/checkout');
          }
        }).catch((e) => {
          console.log("res return err")
          console.log(e)
          toast.error('Failed payment');
          navigate('/checkout');
        })
    } else {
      toast.error('Failed payment');
      navigate('/checkout');
    }
  }, [vnpayResponseCode, navigate]);

  return null; // or display a loading indicator if necessary
};

export default VnpayReturn;
