import React from "react";
import { Form, Input, Button, Card, Divider } from "antd";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import User from "../../models/user/user";
import { Link } from "react-router-dom";
import { message } from "antd";
import logo from "../../assets/images/site-logo.png";

export default function ForgotPassword() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await User.forgotPassword(values.email);
      message.success(`An email has been sent to ${values.email}`);
    } catch (error) {
      message.error(error?.error?.data?.message);
      // setFieldErrorsFromServer(error, form, values);
    }
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <React.Fragment>
      <div className="login-container">
        <div className="lc-logo">
          <img src={logo} alt="" />
        </div>
        <Card bordered={false} className="login-card">
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                prefix={
                  <UserOutlined className="site-form-item-icon text-primary" />
                }
                placeholder="Email"
                size="large"
              />
            </Form.Item>
            <Form.Item className="text-center mb-0">
              <Button className="primary-btn" type="primary" htmlType="submit">
                Reset
              </Button>
            </Form.Item>
            <Divider plain>
              <label>OR</label>
            </Divider>
            <Form.Item className="mb-0 text-center">
              <Link to="/login">
                <ArrowLeftOutlined /> Back to Login
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </React.Fragment>
  );
}
