import { Input, Form, Row, Button, Col, Avatar, Upload, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";
import User from "../../models/user/user";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import K from "../../utilities/constants";
import { useDispatch } from "react-redux";
import { upsertModel } from "../../models/baseModel/baseActions";
import { beforeUpload, getBase64 } from "../../utilities/generalUtility";

export default function EditProfile({ showHandler }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = User.getUserObjectFromCookies();
  const [user_image, setImage] = useState();

  useEffect(() => {
    setImage(user?.user_image_url);
    form.setFieldsValue({
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone_number: user?.phone_number,
    });
  }, []);

  const saveProfileToCookie = (user, remember = false) => {
    let encryptedUser = CryptoJS.AES.encrypt(
      JSON.stringify(user?.user),
      K.Cookie.Key.EncryptionKey
    );
    console.log("encryptedUser", encryptedUser);
    // Cookies.set(K.Cookie.Key.User, encryptedUser, {
    //   path: "/",
    //   domain: "." + K.Network.URL.Client.BaseHost,
    //   expires: remember ? 365 : "",
    // });
    Cookies.set(K.Cookie.Key.User, encryptedUser);

    dispatch(upsertModel(User, user));
  };

  const updateProfile = async (values) => {
    try {
      const res = await NetworkCall.fetch(
        Request.updateUser(values, user_image, user?.id)
      );
      if (res?.error) {
        message.error("Something went wrong!", 4);
      } else {
        saveProfileToCookie(res);
        showHandler(false);
      }
    } catch (error) {
      console.log(error);
      message.error(error?.error?.data?.error, 4);
    }
  };
  const handleChange = (info) => {
    getBase64(info.file, (imageUrl) => {
      setImage(imageUrl);
    });
  };

  return (
    <>
      <Row>
        <Col span={24} className="mb-4 avatar-box">
          <Avatar size={64} icon={<UserOutlined />} src={user_image} />

          <Upload
            beforeUpload={beforeUpload}
            customRequest={handleChange}
            maxCount={1}
            showUploadList={false}
          >
            <Button
              size="small"
              style={{ margin: "0 16px", verticalAlign: "middle" }}
              className="primary-btn update-picture"
              type="primary"
            >
              Update Picture
            </Button>
          </Upload>
        </Col>
      </Row>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={(values) => {
          updateProfile(values);
        }}
      >
        <Form.Item
          label="First Name"
          name="first_name"
          className="mb-0"
          rules={[{ required: true, message: "First Name required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          className="mb-0"
          rules={[{ required: true, message: "Last Name required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          className="mb-0"
          rules={[
            { required: true, message: "Please enter your Email!" },
            { type: "email", message: "The email entered is not valid!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone_number"
          className="mb-0"
          rules={[
            { required: true, message: "Phone Number is required!" },
            // {
            //   pattern: new RegExp(
            //     "/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im"
            //   ),
            //   message: "Enter a valid US number!",
            // },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
                    label="Role"
                    name="role"
                    className="mb-3"
                    rules={[{ required: true, message: 'Please enter your Role!' }]}
                >
                    <Input />
                </Form.Item> */}
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
