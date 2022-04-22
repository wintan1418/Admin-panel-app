import { Row, Col, Table } from "antd";
import DatePicker from "../../../common/components/datePicker/DatePicker";
import {
  fakeDataTopItems,
  fakeDataTopModifiers,
  fakeDataTopSaleCategories,
  topItemColumns,
  topModifierColumns,
  topSaleCategoryColumns,
} from "../../../helpers/analytic_helper";

const ProductMix = () => {
  const handleChangeDatePicker = (value) => {
    console.log(value);
  };

  return (
    <>
      <div className="analytics w-100">
        <div className="common-box w-100">
          <div className="d-flex justify-content-between">
            <h2 className="mb-0">Product Mix</h2>
            <div className="d-flex align-items-center">
              <DatePicker onChange={handleChangeDatePicker} />
            </div>
          </div>
          <div className="spacer-15"></div>
          <Row className="w-100 m-0" gutter={[10, 25]}>
            {/* Top Sales Categoriees */}
            <Col className="px-2" xs={24} lg={24}>
              <div className="label mb-2">Top Sales Categoriees</div>
              <Table
                className="jetson-listing"
                columns={topSaleCategoryColumns()}
                dataSource={fakeDataTopSaleCategories}
              />
            </Col>
            {/* Top Items */}
            <Col className="px-2" xs={24} lg={24}>
              <div className="label mb-2">Top Items</div>
              <Table
                className="jetson-listing"
                columns={topItemColumns()}
                dataSource={fakeDataTopItems}
              />
            </Col>
            {/* Top Modifiers */}
            <Col className="px-2" xs={24} lg={24}>
              <div className="label mb-2">Top Modifiers</div>
              <Table
                className="jetson-listing"
                columns={topModifierColumns()}
                dataSource={fakeDataTopModifiers}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ProductMix;
