import K from "../utilities/constants";

function createHelpCols(openDrawer) {
  return [
    {
      title: K.Tables.helpTitleHead.name,
      dataIndex: K.Tables.helpTitleIndex.name,
    },
    {
      title: K.Tables.helpTitleHead.phoneNo,
      dataIndex: K.Tables.helpTitleIndex.phoneNo,
    },
    {
      title: K.Tables.helpTitleHead.email,
      dataIndex: K.Tables.helpTitleIndex.email,
    },
    {
      title: "Action",
      dataIndex: K.Tables.helpTitleIndex.help_id,
      render: (id) => <a onClick={() => openDrawer(id)}>View</a>,
    },
  ];
}

const searchCols = [
  {
    id: 1,
    title: "Name",
    key: "name",
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

export { createHelpCols, searchCols };
