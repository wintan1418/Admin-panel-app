import React, { useEffect } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import User from "../../models/user/user";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/site-logo.png";
import { useLocation, useHistory, Link } from "react-router-dom";
import {
  deleteQueryParam,
  redirectToUrl,
  setFieldErrorsFromServer,
} from "../../utilities/generalUtility";
import qs from "qs";

export default function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [form] = Form.useForm();
  const paramJson = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    console.log("paramJson: ", paramJson);
    if (paramJson.err) {
      message.error(paramJson.err);
      deleteQueryParam(history, { err: "err" });
    }
  }, []);

  const onFinish = async (values) => {
    try {
      let res = await dispatch(
        User.loginCall(values.email, values.password, values.remember)
      );
      // const { from } = location.state || { from: { path: "/" } };
      console.log("login-result: ", res);
      redirectToUrl(res?.user?.tenant_name, "/");
    } catch (error) {
      if (error?.error?.data?.error) {
        message.error(error?.error?.data?.error, 5);
      }
      setFieldErrorsFromServer(error, form, values);
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
          <h2>Login to your account</h2>
          <Form
            form={form}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <Form.Item
              className="mb-10"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                type="email"
                prefix={
                  <UserOutlined className="site-form-item-icon text-primary" />
                }
                placeholder="Email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              className="mb-10"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={
                  <LockOutlined className="site-form-item-icon text-primary" />
                }
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

              <Link
                to="/forgot-password"
                className="float-left p-reset"
                href=""
              >
                Password Reset
              </Link>
            </Form.Item>
            <Form.Item className="text-center mb-0">
              <Button type="primary" className="primary-btn" htmlType="submit">
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </React.Fragment>
  );
}
