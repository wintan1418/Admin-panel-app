import React, { useEffect, useState } from 'react'
import { Form, Select, Col } from 'antd'
import { fetchAllRestaurants } from '../../../redux/slices/restaurantSlice'
import { fetchRestaurantLocations } from '../../../redux/slices/locationSlice'
import { CloseCircleOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { deleteQueryParam } from '../../../utilities/generalUtility'
import { useHistory } from 'react-router-dom'

const { Option } = Select

export default function ResLocSelect({
  setRestaurant,
  setLocation,
  location_id,
  restaurant_id,
}) {
  const dispatch = useDispatch()
  const history = useHistory()
  const [form] = Form.useForm()
  const [restaurants, setRestaurants] = useState([])
  const [locations, setLocations] = useState([])

  const getAllRestaurants = async () => {
    let response = await dispatch(fetchAllRestaurants())
    setRestaurants(response?.restaurants)
  }

  const onRestaurantSelect = async (restaurant_id) => {
    setLocation('')
    setRestaurant(restaurant_id)
    let response = await dispatch(fetchRestaurantLocations(restaurant_id))
    setLocations(response?.locations)
  }

  const onLocationSelect = async (location_id) => {
    setLocation(location_id)
  }

  const clearLocationHandle = () => {
    setLocation('')
    deleteQueryParam(history, { location_id })
  }

  const clearRestaurantHandle = () => {
    setRestaurant('')
    setLocation('')
    setLocations([])
    deleteQueryParam(history, { restaurant_id })
  }

  useEffect(() => {
    getAllRestaurants()
  }, [])

  return (
    <Form form={form}>
      <Col span={12} className="d-flex  ">
        <Form.Item
          className="select-filed w-100 mr-3 "
          hidden={restaurants.length === 0}
        >
          <div>Brands</div>
          <div className="addition-field">
            <Select
              placeholder="Select Brand"
              onChange={(value) => onRestaurantSelect(value)}
              value={restaurant_id || undefined}
            >
              {restaurants.map((data) => (
                <Option key={data?.id} value={data?.id}>
                  {data?.name}
                </Option>
              ))}
            </Select>

            <CloseCircleOutlined
              className="text-primary product-select"
              onClick={clearRestaurantHandle}
            />
          </div>
        </Form.Item>
        <Form.Item
          className="select-filed w-100 mr-3 "
          hidden={locations.length === 0}
        >
          <div>Locations</div>
          <div className="addition-field">
            <Select
              placeholder="Select Location"
              onChange={(value) => onLocationSelect(value)}
              value={location_id || undefined}
            >
              {locations.map((loc) => (
                <Option key={loc?.id} value={loc?.id}>
                  {loc?.name ?? loc?.pos_location_name}
                </Option>
              ))}
            </Select>
            <CloseCircleOutlined
              className="text-primary product-select"
              onClick={clearLocationHandle}
            />
          </div>
        </Form.Item>
      </Col>
    </Form>
  )
}
