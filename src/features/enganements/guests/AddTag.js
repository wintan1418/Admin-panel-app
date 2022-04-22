import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Drawer, Input, Radio } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Row, Col } from "antd";

const AddTag = forwardRef((props, ref) => {
  const [tags, setTags] = useState([
    { id: 0, name: "VPI" },
    { id: 1, name: "VVPI" },
    { id: 2, name: "VVIP 2" },
    { id: 3, name: "Vegetarian" },
  ]);

  const [visible, setVisible] = useState(false);
  const [showAddTag, setShowAddTag] = useState(false);
  const [customTag, setCustomTag] = useState("");

  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    changeStatus() {
      handleChangeStatus();
    },
  }));

  const addCustomTag = () => {
    if (customTag) {
      setTags((res) => [{ id: tags.length + 1, name: customTag }, ...res]);

      setCustomTag("");
    }
  };

  const handleChange = (e) => {
    setCustomTag(e?.target?.value);
  };

  const handleChangeStatus = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Drawer
        className="menus-drawer form-managment add-tag"
        width={400}
        title="Add Tag"
        placement="right"
        onClose={handleChangeStatus}
        visible={visible}
        maskClosable={false}
      >
        <Form
          name="basic"
          layout="vertical"
          form={form}
          wrapperCol={{ span: 24 }}
          onFinish={(values) => console.log(values)}
        >
          <div className="select-box mb-2">
            <p>Enter search term</p>
            <Form.Item name="category" noStyle>
              <Radio.Group size="large" className="select-items">
                {tags.map((cat) => (
                  <Radio key={cat?.id} value={cat?.id}>
                    {cat?.name ?? cat?.pos_category_name}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          </div>
          <Button
            type="link"
            className="text-primary"
            onClick={() => setShowAddTag(!showAddTag)}
          >
            <PlusOutlined /> Add custom Tag
          </Button>
          <div className="spacer-15"></div>
          {showAddTag && (
            <div className="addition-field">
              <Input onChange={handleChange} value={customTag} />
              <Button type="link" onClick={addCustomTag}>
                <span className="text-primary f-14">
                  <PlusOutlined />
                  Add
                </span>
              </Button>
            </div>
          )}
          <Row className="location-btn-bar align-items-center mt-4">
            <Col span={24}>
              <Button
                className="primary-btn mb-0"
                type="primary"
                htmlType="submit"
              >
                Add Tag
              </Button>

              <a
                href="#"
                className="text-primary pl-4"
                onClick={handleChangeStatus}
              >
                Cancel
              </a>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
});

export default AddTag;
