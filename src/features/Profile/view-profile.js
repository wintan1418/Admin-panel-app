import React from "react";
import { Form, Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import User from "../../models/user/user";

export default function ViewProfile({}) {
  // const [form] = Form.useForm();
  const user = User.getUserObjectFromCookies();

  return (
    <>
      <Form layout="vertical" className="view-profile-info">
        <Row>
          <Col span={24} className="mb-4">
            <Avatar
              size={64}
              icon={<UserOutlined />}
              src={user?.user_image_url}
            />
          </Col>
        </Row>
        <Form.Item label="First Name">
          <span className="user-info">{user?.first_name}</span>
        </Form.Item>
        <Form.Item label="Last Name">
          <span className="user-info">{user?.last_name}</span>
        </Form.Item>
        <Form.Item label="Email">
          <span className="user-info">{user?.email}</span>
        </Form.Item>
        <Form.Item label="Phone Number">
          <span className="user-info">{user?.phone_number}</span>
        </Form.Item>
        {/* <Form.Item
                    label="Role"
                >
                    <span className="user-info">Manager</span>
                </Form.Item> */}
      </Form>
    </>
  );
}
