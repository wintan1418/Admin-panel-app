import {
  Input,
  Form,
  Row,
  Button,
  Col,
  Avatar,
  Select,
  message,
  Upload,
} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import NetworkCall from '../../network/networkCall'
import { useDispatch } from 'react-redux'
import { fetchLocationsWithoutPage } from '../../redux/slices/locationSlice'
import Request from '../../network/request'
import { useHistory } from 'react-router'
import User from '../../models/user/user'
import {
  fetchRestaurants,
} from '../../redux/slices/restaurantSlice'
import { createUserBody } from '../../helpers/user_helper'
import {
  setFieldErrorsFromServer,
  beforeUpload,
  getBase64,
} from '../../utilities/generalUtility'

const { Option } = Select

export default function CreateStaffUser() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [locations, setLocations] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [role, setRole] = useState()
  const [user_image, setImage] = useState()
  const [form] = Form.useForm()

  const getLocations = async () => {
    try {
      let res = await dispatch(fetchLocationsWithoutPage())
      console.dir(res)
      if (res?.error) {
        message.error(res?.error?.data?.error, 5)
      } else {
        setLocations(res?.locations)
      }
    } catch (error) {
      console.log(error)
      // message.error(error.error.data.error)
    }
  }

  const getRestaurants = async (page = 1, pageSize = 10) => {
    try {
      let res = await dispatch(fetchRestaurants(page, pageSize))
      console.dir(res)
      setRestaurants(res.restaurants)
    } catch (error) {
      console.log(error)
      // message.error(error.error.data.error)
    }
  }

  const saveUser = async (values) => {
    let data = createUserBody(values, user_image)
    try {
      let res = await NetworkCall.fetch(Request.createUser(data))
      if (res?.status) {
        message.success(res?.message)
        history.push('/users')
      }
    } catch (errors) {
      setFieldErrorsFromServer(errors, form, values)
    }
  }

  const handleRole = (value) => {
    setRole(value)
  }

  const handleChange = (info) => {
    getBase64(info.file, (imageUrl) => {
      setImage(imageUrl)
    })
  }

  useEffect(() => {
    getLocations()
    User.getRole() === 'Super Admin' && getRestaurants()
  }, [])

  return (
    <>
      <div className="body-wrapper">
        <div className="common-box profile-box">
          <h2 className="mb-0">Create User</h2>
          {/* <h3>View or edit your Profile</h3> */}
          <Button className="edit-profile-btn" type="link">
            <i className="icon-edit"></i>
          </Button>
          <div className="profile-inr-box">
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
                    style={{ margin: '0 16px', verticalAlign: 'middle' }}
                    className="primary-btn update-picture"
                    type="primary"
                  >
                    Update Picture
                  </Button>
                </Upload>
              </Col>
            </Row>
            <Form
              name="basic"
              layout="vertical"
              form={form}
              wrapperCol={{ span: 24 }}
              onFinish={(values) => saveUser(values)}
            >
              <Form.Item
                label="First Name"
                name="first_name"
                className="mb-0"
                rules={[
                  { required: true, message: 'Please enter your First Name !' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="last_name"
                className="mb-0"
                rules={[
                  { required: true, message: 'Please enter your Last Name !' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                className="mb-0"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please enter valid Email !',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone Number"
                name="phone_number"
                className="mb-0"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your Phone Number !',
                  },
                  {
                    pattern: new RegExp(
                      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
                    ),
                    message: 'Invalid Phone Number (e.g: 202 555 0165)',
                  },
                ]}
              >
                <Input placeholder="e.g: 202 555 0165" />
              </Form.Item>
              <Form.Item
                hidden={User.getRole() !== 'Super Admin'}
                label="Assign Role"
                name="role"
                rules={[
                  {
                    required: User.getRole() === 'Super Admin',
                    message: 'Please select Role !',
                  },
                ]}
              >
                <Select
                  style={{ width: '100%' }}
                  className="select-filed w-100 mr-3"
                  placeholder="Select Role"
                  onChange={handleRole}
                  optionLabelProp="label"
                >
                  {User.getRoles().map((role) => (
                    <Option value={role} label={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                hidden={!role || role === 'Super Admin'}
                label="Assign Brand"
                name="restaurant"
                rules={[
                  {
                    required: role && role !== 'Super Admin',
                    message: 'Please select Brand!',
                  },
                ]}
              >
                <Select
                  style={{ width: '100%' }}
                  className="select-filed w-100 mr-3"
                  placeholder="Select Brand"
                  optionLabelProp="label"
                >
                  {restaurants.map((restaurant) => (
                    <Option
                      value={restaurant?.id}
                      key={restaurant?.id}
                      label={restaurant?.name}
                    >
                      {restaurant?.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                hidden={
                  User.getRole() === 'Admin' ? false : !role || role !== 'Staff'
                }
                label="Assign Locations"
                name="locations"
                rules={[
                  {
                    required:
                      User.getRole() === 'Admin'
                        ? true
                        : role && role === 'Staff',
                    message: 'Please select Location(s) !',
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  className="select-filed"
                  placeholder="Select Locations(s)"
                  optionLabelProp="label"
                >
                  {locations.map((location) => (
                    <Option
                      value={location?.id}
                      key={location?.id}
                      label={location?.name ?? location?.pos_location_name}
                    >
                      <div className="demo-option-label-item">
                        {location?.pos_location_name ??
                          location?.pos_location_id}
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Row className="location-btn-bar align-items-center">
                <Button
                  className="primary-btn mb-0"
                  type="primary"
                  htmlType="submit"
                >
                  Save
                </Button>

                <a
                  href="#"
                  className="text-primary"
                  onClick={() => history.push('/users')}
                >
                  Cancel
                </a>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
