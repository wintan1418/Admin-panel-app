import React from "react";
import { Form } from "antd";

export default function EditPassword() {
  return (
    <Form layout="vertical" className="view-profile-info mb-0">
      <Form.Item label="Password">
        <span className="password-strerik"></span>
      </Form.Item>
    </Form>
  );
}
