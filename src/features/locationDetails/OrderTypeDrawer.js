import { Form, Drawer, Input, Row, Button } from 'antd'

export default function AddOnDrawer({ form, onClose, visible, handleUpdate }) {
  return (
    <Drawer
      className="menus-drawer"
      width={600}
      title="Order Type"
      placement="right"
      onClose={() => onClose(form)}
      visible={visible}
      maskClosable={false}
    >
      <div className="body-wrapper ">
        <div className="common-box">
          <Form
            form={form}
            onFinish={() =>
              handleUpdate({
                id: form.getFieldValue('id'),
                name: form.getFieldValue('name'),
              })
            }
          >
            {/* <h3></h3> */}
            {/* <Form.Item name="id" noStyle></Form.Item> */}
            <label>Name</label>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please enter Order Type name',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div className="spacer-5"></div>
            <Row className="location-btn-bar align-items-center">
              <Button className="primary-btn" type="primary" htmlType="submit">
                Update Name
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </Drawer>
  )
}
