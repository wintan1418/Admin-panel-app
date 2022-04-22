import K from '../utilities/constants'
import { Link } from 'react-router-dom'
import { Switch } from 'antd'

const searchCols = [
  {
    id: 1,
    title: 'Table Name',
    key: 'name',
    type: '_cont',
    show: true,
  },
  {
    id: 2,
    title: 'Table POS Name',
    key: 'pos_table_name',
    type: '_cont',
    show: true,
  },
  {
    id: 3,
    title: 'Restaurant',
    key: 'restaurant_id',
    type: '_eq',
    show: false,
  },
  {
    id: 4,
    title: 'Location',
    key: 'location_id',
    type: '_eq',
    show: false,
  },
]

function tableColumns(statusHandler) {
  return [
    {
      title: K.Tables.tablesTitleHead.tableName,
      dataIndex: K.Tables.tablesTitleIndex.tableName,
      key: 'id',
      colSpan: 1,
      render: (name, table) => {
        return (
          <Link
            key={table?.id}
            to={`/tables/${table?.id}`}
            className="text-primary"
            style={{ textDecoration: 'none' }}
          >
            {name}
          </Link>
        )
      },
    },
    {
      title: K.Tables.tablesTitleHead.tablePOSName,
      dataIndex: K.Tables.tablesTitleIndex.tablePOSName,
      key: 'id',
      colSpan: 1,
      render: (name, table) => {
        return (
          <Link
            key={table?.id}
            to={`/tables/${table?.id}`}
            className="text-primary"
            style={{ textDecoration: 'none' }}
          >
            {name}
          </Link>
        )
      },
    },
    {
      title: K.Tables.tablesTitleHead.tablePOSNumber,
      dataIndex: K.Tables.tablesTitleIndex.tablePOSNumber,
      key: 'id',
      colSpan: 1,
      render: (number, table) => {
        return (
          <Link
            key={table?.id}
            to={`/tables/${table?.id}`}
            className="text-primary"
            style={{ textDecoration: 'none' }}
          >
            {number}
          </Link>
        )
      },
    },
    {
      title: K.Tables.tablesTitleHead.tableAvailability,
      dataIndex: K.Tables.tablesTitleIndex.tableAvailability,
      key: 'id',
      render: (available, table) => {
        return (
          <Switch
            checked={available}
            onChange={(checked) => {
              table = { ...table, available: checked }
              statusHandler(table)
            }}
          />
        )
      },
    },
    {
      title: K.Tables.tablesTitleHead.tableOccupied,
      dataIndex: K.Tables.tablesTitleIndex.tableOccupied,
      key: 'id',
      render: (occupied, table) => {
        return (
          <Switch
            checked={occupied}
            onChange={(checked) => {
              table = { ...table, occupied: checked }
              statusHandler(table)
            }}
          />
        )
      },
    },
  ]
}

export { searchCols, tableColumns }
