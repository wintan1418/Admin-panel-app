import K from '../utilities/constants'
import { Switch } from 'antd'

const searchCols = [
  {
    id: 1,
    title: 'POS ID',
    key: 'pos_service_charge_id',
    type: '_eq',
    show: true,
  },
  {
    id: 2,
    title: 'POS Name',
    key: 'pos_service_charge_name',
    type: '_cont',
    show: true,
  },
]

function serviceChargeColumns(chargeStatusHandler) {
  return [
    {
      title: K.Tables.serviceChargeTitleHead.serviceChargePOSId,
      dataIndex: K.Tables.serviceChargeTitleIndex.serviceChargePOSId,
      key: 'id',
      colSpan: 1,
      render: (pos_service_charge_id, service_charge) => {
        return pos_service_charge_id ?? 'N/A'
      },
    },
    {
      title: K.Tables.serviceChargeTitleHead.serviceChargePOSName,
      dataIndex: K.Tables.serviceChargeTitleIndex.serviceChargePOSName,
      key: 'id',
      colSpan: 1,
      render: (pos_service_charge_name, service_charge) => {
        return pos_service_charge_name ?? 'N/A'
      },
    },
    {
      title: K.Tables.serviceChargeTitleHead.serviceChargeAvailability,
      dataIndex: K.Tables.serviceChargeTitleIndex.serviceChargeAvailability,
      key: 'id',
      render: (is_active, service_charge) => {
        return (
          <Switch
            checked={is_active}
            disabled={
              service_charge.is_delivery ||
              service_charge.is_dine_in ||
              service_charge.is_pick_up
                ? false
                : true
            }
            onChange={(checked) => {
              service_charge.is_active = checked
              chargeStatusHandler(service_charge, service_charge?.id)
            }}
          />
        )
      },
    },
    {
      title: K.Tables.serviceChargeTitleHead.serviceChargePickUp,
      dataIndex: K.Tables.serviceChargeTitleIndex.serviceChargePickUp,
      key: 'id',
      render: (is_pick_up, service_charge) => {
        return (
          <Switch
            checked={is_pick_up}
            // disabled={true}
            onChange={(checked) => {
              service_charge.is_pick_up = checked
              chargeStatusHandler(service_charge, service_charge?.id)
            }}
          />
        )
      },
    },
    {
      title: K.Tables.serviceChargeTitleHead.serviceChargeDineIn,
      dataIndex: K.Tables.serviceChargeTitleIndex.serviceChargeDineIn,
      key: 'id',
      render: (is_dine_in, service_charge) => {
        return (
          <Switch
            checked={is_dine_in}
            // disabled={true}
            onChange={(checked) => {
              service_charge.is_dine_in = checked
              chargeStatusHandler(service_charge, service_charge?.id)
            }}
          />
        )
      },
    },
    {
      title: K.Tables.serviceChargeTitleHead.serviceChargeDelivery,
      dataIndex: K.Tables.serviceChargeTitleIndex.serviceChargeDelivery,
      key: 'id',
      render: (is_delivery, service_charge) => {
        return (
          <Switch
            checked={is_delivery}
            // disabled={true}
            onChange={(checked) => {
              service_charge.is_delivery = checked
              chargeStatusHandler(service_charge, service_charge?.id)
            }}
          />
        )
      },
    },
  ]
}

export { searchCols, serviceChargeColumns }
