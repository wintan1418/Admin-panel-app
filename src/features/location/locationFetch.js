import React, { useState, useEffect } from "react";
import { Row, Col, Select, Input, Button, message } from "antd";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLocationFromOmnivore } from "../../redux/slices/locationSlice";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";

const { Option } = Select;

export default function LocationComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [posName, setPosName] = useState("");
  const [posType, setPosType] = useState("");
  const [posLocationId, setPosLocationId] = useState("");
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    getVendors();
  }, []);

  const getVendors = async () => {
    const res = await NetworkCall.fetch(Request.getVendors());
    console.dir(res);

    setVendors(res.pos_vendors);
    setPosName(res.pos_vendors[0].api_partner);
    setPosType(res.pos_vendors[0].pos_type);
  };

  const getLocation = async () => {
    try {
      let res = await dispatch(
        getLocationFromOmnivore(posLocationId, posName, posType)
      );
      console.log(res);
      if (res?.error) {
        message.error(res?.error?.data?.error, 5);
      } else {
        history.push("/add-location");
      }
    } catch (error) {
      console.log("------------------------------", error);
      message.error(error?.error?.data?.error, 5);
    }
  };

  function selectName(value) {
    // console.log(`selected ${value}`);
    setPosName(value);
  }

  function selectType(value) {
    // console.log(`selected ${value}`);
    setPosType(value);
  }

  function locationIdChange(e) {
    // console.log(`selected ${e.target.value}`);
    setPosLocationId(e.target.value);
  }

  return (
    <React.Fragment>
      <div className="body-wrapper width-38">
        <div className="location-box common-box ">
          <Row gutter={16}>
            <Col className="mb-20" xs={24} lg={12} xl={12}>
              <label>POS Name</label>
              <Select
                placeholder={posName}
                disabled={true}
                className="select-filed"
                onChange={selectName}
              >
                {vendors.map(({ id, api_partner }) => (
                  <Option key={id} value={api_partner}>
                    {api_partner}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col className="mb-20" xs={24} lg={12} xl={12}>
              <label>POS type</label>
              <Select
                placeholder={posType}
                disabled={true}
                className="select-filed"
                onChange={selectType}
              >
                {vendors.map(({ id, pos_type }) => (
                  <Option key={id} value={pos_type}>
                    {pos_type}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} lg={12} xl={12}>
              <label>POS Location ID</label>
              <Input onChange={locationIdChange} placeholder="Enter ID" />
            </Col>
            <Col className="location-btn" xs={24} lg={12} xl={12}>
              <Button
                className="primary-btn"
                type="primary"
                onClick={getLocation}
              >
                Fetch Location
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}
