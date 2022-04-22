import { Progress, Row, Col, Table } from "antd";
import DatePicker from "../../../common/components/datePicker/DatePicker";

import {
  averageTurnoverColumns,
  fakeDataAverageTurnovers,
} from "../../../helpers/analytic_helper";

const EmployeeTurnoverRate = () => {
  const handleChangeDatePicker = (value) => {
    console.log(value);
  };

  return (
    <>
      <div className="analytics w-100">
        <div className="common-box w-100">
          <div className="d-flex justify-content-between">
            <h2 className="mb-0">Employee Turnover Rate </h2>
            <div className="d-flex align-items-center">
              <DatePicker onChange={handleChangeDatePicker} />
            </div>
          </div>
          <div className="spacer-15"></div>
          <Row className="w-100 m-0" gutter={[10, 25]}>
            <Col className="px-2" xs={24} lg={12}>
              <div className="box">
                <div className="label mb-1">Employee Turnover</div>
                <div className="value">
                  22% <span>20% less from last month</span>
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
                          Current Month
                        </div>
                        <div className="mt-2 font-weight-600 color-default">
                          12%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="info">
                    <div className="d-flex">
                      <div className="before-target low" />
                      <div className="ml-3">
                        <div className="f-12 font-weight-500 color-gray">
                          Previous Month
                        </div>
                        <div className="mt-2 font-weight-600 color-default">
                          21%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="px-2" xs={24} lg={24}>
              <div className="label mb-2">Average Turnover (by Location)</div>
              <Table
                className="jetson-listing"
                columns={averageTurnoverColumns()}
                key={1}
                dataSource={fakeDataAverageTurnovers}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default EmployeeTurnoverRate;
