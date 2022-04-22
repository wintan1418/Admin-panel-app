import { Button, Row, Form, Input, Switch, Select } from "antd";
const { Option } = Select;

export default function ModifierGroupForm({ form, handleUpdate }) {
  const listingTypes = ["tag", "radio", "checkbox"];
  return (
    <div className="body-wrapper">
      <div className="common-box">
        <Form form={form} onFinish={handleUpdate}>
          <h3>Modifier Group</h3>
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

          <label>Listing Type</label>

          <Form.Item name="listing_type">
            <Select
              placeholder="Select Listing Type"
              className="select-filed w-100 mr-3"
            >
              {listingTypes.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Form.Item>

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
