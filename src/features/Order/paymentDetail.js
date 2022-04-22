import { Row, Col } from "antd";

export default function PaymentDetail({ payment }) {
  return (
    <Row className="justify-content-between" gutter={16}>
      <Col span={12}>
        {payment ? (
          <ul className="item-result-list list-unstyled pl-0">
            <li>
              <span className="bold-text">Status: </span>
              {payment?.succeeded
                ? "Payment has been Successfull."
                : payment?.error}
            </li>
            <li>
              <span className="bold-text">Response: </span>
              <div className="payment-response">
                {"{"}
                {payment?.payment_meta_data &&
                  Object.entries(payment?.payment_meta_data).map(
                    ([key, value]) => (
                      <li>
                        <div className="bold-text">{key}: </div>
                        <div>
                          {typeof value !== "object" ? (
                            String(value)
                          ) : (
                            <p>
                              {"{"}
                              {value && Object.entries(value).map(([key, value]) => (
                                <li>
                                  <div className="bold-text">{key}: </div>
                                  <div> {JSON.stringify(value)} </div>
                                </li>
                              ))}
                              {"}"}
                            </p>
                          )}
                        </div>
                      </li>
                    )
                  )}
                {"}"}
              </div>
            </li>
          </ul>
        ) : (
          <ul className="item-result-list list-unstyled pl-0">
            <li>
              <span className="bold-text">Payment has not been processed </span>
            </li>
          </ul>
        )}
      </Col>
    </Row>
  );
}
