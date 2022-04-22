import K from "../utilities/constants";
import { Button, Space, Tag } from "antd";
import User from "../models/user/user";

function creatOrderCols(openDrawer) {
  return [
    {
      title: K.Tables.orderTitleHead.orderID,
      dataIndex: K.Tables.orderTitleIndex.orderID,
    },
    {
      title: K.Tables.orderTitleHead.orderPosID,
      dataIndex: K.Tables.orderTitleIndex.orderPosID,
    },
    {
      title: K.Tables.orderTitleHead.orderStatus,
      dataIndex: K.Tables.orderTitleIndex.orderStatus,
      render: (status) => (
        <Tag
          color={
            status === "open"
              ? "orange"
              : status === "paid"
              ? "purple"
              : status === "completed"
              ? "green"
              : "red"
          }
          key={status}
        >
          {status === "open"
            ? "Open"
            : status === "paid"
            ? "Paid"
            : status === "completed"
            ? "Completed"
            : "Cancelled"}
        </Tag>
      ),
    },
    {
      title: K.Tables.orderTitleHead.orderTotal,
      dataIndex: K.Tables.orderTitleIndex.orderTotal,
      render: (total) => {
        return "$" + parseInt(total).toFixed(2);
      },
    },
    {
      title: "Action",
      dataIndex: K.Tables.orderTitleIndex.orderID,
      align: "center",
      render: (id, record) => (
        <Space size="middle">
          <a onClick={() => openDrawer(id, "Order")}>View</a>
          <a
            onClick={() => openDrawer(id, "Payment")}
            hidden={User.getRole() !== "Super Admin"}
          >
            Debug
          </a>
        </Space>
      ),
    },
  ];
}

const searchCols = [
  {
    id: 1,
    title: "POS Order ID",
    key: "pos_ticket_id",
    type: "_cont",
    show: true,
  },
  {
    id: 2,
    title: "Status",
    key: "status",
    type: "_cont",
    show: true,
  },
  {
    id: 3,
    title: "Restaurant",
    key: "restaurant_id",
    type: "_eq",
    show: false,
  },
  {
    id: 4,
    title: "Location",
    key: "location_id",
    type: "_eq",
    show: false,
  },
];

const analyticsCols = [
  {
    id: 1,
    title: "Day",
    key: "day",
  },
  {
    id: 2,
    title: "Week",
    key: "week",
  },
  {
    id: 3,
    title: "Month",
    key: "month",
  },
  {
    id: 4,
    title: "Quater",
    key: "quater",
  },
  {
    id: 5,
    title: "Year",
    key: "year",
  },
];

export { creatOrderCols, searchCols, analyticsCols };
