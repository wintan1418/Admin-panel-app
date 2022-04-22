import React, { useState } from "react";
import "antd/dist/antd.css";
import {
  CalendarOutlined,
  DownloadOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Input,
  Button,
  Switch,
  TimePicker,
  message,
  Select,
} from "antd";
import { copyUrl, capitalize } from "../../utilities/generalUtility";
import K from "../../utilities/constants";
import FileSaver from "file-saver";
import Timezones from "../../utilities/timezones.json";
import { getLocations, selectLocation } from "../../redux/slices/authSlice";
import User from "../../models/user/user";
import { setWeekDays } from "../../utilities/dateUtility";
const { Option } = Select;

export default function LocationForm({
  location,
  reduxAction,
  locationCreation,
  restaurants,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedLocation = useSelector(
    (state) => state?.auth?.selectedLocation
  );
  const [orderOnline, setOrderOnline] = useState(
    location?.online_ordering_and_pay === null
      ? false
      : location?.online_ordering_and_pay
  );
  const [openCalendar, setOpenCalendar] = useState(false);
  const [payOnline, setPayOnline] = useState(location?.online_pay ?? false);
  const [minutes, setMinutes] = useState(location?.minutes_before_closing ?? 0);
  const [tip, setTip] = useState(location?.tip ?? false);
  const [locationName, setLocationName] = useState(location?.name);
  const [selectedTables, setSelectedTables] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState();
  const [timezone, setTimezone] = useState(
    location?.time_zone === "" ? "" : location?.time_zone
  );
  const [timings, setTimings] = useState(setWeekDays(location?.availability));

  function timeChangeHandler(day, timeType, time, timeString) {
    console.log(time, timeString, day, timeType);
    setTimings({ ...timings, [day]: { ...timings[day], [timeType]: time } });
  }

  function locationNameChange(e) {
    console.log(`selected ${e.target.value}`);
    setLocationName(e.target.value);
  }

  function timezoneHandler(value) {
    // console.log("-------------------------------------", value)
    setTimezone(value);
  }

  const saveLocation = async () => {
    location.online_ordering_and_pay = orderOnline;
    location.online_pay = payOnline;
    location.tip = tip;
    location.name = locationName;
    location.availability = timings;
    location.time_zone = timezone;
    location.minutes_before_closing = minutes;
    if (User.getRole() === "Super Admin")
      location.restaurant_id = selectedRestaurant;

    try {
      const res = await dispatch(reduxAction(location));
      // console.log("============================", res);
      if (res?.error) {
        message.error(res?.error?.data?.error, 5);
      } else {
        if (res?.location?.id === selectedLocation?.id) {
          await dispatch(getLocations());
          await dispatch(selectLocation(res?.location?.id));
        }
        message.success("Location successfully saved!", 5);
        history.push("/locations");
      }
    } catch (error) {
      console.log("------------------------------", error);
      message.error(error?.error?.data?.error, 5);
    }
  };

  const handleSelect = (value) => {
    setSelectedTables(value);
  };

  const handleTableQRDownload = () => {
    if (location?.tables === [] || selectedTables === [])
      message.error("No tables selected!", 3);
    else {
      selectedTables.map((qr_url) => {
        FileSaver.saveAs(qr_url + "?not-from-cache-please", "Table QR.png");
      });
    }
  };

  return (
    <React.Fragment>
      <div className="body-wrapper width-38">
        <div className="location-box add-location common-box">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Location</h3>
            {!locationCreation && (
              <Button
                className="primary-btn"
                type="primary"
                onClick={() => history.push("/location-detail")}
              >
                View other details
              </Button>
            )}
          </div>
          <Row gutter={16}>
            <Col>
              <label>Name</label>
              <Input
                defaultValue={locationName}
                onChange={locationNameChange}
              />
              <label>POS Location Name</label>
              <Input
                defaultValue={location?.pos_location_name}
                disabled={true}
              />
              <label>Minutes prior to closing Jetson tabs</label>
              <Input
                defaultValue={location?.minutes_before_closing}
                onChange={(e) => setMinutes(e.target.value)}
              />
              <label>Open Days & Times</label>
              <Button
                type="link"
                className="location-icons"
                onClick={() => setOpenCalendar(!openCalendar)}
              >
                <CalendarOutlined />
              </Button>

              {openCalendar && (
                <ul className="open-days-listing">
                  {Object.keys(timings).map((day) => {
                    return (
                      <li key={day}>
                        <label>{capitalize(day.substring(0, 3))}</label>
                        <TimePicker
                          className="time-picker"
                          use12Hours
                          onChange={(timeString, time) =>
                            timeChangeHandler(
                              day,
                              "openingTime",
                              time,
                              timeString
                            )
                          }
                          placeholder={timings[day]["openingTime"] ?? "00:00"}
                          format="h:mm A"
                          suffixIcon={<i className="icon-dropdown "></i>}
                        />
                        to
                        <TimePicker
                          className="time-picker"
                          use12Hours
                          onChange={(timeString, time) =>
                            timeChangeHandler(
                              day,
                              "closingTime",
                              time,
                              timeString
                            )
                          }
                          placeholder={timings[day]["closingTime"] ?? "00:00"}
                          format="h:mm A"
                          suffixIcon={<i className="icon-dropdown "></i>}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
              <label>Time Zone</label>
              <Select
                showSearch
                style={{ width: 250 }}
                placeholder="Select Time Zone"
                onChange={timezoneHandler}
                // disabled={editable}
                value={timezone}
              >
                {Object.entries(Timezones).map(([key, value]) => (
                  <Option value={value}>{key}</Option>
                ))}
              </Select>

              <label>Online Ordering & Pay</label>
              <Switch
                defaultChecked={orderOnline}
                onChange={(checked) => setOrderOnline(checked)}
              />
              <label>Online Pay Only</label>
              <Switch
                defaultChecked={payOnline}
                onChange={(checked) => setPayOnline(checked)}
              />
              {!locationCreation && (
                <>
                  <label>Location QR Code</label>
                  <div className="button-group">
                    <img
                      width={50}
                      height={50}
                      src={location?.qr_image_url}
                      alt="button group"
                    />
                    <Button
                      type="link"
                      className="location-icons"
                      onClick={() => {
                        FileSaver.saveAs(
                          location?.qr_image_url + "?not-from-cache-please",
                          "Location-QR.png"
                        );
                      }}
                    >
                      <DownloadOutlined />
                    </Button>
                  </div>
                  <label>Location URL</label>
                  <div className="addition-field">
                    <Input
                      defaultValue={location?.location_url}
                      disabled={true}
                    />
                    <Button
                      type="link"
                      onClick={() => {
                        copyUrl(location?.location_url);
                      }}
                    >
                      <LinkOutlined />
                    </Button>
                  </div>
                  <label>Table QR Codes</label>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Select table(s)"
                    onChange={handleSelect}
                    optionLabelProp="label"
                  >
                    {location?.tables.map((table) => (
                      <Option
                        key={table?.id}
                        value={table?.qr_image_url}
                        label={table?.name ?? table?.pos_table_name}
                      >
                        <div className="demo-option-label-item">
                          {table?.name ?? table?.pos_table_name}
                        </div>
                      </Option>
                    ))}
                  </Select>
                  <Button
                    type="link"
                    className="location-icons"
                    onClick={handleTableQRDownload}
                  >
                    <DownloadOutlined />
                  </Button>
                </>
              )}
              {User.getRole() === K.Roles.SuperAdmin && locationCreation && (
                <>
                  <label>Brand</label>
                  <Select
                    style={{ width: "100%" }}
                    className="select-filed w-100 mr-3"
                    placeholder="Select Brand"
                    optionLabelProp="label"
                    onChange={(value) => {
                      setSelectedRestaurant(value);
                    }}
                  >
                    {restaurants.map((restaurant) => (
                      <Option value={restaurant?.id} label={restaurant?.name}>
                        {restaurant?.name}
                      </Option>
                    ))}
                  </Select>
                </>
              )}
              <label>Tips</label>
              <Switch
                defaultChecked={tip}
                onChange={(checked) => setTip(checked)}
              />
            </Col>
          </Row>
          <Row className="location-btn-bar align-items-center">
            <Button
              className="primary-btn"
              type="primary"
              onClick={saveLocation}
            >
              Save Location
            </Button>
            <a
              href="#"
              className="text-primary"
              onClick={() => history.push("/locations")}
            >
              Cancel
            </a>
            <div className="spacer-10"></div>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}
