import { useRef, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Form, Select, Progress, Row, Col } from "antd";
import DatePicker from "../../../common/components/datePicker/DatePicker";
import {
  fakeDataLocations,
  fakeDataModels,
} from "../../../helpers/analytic_helper";
import EditVenue from "./EditVenue";

const { Option } = Select;

const SalesAnalysis = () => {
  const [state, setState] = useState({
    location: null,
    modelVenue: null,
    date: "",
  });

  const [form] = Form.useForm();

  const editVenue = useRef();

  const handleChange = (stateName, value) => {
    setState((res) => ({ ...res, [stateName]: value }));
  };

  const handleChangeDatePicker = (value) => {
    setState((res) => ({ ...res, date: value }));
  };

  const showEditVenue = (e) => {
    e.preventDefault();

    editVenue.current.changeStatus();
  };

  return (
    <>
      <EditVenue ref={editVenue} />
      <div className="common-box w-100">
        <div className="d-flex justify-content-between">
          <h2 className="mb-0">Sales Analysis</h2>
          <div className="d-flex align-items-center">
            <DatePicker onChange={handleChangeDatePicker} />
          </div>
        </div>
        <div className="spacer-15"></div>
        <Form className="d-flex" form={form}>
          <Row className="w-100">
            <Col xs={24} sm={11} lg={5}>
              <Form.Item className="select-filed w-100">
                <div className="addition-field">
                  <Select
                    placeholder="Select Locations"
                    onChange={(value) => handleChange("location", value)}
                    value={state.location}
                  >
                    {fakeDataLocations.map((data) => (
                      <Option key={data?.id} value={data?.id}>
                        {data?.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Form.Item>
            </Col>
            <Col
              className="text-center d-none d-sm-block"
              xs={24}
              sm={2}
              lg={1}
            >
              <span className="vertical-align-sub color-gray">Vs</span>
            </Col>
            <Col xs={24} sm={11} lg={5}>
              <Form.Item className="select-filed w-100">
                <div className="addition-field">
                  <Select
                    placeholder="Select Model Venue"
                    onChange={(value) => handleChange("modelVenue", value)}
                    value={state.modelVenue}
                  >
                    {fakeDataModels.map((data) => (
                      <Option key={data?.id} value={data?.id}>
                        {data?.id} {data?.name}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Form.Item>
            </Col>
            <Col lg={13} className="pl-md-3 pl-0 mb-3 mb-lg-0 mt-1">
              <a href="#" onClick={showEditVenue}>
                <EditOutlined className="edit-model-icon" />
                <span className="edit-model">Edit Model Venue</span>
              </a>
            </Col>
          </Row>
        </Form>
        <Row className="w-100 m-0 divider" gutter={[10, 25]}>
          <Col className="px-2" xs={24} lg={12}>
            <div className="box">
              <div className="label mb-1">Revenue</div>
              <div className="value">
                $11000.00 <span>20% more</span>
              </div>
              <Progress
                className="progress-wrapper mt-3"
                percent={80}
                showInfo={false}
              />
              <div className="d-flex justify-content-between mt-3">
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        All Locations
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        $11000.00
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target low" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        Model Venue
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        $10000.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col className="px-2" xs={24} lg={12}>
            <div className="box">
              <div className="label mb-1">Expense</div>
              <div className="value">
                $2700.00 <span>20% less</span>
              </div>
              <Progress
                className="progress-wrapper mt-3"
                percent={70}
                showInfo={false}
              />
              <div className="d-flex justify-content-between mt-3">
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        All Locations
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        $2700.00
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target low" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        Model Venue
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        $3000.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col className="px-2" xs={24} lg={12}>
            <div className="box">
              <div className="label mb-1">Profit</div>
              <div className="value">
                $9750.00 <span>20% more</span>
              </div>
              <Progress
                className="progress-wrapper mt-3"
                percent={70}
                showInfo={false}
              />
              <div className="d-flex justify-content-between mt-3">
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        All Locations
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        $9750.00
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target low" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        Model Venue
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        $8000.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="w-100 m-0 mt-3" gutter={[10, 25]}>
          <Col span={24}>
            <h2 className="mb-0">Customer Based Analysis</h2>
          </Col>
          <Col className="px-2" xs={24} lg={12}>
            <div className="box">
              <div className="label mb-1">Total Visitors</div>
              <div className="value">
                750 <span>20% more</span>
              </div>
              <Progress
                className="progress-wrapper mt-3"
                percent={80}
                showInfo={false}
              />
              <div className="d-flex justify-content-between mt-3">
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        All Locations
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        750
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target low" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        Model Venue
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        550
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col className="px-2" xs={24} lg={12}>
            <div className="box">
              <div className="label mb-1">New Visitors</div>
              <div className="value">
                450 <span>20% more</span>
              </div>
              <Progress
                className="progress-wrapper mt-3"
                percent={70}
                showInfo={false}
              />
              <div className="d-flex justify-content-between mt-3">
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        All Locations
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        450
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target low" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        Model Venue
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        150
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col className="px-2" xs={24} lg={12}>
            <div className="box">
              <div className="label mb-1">Repeat Visitors</div>
              <div className="value">
                50 <span>20% more</span>
              </div>
              <Progress
                className="progress-wrapper mt-3"
                percent={70}
                showInfo={false}
              />
              <div className="d-flex justify-content-between mt-3">
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        All Locations
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        50
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target low" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        Model Venue
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        50
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col className="px-2" xs={24} lg={12}>
            <div className="box">
              <div className="label mb-1">Total Order</div>
              <div className="value">
                1230 <span>20% more</span>
              </div>
              <Progress
                className="progress-wrapper mt-3"
                percent={70}
                showInfo={false}
              />
              <div className="d-flex justify-content-between mt-3">
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        All Locations
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        1230
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info">
                  <div className="d-flex">
                    <div className="before-target low" />
                    <div className="ml-3">
                      <div className="f-12 font-weight-500 color-gray">
                        Model Venue
                      </div>
                      <div className="mt-2 font-weight-600 color-default">
                        1231
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SalesAnalysis;
