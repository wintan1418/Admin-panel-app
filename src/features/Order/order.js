import React, { useEffect, useState } from "react";
import { Table, Drawer } from "antd";
import {
  getOrders,
  getOrder,
  getPayment,
  completeOrder,
  cancelOrder,
} from "../../redux/slices/orderSlice";
import { creatOrderCols, searchCols } from "../../helpers/order_helper";
import { useDispatch, useSelector } from "react-redux";
import OrderDetail from "./orderDetail";
import PaymentDetail from "./paymentDetail";
import SearchBar from "../../common/components/search/searchBar";
import SuperAdminSelect from "../../common/components/Select/select";
import {
  searchParams,
  setParams,
  getSearchedParams,
  deleteQueryParam,
} from "../../utilities/generalUtility";
import { useHistory } from "react-router-dom";
import User from "../../models/user/user";

export default function Order() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orders, order, payment, ordersCount } = useSelector(
    (state) => state.order
  );
  const selectedLocation = useSelector((state) => state.auth.selectedLocation);
  const [open, setOpenDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [restaurant_id, setRestaurant] = useState("");
  const [location_id, setLocation] = useState("");

  const handlePrint = () => {
    window.print();
  };

  const openDrawer = (id, type) => {
    setOpenDrawer(true);
    setDrawerType(type);
    type === "Order" ? getOrderDetail(id) : getPaymentDetail(id);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const getAllOrders = (values, page = 1, pageSize = 10) => {
    let searchValues = {
      ...values,
      restaurant_id,
      location_id: location_id ? location_id : selectedLocation?.id,
    };
    let search = searchParams(searchCols, searchValues);
    let body = {
      ...search,
      page,
      pageSize,
    };
    dispatch(getOrders(body));
    setParams(history, searchValues, page, pageSize);
  };

  const getOrderDetail = (order_id) => {
    dispatch(getOrder(order_id));
  };

  const getPaymentDetail = (order_id) => {
    dispatch(getPayment(order_id));
  };

  const completeCurrOrder = (order_id) => {
    dispatch(completeOrder(order_id));
  };

  const cancelCurrOrder = (order_id) => {
    dispatch(cancelOrder(order_id));
  };

  // const searchOrders = (values, page = 1, pageSize = 10) => {
  //   let searchValues = { ...values, restaurant_id, location_id };
  //   let search = searchParams(searchCols, searchValues);
  //   dispatch(filterOrders(search, page, pageSize));
  //   setParams(history, searchValues, page, pageSize);
  // };

  const onPageChange = (pageNo, pageSize) => {
    getSearchedParams()
      ? getAllOrders(getSearchedParams(), pageNo, pageSize)
      : getAllOrders(undefined, pageNo, pageSize);
  };

  const resetSearch = (form) => {
    form.resetFields();
    getAllOrders(
      undefined,
      getSearchedParams()?.page,
      getSearchedParams()?.pageSize
    );
    deleteQueryParam(history, getSearchedParams());
  };

  useEffect(() => {
    getSearchedParams() ? getAllOrders(getSearchedParams()) : getAllOrders();
  }, [selectedLocation, restaurant_id, location_id]);

  return (
    <>
      <div className="body-wrapper">
        <div className="common-box">
          <h2>Order</h2>
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
            handleSearch={getAllOrders}
            resetSearch={resetSearch}
          />

          <div className="spacer-25"></div>
          <Table
            className="jetson-listing"
            columns={creatOrderCols(openDrawer)}
            dataSource={orders}
            pagination={{
              showSizeChanger: true,
              current: parseInt(getSearchedParams()?.page),
              total: ordersCount,
              onChange: function (page, pageSize) {
                onPageChange(page, pageSize);
              },
            }}
          />
        </div>
      </div>
      <Drawer
        className="menus-drawer"
        width={645}
        title={drawerType + " Detail"}
        placement="right"
        onClose={closeDrawer}
        visible={open}
        maskClosable={false}
      >
        {drawerType === "Order" ? (
          <OrderDetail
            onPrint={handlePrint}
            order_info={order}
            complete={completeCurrOrder}
            cancel={cancelCurrOrder}
          />
        ) : (
          <PaymentDetail payment={payment} />
        )}
      </Drawer>
    </>
  );
}
