import React, { useEffect, useState } from "react";
import { Select, Button, Row, Col, Table, message } from "antd";
import { useHistory } from "react-router-dom";
import { SettingFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../common/components/search/searchBar";
import SuperAdminSelect from "../../common/components/Select/select";
import {
  getMenus,
  getMenuItems,
  setSelectedMenu,
  filterMenuItems,
  clearMenuItems,
  createMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../../redux/slices/menuSlice";
import { locationProducts } from "../../redux/slices/productSlice";
import { searchCols } from "../../helpers/product_helpers";
import { createMenuItemCols } from "../../helpers/menu_helpers";
import {
  searchParams,
  setParams,
  getSearchedParams,
  deleteQueryParam,
} from "../../utilities/generalUtility";
import User from "../../models/user/user";
import ProductsDrawer from "./productsDrawer";

const { Option } = Select;

export default function MenuItems() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { menuitems, menuitemsCount, selectedMenu, menus } = useSelector(
    (state) => state.menu
  );
  const selectedLocation = useSelector((state) => state.auth.selectedLocation);
  const [restaurant_id, setRestaurant] = useState("");
  const [location_id, setLocation] = useState("");
  const [products, setProducts] = useState([]);
  const [open, setOpenDrawer] = useState(false);

  const getAllMenus = () => {
    let body = {
      location_id: selectedLocation?.id ? selectedLocation?.id : location_id, // It is this way Due to old implementation of where get and search are seprate
      restaurant_id,
    };
    dispatch(clearMenuItems());
    dispatch(getMenus(body));
  };

  const getProducts = async () => {
    if (User.getRole() === "Super Admin") {
      if (location_id) {
        let response = await dispatch(locationProducts(location_id));
        setProducts(response);
        setOpenDrawer(true);
      } else message.warning("Please Select Location First");
    } else {
      let response = await dispatch(locationProducts(selectedLocation?.id));
      setProducts(response);
      setOpenDrawer(true);
    }
  };

  const handleProducts = (values) => {
    dispatch(createMenuItems(values?.products));
  };

  const getAllMenusItems = (page = 1, pageSize = 10) => {
    selectedMenu && dispatch(getMenuItems(page, pageSize));
  };

  const menuChange = (value, data) => {
    dispatch(setSelectedMenu(value));
  };

  const searchMenuItems = (values, page = 1, pageSize = 10) => {
    let search = searchParams(searchCols, values);
    dispatch(filterMenuItems(selectedMenu?.id, search, page, pageSize));
    setParams(history, values, page, pageSize);
  };

  const onPageChange = (pageNo, pageSize) => {
    getSearchedParams()
      ? searchMenuItems(getSearchedParams(), pageNo, pageSize)
      : getAllMenusItems(pageNo, pageSize);
  };

  const resetSearch = (form) => {
    form.resetFields();
    getAllMenusItems();
    deleteQueryParam(history, getSearchedParams());
  };

  const closeDrawer = (form) => {
    setOpenDrawer(false);
    form.resetFields();
  };

  const addMenuHandle = () => {
    if (User.getRole() === "Super Admin") {
      if (location_id)
        history.push({
          pathname: "/menu-create",
          state: { location_id: location_id },
        });
      else message.warning("Please Select Location First");
    } else {
      history.push("/menu-create");
    }
  };

  const editMenuHandle = () => {
    if (User.getRole() === "Super Admin") {
      history.push({
        pathname: `/menuitems/${selectedMenu?.id}`,
        state: { location_id: selectedMenu?.location_id },
      });
    } else {
      history.push(`/menuitems/${selectedMenu?.id}`);
    }
  };

  const productStatusHandler = (product) => {
    dispatch(updateMenuItem(product, product?.id));
  };

  const editProductHandle = (product_id, location_id) => {
    if (User.getRole() === "Super Admin") {
      history.push({
        pathname: `/products/${product_id}`,
        state: { location_id: location_id },
      });
    } else {
      history.push(`/products/${product_id}`);
    }
  };

  const menuItemDeletion = (id) => {
    dispatch(
      deleteMenuItem(
        selectedMenu?.id,
        id,
        getSearchedParams()?.page,
        getSearchedParams()?.pageSize
      )
    );
  };

  useEffect(() => {
    getAllMenus();
  }, [selectedLocation, restaurant_id, location_id]);

  useEffect(() => {
    getAllMenusItems();
  }, [selectedMenu]);

  return (
    <>
      <ProductsDrawer
        onClose={closeDrawer}
        visible={open}
        products={products}
        handleProducts={handleProducts}
      />
      <div className="body-wrapper menu-box">
        <div className="common-box">
          <h2>Menus</h2>
          <div className="spacer-15"></div>
          {User.getRole() === "Super Admin" && (
            <SuperAdminSelect
              setRestaurant={setRestaurant}
              setLocation={setLocation}
              location_id={location_id}
              restaurant_id={restaurant_id}
            />
          )}
          <div className="addition-field">
            <Select
              value={selectedMenu?.id}
              onChange={menuChange}
              style={{ width: 185 }}
              className="menus-dropdown"
            >
              {menus.map((menu) => (
                <Option key={menu?.id} value={menu?.id}>
                  {menu?.name}
                </Option>
              ))}
            </Select>
            <Button onClick={editMenuHandle} type="link">
              <SettingFilled />
            </Button>
          </div>
          <div className="spacer-15"></div>
          <Row className="justify-content-between">
            <Col xs={24} md={10}>
              <Button
                onClick={addMenuHandle}
                type="primary"
                className="primary-btn"
              >
                Add Menu
              </Button>
            </Col>
            <Col className="text-right mt-sm-2" xs={24} md={12}>
              {/* <ul>
                <li>
                  <Button type="link" className="text-primary">
                    Import Menu
                  </Button>
                </li>
                <li>(CSV Only)</li>
                <li>
                  <Button type="link" className="text-primary">
                    Use Our Template
                  </Button>
                </li>
              </ul> */}
            </Col>
          </Row>
        </div>
        <div className="spacer-25"></div>
        <Row className="common-box">
          <Col span={24}>
            <Row className="align-items-center justify-content-sm-between">
              <Col span={12}>
                <h2>{selectedMenu?.name} Menu Items</h2>
              </Col>
              <Col span={12} className="text-right">
                <Button
                  onClick={getProducts}
                  type="primary"
                  className="primary-btn"
                >
                  Add Menu Item
                </Button>
              </Col>
            </Row>
            <div className="spacer-10"></div>
            <SearchBar
              fields={searchCols}
              handleSearch={searchMenuItems}
              resetSearch={resetSearch}
            />

            <div className="spacer-25"></div>
            <Table
              className="jetson-listing"
              columns={createMenuItemCols(
                editProductHandle,
                productStatusHandler,
                menuItemDeletion
              )}
              dataSource={menuitems}
              pagination={{
                showSizeChanger: true,
                total: menuitemsCount,
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
