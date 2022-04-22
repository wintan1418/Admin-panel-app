import { Button, Row, Form, Input, Switch } from "antd";

export default function ModifierItemForm({ form, handleUpdate }) {
  return (
    <div className="body-wrapper">
      <div className="common-box">
        <Form form={form} onFinish={handleUpdate}>
          <h3>Modifier Item</h3>
          <Form.Item name="id" noStyle></Form.Item>
          <label>Name</label>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your Modifier Name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div className="usd-price">
            <span>USD $</span>
            <Form.Item name="price" noStyle>
              <Input readOnly />
            </Form.Item>
          </div>
          <label>Availability</label>
          <Form.Item name="availablity" valuePropName="checked" noStyle>
            <Switch />
          </Form.Item>
          <div className="spacer-15"></div>
          <Row className="location-btn-bar align-items-center">
            <Button className="primary-btn" type="primary" htmlType="submit">
              Update
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
}
