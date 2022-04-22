import _ from "lodash";
import K from "../utilities/constants";
import { Switch, Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { setWeekDays } from "../utilities/dateUtility";

function createMenuBody(values, menu_image, availability, location_id) {
  return {
    ..._.omit(values, ["category"]),
    category_id: values.category,
    menu_image,
    availability,
    location_id,
  };
}
function updateMenuBody(values, menu_image, availability) {
  return {
    ..._.omit(values, ["category"]),
    category_id: values.category,
    menu_image,
    availability,
  };
}

function setMenuFields(form, setImage, setTimings, setQr, setMenuUrl, res) {
  setQr(res?.menu?.qr_image_url);
  setMenuUrl(res?.menu?.menu_url);
  setImage(res?.menu?.menu_image_url);
  setTimings(setWeekDays(res?.menu?.availability));

  form.setFieldsValue({
    name: res?.menu?.name,
    description: res?.menu?.description,
    online_ordering_and_pay: res?.menu?.online_ordering_and_pay,
    online_pay: res?.menu?.online_pay,
    category: res?.menu?.category,
    active: res?.menu?.active,
  });
}

function createMenuItemCols(
  editProductHandle,
  productStatusHandler,
  menuItemDeletion
) {
  return [
    {
      title: K.Tables.productTitleHead.prodName,
      dataIndex: K.Tables.productTitleIndex.prodName,
      // sorter: (a, b) => {
      //   let first = a?.name ?? a?.pos_product_name;
      //   let second = b?.name ?? b?.pos_product_name;
      //   return first.length - second.length;
      // },
      render: (name, product) => {
        return (
          <Button
            key={product?.id}
            type="link"
            onClick={() => editProductHandle(product?.id, product?.location_id)}
            style={{ marginLeft: "-0.6rem" }}
          >
            {name ?? product?.pos_product_name}
          </Button>
        );
      },
    },
    {
      title: K.Tables.productTitleHead.price,
      dataIndex: K.Tables.productTitleIndex.price,
      // sorter: (a, b) => {
      //   return a?.pos_price_per_unit - b?.pos_price_per_unit;
      // },
      render: (price) => {
        return "$" + parseFloat(price).toFixed(2);
      },
    },
    {
      title: K.Tables.productTitleHead.category,
      dataIndex: K.Tables.productTitleIndex.category,
      render: (cat) => {
        return cat?.name ?? cat?.pos_category_name;
      },
    },
    {
      title: K.Tables.productTitleHead.available,
      dataIndex: K.Tables.productTitleIndex.availablity,
      render: (availablity, product) => {
        return (
          <Switch
            checked={availablity}
            onChange={(checked) => {
              product = { ...product, availablity: checked };
              productStatusHandler(product);
            }}
          />
        );
      },
    },
    {
      title: "Actions",
      dataIndex: K.Tables.productTitleIndex.prodId,
      render: (id) => (
        <Popconfirm
          title="Are you sure you want to remove this item from the menu?"
          onConfirm={() => menuItemDeletion(id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
        </Popconfirm>
      ),
    },
  ];
}

const cancel = () => {
  console.log("cancelled action!");
};

export { createMenuBody, updateMenuBody, setMenuFields, createMenuItemCols };
