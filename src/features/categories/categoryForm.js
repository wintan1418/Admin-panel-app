import React, { useEffect } from "react";
import { Input, Button, Switch, Row, Col, Form } from "antd";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editCategoryBody,
  creatCategoryBody,
} from "../../helpers/category_helpers";
import {
  getCategory,
  updateCategory,
  createCategory,
} from "../../redux/slices/categorySlice";

export default function CategoryForm({ location }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const selectedLocation = useSelector((state) => state.auth.selectedLocation);
  const [form] = Form.useForm();

  const getCategoryDetail = () => {
    dispatch(getCategory(id, form));
  };

  const onUpdateCategory = (values) => {
    let category = editCategoryBody(values);
    dispatch(updateCategory(category, id, form));
    history.push("/categories");
  };

  const onCreateCategory = (values) => {
    let category = creatCategoryBody(
      values,
      selectedLocation?.id ?? location?.state?.location_id
    );
    dispatch(createCategory(category, form));
    history.push("/categories");
  };

  useEffect(() => {
    id && getCategoryDetail();
  }, []);

  return (
    <>
      <div className="body-wrapper width-38">
        <div className="common-box">
          <Form form={form} onFinish={id ? onUpdateCategory : onCreateCategory}>
            <Row gutter={16}>
              <Col span={18}>
                <h3>{id ? "Edit Category" : "New Category"}</h3>
                <label>Name</label>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Category Name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <label>Rank</label>
                <Form.Item
                  name="preference"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Category Rank",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <label>Availability</label>
                <Form.Item name="availablity" valuePropName="checked" noStyle>
                  <Switch />
                </Form.Item>
                <div className="spacer-15"></div>
                <Row className="location-btn-bar align-items-center">
                  <Button
                    className="primary-btn"
                    type="primary"
                    htmlType="submit"
                  >
                    {id ? "Update Category" : "Create Category"}
                  </Button>

                  <Link className="text-primary" to={"/categories"}>
                    Cancel
                  </Link>
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}
