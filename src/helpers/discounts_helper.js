import K from '../utilities/constants'
import { Switch } from 'antd'

const searchCols = [
  {
    id: 1,
    title: 'POS ID',
    key: 'pos_id',
    type: '_eq',
    show: true,
  },
  {
    id: 2,
    title: 'POS Name',
    key: 'pos_name',
    type: '_cont',
    show: true,
  },
  {
    id: 3,
    title: 'Type',
    key: 'pos_type',
    type: '_cont',
    show: true,
  },
  {
    id: 4,
    title: 'Restaurant',
    key: 'restaurant_id',
    type: '_eq',
    show: false,
  },
  {
    id: 5,
    title: 'Location',
    key: 'location_id',
    type: '_eq',
    show: false,
  },
]

function discountColumns(discountStatusHandler) {
  return [
    {
      title: K.Tables.loyaltyTitleHead.posID,
      dataIndex: K.Tables.loyaltyTitleIndex.posID,
      key: 'id',
      render: (pos_id, discount) => {
        return pos_id ?? 'N/A'
      },
    },
    {
      title: K.Tables.loyaltyTitleHead.posName,
      dataIndex: K.Tables.loyaltyTitleIndex.posName,
      key: 'id',
      colSpan: 1,
      render: (pos_name, discount) => {
        return pos_name ?? 'N/A'
      },
    },
    {
      title: K.Tables.loyaltyTitleHead.posType,
      dataIndex: K.Tables.loyaltyTitleIndex.posType,
      key: 'id',
      colSpan: 1,
      render: (pos_type, discount) => {
        return pos_type ?? 'N/A'
      },
    },
    {
      title: K.Tables.loyaltyTitleHead.availability,
      dataIndex: K.Tables.loyaltyTitleIndex.availability,
      key: 'id',
      render: (is_active, discount) => {
        return (
          <Switch
            checked={is_active}
            // disabled={true}
            onChange={(checked) => {
              discount = { ...discount, is_active: checked }
              discountStatusHandler(discount)
            }}
          />
        )
      },
    },
  ]
}

export { searchCols, discountColumns }
