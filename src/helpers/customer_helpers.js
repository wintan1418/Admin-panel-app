import K from "../utilities/constants";

function createCustomerCols() {
  return [
    {
      title: K.Tables.customerTitleHead.firstName,
      dataIndex: K.Tables.customerTitleIndex.firstName,
    },
    {
      title: K.Tables.customerTitleHead.lastName,
      dataIndex: K.Tables.customerTitleIndex.lastName,
    },
    {
      title: K.Tables.customerTitleHead.phoneNo,
      dataIndex: K.Tables.customerTitleIndex.phoneNo,
    },
    {
      title: K.Tables.customerTitleHead.email,
      dataIndex: K.Tables.customerTitleIndex.email,
    },
  ];
}

const searchCols = [
  {
    id: 1,
    title: "Phone Number",
    key: "phone_number",
    type: "_cont",
    show: true,
  },
  {
    id: 2,
    title: "Email",
    key: "email",
    type: "_cont",
    show: true,
  },
];

export { createCustomerCols, searchCols };
