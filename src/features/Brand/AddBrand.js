import React from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Input, message } from 'antd'
import { saveRestaurant } from '../../redux/slices/restaurantSlice'
import { setFieldErrorsFromServer } from '../../utilities/generalUtility'
import { useHistory } from 'react-router'

export default function AddBrand() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [form] = Form.useForm()

  const createRestaurant = async (values) => {
    try {
      let res = await dispatch(saveRestaurant(values.name, values.subdomain))
      console.log(res)
      if (res?.error) {
        setFieldErrorsFromServer(res?.error, form, values)
        message.error('Error', 5)
      } else {
        message.success('Brand created successfully!', 5)
        history.push('/brands')
      }
    } catch (error) {
      setFieldErrorsFromServer(error, form, values)
    }
  }

  return (
    <React.Fragment>
      <div className="common-box align-center restaurant-box">
        <h3>Add Brand</h3>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={(values) => {
            console.log(values)
            createRestaurant(values)
          }}
          onFinishFailed={(errorInfo) => console.log(errorInfo)}
          autoComplete="off"
        >
          <Form.Item
            label="Brand Name"
            name="name"
            className="mb-3"
            rules={[
              {
                required: true,
                message: 'Brand Name required!',
              },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            className="mb-0"
            label="Sub Domain"
            name="subdomain"
            rules={[
              {
                required: true,
                message: 'Sub Domain name required!',
              },
              {
                pattern: new RegExp('^[a-z-]+$'),
                message: 'Only lower case alphabets and hyphens are allowed.',
              },
            ]}
          >
            <Input placeholder="Sub Domain" />
          </Form.Item>
          <div className="spacer-15"></div>
          <Button type="primary" className="primary-btn" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    </React.Fragment>
  )
}
