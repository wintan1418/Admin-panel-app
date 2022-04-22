import K from "../utilities/constants";
import { Switch, Button } from "antd";

function createProductCols(editProductHandle, productStatusHandler) {
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
  ];
}

const searchCols = [
  {
    id: 1,
    title: "Product Name",
    key: "name",
    type: "_cont",
    show: true,
  },
  {
    id: 2,
    title: "Product Price",
    key: "pos_price_per_unit",
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

function editProductBody(values, image) {
  return {
    name: values?.productName,
    description: values?.description,
    availablity: values?.availability,
    inventory: parseInt(values?.inventory),
    category_id: values?.category,
    modifier_groups: values?.modifier,
    addons: values?.addon,
    filter_tags: values?.tags,
    is_Food: values?.type === "Food" ?? false,
    is_Beverage: values?.type === "Beverage" ?? false,
    product_image: image,
    nutrition_details: {
      calories: values?.calories,
      fat: values?.fat,
      sodium: values?.sodium,
      carbohydrates: values?.carbohydrates,
      fiber: values?.fiber,
      sugars: values?.sugars,
      protein: values?.protein,
    },
  };
}

function setProductFields(form, setImage, res) {
  res?.product?.product_image_url && setImage(res?.product?.product_image_url);

  form.setFieldsValue({
    productName: res?.product?.name ?? res?.product?.pos_product_name,
    price: "$" + res?.product?.pos_price_per_unit,
    availability: res?.product?.availablity,
    inventory: res?.product?.inventory,
    description: res?.product?.description,
    tags: res?.product?.filter_tags,
    prodImg: res?.product?.product_image_url,
    category: res?.product?.category?.id,
    type: res?.product?.product_type,
    modifier: res?.product?.modifier_group_ids,
    addon: res?.product?.addon_ids,
    calories: res?.product?.nutrition_details?.calories,
    fat: res?.product?.nutrition_details?.fat,
    sodium: res?.product?.nutrition_details?.sodium,
    carbohydrates: res?.product?.nutrition_details?.carbohydrates,
    fiber: res?.product?.nutrition_details?.fiber,
    sugars: res?.product?.nutrition_details?.sugars,
    protein: res?.product?.nutrition_details?.protein,
  });
}

export { searchCols, setProductFields, editProductBody, createProductCols };
