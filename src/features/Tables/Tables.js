import React, { useState, useEffect } from 'react'
import { Button, Row, Col, Table, message } from 'antd'

import {
  fetchAllTables,
  syncTables,
  tableStatusHandler,
} from '../../redux/slices/tableSlice'
import { useDispatch, useSelector } from 'react-redux'
import K from '../../utilities/constants'
import { useHistory } from 'react-router'
import {
  searchParams,
  getSearchedParams,
  setParams,
  deleteQueryParam,
} from '../../utilities/generalUtility'
import { searchCols, tableColumns } from '../../helpers/table_helper'
import SearchBar from '../../common/components/search/searchBar'
import User from '../../models/user/user'
import SuperAdminSelect from '../../common/components/Select/select'

export default function Tables() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [restaurant_id, setRestaurant] = useState('')
  const [location_id, setLocationId] = useState('')
  const { tables, tablesCount } = useSelector((state) => state?.table)
  const location = useSelector((state) => state?.auth?.selectedLocation)

  useEffect(() => {
    // location_id && getTables();
    getTables()
  }, [location_id])

  useEffect(() => {
    User.getRole() === K.Roles.Admin && setLocationId(location?.id)
  }, [location])

  useEffect(() => {
    User.getRole() === K.Roles.SuperAdmin && restaurant_id && getTables()
  }, [restaurant_id])

  const statusHandler = async (table) => {
    try {
      let res = await dispatch(tableStatusHandler(table))
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const getTables = async (values, page = 1, pageSize = 10) => {
    try {
      let searchValues = {
        ...values,
        restaurant_id,
        location_id,
      }
      let search = searchParams(searchCols, searchValues)
      let res = await dispatch(
        fetchAllTables({
          ...search,
          page,
          pageSize,
        }),
      )
      console.dir(res)
      setParams(history, searchValues, page, pageSize)
    } catch (error) {
      console.log(error)
      // message.error(error.error.data.error)
    }
  }

  const syncAllTables = async () => {
    try {
      let res = await dispatch(syncTables(location_id))
      console.log(res)
      if (res?.error) {
        message.error(res?.error?.data?.error, 5)
      } else {
        message.success('Records Synced!', 5)
      }
    } catch (error) {
      console.log(error)
      // message.error(error.error.data.error)
    }
  }

  const resetSearch = (form) => {
    form.resetFields()
    getTables(
      undefined,
      getSearchedParams()?.page,
      getSearchedParams()?.pageSize,
    )
    deleteQueryParam(history, getSearchedParams())
  }

  // const filterAllTables = async (values) => {
  //   let search = searchParams(searchCols, values);
  //   let res = await dispatch(filterTables(search));
  //   console.log(res);
  //   setTables(res?.tables);
  // };

  return (
    <div className="body-wrapper">
      <Row className="common-box">
        <Col span={24}>
          <Row className="align-items-center justify-content-sm-between">
            <Col span={12}>
              <h2>Tables</h2>
            </Col>
            <Col span={12} className="text-right">
              <Button
                type="link"
                className="text-primary"
                onClick={() => {
                  if (User.getRole() === K.Roles.Admin)
                    setLocationId(location.id)
                  syncAllTables()
                }}
              >
                Sync Now
              </Button>
            </Col>
          </Row>
          {User.getRole() === K.Roles.SuperAdmin && (
            <SuperAdminSelect
              setRestaurant={setRestaurant}
              setLocation={setLocationId}
              location_id={location_id}
              restaurant_id={restaurant_id}
            />
          )}
          <SearchBar
            fields={searchCols}
            handleSearch={getTables}
            resetSearch={resetSearch}
          />
          <div className="spacer-15"></div>
          <Table
            className="jetson-listing"
            columns={tableColumns(statusHandler)}
            dataSource={tables}
            pagination={{
              showSizeChanger: true,
              current: parseInt(getSearchedParams()?.page),
              total: tablesCount,
              onChange: function (page, pageSize) {
                getSearchedParams()
                  ? getTables(getSearchedParams(), page, pageSize)
                  : getTables(undefined, page, pageSize)
              },
            }}
          />
        </Col>
      </Row>
    </div>
  )
}
