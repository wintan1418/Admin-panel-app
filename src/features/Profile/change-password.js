import { Input, Form, Row, Button, message } from "antd";
import React from "react";
import User from "../../models/user/user";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";

export default function ChangePassword({ showHandler }) {
  const user = User.getUserObjectFromCookies();

  const changePassword = async (values) => {
    if (values.new_password !== values.new_password_confirmation) {
      message.error("New Password and Confirm Password do not match!");
      return;
    }
    try {
      const res = await NetworkCall.fetch(
        Request.changeUserPassword(values, user?.id)
      );

      if (res?.error) {
        message.error("Something went wrong!", 4);
      } else {
        message.success(res?.message, 4);
        showHandler(false);
      }
    } catch (error) {
      console.log(error);
      message.error(error?.error?.data?.message, 4);
    }
  };
  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        className="change-password-form"
        onFinish={(values) => {
          changePassword(values);
        }}
      >
        <Form.Item
          label="Current Password"
          name="current_password"
          className="mb-0"
          rules={[{ required: true, message: "Current Password required!" }]}
        >
          <Input.Password placeholder="Enter current password" />
        </Form.Item>
        <div className="spacer-15"></div>
        <Form.Item
          label="New Password"
          name="new_password"
          className="mb-0"
          rules={[
            { required: true, message: "Password is required!" },
            { min: 8, message: "Password need to be minimum 8 characters!" },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <div className="spacer-15"></div>
        <Form.Item
          label="Confirm Password"
          name="new_password_confirmation"
          className="mb-0"
          rules={[
            { required: true, message: "Password confirmation is required!" },
            { min: 8, message: "Password need to be minimum 8 characters!" },
          ]}
        >
          <Input.Password placeholder="Enter new password" />
        </Form.Item>
        <div className="spacer-25"></div>
        <Row className="location-btn-bar align-items-center">
          <Button className="primary-btn mb-0" type="primary" htmlType="submit">
            Save
          </Button>

          <a
            href="#"
            className="text-primary"
            onClick={() => showHandler(false)}
          >
            Cancel
          </a>
        </Row>
      </Form>
    </>
  );
}
