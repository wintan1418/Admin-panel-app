import React from "react";
import { Collapse, Input, Form, Button, Row, Col } from "antd";

const { Panel } = Collapse;
export default function SearchBar({ fields, handleSearch, resetSearch }) {
  const [form] = Form.useForm();

  return (
    <Collapse ghost className="pool-production-otr">
      <Panel header="Click here to search">
        <Form form={form} onFinish={handleSearch} className="pool-product">
          <Row>
            {fields.map(({ children, show, id, title, key }) => show && (
              <Col xs={24} sm={12} key={id}>
                <Form.Item name={key} label={title}>
                  {children ? children : <Input />}
                </Form.Item>
              </Col>
            ))}
            <Col xs={24} sm={12} className="search-btn">
              <Button
                type="primary"
                htmlType="submit"
                className="primary-btn mr-2"
              >
                Search
              </Button>
              {/* fix Reset Button styling */}
              <Button
                type="link"
                onClick={() => resetSearch(form)}
                className="text-primary"
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
}
