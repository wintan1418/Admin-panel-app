import { Link } from "react-router-dom";

const searchCols = [
  {
    id: 1,
    title: "First Name",
    key: "FirstName",
    type: "_cont",
    show: true,
  },
  {
    id: 2,
    title: "Last Name",
    key: "LastName",
    type: "_cont",
    show: true,
  },
  {
    id: 3,
    title: "Location",
    key: "locationId",
    type: "_eq",
    show: false,
  },
];

const tableColumns = () => {
  return [
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "id",
      colSpan: 1,
      render: (name, guest) => {
        return (
          <Link
            key={guest?.GuestId}
            to={`/enganement/guests/${guest?.GuestId}`}
            className="text-primary"
            style={{ textDecoration: "none" }}
          >
            {name}
          </Link>
        );
      },
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "id",
      colSpan: 1,
    },
    {
      title: "Phone Number",
      dataIndex: "PhoneNumber",
      key: "id",
      colSpan: 1,
    },
    {
      title: "Email",
      dataIndex: "EmailId",
      key: "id",
      colSpan: 1,
    },
  ];
};

const fakeDataGuests = [
  {
    id: 1,
    first_name: "test",
    last_name: "PWA",
    phone: "(216) 354-7758",
    email: "muneeb.qasim@codedistrict.com",
  },
];

export { searchCols, tableColumns, fakeDataGuests };
