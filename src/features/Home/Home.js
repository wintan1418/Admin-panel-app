import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Row,
  Col,
  Table,
  Switch,
  Card,
  List,
  Input,
  Typography,
  Tabs,
  message,
} from "antd";
import { cloneDeep } from "lodash";
import { SettingFilled, PlusOutlined } from "@ant-design/icons";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";
import { getLocations, selectLocation } from "../../redux/slices/authSlice";
import { getMenus } from "../../redux/slices/menuSlice";
import { getOrdersAnalytics } from "../../redux/slices/orderSlice";
import { Link, useHistory } from "react-router-dom";
import { analyticsCols } from "../../helpers/order_helper";
import {
  fetchDiscounts,
  updateDiscount,
} from "../../redux/slices/discountSlice";
import { updateMenu } from "../../redux/slices/menuSlice";

const columns = [
  {
    title: "Avg Check",
    dataIndex: "avg_check",
    render: (avg_check) => {
      return "$" + parseFloat(avg_check).toFixed(2);
    },
  },
  {
    title: "Avg Visit",
    dataIndex: "avg_visit",
    render: (avg_visit) => {
      return "$" + parseFloat(avg_visit).toFixed(2);
    },
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    render: (revenue) => {
      return "$" + parseInt(revenue).toFixed(2);
    },
  },
  {
    title: "Beverages",
    dataIndex: "beverage",
    render: (beverage) => {
      return "$" + parseFloat(beverage).toFixed(2);
    },
  },
  {
    title: "Food",
    dataIndex: "food",
    render: (food) => {
      return "$" + parseFloat(food).toFixed(2);
    },
  },
  {
    title: "Avg Tip",
    dataIndex: "tips",
    render: (tips) => {
      return "$" + parseInt(tips).toFixed(2);
    },
  },
];

const { TabPane } = Tabs;
export default function Home() {
  const menus = useSelector((state) => state.menu.menus);
  const analytics = useSelector((state) => state.order.analytics);
  const { discounts, discountsCount } = useSelector((state) => state.discount);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useSelector((state) => state?.auth?.selectedLocation);

  const locationStatusHandler = async (checked) => {
    let updatedLocation = cloneDeep(location);
    updatedLocation.active = checked;
    try {
      let res = await NetworkCall.fetch(
        Request.updateLocation(updatedLocation, updatedLocation?.id)
      );
      if (res?.status) {
        await dispatch(getLocations());
        await dispatch(selectLocation(res?.location?.id));
        message.success(res?.message);
      }
    } catch (error) {
      message.error(error?.error?.data?.error);
    }
  };

  const requestAddOn = async (add_on) => {
    try {
      let res = await NetworkCall.fetch(Request.addOnRequest(add_on));
      if (res?.status) {
        message.success(res?.message);
      }
    } catch (error) {
      message.error(error?.error?.data?.error);
    }
  };

  // useEffect(() => {
  //   console.log("here is the value of location after change ", location)
  //   console.log("here is the value of location after change ", location?.active)
  // }, [location])

  const getAllMenus = () => {
    let body = { location_id: location?.id ?? "", page: 1, pageSize: 10 };
    dispatch(getMenus(body));
  };

  const getAllDiscounts = () => {
    let body = { location_id: location?.id ?? "", page: 1, pageSize: 10 };
    dispatch(fetchDiscounts(body));
  };

  const getAnalytics = (type = "day", location_id = location?.id ?? "") => {
    dispatch(getOrdersAnalytics(type, location_id));
  };

  const discountStatusHandler = async (discount) => {
    try {
      await dispatch(updateDiscount(discount));
    } catch (error) {
      message.error(error?.error?.data?.error);
    }
  };

  const MenuStatusHandler = (menu) => {
    dispatch(updateMenu(menu, menu?.id));
  };

  useEffect(() => {
    if (location) {
      getAllMenus();
      getAnalytics();
      getAllDiscounts();
    }
  }, [location]);

  return (
    <>
      <div className="body-wrapper home-box">
        <div className="common-box" span={24}>
          <h3 className="mb-0">Location Dashboard</h3>
          <h2 className="mb-1">
            {location?.name}{" "}
            <SettingFilled
              onClick={() => {
                history.push(`/locations/${location?.id}`);
              }}
            />
          </h2>
          <div className="spacer-15"></div>
          <div className="b-switch-box">
            <label className="mb-0">
              {location?.active ? "Open" : "Closed"} for Business
            </label>
            <Switch
              checked={location?.active}
              onChange={(checked) => locationStatusHandler(checked)}
            />
          </div>
          <Row gutter={16}>
            <Col className="db-cards" xs={24} md={8} lg={8}>
              <Card size="small" title="Revenue">
                <ul>
                  {location?.revenue &&
                    Object.entries(location?.revenue).map(([key, value]) => (
                      <li>
                        {key}
                        <span>${parseFloat(value).toFixed(2)}</span>
                      </li>
                    ))}
                </ul>
              </Card>
            </Col>
            <Col className="db-cards" xs={24} md={8} lg={8}>
              <Card size="small" title="Address">
                <p className="mb-0">
                  {location?.address === ""
                    ? "Address not available! Please update address on the Omnivore Portal."
                    : location?.address}
                </p>
              </Card>
            </Col>
            <Col className="db-cards" xs={24} md={8} lg={8}>
              <Card size="small" title="Hours">
                <ul>
                  <li>
                    Mon
                    <span>
                      {location?.availability?.monday?.openingTime ?? "N/A"}-
                      {location?.availability?.monday?.closingTime ?? "N/A"}
                    </span>
                  </li>
                  <li>
                    Tue
                    <span>
                      {location?.availability?.tuesday?.openingTime ?? "N/A"}-
                      {location?.availability?.tuesday?.closingTime ?? "N/A"}
                    </span>
                  </li>
                  <li>
                    Wed
                    <span>
                      {location?.availability?.wednesday?.openingTime ?? "N/A"}-
                      {location?.availability?.wednesday?.closingTime ?? "N/A"}
                    </span>
                  </li>
                  <li>
                    Thur
                    <span>
                      {location?.availability?.thursday?.openingTime ?? "N/A"}-
                      {location?.availability?.thursday?.closingTime ?? "N/A"}
                    </span>
                  </li>
                  <li>
                    Fri
                    <span>
                      {location?.availability?.friday?.openingTime ?? "N/A"}-
                      {location?.availability?.friday?.closingTime ?? "N/A"}
                    </span>
                  </li>
                  <li>
                    Sat
                    <span>
                      {location?.availability?.saturday?.openingTime ?? "N/A"}-
                      {location?.availability?.saturday?.closingTime ?? "N/A"}
                    </span>
                  </li>
                  <li>
                    Sun
                    <span>
                      {location?.availability?.sunday?.openingTime ?? "N/A"}-
                      {location?.availability?.sunday?.closingTime ?? "N/A"}
                    </span>
                  </li>
                </ul>
              </Card>
            </Col>
          </Row>
          <div className="spacer-15"></div>
          <ul className="action-line mb-0">
            <li>
              <Switch defaultChecked /> Automatically close all tabs
            </li>
            <li></li>
            <li>
              <Input
                className="inventory-field"
                value={location?.minutes_before_closing}
                disabled={true}
              />
              minutes prior to closing time.
            </li>
          </ul>
        </div>
        <div className="spacer-20"></div>
        <Row gutter={{ md: 16 }}>
          <Col className="gutter-row menus-add-box" xs={24} md={12} lg={12}>
            <List
              header={<h2 className="mb-0">Menus</h2>}
              loadMore={
                menus.length > 3 && (
                  <Link to={"/menuitems"}>
                    <Typography.Text>See More ...</Typography.Text>
                  </Link>
                )
              }
              footer={
                <Link
                  className="text-primary"
                  style={{ textDecoration: "none" }}
                  to={"/menu-create"}
                >
                  <PlusOutlined /> Add Menu
                </Link>
              }
              bordered={false}
              dataSource={menus.slice(0, 3)}
              className="common-box"
              renderItem={(menu) => (
                <List.Item bordered={false}>
                  <Typography.Text>{menu?.name}</Typography.Text>
                  <div className="b-switch-box">
                    <Switch
                      checked={menu?.active}
                      onChange={(checked) => {
                        menu = { ...menu, active: checked };
                        MenuStatusHandler(menu);
                      }}
                    />
                    <label className="mb-0">
                      {menu?.active ? "Active" : "Inactive"}
                    </label>
                  </div>
                </List.Item>
              )}
            />
          </Col>
          <Col className="gutter-row menus-add-box" xs={24} md={12} lg={12}>
            <List
              header={<h2 className="mb-0">Loyalty</h2>}
              loadMore={
                discountsCount > 3 && (
                  <Link to={"/loyalties"}>
                    <Typography.Text>See More ...</Typography.Text>
                  </Link>
                )
              }
              bordered={false}
              dataSource={discounts.slice(0, 3)}
              className="common-box"
              renderItem={(discount) => (
                <List.Item bordered={false}>
                  <Typography.Text>{discount?.pos_name}</Typography.Text>
                  <div className="b-switch-box">
                    <Switch
                      checked={discount?.is_active}
                      onChange={(checked) => {
                        discount = { ...discount, is_active: checked };
                        discountStatusHandler(discount);
                      }}
                    />
                    <label className="mb-0">
                      {discount?.is_active ? "Active" : "Inactive"}
                    </label>
                  </div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
        <div className="spacer-20"></div>
        <div className="common-box">
          <h2 className="mb-1">Analytics Snapshot</h2>
          <Tabs className="Analytics-tab-cnt" onChange={getAnalytics}>
            {analyticsCols.map((data) => (
              <TabPane tab={data.title} key={data.key}>
                <Table
                  dataSource={analytics}
                  columns={columns}
                  pagination={false}
                  bordered={false}
                />
              </TabPane>
            ))}
          </Tabs>
        </div>
        <div className="spacer-20"></div>
        <div className="common-box addon-box">
          <h2>Pro Addons</h2>
          <Row>
            <Col className="db-cards" xs={24} sm={12} md={8} lg={8}>
              <Card title="Door Dash">
                <p>Boost your customer reach & revenue!</p>
                <Button
                  type="primary"
                  className="primary-btn"
                  onClick={() => requestAddOn("Door Dash")}
                >
                  Add Now
                </Button>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
