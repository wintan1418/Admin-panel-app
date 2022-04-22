import { Button, Col, Row, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  searchParams,
  getSearchedParams,
  setParams,
  deleteQueryParam,
} from '../../utilities/generalUtility'
import SearchBar from '../../common/components/search/searchBar'
import {
  fetchDiscounts,
  syncDiscountsfromOmnivore,
  updateDiscount,
} from '../../redux/slices/discountSlice'
import { discountColumns, searchCols } from '../../helpers/discounts_helper'
import User from '../../models/user/user'
import K from '../../utilities/constants'
import SuperAdminSelect from '../../common/components/Select/select'

export default function DiscountsListing() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [location_id, setLocationId] = useState('')
  const [restaurant_id, setRestaurantId] = useState('')
  const { discounts, discountsCount } = useSelector((state) => state.discount)
  const location = useSelector((state) => state?.auth?.selectedLocation)

  const getDiscounts = (values, page = 1, pageSize = 10) => {
    try {
      let searchValues = {
        ...values,
        restaurant_id,
        location_id,
      }
      let search = searchParams(searchCols, searchValues)
      dispatch(
        fetchDiscounts({
          ...search,
          page,
          pageSize,
        }),
      )
      setParams(history, searchValues, page, pageSize)
    } catch (error) {
      console.log(error)
    }
  }

  const discountStatusHandler = async (discount) => {
    try {
      await dispatch(updateDiscount(discount))
    } catch (error) {
      message.error(error?.error?.data?.error)
    }
  }

  const syncDiscounts = () => {
    try {
      dispatch(syncDiscountsfromOmnivore(location_id))
    } catch (error) {
      console.log(error)
    }
  }

  const resetSearch = (form) => {
    form.resetFields()
    getDiscounts(
      undefined,
      getSearchedParams()?.page,
      getSearchedParams()?.pageSize,
    )
    deleteQueryParam(history, getSearchedParams())
  }

  useEffect(() => {
    getDiscounts()
  }, [location_id])

  useEffect(() => {
    User.getRole() === K.Roles.Admin && setLocationId(location?.id)
  }, [location])

  useEffect(() => {
    User.getRole() === K.Roles.SuperAdmin && restaurant_id && getDiscounts()
  }, [restaurant_id])

  return (
    <>
      <div className="body-wrapper">
        <Row className="common-box">
          <Col span={24}>
            <Row className="align-items-center justify-content-sm-between">
              <Col span={12}>
                <h2>Loyalty</h2>
              </Col>
              <Col span={12} className="text-right">
                <Button
                  type="link"
                  className="text-primary"
                  onClick={() => {
                    if (User.getRole() === K.Roles.Admin)
                      setLocationId(location.id)
                    syncDiscounts()
                  }}
                >
                  Sync Now
                </Button>
              </Col>
            </Row>
            {User.getRole() === K.Roles.SuperAdmin && (
              <SuperAdminSelect
                setRestaurant={setRestaurantId}
                setLocation={setLocationId}
                location_id={location_id}
                restaurant_id={restaurant_id}
              />
            )}
            <SearchBar
              fields={searchCols}
              handleSearch={getDiscounts}
              resetSearch={resetSearch}
            />
            <div className="spacer-15"></div>
            <Table
              className="jetson-listing"
              columns={discountColumns(discountStatusHandler)}
              dataSource={discounts}
              pagination={{
                showSizeChanger: true,
                current: parseInt(getSearchedParams()?.page),
                total: discountsCount,
                onChange: function (page, pageSize) {
                  getSearchedParams()
                    ? getDiscounts(getSearchedParams(), page, pageSize)
                    : getDiscounts(undefined, page, pageSize)
                },
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  )
}
