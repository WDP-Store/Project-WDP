import React, { useEffect, useState } from "react";
import { Line, Pie, DualAxes } from "@ant-design/plots";
import InputGroup from "react-bootstrap/InputGroup";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import styles from "../dashboard.css";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  TagOutlined,
  StarOutlined,
  TeamOutlined,
} from "@ant-design/icons";

export default function Dashboard() {
  const Currentdate = new Date(); //current date
  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //for yealy report
  const [yearlySelected, setYearlySelected] = useState(
    Currentdate.getFullYear()
  );
  const [categorySpec, setCategorySpec] = useState("revenue");
  const [brandSpec, setBrandSpec] = useState("revenue");
  //

  //for selected month report
  const [isCategory, setIsCategory] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(Currentdate.getMonth());
  const [selectedYear, setSelectedYear] = useState(Currentdate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(
    new Date(
      Currentdate.getFullYear() + "-" + (Currentdate.getMonth() + 1) + "-01"
    )
  );

  const [totalUser, setTotalUser] = useState();
  const [totalActiveUser, setTotalActiveUser] = useState();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [orders, setOrders] = useState([]); //fetched orders
  useEffect(() => {
    axios.get(
      `https://wdp.bachgiaphat.vn/orders/find-order-by-status/successful`
    )
      .then((res) => res)
      .then((json) => {
        setOrders(json.data);
      });

    axios.get(`https://wdp.bachgiaphat.vn/brands`)
      .then((res) => res)
      .then((json) => {
        setBrands(json.data);
      });

    axios.get(`https://wdp.bachgiaphat.vn/users/count`)
      .then((res) => res)
      .then((json) => {
        setTotalUser(json.data);
      });

    axios.get(`https://wdp.bachgiaphat.vn/users/count?status=true`)
      .then((res) => res)
      .then((json) => {
        console.log("jsonactive", json.data);
        setTotalActiveUser(json.data);
      });

    axios.get(`https://wdp.bachgiaphat.vn/categories`)
      .then((res) => res)
      .then((json) => setCategories(json.data));
    document.getElementById("btnradiocate1").checked = true;
    document.getElementById("btnradiozcate1").checked = true;
  }, []);

  useEffect(() => {
    axios.get(
      `https://wdp.bachgiaphat.vn/orders/all?fromDate=${dateArrayByYear(selectedYear)[selectedMonth][0]}&toDate=${dateArrayByYear(selectedYear)[selectedMonth][1]}`
    )
      .then((res) => res)
      .then((json) => {
        setTotalOrders(json.data.totalDocs);
      });
  }, [selectedYear, selectedMonth]);

  const getStatisticNumber = (from, to) => {
    let temp = [...orders];
    temp = temp.filter((o) => (new Date(o.date)) >= (new Date(from)));
    temp = temp.filter((o) => (new Date(o.date)) < (new Date(to).setHours(23, 59, 59, 999)));
    var ok = [];
    temp.map(t => t.productList.map(tp => [ok.push(tp.quantity)]));
    let data = {
      from: from,
      to: to,
      revenue: 0,
      totalQuantity: ok.length > 0 ? ok?.reduce((a, b) => a + b) : 0,
      order: temp.length,
      category: categories.map(c => ({ name: c.name, id: c._id, quantity: 0, revenue: 0 })),
      brand: brands.map(b => ({ name: b.name, id: b._id, quantity: 0, revenue: 0 }))
    };

    // console.log("data.brand");
    // console.log(temp);
    data.brand.length > 0 && data.category.length > 0 && temp.map(t => [
      data.revenue += t.totalAmount,
      t.productList.map(tp => [
        data.category.map(c => c.name == tp.category ? [c.quantity += tp.quantity] : []),
        data.category.map(c => c.name == tp.category ? [c.revenue += tp.originalPrice * tp.quantity] : []),
        data.brand.map(c => c.name == tp.brand ? [c.quantity += tp.quantity] : []),
        data.brand.map(c => c.name == tp.brand ? [c.revenue += tp.originalPrice * tp.quantity] : [])
      ]
      )
    ]
    );
    // console.log(data);
    return data;
  };

  const currentMonthReport = () =>
    getStatisticNumber(
      dateArrayByYear(selectedYear)[selectedMonth][0],
      dateArrayByYear(selectedYear)[selectedMonth][1]
    );

  useEffect(() => {
    setSelectedDate(
      new Date(selectedYear + "-" + (Number(selectedMonth) + 1) + "-01")
    );
  }, [selectedMonth, selectedYear]);

  const [dataForYearly, setDataForYearly] = useState(
    dateArrayByYear(yearlySelected).map((a) => getStatisticNumber(a[0], a[1]))
  );
  // console.log(dataForYearly);
  //category yearly
  const getTotalYearlyCategory = (year) => {
    //get total of a year for pie chart
    let arr = dateArrayByYear(year);
    return getStatisticNumber(arr[0][0], arr[11][1]).category;
  };
  const getDataYearlyCategory = () => {
    let dataYearlyCategory = dataForYearly.map((d) =>
      d.category.map((dc) => ({ ...dc, to: d.to }))
    );
    let ak = [];
    // console.log("dataYearlyCategory");
    // console.log(dataYearlyCategory);
    dataYearlyCategory.map((d) => [ak.push(...d)]);
    return ak;
  };
  //

  //brand yearly
  const getTotalYearlyBrand = (year) => {
    //get total of a year for pie chart
    let arr = dateArrayByYear(year);
    return getStatisticNumber(arr[0][0], arr[11][1]).brand;
  };
  const getDataYearlyBrand = () => {
    let dataYearlyBrand = dataForYearly.map((d) =>
      d.brand.map((dc) => ({ ...dc, to: d.to }))
    );
    let ak = [];
    dataYearlyBrand.map((d) => [ak.push(...d)]);
    return ak;
  };
  //

  useEffect(() => {
    setDataForYearly(
      dateArrayByYear(yearlySelected).map((a) => getStatisticNumber(a[0], a[1]))
    );
  }, [yearlySelected, orders, brands, categories]);

  return (
    <div>
      <h2 className="mt-2 text-center">Dashboard</h2>
      <Row>
        <Col xs={6} md={3}>
          <h4>Report on {monthLabels[selectedMonth] + " " + selectedYear}</h4>
        </Col>
        <Col xs={6} md={2}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Month</InputGroup.Text>
            <Form.Select
              type="date"
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                console.log(selectedDate);
              }}
            >
              {monthLabels.map((m, index) => (
                <option key={index} value={index}>
                  {m}
                </option>
              ))}
            </Form.Select>
          </InputGroup>
        </Col>
        <Col xs={12} md={2}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Year</InputGroup.Text>
            <Form.Control
              type="number"
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(e.target.value);
              }}
            ></Form.Control>
          </InputGroup>
        </Col>
        <Col xs={12} md={5}>
          <Button
            onClick={() => {
              setSelectedMonth(Currentdate.getMonth());
              setSelectedYear(Currentdate.getFullYear());
            }}
            variant="primary"
          >
            Back to present
          </Button>
          <Button
            onClick={
              selectedMonth > 0
                ? () => {
                  setSelectedMonth(selectedMonth - 1);
                }
                : () => {
                  setSelectedMonth(11);
                  setSelectedYear(selectedYear - 1);
                }
            }
            variant="danger"
            className="mx-3"
          >
            Previous month
          </Button>
        </Col>
      </Row>
      {/* <div className="d-flex justify-content-between align-items-center gap-3 mt-4">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total revenue</p>
            <h4 className="mb-0 sub-title">
              ${currentMonthReport().revenue.toFixed(2)}
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total orders</p>
            <h4 className="mb-0 sub-title">{totalOrders}</h4>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 roudned-3">
          <div>
            <p className="desc">Total orders completed</p>
            <h4 className="mb-0 sub-title">{currentMonthReport().order}</h4>
          </div>
        </div>
      </div> */}

      <div class="row">
        <div class="col-md-4 col-xl-3">
          <div class="card bg-c-green order-card">
            <div class="card-block">
              <h6 class="m-b-20">Revenue</h6>
              <h2 class="text-right d-flex justify-content-between"><DollarOutlined /><span>${currentMonthReport().revenue.toFixed(2)}</span></h2>
              <p class="m-b-0">&nbsp;<span class="f-right"></span></p>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-xl-3">
          <div class="card bg-c-blue order-card">
            <div class="card-block">
              <h6 class="m-b-20">Orders Received</h6>
              <h2 class="text-right d-flex justify-content-between"><ShoppingCartOutlined /><span>{totalOrders}</span></h2>
              <p class="m-b-0">Completed Orders<span class="f-right">{currentMonthReport().order}</span></p>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-xl-3">
          <div class="card bg-c-yellow order-card">
            <div class="card-block">
              <h6 class="m-b-20">Brand</h6>
              <h2 class="text-right d-flex justify-content-between"><TagOutlined /><span>{brands.length}</span></h2>
              <p class="m-b-0">&nbsp;<span class="f-right"></span></p>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-xl-3">
          <div class="card bg-c-pink order-card">
            <div class="card-block">
              <h6 class="m-b-20">Category</h6>
              <h2 class="text-right d-flex justify-content-between"><StarOutlined /><span>{categories.length}</span></h2>
              <p class="m-b-0">&nbsp;<span class="f-right"></span></p>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-xl-3">
          <div class="card bg-c-green order-card">
            <div class="card-block">
              <h6 class="m-b-20">User</h6>
              <h2 class="text-right d-flex justify-content-between"><TeamOutlined /><span>{totalUser}</span></h2>
              <p class="m-b-0">Active users<span class="f-right">{totalActiveUser}</span></p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="btn-group mt-2 flex-row"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <div>
          <input
            onClick={() => setIsCategory(true)}
            value={"category"}
            type="radio"
            className="btn-check"
            name="btnradioxyz"
            id="btnradiocate1"
            autoComplete="off"
          ></input>
          {/* <label className="btn btn-outline-primary" htmlFor="btnradiocate1">
            Category
          </label> */}
        </div>

        <div>
          <input
            onClick={() => setIsCategory(false)}
            value={"brand"}
            type="radio"
            className="btn-check"
            name="btnradioxyz"
            id="btnradiobrand2"
            autoComplete="off"
          ></input>
          {/* <label className="btn btn-outline-primary" htmlFor="btnradiobrand2">
            Brand
          </label> */}
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-lg-6 col-xl-6">
          {/* <DemoPie
            data={
              isCategory
                ? currentMonthReport().category
                : currentMonthReport().brand
            }
            spec="revenue"
          ></DemoPie> */}
        </div>
        <div className="col-12 col-lg-6 col-xl-6">
          {/* <DemoPie
            data={
              isCategory
                ? currentMonthReport().category
                : currentMonthReport().brand
            }
            spec="quantity"
          ></DemoPie> */}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="mb-5 title">Yearly statistic {yearlySelected}</h3>
        <div className="row">
          <div className="col-12 col-lg-12">
            <h4>Orders and products sold</h4>
            <OrderDualAxes data={dataForYearly} />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="row">
          <h4>Category-based yearly report on {yearlySelected} </h4>
          <div
            className="btn-group my-2 flex-row"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <div>
              <input
                onClick={() => setCategorySpec("revenue")}
                value={"category"}
                type="radio"
                className="btn-check"
                name="btnradiocate"
                id="btnradiozcate1"
                autoComplete="off"
              ></input>
              <label className="btn btn-outline-primary" htmlFor="btnradiozcate1">
                Revenue
              </label>
            </div>

            <div>
              <input
                onClick={() => setCategorySpec("quantity")}
                value={"category"}
                type="radio"
                className="btn-check"
                name="btnradiocate"
                id="btnradiozcate3"
                autoComplete="off"
              ></input>
              <label className="btn btn-outline-primary" htmlFor="btnradiozcate3">
                Products sold
              </label>
            </div>
          </div>
          <div className="col-12 col-lg-12 col-xl-12">
            <DemoLine
              data={getDataYearlyCategory()}
              spec={categorySpec}
            ></DemoLine>
          </div>
          {/* <div className="col-12 col-lg-6 col-xl-4">
            <DemoPie
              data={getTotalYearlyCategory(yearlySelected)}
              spec={categorySpec}
            ></DemoPie>
          </div> */}
        </div>
      </div>

      <div className="mt-5">
        <div className="row">
          <h4>Brand-based yearly report on {yearlySelected}</h4>
          <div
            className="btn-group my-2 flex-row"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <div>
              <input
                onClick={() => setBrandSpec("revenue")}
                value={"category"}
                type="radio"
                className="btn-check"
                name="btnradiobrando"
                id="btnradiozbrand1"
                autoComplete="off"
              ></input>
              <label
                className="btn btn-outline-primary"
                htmlFor="btnradiozbrand1"
              >
                Revenue
              </label>
            </div>

            <div>
              <input
                onClick={() => setBrandSpec("quantity")}
                value={"category"}
                type="radio"
                className="btn-check"
                name="btnradiobrando"
                id="btnradiozbrand3"
                autoComplete="off"
              ></input>
              <label
                className="btn btn-outline-primary"
                htmlFor="btnradiozbrand3"
              >
                Products sold
              </label>
            </div>
          </div>
          <div className="col-12 col-lg-12 col-xl-12">
            <DemoLine data={getDataYearlyBrand()} spec={brandSpec}></DemoLine>
          </div>
        </div>
      </div>

    </div>
  );
}

const DemoPie = (props) => {
  const { data, spec } = props;
  const config = {
    appendPadding: 10,
    data,
    theme: "light",
    angleField: spec,
    colorField: "name",
    radius: 0.8,
    innerRadius: 0.64,
    meta: {
      [spec]: {
        formatter: (v) => (spec != "quantity" ? `$${v?.toFixed(2)}` : v),
      },
    },
    label: {
      type: "inner",
      offset: "-50%",
      autoRotate: false,
      style: {
        textAlign: "center",
        fill: "#fff",
      },
      formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: {
        formatter: (v) =>
          spec != "quantity"
            ? spec.charAt(0).toUpperCase() + spec.slice(1)
            : "Products sold",
        offsetY: -8,
        style: {
          color: "#000",
        },
      },
      content: {
        style: {
          color: "#000",
          fontSize: "1rem",
        },
        offsetY: -4,
      },
    },
    pieStyle: {
      lineWidth: 0,
    },
  };
  return <Pie {...config} />;
};
const DemoLine = (props) => {
  const { data, spec } = props;
  // console.log("data");
  // console.log(data);
  const config = {
    data,
    autoFit: false,
    xField: "to",
    yField: spec,
    seriesField: "name",
    point: {
      size: 5,
      shape: "diamond",
    },
    label: {
      style: {
        fill: "#aaa",
      },
    },
  };
  return <Line {...config} />;
};

const OrderDualAxes = (props) => {
  const { data } = props;
  const config = {
    data: [data, data],
    xField: "to",
    yField: ["order", "totalQuantity"],
    geometryOptions: [
      {
        geometry: "column",
      },
      {
        geometry: "line",
        point: {
          size: 5,
          shape: "diamond",
        },
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
  };
  return <DualAxes {...config} />;
};
const DemoDualAxes = (props) => {
  const { data } = props;
  const config = {
    data: [data, data],
    xField: "to",
    yField: ["revenue", "profit"],
    geometryOptions: [
      {
        geometry: "column",
      },
      {
        geometry: "line",
        point: {
          size: 5,
          shape: "diamond",
        },
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
  };
  return <DualAxes {...config} />;
};

const dateArrayByYear = (year) => {
  var arr = [];
  for (let i = 0; i < 12; i++) {
    var start = new Date(year, i, 2);
    var end = new Date(year, i + 1, 1);
    arr.push([
      start.toISOString().slice(0, 10),
      end.toISOString().slice(0, 10),
    ]);
  }
  return arr;
};

