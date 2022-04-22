import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Table, Form, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../../common/components/search/searchBar'
import SuperAdminSelect from '../../common/components/Select/select'
import {
  getAddOns,
  getAddOn,
  getAddOnItems,
  updateAddOn,
  createAddon,
  updateAddOnItem,
  deleteAddOn,
  deleteProductAddOn,
} from '../../redux/slices/addonSlice'
import {
  createAddOnCols,
  itemsTable,
  searchCols,
} from '../../helpers/addon_helpers'
import { useHistory } from 'react-router-dom'
import {
  searchParams,
  setParams,
  getSearchedParams,
  deleteQueryParam,
} from '../../utilities/generalUtility'
import AddOnDrawer from './addonDrawer'
import AddAddon from './addAddon'
import EditAddon from './editAddon'
import User from '../../models/user/user'
import { locationProducts } from '../../redux/slices/productSlice'

export default function Addon() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [form] = Form.useForm()
  const { addons, addonsItems, addonsCount } = useSelector(
    (state) => state.addon,
  )
  const selectedLocation = useSelector((state) => state.auth.selectedLocation)
  const [expandedKey, setExpandedKey] = useState(null)
  const [open, setOpenDrawer] = useState(false)
  const [products, setProducts] = useState([])
  const [addonProducts, setAddonProducts] = useState([])
  const [restaurant_id, setRestaurant] = useState('')
  const [location_id, setLocation] = useState('')
  const [formType, setType] = useState()

  const getAllAddons = (values, page = 1, pageSize = 10) => {
    let searchValues = {
      ...values,
      restaurant_id,
      location_id: location_id ? location_id : selectedLocation?.id,
    }
    let search = searchParams(searchCols, searchValues)
    let body = {
      ...search,
      page,
      pageSize,
    }
    dispatch(getAddOns(body))
    setParams(history, searchValues, page, pageSize)
  }

  const getAddOnDetail = (id, addon) => {
    dispatch(getAddOn(id, form, setAddonProducts))
    getProducts(addon?.location_id)
    setType('edit')
  }

  const closeDrawer = () => {
    setOpenDrawer(false)
  }

  const updateAddon = (values) => {
    let body = {
      ...values,
      product_ids: addonProducts,
    }
    dispatch(updateAddOn(body))
    getAllAddons()
    setAddonProducts([])
    setOpenDrawer(false)
  }

  const addonStatusHandler = (body) => {
    dispatch(updateAddOn(body))
  }

  const addAddon = () => {
    if (User.getRole() === 'Super Admin') {
      if (location_id) {
        getProducts(location_id)
        setType('create')
      } else message.warning('Please Select Location First')
    } else {
      getProducts(selectedLocation?.id)
      setType('create')
    }
  }
  const getProducts = async (location) => {
    setAddonProducts([])
    form.resetFields()
    let response = await dispatch(locationProducts(location))
    setProducts(response)
    setOpenDrawer(true)
  }

  const onCreateAddOn = (values) => {
    let addon = {
      ...values,
      product_ids: addonProducts,
      location_id: location_id ? location_id : selectedLocation?.id,
    }
    dispatch(createAddon(addon))
    getAllAddons()
    setOpenDrawer(false)
    setAddonProducts([])
  }

  const getAllAddOnItems = (opened, addon) => {
    expandedKey === addon?.id ? setExpandedKey(null) : setExpandedKey(addon?.id)
    opened && dispatch(getAddOnItems(addon?.id))
  }

  const onPageChange = (pageNo, pageSize) => {
    getSearchedParams()
      ? getAllAddons(getSearchedParams(), pageNo, pageSize)
      : getAllAddons(undefined, pageNo, pageSize)
  }

  const productStatusHandler = (product) => {
    dispatch(updateAddOnItem(product, product?.id))
  }

  const resetSearch = (form) => {
    form.resetFields()
    getAllAddons(
      undefined,
      getSearchedParams()?.page,
      getSearchedParams()?.pageSize,
    )
    deleteQueryParam(history, getSearchedParams())
  }

  const addOnDeletion = (id) => {
    dispatch(deleteAddOn(id, getSearchedParams()))
  }

  const addOnProductDeletion = (product_id, add_on_id) => {
    dispatch(deleteProductAddOn(product_id, add_on_id))
  }

  useEffect(() => {
    getSearchedParams() ? getAllAddons(getSearchedParams()) : getAllAddons()
  }, [selectedLocation, restaurant_id, location_id])

  return (
    <>
      <AddOnDrawer onClose={closeDrawer} visible={open}>
        {formType === 'create' ? (
          <AddAddon
            form={form}
            addonProducts={addonProducts}
            setAddonProducts={setAddonProducts}
            products={products}
            handleCreate={onCreateAddOn}
          />
        ) : (
          <EditAddon
            form={form}
            addonProducts={addonProducts}
            setAddonProducts={setAddonProducts}
            products={products}
            handleUpdate={updateAddon}
          />
        )}
      </AddOnDrawer>
      <div className="body-wrapper">
        <div className="spacer-25"></div>
        <Row className="common-box">
          <Col span={24}>
            <Row className="align-items-center justify-content-sm-between">
              <Col span={12}>
                <h2>Add Ons</h2>
              </Col>
              <Col span={12} className="text-right">
                <Button
                  onClick={addAddon}
                  type="primary"
                  className="primary-btn"
                >
                  Add Add On
                </Button>
              </Col>
            </Row>
            {User.getRole() === 'Super Admin' && (
              <SuperAdminSelect
                setRestaurant={setRestaurant}
                setLocation={setLocation}
                location_id={location_id}
                restaurant_id={restaurant_id}
              />
            )}
            <SearchBar
              fields={searchCols}
              handleSearch={getAllAddons}
              resetSearch={resetSearch}
            />
            <div className="spacer-25"></div>
            <Table
              className="jetson-listing"
              columns={createAddOnCols(
                getAddOnDetail,
                addonStatusHandler,
                addOnDeletion,
              )}
              dataSource={addons}
              expandable={{
                expandedRowRender: (record) =>
                  itemsTable(
                    addonsItems,
                    productStatusHandler,
                    record,
                    addOnProductDeletion,
                  ),
                onExpand: function (expanded, record) {
                  getAllAddOnItems(expanded, record)
                },
                expandedRowKeys: [expandedKey],
                rowExpandable: (record) => record.availablity,
              }}
              pagination={{
                showSizeChanger: true,
                current: parseInt(getSearchedParams()?.page),
                total: addonsCount,
                onChange: function (page, pageSize) {
                  onPageChange(page, pageSize)
                },
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  )
}
