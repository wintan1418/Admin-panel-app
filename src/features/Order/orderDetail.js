import { Button, Row, Col, List, Popconfirm } from "antd";

export default function OrderDetail({ order_info, complete, cancel, onPrint }) {
  return (
    <Row className="justify-content-between" gutter={16}>
      <Col span={12}>
        <List
          header={<div>Items</div>}
          footer={
            <div>
              <ul>
                <li>
                  <Button type="link" onClick={onPrint}>
                    Print Chit
                  </Button>
                </li>
                <li>
                  <Button type="link">Refund Order</Button>
                </li>
                <li>
                  <Popconfirm
                    title="Sure to Complete?"
                    onConfirm={() => complete(order_info?.id)}
                  >
                    <Button hidden={order_info?.status !== "paid"} type="link">
                      Complete Order
                    </Button>
                  </Popconfirm>
                </li>
                <li>
                  <Popconfirm
                    title="Sure to Cancel?"
                    onConfirm={() => cancel(order_info?.id)}
                  >
                    <Button hidden={order_info?.status !== "open"} type="link">
                      Cancel Order
                    </Button>
                  </Popconfirm>
                </li>
              </ul>
            </div>
          }
          bordered={false}
          dataSource={order_info?.ticket?.items}
          className="drawer-item-list"
          renderItem={(item) => (
            <List.Item>
              {/* <Checkbox>{item?.name}</Checkbox> */}
              <span>{item?.name}</span>
              <span> ${item?.price}</span>
            </List.Item>
          )}
        />
        <ul className="item-result-list list-unstyled pl-0">
          <li>
            <span className="bold-text">Subtotal</span> $
            {parseInt(order_info?.ticket?.totals?.sub_total).toFixed(2)}
          </li>
          <li>
            <span className="bold-text">Tax</span> $
            {parseInt(order_info?.ticket?.totals?.tax).toFixed(2)}
          </li>
          <li>
            <span className="bold-text">Tip</span> $
            {parseInt(order_info?.ticket?.totals?.tips).toFixed(2)}
          </li>
          <li>
            <span className="bold-text">Total</span>
            <span className="bold-text">
              ${parseInt(order_info?.ticket?.totals?.total).toFixed(2)}
            </span>
          </li>
        </ul>
      </Col>
      <Col span={10}>
        <h4>Customer</h4>
        <ul className="customer-listing">
          <li>
            {order_info?.customer?.first_name +
              " " +
              order_info?.customer?.last_name}
          </li>
          <li>
            <a href={`mailto:${order_info?.customer?.email}`}>
              {order_info?.customer?.email}
            </a>
          </li>
          <li>
            <a href={`tel:${order_info?.customer?.phone_number}`}>
              {order_info?.customer?.phone_number}
            </a>
          </li>
        </ul>
      </Col>
    </Row>
  );
}
