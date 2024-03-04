import { orderRepository } from "../repositories/index.js";
import moment from "moment";
import querystring from "qs";
import crypto from "crypto";

const findAll = async (req, res) => {
  try {
    const data = await orderRepository.findAll(req, res);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await orderRepository.findOne(id);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const findOneByOrderVnpayId = async (req, res) => {
  try {
    const orderVnpayId = req.params.orderVnpayId;
    const data = await orderRepository.findOneByOrderVnpayId(orderVnpayId);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const create = async (req, res) => {
  try {
    const order = req.body;
    const data = await orderRepository.create(order);

    return res.status(201).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const order = req.body;
    const data = await orderRepository.update(id, order);

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await orderRepository.deleteOrder(id);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};

const vnpayReturn = async (req, res) => {
  let vnp_Params = req.query;

  let secureHash = vnp_Params["vnp_SecureHash"];

  delete vnp_Params["vnp_SecureHash"];
  delete vnp_Params["vnp_SecureHashType"];

  vnp_Params = sortObject(vnp_Params);

  let tmnCode = process.env.vnp_TmnCode;
  let secretKey = process.env.vnp_HashSecret;

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
    // res.render('success', { code: vnp_Params['vnp_ResponseCode'] })
    if (
      vnp_Params["vnp_ResponseCode"] === "00" &&
      vnp_Params["paid"] === "ok"
    ) {
      res.status(200).json({
        code: vnp_Params["vnp_ResponseCode"],
      });
    } else {
      res.status(200).json({
        code: vnp_Params["vnp_ResponseCode"],
      });
    }
  } else {
    res.status(200).json({
      code: "97",
    });
  }
};

const createPaymentUrl = async (req, res) => {
  // const data = req.body
  process.env.TZ = "Asia/Ho_Chi_Minh";

  let date = new Date();
  let createDate = moment(date).format("YYYYMMDDHHmmss");

  let ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  let tmnCode = process.env.vnp_TmnCode;
  let secretKey = process.env.vnp_HashSecret;
  let vnpUrl = process.env.vnp_Url;
  let returnUrl = process.env.vnp_ReturnUrl;
  let orderId = moment(date).format("DDHHmmss");
  let amount = req.body.totalAmount * 24000;
  // let bankCode = req.body.bankCode;

  let locale = req.body.language || "vn";
  if (locale === null || locale === "") {
    locale = "vn";
  }
  let currCode = "VND";
  let vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = tmnCode;
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_TxnRef"] = orderId;
  vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
  vnp_Params["vnp_OrderType"] = "other";
  vnp_Params["vnp_Amount"] = amount * 100;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_IpAddr"] = ipAddr;
  vnp_Params["vnp_CreateDate"] = createDate;
  // if (bankCode !== null && bankCode !== '') {
  //   vnp_Params['vnp_BankCode'] = bankCode;
  // }

  vnp_Params = sortObject(vnp_Params);

  let signData = querystring.stringify(vnp_Params, { encode: false });
  let hmac = crypto.createHmac("sha512", secretKey);
  let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  console.log("vnpURL");
  console.log(vnpUrl);

  res.status(200).json({
    url: vnpUrl,
  });
};

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
const findOrderByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await orderRepository.findOrderByUserId(id);
    const newData = data.map((item) => ({
      _id: item._id,
      user: item.user,
      name: item.name,
      address: {
        country: item.address.country,
        state: item.address.state,
        city: item.address.city,
        detailAddress: item.address.detailAddress,
      },
      totalAmount: item.totalAmount,
      date: item.date,
      status: item.status.name,
      productList: item.productList,
    }));
    res.status(200).json(data); // Trả về newData thay vì data
  } catch (error) {
    res.status(500).json({
      message: error.toString(),
    });
  }
};
export default {
  findAll,
  findOne,
  create,
  update,
  deleteOrder,
  findOneByOrderVnpayId,
  createPaymentUrl,
  vnpayReturn,
  findOrderByUserId,
};
