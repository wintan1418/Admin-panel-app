import K from '../utilities/constants'
import { Link } from 'react-router-dom'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Select, Switch } from 'antd'
const { Option } = Select

function searchCols(
  restaurant_id,
  set_restaurant_id,
  restaurants,
  handleSelect,
) {
  return [
    {
      id: 1,
      title: 'Location Name',
      key: 'name',
      type: '_cont',
      show: true,
    },
    {
      id: 2,
      title: 'Location POS Name',
      key: 'pos_location_name',
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
  ]
}

const SelectComp = ({
  restaurant_id,
  set_restaurant_id,
  restaurants,
  handleSelect,
}) => {
  return (
    <>
      <Select
        placeholder="Select Brand"
        className="select-filed w-100 mr-3"
        onChange={(value) => {
          handleSelect(value)
        }}
        value={restaurant_id}
      >
        {restaurants.map(({ id, name }) => (
          <Option key={id} value={id}>
            {name}
          </Option>
        ))}
      </Select>
      <CloseCircleOutlined
        className="text-primary product-select"
        onClick={() => {
          set_restaurant_id(null)
        }}
      />
    </>
  )
}

function locationColumns(locationStatusHandler) {
  return [
    {
      title: K.Tables.locationTitleHead.locationName,
      dataIndex: K.Tables.locationTitleIndex.locationName,
      key: 'id',
      render: (name, location) => {
        return (
          <Link
            key={location?.id}
            to={`/locations/${location?.id}`}
            className="text-primary"
            style={{ textDecoration: 'none' }}
          >
            {name}
          </Link>
        )
      },
    },
    {
      title: K.Tables.locationTitleHead.locationPOSName,
      dataIndex: K.Tables.locationTitleIndex.locationPOSName,
      key: 'id',
      colSpan: 1,
      render: (pos_location_name, location) => {
        return (
          <Link
            key={location?.id}
            to={`/locations/${location?.id}`}
            className="text-primary"
            style={{ textDecoration: 'none' }}
          >
            {pos_location_name}
          </Link>
        )
      },
    },
    {
      title: K.Tables.locationTitleHead.locationActive,
      dataIndex: K.Tables.locationTitleIndex.locationActive,
      key: 'id',
      render: (active, location) => {
        return (
          <Switch
            checked={active}
            onChange={(checked) => {
              location = { ...location, active: checked }
              locationStatusHandler(location)
            }}
          />
        )
      },
    },
  ]
}

export { searchCols, locationColumns }
