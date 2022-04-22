import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'antd'
import {
  fetchRestaurants,
  filterRestaurants,
} from '../../redux/slices/restaurantSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import K from '../../utilities/constants'
import { searchCols } from '../../helpers/brand_helper'
import { searchParams } from '../../utilities/generalUtility'
import SearchBar from '../../common/components/search/searchBar'

const columns = [
  {
    title: K.Tables.brandTitleHead.Name,
    dataIndex: K.Tables.brandTitleIndex.Name,
    key: 'id',
    render: (name, restaurant) => {
      return (
        <Link
          key={restaurant?.id}
          to={`/brands/${restaurant?.id}`}
          className="text-primary"
          style={{ textDecoration: 'none' }}
        >
          {name}
        </Link>
      )
    },
  },
]

export default function Brand() {
  // const [restaurants, setRestaurants] = useState([]);
  const dispatch = useDispatch()
  const history = useHistory()
  const { restaurants, restaurantsCount } = useSelector(
    (state) => state?.restaurant,
  )

  useEffect(() => {
    getRestaurants()
  }, [])

  const getRestaurants = async (page = 1, pageSize = 10) => {
    try {
      let res = await dispatch(fetchRestaurants(page, pageSize))
      console.dir(res)
      // setRestaurants(res.restaurants);
    } catch (error) {
      console.log(error)
    }
  }

  const resetSearch = (form) => {
    form.resetFields()
    getRestaurants()
  }

  const filterAllRestaurants = async (values) => {
    let search = searchParams(searchCols, values)
    let res = await dispatch(filterRestaurants(search))
    console.log(res)
    // setRestaurants(res?.restaurants);
  }

  return (
    <>
      <div className="body-wrapper">
        <div className="common-box width-44">
          <Row className="align-items-center mb-2 justify-content-sm-between">
            <Col xs={12} md={12} xl={12}>
              <h2 className="mb-0">Brand</h2>
            </Col>
            <Col span={12} className="text-right">
              <Button
                type="primary"
                className="primary-btn"
                onClick={() => history.push('/add-brand')}
              >
                Add Brand
              </Button>
            </Col>
          </Row>
          <div className="spacer-10"></div>
          <SearchBar
            fields={searchCols}
            handleSearch={filterAllRestaurants}
            resetSearch={resetSearch}
          />
          <div className="spacer-15"></div>
          <Table
            className="jetson-listing"
            columns={columns}
            dataSource={restaurants}
            pagination={{
              showSizeChanger: true,
              total: restaurantsCount,
              onChange: function (page, pageSize) {
                getRestaurants(page, pageSize)
              },
            }}
          />
        </div>
      </div>
    </>
  )
}
