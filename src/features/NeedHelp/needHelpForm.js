import React from "react";
import { Input, Form, Button } from "antd";

import { useDispatch } from "react-redux";
import { createHelp } from "../../redux/slices/helpSlice";

const { TextArea } = Input;

export default function NeedHelp() {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onCreateHelp = (values) => {
    dispatch(createHelp(values));
    form.resetFields();
  };

  return (
    <div className="body-wrapper">
      <div className="common-box need-help">
        <h3 className="mb-0">Need Help?</h3>
        <p>We’re here 24/7 to assist you</p>

        <Form
          layout="vertical"
          form={form}
          onFinish={onCreateHelp}
          autoComplete="off"
        >
          <Form.Item
            className="mb-0"
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your Name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            className="mb-0"
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please input your Phone Number!"
              },
              {
                pattern: new RegExp(
                  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
                ),
                message: "Invalid Phone Number. (e.g: 202 555 0165)",
              },
            ]}
          >
            <Input placeholder="e.g: 202 555 0165" />
          </Form.Item>
          <Form.Item
            label="Email"
            className="mb-0"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Message"
            className="mb-0"
            name="message"
            rules={[{ required: true, message: "Please input your Message!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Button type="primary" className="primary-btn" htmlType="submit">
            Send Message
          </Button>
        </Form>
      </div>
    </div >
  );
}
