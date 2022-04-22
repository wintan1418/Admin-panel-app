import { Form, Input, Switch, Select, Row, Button, Tag } from "antd";

export default function AddAddon({
  form,
  addonProducts,
  setAddonProducts,
  products,
  handleCreate,
}) {
  return (
    <div className="body-wrapper ">
      <div className="common-box">
        <Form form={form} onFinish={handleCreate}>
          <h3>Add On</h3>
          <label>Name</label>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter Add On Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <label>Select Products</label>
          {products
            .filter(({ id }) => addonProducts.includes(id))
            .map(({ name }) => (
              <Tag>{name}</Tag>
            ))}
          <div className="spacer-15"></div>
          <Select
            mode="multiple"
            placeholder="Search your product"
            options={products.map((prod) => ({
              label: prod.name,
              value: prod.id,
            }))}
            value={addonProducts}
            style={{ width: "100%" }}
            onSelect={(value) =>
              !addonProducts.includes(value) &&
              setAddonProducts([...addonProducts, value])
            }
            onDeselect={(value) =>
              setAddonProducts(addonProducts.filter((data) => data !== value))
            }
          />
          <div className="spacer-15"></div>
          <label>Availability</label>
          <Form.Item name="availablity" valuePropName="checked" noStyle>
            <Switch />
          </Form.Item>
          <div className="spacer-15"></div>
          <Row className="location-btn-bar align-items-center">
            <Button className="primary-btn" type="primary" htmlType="submit">
              Create
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
}
