import { Col, Row, Select } from "antd";
import React, { useState } from "react";
import ServiceChargeList from "./ServiceChargeList";
import OrderTypeList from "./OrderTypeList";
import RevenueCenterList from "./RevenueCenterList";
import EmployeeList from "./EmployeeList";

const { Option } = Select;

export default function LocationDetail() {
  const [selectedList, setSelectedList] = useState("");
  const List = [
    { key: 1, name: "Service Charges" },
    { key: 2, name: "Order Types" },
    { key: 3, name: "Revenue Centers" },
    { key: 4, name: "Employees" },
  ];

  const selectHandler = (value) => {
    setSelectedList(value);
  };

  return (
    <>
      <div className="body-wrapper">
        <Row className="common-box">
          <Col span={24}>
            <h2>Location Details</h2>
            <div className="spacer-10"></div>
            <Row>
              <Col span={12} className="d-flex">
                <Select
                  placeholder="Select Table"
                  className="select-filed w-100 mr-3"
                  onChange={(value) => selectHandler(value)}
                >
                  {List.map(({ key, name }) => (
                    <Option key={key} value={name}>
                      {name}
                    </Option>
                  ))}
                </Select>
              </Col>
              {/* <Col span={12} className="text-right">
                                <Button type="link" className="text-primary">Sync Now</Button>
                            </Col> */}
            </Row>
            <div className="spacer-15"></div>
            {selectedList === "Service Charges" ? (
              <ServiceChargeList />
            ) : selectedList === "Order Types" ? (
              <OrderTypeList />
            ) : selectedList === "Revenue Centers" ? (
              <RevenueCenterList />
            ) : selectedList === "Employees" ? (
              <EmployeeList />
            ) : null}
          </Col>
        </Row>
      </div>
    </>
  );
}
