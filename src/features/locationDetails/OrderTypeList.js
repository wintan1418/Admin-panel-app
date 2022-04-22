import { Form, Col, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";
import { orderTypeColumns, searchCols } from "../../helpers/order_types_helper";
import { searchParams } from "../../utilities/generalUtility";
import SearchBar from "../../common/components/search/searchBar";
import OrderTypeDrawer from "./OrderTypeDrawer";

export default function OrderTypeList() {
  const location_id = useSelector(
    (state) => state?.location?.fetchedLocation?.id
  );
  const [form] = Form.useForm();
  const [orderTypes, setOrderTypes] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  const getOrderTypes = async () => {
    try {
      let res = await NetworkCall.fetch(Request.fetchOrderTypes(location_id));
      console.dir(res);
      if (res?.error) {
        message.error(res?.error?.data?.error, 5);
      } else {
        setOrderTypes(res?.order_types);
      }
    } catch (error) {
      console.log(error);
      // message.error(error.error.data.error)
    }
  };

  const typeStatusHandler = async (type, id) => {
    try {
      let res = await NetworkCall.fetch(
        Request.updateOrderTypeStatus(type, id)
      );
      if (res?.status) {
        message.success(res?.message);
        getOrderTypes();
      }
    } catch (error) {
      message.error(error?.error?.data?.errors?.isActive);
      getOrderTypes();
    }
  };

  const resetSearch = (form) => {
    form.resetFields();
    getOrderTypes();
  };

  const filterAllOrderTypes = async (values) => {
    let search = searchParams(searchCols, values);
    let res = await NetworkCall.fetch(
      Request.filterOrderTypes(search, location_id)
    );
    console.log(res);
    setOrderTypes(res?.order_types);
  };

  const openOrderTypeDrawer = (OrderType) => {
    form.setFieldsValue({
      id: OrderType?.id,
      name: OrderType?.name,
    });
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const updateOrderType = async (order_type) => {
    // console.log('here is the order type', order_type)
    try {
      let res = await NetworkCall.fetch(
        Request.updateOrderTypeStatus(order_type, order_type?.id)
      );
      if (res?.status) {
        message.success(res?.message);
        getOrderTypes();
      }
    } catch (error) {
      message.error(error?.error?.data?.error);
      // getOrderTypes()
    }
  };

  useEffect(() => {
    getOrderTypes();
  }, []);

  return (
    <>
      <OrderTypeDrawer
        form={form}
        handleUpdate={updateOrderType}
        onClose={closeDrawer}
        visible={openDrawer}
      />
      <Col span={24}>
        <div className="spacer-10"></div>
        <SearchBar
          fields={searchCols}
          handleSearch={filterAllOrderTypes}
          resetSearch={resetSearch}
        />
        <div className="spacer-15"></div>
        <Table
          className="jetson-listing"
          columns={orderTypeColumns(typeStatusHandler, openOrderTypeDrawer)}
          dataSource={orderTypes}
          pagination={false}
        />
      </Col>
    </>
  );
}
