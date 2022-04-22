import { omitBy, isNil } from 'lodash'
import User from '../models/user/user'
import K from '../utilities/constants'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Switch, Button, Tag, Select } from 'antd'
const { Option } = Select

function searchCols(roles, role_id, set_role_id, handleSelect) {
  return [
    {
      id: 1,
      title: 'First Name',
      key: 'first_name',
      type: '_cont',
      show: true,
    },
    {
      id: 2,
      title: 'Last Name',
      key: 'last_name',
      type: '_cont',
      show: true,
    },
    {
      id: 3,
      title: 'Email',
      key: 'email',
      type: '_cont',
      show: true,
    },
    {
      id: 4,
      title: 'Role',
      key: 'role_id',
      type: '_eq',
      show: true,
      children: (
        <SelectComp
          roles={roles}
          role_id={role_id}
          set_role_id={set_role_id}
          handleSelect={handleSelect}
        />
      ),
    },
    {
      id: 5,
      title: 'Restaurant',
      key: 'restaurant_id',
      type: '_eq',
      show: false,
    },
    {
      id: 6,
      title: 'Location',
      key: 'location_id',
      type: '_eq',
      show: false,
    },
  ]
}

const SelectComp = ({ roles, role_id, set_role_id, handleSelect }) => {
  return (
    <>
      <Select
        placeholder="Select Role"
        className="select-filed w-100 mr-3"
        onChange={(value) => {
          handleSelect(value)
        }}
        value={role_id}
      >
        {roles &&
          roles.map(({ id, name }) => (
            <Option key={id} value={id}>
              {name}
            </Option>
          ))}
      </Select>
    </>
  )
}

function createUserCols(handleSendMail, handleUserStatus) {
  return [
    {
      title: K.Tables.userTitleHead.firstName,
      dataIndex: K.Tables.userTitleIndex.firstName,
      colSpan: 1,
    },
    {
      title: K.Tables.userTitleHead.lastName,
      dataIndex: K.Tables.userTitleIndex.lastName,
      colSpan: 1,
    },
    {
      title: K.Tables.userTitleHead.role,
      dataIndex: K.Tables.userTitleIndex.role,
      colSpan: 1,
    },
    {
      title: K.Tables.userTitleHead.phoneNumber,
      dataIndex: K.Tables.userTitleIndex.phoneNumber,
      colSpan: 1,
    },
    {
      title: K.Tables.userTitleHead.email,
      dataIndex: K.Tables.userTitleIndex.email,
    },
    {
      title: K.Tables.userTitleHead.verified,
      dataIndex: K.Tables.userTitleIndex.verified,
      render: (verified, record) => {
        return verified ? (
          <Tag color="green">Verified</Tag>
        ) : (
          <Button
            onClick={() => handleSendMail(record?.email)}
            type="primary"
            className="primary-btn"
          >
            Send Link
          </Button>
        )
      },
    },
    {
      title: K.Tables.userTitleHead.active,
      dataIndex: K.Tables.userTitleIndex.active,
      render: (active, record) => {
        return (
          <Switch
            disabled={User.getRole() !== 'Super Admin'}
            defaultChecked={active}
            onClick={(check) => handleUserStatus(check, record?.id)}
          />
        )
      },
    },
  ]
}

function createUserBody(values, image) {
  let body = {
    user: {
      first_name: values?.first_name,
      last_name: values?.last_name,
      email: values?.email,
      phone_number: values?.phone_number,
    },
    user_image: image,
    role_name: User.getRole() === 'Admin' ? 'Staff' : values?.role,
    restaurant:
      values?.role === 'Super Admin' || User.getRole() === 'Admin'
        ? User.getTenant()
        : values?.restaurant,
    location_ids:
      values?.role === 'Staff' || User.getRole() === 'Admin'
        ? values?.locations
        : null,
  }
  let userBody = omitBy(body, isNil)
  return userBody
}

export { searchCols, createUserBody, createUserCols }
