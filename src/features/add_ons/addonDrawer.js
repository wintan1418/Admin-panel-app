import { Drawer } from "antd";

export default function AddOnDrawer({ form, onClose, visible, children }) {
  return (
    <Drawer
      className="menus-drawer"
      width={600}
      title="Add On"
      placement="right"
      onClose={() => onClose(form)}
      visible={visible}
      maskClosable={false}
    >
      {children}
    </Drawer>
  );
}
