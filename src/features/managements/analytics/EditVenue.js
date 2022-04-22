import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Drawer, Input } from "antd";
import { Form, Select, Row, Col } from "antd";
import { fakeDataLocations } from "../../../helpers/analytic_helper";

const { Option } = Select;

const EditVenue = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    changeStatus() {
      handleChangeStatus();
    },
  }));

  const handleChangeStatus = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Drawer
        className="menus-drawer form-managment"
        width={400}
        title="Edit Model Venue"
        placement="right"
        onClose={handleChangeStatus}
        visible={visible}
        maskClosable={false}
      >
        <Form
          name="basic"
          layout="vertical"
          form={form}
          wrapperCol={{ span: 24 }}
          onFinish={(values) => console.log(values)}
        >
          <Form.Item
            label="Frequency"
            name="frequency"
            className="mb-3"
            rules={[{ required: true, message: "Please select frequency !" }]}
          >
            <Select className="w-100" placeholder="Select Locations">
              {fakeDataLocations.map((data) => (
                <Option key={data?.id} value={data?.id}>
                  {data?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Revenue"
            name="revenue"
            className="mb-3"
            rules={[{ required: true, message: "Please enter revenue !" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="expense"
            name="expense"
            className="mb-3"
            rules={[{ required: true, message: "Please enter expense !" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Profit"
            name="profit"
            className="mb-3"
            rules={[{ required: true, message: "Please enter profit !" }]}
          >
            <Input />
          </Form.Item>
          <Row className="location-btn-bar align-items-center mt-4">
            <Col span={24}>
              <Button
                className="primary-btn mb-0"
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>

              <a
                href="#"
                className="text-primary pl-4"
                onClick={handleChangeStatus}
              >
                Cancel
              </a>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
});

export default EditVenue;
