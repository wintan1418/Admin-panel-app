import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Input, message } from 'antd'
import {
  updateRestaurant,
  fetchSingleRestaurant,
} from '../../redux/slices/restaurantSlice'
import { setFieldErrorsFromServer } from '../../utilities/generalUtility'
import { useHistory, useParams } from 'react-router'

export default function EditBrand() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const getRestaurant = async () => {
    setLoading(true)
    try {
      let res = await dispatch(fetchSingleRestaurant(id))
      console.log(res.restaurant)
      if (res?.error) {
        // setFieldErrorsFromServer(res?.error, form, values)
        message.error('Something went wrong!', 5)
      } else {
        form.setFieldsValue({
          name: res?.restaurant?.name,
          subdomain: res?.restaurant?.subdomain,
        })
        setLoading(false)
      }
    } catch (error) {
      // setFieldErrorsFromServer(error, form, values)
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getRestaurant()
  }, [])

  const saveRestaurant = async (values) => {
    try {
      let res = await dispatch(updateRestaurant(values, id))
      console.log(res)
      if (res?.error) {
        setFieldErrorsFromServer(res?.error, form, values)
        message.error('', 5)
      } else {
        message.success('Brand updated successfully!', 5)
        history.push('/brands')
      }
    } catch (error) {
      setFieldErrorsFromServer(error, form, values)
    }
  }

  return (
    <React.Fragment>
      <div className="common-box align-center restaurant-box">
        <h3>Edit Brand Info</h3>
        {!loading && (
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
            initialValues={{}}
            onFinish={(values) => {
              console.log(values)
              saveRestaurant(values)
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
              <Input />
            </Form.Item>
            <Form.Item
              className="mb-0"
              label="Sub Domain"
              name="subdomain"
              // rules={[
              //     {
              //         required: true,
              //         message: "Please input your Domain!",
              //     },
              //     {
              //         pattern: new RegExp("^[a-z-]+$"),
              //         message: "Only lower case alphabets and hyphens are allowed."
              //     }
              // ]}
            >
              <Input disabled={true} />
            </Form.Item>
            <div className="spacer-15"></div>
            <Button type="primary" className="primary-btn" htmlType="submit">
              Submit
            </Button>
          </Form>
        )}
      </div>
    </React.Fragment>
  )
}
