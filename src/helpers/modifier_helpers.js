import K from "../utilities/constants";
import { Switch, Table, Button } from "antd";

function createModCols(getModifierDetail, modifierStatusHandler) {
  return [
    {
      title: K.Tables.modifierTitleHead.modifierName,
      dataIndex: K.Tables.modifierTitleIndex.modifierName,

      render: (name, mod) => {
        return name ?? mod?.pos_modifier_group_name;
      },
    },
    {
      title: K.Tables.modifierTitleHead.available,
      dataIndex: K.Tables.modifierTitleIndex.availablity,
      align: "center",
      render: (availablity, modifier) => {
        return (
          <Switch
            checked={availablity}
            onChange={(checked) => {
              modifier = { ...modifier, availablity: checked };
              modifierStatusHandler(modifier);
            }}
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: K.Tables.modifierTitleIndex.modifierID,
      render: (id) => (
        <Button type="link" onClick={() => getModifierDetail(id)}>
          View
        </Button>
      ),
    },
  ];
}

const itemsTable = (
  data,
  getModifierItemDetail,
  modifierGroupStatusHandler
) => {
  const columns = [
    {
      title: K.Tables.modifierItemsTitleHead.modifierItemsName,
      dataIndex: K.Tables.modifierItemsTitleIndex.modifierItemsName,
      render: (name, mod) => {
        return name ?? mod?.pos_modifier_group_item_name;
      },
    },
    {
      title: K.Tables.modifierItemsTitleHead.modifierPrice,
      dataIndex: K.Tables.modifierItemsTitleIndex.modifierPrice,
      align: "center",
      render: (price, mod) => {
        return (
          "$" +
          parseInt(
            mod?.pos_modifier_group_item_price_levels?.pos_price_level_price
          ).toFixed(2)
        );
      },
    },
    {
      title: K.Tables.modifierItemsTitleHead.modifierSize,
      dataIndex: K.Tables.modifierItemsTitleIndex.modifierSize,
      align: "center",
      render: (size, mod) => {
        return mod?.pos_modifier_group_item_price_levels?.pos_price_level_name;
      },
    },
    {
      title: K.Tables.modifierItemsTitleHead.available,
      dataIndex: K.Tables.modifierItemsTitleIndex.availablity,
      align: "center",
      render: (availablity, modifier) => {
        return (
          <Switch
            checked={availablity}
            onChange={(checked) => {
              modifier = { ...modifier, availablity: checked };
              modifierGroupStatusHandler(modifier);
            }}
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: K.Tables.modifierItemsTitleIndex.modifierItemsID,
      colSpan: 2,
      render: (id) => (
        <Button type="link" onClick={() => getModifierItemDetail(id)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <Table
      size="middle"
      style={{
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};

function setModifierFields(form, res) {
  form.setFieldsValue({
    id: res?.modifier?.id,
    name: res?.modifier?.name ?? res?.modifier?.pos_modifier_group_name,
    availablity: res?.modifier?.availablity,
    listing_type: res?.modifier?.listing_type,
  });
}

function setModifierItemsFields(form, res) {
  form.setFieldsValue({
    id: res?.modifier_item?.id,
    name:
      res?.modifier_item?.name ??
      res?.modifier_item?.pos_modifier_group_item_name,
    price:
      res?.modifier_item?.pos_modifier_group_item_price_levels
        ?.pos_price_level_price,
    availablity: res?.modifier_item?.availablity,
  });
}

// function editCategoryBody(values) {
//   return {
//     ...values,
//     preference: parseInt(values.preference),
//   };
// }

// function creatCategoryBody(values, location) {
//   return {
//     ...values,
//     preference: parseInt(values.preference),
//     location_id: location,
//   };
// }

const searchCols = [
  {
    id: 1,
    title: "Modifier Name",
    key: "name",
    type: "_cont",
    show: true,
  },
  {
    id: 2,
    title: "Restaurant",
    key: "restaurant_id",
    type: "_eq",
    show: false,
  },
  {
    id: 3,
    title: "Location",
    key: "location_id",
    type: "_eq",
    show: false,
  },
];

export {
  createModCols,
  itemsTable,
  setModifierFields,
  setModifierItemsFields,
  searchCols,
};
