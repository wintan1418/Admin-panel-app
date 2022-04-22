import { Drawer } from "antd";

export default function ModifiersForm({ onClose, visible, children }) {
  return (
    <Drawer
      className="menus-drawer"
      width={600}
      title="Modifier"
      placement="right"
      onClose={onClose}
      visible={visible}
      maskClosable={false}
    >
      {children}
    </Drawer>
  );
}
