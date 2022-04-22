import React, { useEffect } from "react";
import { Layout, Menu, Dropdown, Avatar, Select } from "antd";
import {
  DownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import User from "../models/user/user";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLocation,
  getLocations,
  clearLocation,
} from "../redux/slices/authSlice";
import { Link } from "react-router-dom";
import K from "../utilities/constants";
// import { useHistory } from "react-router";
import ErrorNote from "../common/components/stickynotes/errorNote";

export default function Header({ collapsed, toggle }) {
  const { Header } = Layout;
  const { Option } = Select;
  const dispatch = useDispatch();
  // const history = useHistory();

  const { authlocations, selectedLocation } = useSelector(
    (state) => state.auth
  );

  const getAllLocations = () => {
    dispatch(getLocations());
  };
  const locationChange = (value) => {
    dispatch(selectLocation(value));
  };

  useEffect(() => {
    if (User.getRole() !== "Super Admin") {
      getAllLocations();
    }
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to={"/profile"}> Profile</Link>
      </Menu.Item>

      <Menu.Divider />
      <Menu.Item
        key="3"
        onClick={() => {
          dispatch(clearLocation());
          User.logoutCall();
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <Header>
        <div>
          {/* {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )} */}
          {User.getRole() !== K.Roles.SuperAdmin && (
            <>
              {" "}
              <p>
                {selectedLocation &&
                  (selectedLocation?.name ??
                    selectedLocation?.pos_location_name)}
                {/* <a href="#" className="text-primary">
            Switch Location
          </a> */}{" "}
                -{" "}
                <Select
                  placeholder="Switch Location"
                  style={{ width: 180 }}
                  className="text-primary"
                  onChange={locationChange}
                  value={selectedLocation?.id}
                  defaultValue={authlocations[0]?.id}
                >
                  {authlocations.map((loc) => (
                    <Option key={loc?.id} value={loc?.id}>
                      {loc?.name ?? loc?.pos_location_name}
                    </Option>
                  ))}
                </Select>
              </p>
              {"  "}
            </>
          )}
        </div>

        <div className="app-header-right">
          <div className="loggedin-user-dd">
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                href="#menu"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <Avatar icon={<UserOutlined />} src={User.getProfileImage()} />{" "}
                {User.getName()} <DownOutlined />
              </a>
            </Dropdown>
          </div>
        </div>
      </Header>
      {authlocations.length === 0 && User.getRole() !== K.Roles.SuperAdmin && (
        <ErrorNote
          message="Please Add Location to use our Portal"
          linkMsg="Click here to add"
          link={"/fetch-location"}
        />
      )}
    </>
  );
}
