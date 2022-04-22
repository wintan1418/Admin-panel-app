import K from '../utilities/constants'
import { Switch } from 'antd'

const searchCols = [
  {
    id: 1,
    title: 'POS ID',
    key: 'pos_emp_id',
    type: '_eq',
    show: true,
  },
  {
    id: 2,
    title: 'POS Name',
    key: 'pos_emp_firstname',
    type: '_cont',
    show: true,
  },
]

function employeeColumns(employeeStatusHandler) {
  return [
    {
      title: K.Tables.employeesTitleHead.employeePOSId,
      dataIndex: K.Tables.employeesTitleIndex.employeePOSId,
      key: 'id',
      colSpan: 1,
      render: (pos_emp_id, employee) => {
        return pos_emp_id ?? 'N/A'
      },
    },
    {
      title: K.Tables.employeesTitleHead.employeePOSFirstName,
      dataIndex: K.Tables.employeesTitleIndex.employeePOSFirstName,
      key: 'id',
      colSpan: 1,
      render: (pos_emp_firstname, employee) => {
        return pos_emp_firstname ?? 'N/A'
      },
    },
    {
      title: K.Tables.employeesTitleHead.employeePOSLastName,
      dataIndex: K.Tables.employeesTitleIndex.employeePOSLastName,
      key: 'id',
      colSpan: 1,
      render: (pos_emp_lastname, employee) => {
        return pos_emp_lastname ?? 'N/A'
      },
    },
    {
      title: K.Tables.employeesTitleHead.employeeAvailability,
      dataIndex: K.Tables.employeesTitleIndex.employeeAvailability,
      key: 'id',
      render: (is_active, employee) => {
        return (
          <Switch
            checked={is_active}
            // disabled={true}
            onChange={(checked) => {
              employee.is_active = checked
              employeeStatusHandler(employee, employee?.id)
            }}
          />
        )
      },
    },
  ]
}

export { searchCols, employeeColumns }
