import { Row, Col } from "antd";
import SalesAnalysis from "./SalesAnalysis";
import Charts from "./Charts";
import ProductMix from "./ProductMix";
import EmployeeTurnoverRate from "./EmployeeTurnoverRate";
import ReveneuGenerating from "./ReveneuGenerating";

const Analytics = () => {
  return (
    <>
      <div className="analytics w-100">
        <Row className="w-100" gutter={[10, 25]}>
          {/* Sales Analysis */}
          <Col span={24}>
            <SalesAnalysis />
          </Col>
          {/* Charts */}
          <Col span={24}>
            <Charts />
          </Col>
          {/* Top 5 Reveneu-Generating locations: Year 2021 */}
          <Col span={24}>
            <ReveneuGenerating />
          </Col>
          {/* Employee Turnover Rate */}
          <Col span={24}>
            <EmployeeTurnoverRate />
          </Col>
          {/* Product Mix */}
          <Col span={24}>
            <ProductMix />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Analytics;
