import React, { useEffect, useState } from "react";
import {
  Input,
  Select,
  Upload,
  Button,
  Radio,
  Checkbox,
  Switch,
  Row,
  Col,
  Form,
} from "antd";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { editProductBody } from "../../helpers/product_helpers";
import { locationCategories } from "../../redux/slices/categorySlice";
import { updateProduct, getProduct } from "../../redux/slices/productSlice";
import { createCategory } from "../../redux/slices/categorySlice";
import { beforeUpload, getBase64 } from "../../utilities/generalUtility";
import { getActiveModifiers } from "../../redux/slices/modifierSlice";
import { locationAddons } from "../../redux/slices/addonSlice";

const { TextArea } = Input;

let productType = ["Food", "Beverage"];

export default function ProductForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const { id } = useParams();
  const modifiers = useSelector((state) => state.modifier.modifierGroups);
  const selectedLocation = useSelector((state) => state.auth.selectedLocation);
  const [form] = Form.useForm();
  const [showNutrition, setShowNutri] = useState(false);
  const [showCategory, setShowCat] = useState(false);
  const [showModifier, setShowModifier] = useState(false);
  const [prod_image, setImage] = useState();
  const [name, setName] = useState();
  const [categories, setCategories] = useState([]);
  const [addons, setAddons] = useState([]);
  let location_id = selectedLocation?.id ?? location?.state?.location_id;

  const getAllCategories = async () => {
    let forProduct = true;
    let response = await dispatch(locationCategories(forProduct, location_id));
    setCategories(response);
  };

  const getAllAddons = async () => {
    let response = await dispatch(locationAddons(location_id));
    setAddons(response);
  };

  const getAllModifiers = () => {
    dispatch(getActiveModifiers(location_id));
  };

  const getProductDetail = () => {
    dispatch(getProduct(id, form, setImage));
  };

  const onEditProduct = (values) => {
    let product = editProductBody(values, prod_image);
    dispatch(updateProduct(product, id));
    history.push("/products");
  };

  const onCreateCategory = () => {
    dispatch(createCategory({ name, location_id: selectedLocation?.id }));
    getAllCategories();
  };

  const onCatChange = (e) => {
    setName(e.target.value);
  };

  const handleChange = (info) => {
    getBase64(info.file, (imageUrl) => {
      setImage(imageUrl);
    });
  };

  useEffect(() => {
    getProductDetail();
    getAllCategories();
    getAllAddons();
    getAllModifiers();
  }, []);

  return (
    <>
      <div className="body-wrapper width-38">
        <div className="common-box">
          <Form form={form} onFinish={onEditProduct}>
            <Row gutter={16}>
              <Col span={18}>
                <h3>Edit Product</h3>
                <label>Name</label>
                <Form.Item
                  name="productName"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Product Name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <label>Description</label>
                <Form.Item name="description" noStyle>
                  <TextArea autoSize={{ minRows: 3, maxRows: 4 }} />
                </Form.Item>
                <Button
                  type="link"
                  className="text-primary"
                  onClick={() => setShowNutri(!showNutrition)}
                >
                  <PlusOutlined /> Add Nutritional Details
                </Button>
                <div className="spacer-15"></div>
                {showNutrition && (
                  <>
                    <label>Nutrition Details</label>
                    <ul className="nutrition-details">
                      <li>
                        <label>Calories:</label>
                        <Form.Item name="calories" noStyle>
                          <Input />
                        </Form.Item>
                      </li>
                      <li>
                        <label>Fat:</label>
                        <Form.Item name="fat" noStyle>
                          <Input />
                        </Form.Item>
                      </li>
                      <li>
                        <label>Sodium:</label>
                        <Form.Item name="sodium" noStyle>
                          <Input />
                        </Form.Item>
                      </li>
                      <li>
                        <label>Carbohydrates:</label>
                        <Form.Item name="carbohydrates" noStyle>
                          <Input />
                        </Form.Item>
                      </li>
                      <li>
                        <label>Fiber:</label>
                        <Form.Item name="fiber" noStyle>
                          <Input />
                        </Form.Item>
                      </li>
                      <li>
                        <label>Sugars:</label>
                        <Form.Item name="sugars" noStyle>
                          <Input />
                        </Form.Item>
                      </li>
                      <li>
                        <label>Protein:</label>
                        <Form.Item name="protein" noStyle>
                          <Input />
                        </Form.Item>
                      </li>
                    </ul>
                  </>
                )}

                <div className="spacer-15"></div>
                <label>Filter Tags</label>
                <Form.Item name="tags" noStyle>
                  <Select
                    mode="tags"
                    style={{ width: "100%" }}
                    placeholder="Tags Mode"
                  ></Select>
                </Form.Item>
                <div className="spacer-15"></div>
                <label>Price</label>
                <div className="usd-price">
                  <span>USD $</span>
                  <Form.Item name="price" noStyle>
                    <Input readOnly />
                  </Form.Item>
                </div>
                <div className="spacer-15"></div>
                <label>Image</label>
                <div className="product-thumb">
                  {prod_image && <img src={prod_image} alt="" />}
                  <Upload
                    beforeUpload={beforeUpload}
                    customRequest={handleChange}
                    maxCount={1}
                    showUploadList={false}
                  >
                    <Button className="primary-btn upload-btn">
                      Add Image
                    </Button>
                    <span className="span-text">JPG or PNG / 1MB Max</span>
                  </Upload>
                </div>
                <div className="spacer-15"></div>
                <label>Type</label>
                <div className="select-box mb-2">
                  <p>Enter search term</p>
                  <Form.Item name="type" noStyle>
                    <Radio.Group size="large" className="select-items">
                      {productType.map((type) => (
                        <Radio key={type} value={type}>
                          {type}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                </div>
                <div className="spacer-15"></div>
                <label>Parent Category</label>
                <div className="select-box mb-2">
                  <p>Enter search term</p>
                  <Form.Item name="category" noStyle>
                    <Radio.Group size="large" className="select-items">
                      {categories.map((cat) => (
                        <Radio key={cat?.id} value={cat?.id}>
                          {cat?.name ?? cat?.pos_category_name}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </Form.Item>
                </div>
                <Button
                  type="link"
                  className="text-primary"
                  onClick={() => setShowCat(!showCategory)}
                >
                  <PlusOutlined /> Add custom category
                </Button>
                <div className="spacer-15"></div>
                {showCategory && (
                  <div className="addition-field">
                    <Input onChange={onCatChange} value={name} />
                    <Button type="link" onClick={onCreateCategory}>
                      <span className="text-primary">
                        <PlusOutlined />
                        Add
                      </span>
                    </Button>
                  </div>
                )}
                <div className="spacer-15"></div>
                <label>Modifier Groups</label>
                <div className="select-box mb-2">
                  <p>Enter search term</p>
                  <div className="select-items">
                    <Form.Item name="modifier" noStyle>
                      <Checkbox.Group>
                        {modifiers.map((mod) => (
                          <Checkbox key={mod?.id} value={mod?.id}>
                            {mod?.name ?? mod?.pos_modifier_group_name}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </Form.Item>
                  </div>
                </div>
                <div className="spacer-15"></div>
                <label>Add ons</label>
                <div className="select-box mb-2">
                  <p>Enter search term</p>
                  <div className="select-items">
                    <Form.Item name="addon" noStyle>
                      <Checkbox.Group>
                        {addons.map((addon) => (
                          <Checkbox key={addon?.id} value={addon?.id}>
                            {addon?.name}
                          </Checkbox>
                        ))}
                      </Checkbox.Group>
                    </Form.Item>
                  </div>
                </div>
                {/* <Button
                  type="link"
                  className="text-primary"
                  onClick={() => setShowModifier(!showModifier)}
                >
                  <PlusOutlined /> Add new modifier group
                </Button> */}
                <div className="spacer-15"></div>
                {showModifier && (
                  <div className="addition-field">
                    <Input />
                    <Button type="link">
                      <span className="text-primary">
                        <PlusOutlined />
                        Add
                      </span>
                    </Button>
                  </div>
                )}
                <div className="spacer-15"></div>
                <label>Inventory</label>
                <Form.Item name="inventory" noStyle>
                  <Input className="inventory-field" />
                </Form.Item>
                <div className="spacer-15"></div>
                <label>Availability</label>

                <Form.Item name="availability" valuePropName="checked" noStyle>
                  <Switch />
                </Form.Item>
                <div className="spacer-15"></div>
                <Row className="location-btn-bar align-items-center">
                  <Button
                    className="primary-btn"
                    type="primary"
                    htmlType="submit"
                  >
                    Update Product
                  </Button>

                  <Link className="text-primary" to={"/products"}>
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
