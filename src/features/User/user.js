import React, { useState, useEffect } from "react";
import { Table, Col, Row, message, Button } from "antd";
import Request from "../../network/request";
import { useSelector } from "react-redux";
import NetworkCall from "../../network/networkCall";
import { useHistory } from "react-router-dom";
import { searchCols, createUserCols } from "../../helpers/user_helper";
import {
  searchParams,
  setParams,
  getSearchedParams,
  deleteQueryParam,
} from "../../utilities/generalUtility";
import SearchBar from "../../common/components/search/searchBar";
import SuperAdminSelect from "../../common/components/Select/select";
import UserModel from "../../models/user/user";

export default function User() {
  const [users, setUsers] = useState([]);
  const [usersCount, setCount] = useState(0);
  const [roles, setRoles] = useState([]);
  const [role_id, set_role_id] = useState(null);
  const history = useHistory();
  const selectedLocation = useSelector((state) => state.auth.selectedLocation);
  const [restaurant_id, setRestaurant] = useState("");
  const [location_id, setLocation] = useState("");

  const getUsers = async (page = 1, pageSize = 10) => {
    try {
      let body = {
        location_id: selectedLocation?.id ? selectedLocation?.id : location_id, // It is this way Due to old implementation of where get and search are seprate,
        restaurant_id,
        page,
        pageSize,
      };
      let res = await NetworkCall.fetch(Request.fetchUsers(body));
      setUsers(res?.users);
      setCount(res?.count);
      setRoles(res?.roles);
    } catch (error) {
      message.error(error?.error?.data?.error);
    }
  };

  const userStatus = async (active, id) => {
    try {
      let res = await NetworkCall.fetch(Request.changeUserStatus(active, id));
      if (res?.status) {
        message.success(res?.message);
        getUsers();
      }
    } catch (error) {
      message.error(error?.error?.data?.error);
    }
  };

  const sendLink = async (email) => {
    try {
      await UserModel.forgotPassword(email);
      message.success(`Verification email has been sent to ${email}`);
    } catch (error) {
      message.error("Issue in sending an Email");
    }
  };

  const filterAllUsers = async (values, page = 1, pageSize = 10) => {
    let params = { ...values, role_id };
    let search = searchParams(
      searchCols(roles, role_id, set_role_id, handleSelect),
      params
    );
    let searchValues = { ...search, restaurant_id, location_id };
    let res = await NetworkCall.fetch(
      Request.filterUsers(searchValues, page, pageSize)
    );
    setUsers(res?.users);
    setCount(res?.count);
    setParams(history, searchValues, page, pageSize);
  };

  const onPageChange = (pageNo, pageSize) => {
    getSearchedParams()
      ? filterAllUsers(getSearchedParams(), pageNo, pageSize)
      : getUsers(pageNo, pageSize);
  };

  const resetSearch = (form) => {
    form.resetFields();
    set_role_id(null);
    getUsers();
    deleteQueryParam(history, getSearchedParams());
  };

  useEffect(() => {
    getUsers();
  }, [selectedLocation, restaurant_id, location_id]);

  const handleSelect = (value) => {
    set_role_id(value);
  };

  useEffect(() => {
    role_id && filterAllUsers(role_id);
  }, [role_id]);

  return (
    <>
      <div className="body-wrapper">
        <div className="spacer-25"></div>
        <Row className="common-box">
          <Col span={24}>
            <Row className="align-items-center justify-content-sm-between">
              <Col span={12}>
                <h2>Users</h2>
              </Col>

              <Col
                span={12}
                className="text-right"
                hidden={UserModel.getRole() === "Staff"}
              >
                <Button
                  type="primary"
                  onClick={() => history.push("/create-user")}
                  className="primary-btn"
                >
                  Create User
                </Button>
              </Col>
            </Row>
            {UserModel.getRole() === "Super Admin" && (
              <SuperAdminSelect
                setRestaurant={setRestaurant}
                setLocation={setLocation}
                location_id={location_id}
                restaurant_id={restaurant_id}
              />
            )}

            <SearchBar
              fields={searchCols(roles, role_id, set_role_id, handleSelect)}
              handleSearch={filterAllUsers}
              resetSearch={resetSearch}
            />
            <div className="spacer-15"></div>
            <Table
              className="jetson-listing"
              scroll={{ x: true }}
              columns={createUserCols(sendLink, userStatus)}
              dataSource={users}
              pagination={{
                showSizeChanger: true,
                total: usersCount,
                onChange: function (page, pageSize) {
                  onPageChange(page, pageSize);
                },
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
