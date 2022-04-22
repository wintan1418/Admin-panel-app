import React, { useState, useEffect } from "react";
import { Select, Button, Row, Col, Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocations,
  updateLocation,
} from "../../redux/slices/locationSlice";
import { CloseCircleOutlined } from "@ant-design/icons";
import { fetchAllRestaurants } from "../../redux/slices/restaurantSlice";
import { useHistory } from "react-router";
import { searchCols, locationColumns } from "../../helpers/location_helper";
import {
  getSearchedParams,
  searchParams,
  setParams,
  deleteQueryParam,
} from "../../utilities/generalUtility";
import SearchBar from "../../common/components/search/searchBar";
import K from "../../utilities/constants";
import User from "../../models/user/user";
const { Option } = Select;

export default function LocationList() {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant_id, set_restaurant_id] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { locations, locationsCount } = useSelector((state) => state?.location);

  const getAllRestaurants = async () => {
    let response = await dispatch(fetchAllRestaurants());
    setRestaurants(response?.restaurants);
  };

  const getLocations = async (values, page = 1, pageSize = 10) => {
    try {
      let searchValues = { ...values, restaurant_id };
      let search = searchParams(searchCols(), searchValues);
      // let res = await dispatch(fetchLocations({ ...search, page, pageSize }))
      await dispatch(fetchLocations({ ...search, page, pageSize }));
      // console.dir(res);
      setParams(history, searchValues, page, pageSize);
    } catch (error) {
      console.log(error);
      // message.error(error.error.data.error)
    }
  };

  // const filterAllLocations = async (values) => {
  //   let searchValues = { ...values, restaurant_id }
  //   console.log("here is the search values object", search)
  //   let search = searchParams(searchCols(), searchValues);
  //   console.log("here is the search values object", search)
  //   let res = await dispatch(filterLocations(search));
  //   // getLocations(search)
  //   // console.log(res);
  //   setLocations(res?.locations);

  // };

  useEffect(() => {
    User.getRole() === K.Roles.SuperAdmin && getAllRestaurants();
    // getLocations()
  }, []);

  useEffect(() => {
    getLocations();
  }, [restaurant_id]);

  const handleSelect = (value) => {
    set_restaurant_id(value);
  };

  const locationStatusHandler = async (location) => {
    try {
      let res = await dispatch(updateLocation(location));
      if (res?.status) {
        message.success(res?.message);
      }
    } catch (error) {
      message.error(error?.error?.data?.error);
    }
  };

  const resetSearch = (form) => {
    form.resetFields();
    set_restaurant_id(null);
    getLocations(
      undefined,
      getSearchedParams()?.page,
      getSearchedParams()?.pageSize
    );
    deleteQueryParam(history, getSearchedParams());
  };

  return (
    <div className="body-wrapper">
      <Row className="common-box">
        <Col span={24}>
          <Row className="align-items-center align-content-between">
            <Col xs={12} md={12} xl={12}>
              <h2 className="mb-0">Locations</h2>
            </Col>
            <Col span={12} className="text-right">
              <Button
                type="primary"
                className="primary-btn"
                onClick={() => history.push("/fetch-location")}
              >
                Add Location
              </Button>
            </Col>
          </Row>
          {User.getRole() === K.Roles.SuperAdmin && (
            <Row>
              <Col span={12}>
                {/* <div>Brands</div> */}
                <div className="addition-field">
                  <Select
                    placeholder="Select Brand"
                    className="select-filed w-100"
                    onChange={(value) => {
                      handleSelect(value);
                    }}
                    value={restaurant_id}
                  >
                    {restaurants.map(({ id, name }) => (
                      <Option key={id} value={id}>
                        {name}
                      </Option>
                    ))}
                  </Select>

                  <CloseCircleOutlined
                    className="text-primary product-select"
                    onClick={() => {
                      handleSelect(null);
                    }}
                  />
                </div>
              </Col>
            </Row>
          )}
          <div className="spacer-10"></div>
          <SearchBar
            fields={searchCols()}
            handleSearch={getLocations}
            resetSearch={resetSearch}
          />
          <div className="spacer-15"></div>
          <Table
            className="jetson-listing"
            columns={locationColumns(locationStatusHandler)}
            dataSource={locations}
            pagination={{
              showSizeChanger: true,
              current: parseInt(getSearchedParams()?.page),
              total: locationsCount,
              onChange: function (page, pageSize) {
                getSearchedParams()
                  ? getLocations(getSearchedParams(), page, pageSize)
                  : getLocations(undefined, page, pageSize);
              },
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
