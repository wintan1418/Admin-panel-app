import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomers,
  filterCustomers,
} from "../../redux/slices/customerSlice";
import { useHistory } from "react-router-dom";
import { createCustomerCols, searchCols } from "../../helpers/customer_helpers";
import SearchBar from "../../common/components/search/searchBar";
import {
  searchParams,
  setParams,
  getSearchedParams,
  deleteQueryParam,
} from "../../utilities/generalUtility";
import SuperAdminSelect from "../../common/components/Select/select";
import User from "../../models/user/user";

export default function Customer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { customers, customersCount } = useSelector((state) => state.customer);
  const selectedLocation = useSelector((state) => state.auth.selectedLocation);
  const [restaurant_id, setRestaurant] = useState("");
  const [location_id, setLocation] = useState("");

  const getAllCustomers = (page = 1, pageSize = 10) => {
    let body = {
      location_id: selectedLocation?.id ? selectedLocation?.id : location_id, // It is this way Due to old implementation of where get and search are seprate,
      restaurant_id,
      page,
      pageSize,
    };
    dispatch(getCustomers(body));
  };

  const searchCustomers = (values, page = 1, pageSize = 10) => {
    let search = searchParams(searchCols, values);
    let searchValues = { ...search, restaurant_id, location_id };
    dispatch(filterCustomers(searchValues, page, pageSize));
    setParams(history, searchValues, page, pageSize);
  };

  const onPageChange = (pageNo, pageSize) => {
    getSearchedParams()
      ? searchCustomers(getSearchedParams(), pageNo, pageSize)
      : getAllCustomers(pageNo, pageSize);
  };

  const resetSearch = (form) => {
    form.resetFields();
    getAllCustomers();
    deleteQueryParam(history, getSearchedParams());
  };

  useEffect(() => {
    getAllCustomers();
  }, [selectedLocation, restaurant_id, location_id]);

  return (
    <>
      <div className="body-wrapper">
        <div className="common-box">
          <h2>Guests</h2>
          {User.getRole() === "Super Admin" && (
            <SuperAdminSelect
              setRestaurant={setRestaurant}
              setLocation={setLocation}
              location_id={location_id}
              restaurant_id={restaurant_id}
            />
          )}
          <SearchBar
            fields={searchCols}
            handleSearch={searchCustomers}
            resetSearch={resetSearch}
          />

          <div className="spacer-25"></div>
          <Table
            className="jetson-listing"
            columns={createCustomerCols()}
            dataSource={customers}
            pagination={{
              showSizeChanger: true,
              total: customersCount,
              onChange: function (page, pageSize) {
                onPageChange(page, pageSize);
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
