import K from '../utilities/constants'
import { Switch, Button } from 'antd'

const searchCols = [
  {
    id: 1,
    title: 'POS ID',
    key: 'pos_order_type_id',
    type: '_eq',
    show: true,
  },
  {
    id: 2,
    title: 'POS Name',
    key: 'pos_order_type_name',
    type: '_cont',
    show: true,
  },
]

function orderTypeColumns(typeStatusHandler, openOrderTypeDrawer) {
  return [
    {
      title: K.Tables.orderTypeTitleHead.orderTypeName,
      dataIndex: K.Tables.orderTypeTitleIndex.orderTypeName,
      key: 'id',
      render: (name, order_type) => {
        return name ?? order_type?.pos_order_type_id ?? 'N/A'
      },
    },
    {
      title: K.Tables.orderTypeTitleHead.orderTypePOSName,
      dataIndex: K.Tables.orderTypeTitleIndex.orderTypePOSName,
      key: 'id',
      render: (pos_order_type_name, order_type) => {
        return pos_order_type_name ?? 'N/A'
      },
    },
    {
      title: K.Tables.orderTypeTitleHead.orderTypeAvailability,
      dataIndex: K.Tables.orderTypeTitleIndex.orderTypeAvailability,
      key: 'id',
      render: (is_active, order_type) => {
        return (
          <Switch
            checked={is_active}
            disabled={
              order_type.is_delivery ||
              order_type.is_dine_in ||
              order_type.is_pick_up
                ? false
                : true
            }
            onChange={(checked) => {
              order_type.is_active = checked
              typeStatusHandler(order_type, order_type?.id)
            }}
          />
        )
      },
    },
    {
      title: K.Tables.orderTypeTitleHead.orderTypePickUp,
      dataIndex: K.Tables.orderTypeTitleIndex.orderTypePickUp,
      key: 'id',
      render: (is_pick_up, order_type) => {
        return (
          <Switch
            checked={is_pick_up}
            // disabled={true}
            onChange={(checked) => {
              order_type.is_pick_up = checked
              typeStatusHandler(order_type, order_type?.id)
            }}
          />
        )
      },
    },
    {
      title: K.Tables.orderTypeTitleHead.orderTypeDineIn,
      dataIndex: K.Tables.orderTypeTitleIndex.orderTypeDineIn,
      key: 'id',
      render: (is_dine_in, order_type) => {
        return (
          <Switch
            checked={is_dine_in}
            // disabled={true}
            onChange={(checked) => {
              order_type.is_dine_in = checked
              typeStatusHandler(order_type, order_type?.id)
            }}
          />
        )
      },
    },
    {
      title: K.Tables.orderTypeTitleHead.orderTypeDelivery,
      dataIndex: K.Tables.orderTypeTitleIndex.orderTypeDelivery,
      key: 'id',
      render: (is_delivery, order_type) => {
        return (
          <Switch
            checked={is_delivery}
            // disabled={true}
            onChange={(checked) => {
              order_type.is_delivery = checked
              typeStatusHandler(order_type, order_type?.id)
            }}
          />
        )
      },
    },
    {
      title: 'Actions',
      dataIndex: K.Tables.orderTypeTitleIndex.orderTypeId,
      key: 'id',
      render: (id, order_type) => (
        <Button type="link" onClick={() => openOrderTypeDrawer(order_type)}>
          View
        </Button>
      ),
    },
  ]
}

export { searchCols, orderTypeColumns }
