import { Col, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";
import { employeeColumns, searchCols } from "../../helpers/employees_helper";
import { searchParams } from "../../utilities/generalUtility";
import SearchBar from "../../common/components/search/searchBar";

export default function EmployeeList() {
  const location_id = useSelector(
    (state) => state?.location?.fetchedLocation?.id
  );
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    try {
      let res = await NetworkCall.fetch(Request.fetchEmployees(location_id));
      console.dir(res);
      if (res?.error) {
        message.error(res?.error?.data?.error, 5);
      } else {
        setEmployees(res?.employees);
      }
    } catch (error) {
      console.log(error);
      // message.error(error.error.data.error)
    }
  };

  const employeeStatusHandler = async (employee, id) => {
    try {
      let res = await NetworkCall.fetch(
        Request.updateEmployeeStatus(employee, id)
      );
      if (res?.status) {
        message.success(res?.message);
        getEmployees();
      }
    } catch (error) {
      message.error(error?.error?.data?.error);
    }
  };

  const resetSearch = (form) => {
    form.resetFields();
    getEmployees();
  };

  const filterAllEmployees = async (values) => {
    let search = searchParams(searchCols, values);
    let res = await NetworkCall.fetch(
      Request.filterEmployees(search, location_id)
    );
    console.log(res);
    setEmployees(res?.employees);
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <Col span={24}>
        <div className="spacer-10"></div>
        <SearchBar
          fields={searchCols}
          handleSearch={filterAllEmployees}
          resetSearch={resetSearch}
        />
        <div className="spacer-15"></div>
        <Table
          className="jetson-listing"
          columns={employeeColumns(employeeStatusHandler)}
          dataSource={employees}
          pagination={false}
        />
      </Col>
    </>
  );
}
