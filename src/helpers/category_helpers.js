import K from "../utilities/constants";
import { Switch } from "antd";
import { Link } from "react-router-dom";

function createCatCols(categoryStatusHandler) {
  return [
    {
      title: K.Tables.categoryTitleHead.catName,
      dataIndex: K.Tables.categoryTitleIndex.catName,
      render: (name, cat) => {
        return (
          <Link
            key={cat?.id}
            to={`/categories/${cat?.id}`}
            className="text-primary"
            style={{ textDecoration: "none" }}
          >
            {name ?? cat?.pos_category_name}
          </Link>
        );
      },
    },
    {
      title: K.Tables.categoryTitleHead.preference,
      dataIndex: K.Tables.categoryTitleIndex.preference,
      align: "center",
    },
    {
      title: K.Tables.categoryTitleHead.available,
      dataIndex: K.Tables.categoryTitleIndex.availablity,
      render: (availablity, category) => {
        return (
          <Switch
            checked={availablity}
            onChange={(checked) => {
              category = { ...category, availablity: checked };
              categoryStatusHandler(category);
            }}
          />
        );
      },
    },
  ];
}

function setCategoryFields(form, res) {
  form.setFieldsValue({
    name: res?.category?.name ?? res?.category?.pos_category_name,
    availablity: res?.category?.availablity,
    preference: res?.category?.preference,
  });
}

function editCategoryBody(values) {
  return {
    ...values,
    preference: parseInt(values.preference),
  };
}

function creatCategoryBody(values, location) {
  return {
    ...values,
    preference: parseInt(values.preference),
    location_id: location,
  };
}

const searchCols = [
  {
    id: 1,
    title: "Category Name",
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
  createCatCols,
  setCategoryFields,
  searchCols,
  editCategoryBody,
  creatCategoryBody,
};
