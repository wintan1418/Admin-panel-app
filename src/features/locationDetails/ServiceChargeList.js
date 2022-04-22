import { Col, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";
import {
  serviceChargeColumns,
  searchCols,
} from "../../helpers/service_charges_helper";
import { searchParams } from "../../utilities/generalUtility";
import SearchBar from "../../common/components/search/searchBar";

export default function ServiceChargeList() {
  const location_id = useSelector(
    (state) => state?.location?.fetchedLocation?.id
  );
  const [serviceCharges, setServiceCharges] = useState([]);

  const getServiceCharges = async () => {
    try {
      let res = await NetworkCall.fetch(
        Request.fetchServiceCharges(location_id)
      );
      console.dir(res);
      if (res?.error) {
        message.error(res?.error?.data?.error, 5);
      } else {
        console.log("---------------------------------", res);
        setServiceCharges(res.service_charges);
      }
    } catch (error) {
      console.log(error);
      // message.error(error.error.data.error)
    }
  };

  const chargeStatusHandler = async (charge, id) => {
    try {
      let res = await NetworkCall.fetch(
        Request.updateServiceChargeStatus(charge, id)
      );
      if (res?.status) {
        message.success(res?.message);
        getServiceCharges();
      }
    } catch (error) {
      message.error(error?.error?.data?.errors?.isActive);
    }
  };

  const resetSearch = (form) => {
    form.resetFields();
    getServiceCharges();
  };

  const filterAllServiceCharges = async (values) => {
    let search = searchParams(searchCols, values);
    let res = await NetworkCall.fetch(
      Request.filterServiceCharges(search, location_id)
    );
    console.log(res);
    setServiceCharges(res?.service_charges);
  };

  useEffect(() => {
    getServiceCharges();
  }, []);

  return (
    <>
      <Col span={24}>
        <div className="spacer-10"></div>
        <SearchBar
          fields={searchCols}
          handleSearch={filterAllServiceCharges}
          resetSearch={resetSearch}
        />
        <div className="spacer-15"></div>
        <Table
          className="jetson-listing"
          columns={serviceChargeColumns(chargeStatusHandler)}
          dataSource={serviceCharges}
          pagination={false}
        />
      </Col>
    </>
  );
}
