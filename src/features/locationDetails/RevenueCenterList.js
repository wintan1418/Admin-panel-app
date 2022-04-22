import { Col, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";
import {
  revenueCenterColumns,
  searchCols,
} from "../../helpers/revenue_centers_helper";
import { searchParams } from "../../utilities/generalUtility";
import SearchBar from "../../common/components/search/searchBar";

export default function RevenueCenterList() {
  const location_id = useSelector(
    (state) => state?.location?.fetchedLocation?.id
  );
  const [revenueCenters, setRevenueCenters] = useState([]);

  const getRevenueCenter = async () => {
    try {
      let res = await NetworkCall.fetch(
        Request.fetchRevenueCenters(location_id)
      );
      console.dir(res);
      if (res?.error) {
        message.error(res?.error?.data?.error, 5);
      } else {
        setRevenueCenters(res?.revenue_centers);
      }
    } catch (error) {
      console.log(error);
      // message.error(error.error.data.error)
    }
  };

  const centerStatusHandler = async (center, id) => {
    try {
      let res = await NetworkCall.fetch(
        Request.updateRevenueCenterStatus(center, id)
      );
      if (res?.status) {
        message.success(res?.message);
        getRevenueCenter();
      }
    } catch (error) {
      message.error(error?.error?.data?.error);
    }
  };

  const resetSearch = (form) => {
    form.resetFields();
    getRevenueCenter();
  };

  const filterAllRevenueCenters = async (values) => {
    let search = searchParams(searchCols, values);
    let res = await NetworkCall.fetch(
      Request.filterRevenueCenters(search, location_id)
    );
    console.log(res);
    setRevenueCenters(res?.revenue_centers);
  };

  useEffect(() => {
    getRevenueCenter();
  }, []);

  return (
    <>
      <Col span={24}>
        <SearchBar
          fields={searchCols}
          handleSearch={filterAllRevenueCenters}
          resetSearch={resetSearch}
        />
        <div className="spacer-15"></div>
        <Table
          className="jetson-listing"
          columns={revenueCenterColumns(centerStatusHandler)}
          dataSource={revenueCenters}
          pagination={false}
        />
      </Col>
    </>
  );
}
