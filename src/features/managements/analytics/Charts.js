import { Row, Col } from "antd";
import {
  chartLegend,
  chartOptions,
  generateChartData,
} from "../../../helpers/analytic_helper";
import ChartLine from "../../../common/components/chart/ChartLine";

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const dataIncomeExpenses = [
  {
    label: "income",
    data: [80, 340, 180, 450, 420, 550, 300, 600, 1100, 1000, 600, 200],
  },
  {
    label: "expenses",
    data: [300, 400, 350, 600, 550, 300, 600, 650, 700, 750, 800, 700],
    fill: false,
    borderColor: "#D9DBDC",
    backgroundColor: "#D9DBDC",
  },
];

const dataIncomeTrendline = [
  {
    label: "income trendline",
    data: [80, 160, 180, 90, 250, 280, 300, 600, 1100, 1000, 600, 200],
  },
];

const dataExpenseTrendline = [
  {
    label: "expense trendline",
    data: [80, 160, 180, 90, 250, 280, 300, 600, 1100, 1000, 600, 200],
  },
];

const dataNewCustomer = [
  {
    label: "new customer",
    data: [80, 160, 180, 90, 250, 280, 300, 600, 1100, 1000, 600, 200],
  },
];

const Charts = () => {
  return (
    <>
      <div className="analytics w-100">
        <div className="common-box w-100">
          <Row className="w-100 m-0" gutter={[10, 25]}>
            <Col className="px-lg-2" xs={24} lg={24}>
              <div className="label mb-3">Income & Expenses: Year 2021</div>
              <div
                style={{
                  width: "100%",
                  height: "300px",
                }}
              >
                <ChartLine
                  data={(canvas) =>
                    generateChartData(canvas, labels, dataIncomeExpenses)
                  }
                  legend={chartLegend}
                  options={chartOptions}
                />
              </div>
            </Col>
            <Col className="px-2" xs={24} lg={24}>
              <div className="label mb-3">Income Trendline</div>
              <div
                style={{
                  width: "100%",
                  height: "300px",
                }}
              >
                <ChartLine
                  data={(canvas) =>
                    generateChartData(canvas, labels, dataIncomeTrendline)
                  }
                  legend={chartLegend}
                  options={chartOptions}
                />
              </div>
            </Col>
            <Col className="px-2" xs={24} lg={24}>
              <div className="label mb-3">Expense Trendline</div>
              <div
                style={{
                  width: "100%",
                  height: "300px",
                }}
              >
                <ChartLine
                  data={(canvas) =>
                    generateChartData(canvas, labels, dataExpenseTrendline)
                  }
                  legend={chartLegend}
                  options={chartOptions}
                />
              </div>
            </Col>
            <Col className="px-2" xs={24} lg={24}>
              <div className="label mb-3">New Customer</div>
              <div
                style={{
                  width: "100%",
                  height: "300px",
                }}
              >
                <ChartLine
                  data={(canvas) =>
                    generateChartData(canvas, labels, dataNewCustomer)
                  }
                  legend={chartLegend}
                  options={chartOptions}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Charts;
