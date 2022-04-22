import K from '../utilities/constants'
import { Switch, Table, Button, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

function createAddOnCols(getAddOnDetail, addonStatusHandler, addOnDeletion) {
  return [
    {
      title: K.Tables.addOnTitleHead.addonName,
      dataIndex: K.Tables.addOnTitleIndex.addonName,
    },
    {
      title: K.Tables.addOnTitleHead.available,
      dataIndex: K.Tables.addOnTitleIndex.availablity,
      align: 'center',
      render: (availablity, addon) => {
        return (
          <Switch
            checked={availablity}
            onChange={(checked) => {
              addon = { ...addon, availablity: checked }
              addonStatusHandler(addon)
            }}
          />
        )
      },
    },
    {
      title: 'Actions',
      dataIndex: K.Tables.addOnTitleIndex.addonID,
      render: (id, record) => (
        <>
          <Button type="link" onClick={() => getAddOnDetail(id, record)}>
            View
          </Button>
          {/* <Button type="link" onClick={() => addOnDeletion(id)}>
            <DeleteOutlined />
          </Button> */}
          <Popconfirm
            title="Are you sure you want to delete this Add On?"
            onConfirm={() => addOnDeletion(id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </>
      ),
    },
  ]
}

const itemsTable = (
  data,
  productStatusHandler,
  add_on,
  addOnProductDeletion,
) => {
  const columns = [
    {
      title: K.Tables.productTitleHead.prodName,
      dataIndex: K.Tables.productTitleIndex.prodName,
      render: (name, product) => {
        return name ?? product?.pos_product_name
      },
    },
    {
      title: K.Tables.productTitleHead.price,
      dataIndex: K.Tables.productTitleIndex.price,
      render: (price) => {
        return '$' + parseFloat(price).toFixed(2)
      },
    },
    {
      title: K.Tables.productTitleHead.available,
      dataIndex: K.Tables.productTitleIndex.availablity,
      render: (availablity, product) => {
        return (
          <Switch
            checked={availablity}
            onChange={(checked) => {
              product = { ...product, availablity: checked }
              productStatusHandler(product)
            }}
          />
        )
      },
    },
    {
      title: 'Actions',
      dataIndex: K.Tables.productTitleIndex.prodId,
      render: (id) => (
        <Popconfirm
          title="Are you sure you want to remove this menu item for this Add On?"
          onConfirm={() => addOnProductDeletion(id, add_on?.id)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
        </Popconfirm>
      ),
    },
  ]

  return (
    <Table
      size="middle"
      style={{
        paddingTop: '20px',
        paddingBottom: '20px',
      }}
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  )
}

function setAddOnFields(form, setAddonProducts, res) {
  setAddonProducts(res?.add_on?.products)
  form.setFieldsValue({
    id: res?.add_on?.id,
    name: res?.add_on?.name,
    availablity: res?.add_on?.availablity,
  })
}

const cancel = () => {
  console.log('cancelled action!')
}

const searchCols = [
  {
    id: 1,
    title: 'Add On Name',
    key: 'name',
    type: '_cont',
    show: true,
  },
  {
    id: 2,
    title: 'Restaurant',
    key: 'restaurant_id',
    type: '_eq',
    show: false,
  },
  {
    id: 3,
    title: 'Location',
    key: 'location_id',
    type: '_eq',
    show: false,
  },
]

export { createAddOnCols, itemsTable, setAddOnFields, searchCols }
