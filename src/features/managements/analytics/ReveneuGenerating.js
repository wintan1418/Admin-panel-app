import { Row, Col, Progress } from "antd";
import DatePicker from "../../../common/components/datePicker/DatePicker";

const ReveneuGenerating = () => {
  const handleChangeDatePicker = (value) => {
    console.log(value);
  };

  return (
    <>
      <div className="analytics w-100">
        <div className="common-box w-100">
          <div className="d-flex justify-content-between">
            <h2 className="mb-0">
              Top 5 Reveneu-Generating locations: Year 2021
            </h2>
            <div className="d-flex align-items-center">
              <DatePicker onChange={handleChangeDatePicker} />
            </div>
          </div>
          <div className="spacer-15"></div>
          <Row className="w-100 m-0" gutter={[10, 25]}>
            <Col className="px-2" xs={24} lg={12}>
              <div className="box">
                <div className="label mb-1">Alaska</div>
                <div className="value">
                  $2700.00 <span>20% less</span>
                </div>
                <Progress
                  className="progress-wrapper mt-3"
                  percent={80}
                  showInfo={false}
                />
                <div className="d-flex justify-content-between mt-3">
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
                <div className="label mb-1">Arizona</div>
                <div className="value">
                  $11000.00 <span>20% more</span>
                </div>
                <Progress
                  className="progress-wrapper mt-3"
                  percent={70}
                  showInfo={false}
                />
                <div className="d-flex justify-content-between mt-3">
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
                <div className="label mb-1">California</div>
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
                <div className="label mb-1">Connecticut</div>
                <div className="value">
                  $11000.00 <span>20% more</span>
                </div>
                <Progress
                  className="progress-wrapper mt-3"
                  percent={70}
                  showInfo={false}
                />
                <div className="d-flex justify-content-between mt-3">
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
                <div className="label mb-1">Delaware</div>
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
                <div className="label mb-1">New York</div>
                <div className="value">
                  $11000.00 <span>20% more</span>
                </div>
                <Progress
                  className="progress-wrapper mt-3"
                  percent={70}
                  showInfo={false}
                />
                <div className="d-flex justify-content-between mt-3">
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
          </Row>
        </div>
      </div>
    </>
  );
};

export default ReveneuGenerating;
