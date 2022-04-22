import { Form, Drawer, Select, Button } from "antd";

export default function ProductsDrawer({
  onClose,
  visible,
  products,
  handleProducts,
}) {
  const [form] = Form.useForm();
  return (
    <Drawer
      className="menus-drawer"
      width={600}
      title="Menu Items"
      placement="right"
      onClose={() => onClose(form)}
      visible={visible}
      maskClosable={false}
    >
      <p>Only available menu items will be displayed.</p>
      <Form form={form} onFinish={handleProducts}>
        <p>Products with Available status will be shown here</p>
        <Form.Item name="products" label="Select Products">
          <Select
            mode="multiple"
            placeholder="Search your menu item"
            options={products.map((prod) => ({
              label: prod.name,
              value: prod.id,
            }))}
            optionFilterProp="label"
          />
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          className="primary-btn add-prod-btn"
        >
          Add Menu Items
        </Button>
      </Form>
    </Drawer>
  );
}
