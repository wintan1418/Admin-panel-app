import K from '../utilities/constants'
import { Switch } from 'antd'

const searchCols = [
  {
    id: 1,
    title: 'POS ID',
    key: 'pos_revenue_id',
    type: '_eq',
    show: true,
  },
  {
    id: 2,
    title: 'POS Name',
    key: 'pos_revenue_name',
    type: '_cont',
    show: true,
  },
]

function revenueCenterColumns(centerStatusHandler) {
  return [
    {
      title: K.Tables.revenueCentersTitleHead.revenueCenterPOSId,
      dataIndex: K.Tables.revenueCentersTitleIndex.revenueCenterPOSId,
      key: 'id',
      colSpan: 1,
      render: (pos_revenue_id, center) => {
        return pos_revenue_id ?? 'N/A'
      },
    },
    {
      title: K.Tables.revenueCentersTitleHead.revenueCenterPOSName,
      dataIndex: K.Tables.revenueCentersTitleIndex.revenueCenterPOSName,
      key: 'id',
      colSpan: 1,
      render: (pos_revenue_name, center) => {
        return pos_revenue_name ?? 'N/A'
      },
    },
    {
      title: K.Tables.revenueCentersTitleHead.revenueCenterAvailability,
      dataIndex: K.Tables.revenueCentersTitleIndex.revenueCenterAvailability,
      key: 'id',
      render: (is_active, center) => {
        return (
          <Switch
            checked={is_active}
            // disabled={true}
            onChange={(checked) => {
              center.is_active = checked
              centerStatusHandler(center, center?.id)
            }}
          />
        )
      },
    },
  ]
}

export { searchCols, revenueCenterColumns }
