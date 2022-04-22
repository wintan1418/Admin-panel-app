import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  CalendarOutlined,
  QrcodeOutlined,
  DownloadOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation, Link, useHistory } from "react-router-dom";
import {
  capitalize,
  copyUrl,
  beforeUpload,
  getBase64,
} from "../../utilities/generalUtility";
import { WeekDaysTime } from "../../utilities/dateUtility";
import { createMenuBody, updateMenuBody } from "../../helpers/menu_helpers";
import { locationCategories } from "../../redux/slices/categorySlice";
import { createMenu, getMenu, updateMenu } from "../../redux/slices/menuSlice";
import {
  Row,
  Upload,
  Col,
  Input,
  Button,
  Switch,
  TimePicker,
  Form,
  Checkbox,
} from "antd";
import FileSaver from "file-saver";
const { TextArea } = Input;

export default function MenuForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [form] = Form.useForm();
  const selectedLocation = useSelector((state) => state.auth.selectedLocation);
  const [, setCalender] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(id ? true : false);
  const [qr_code, setQr] = useState();
  const [menu_url, setMenuUrl] = useState();
  const [menu_image, setImage] = useState();
  const [categories, setCategories] = useState([]);
  const [timings, setTimings] = useState(WeekDaysTime);

  function onChange(day, timeType, time, timeString) {
    setTimings({
      ...timings,
      [day]: { ...timings[day], [timeType]: time },
    });
  }

  const handleChange = (info) => {
    getBase64(info.file, (imageUrl) => {
      setImage(imageUrl);
    });
  };

  const getAllCategories = async () => {
    let location_id = selectedLocation?.id ?? location?.state?.location_id;
    let forProduct = false;
    let response = await dispatch(locationCategories(forProduct, location_id));
    setCategories(response);
  };

  const getMenuDetail = () => {
    dispatch(getMenu(id, form, setImage, setTimings, setQr, setMenuUrl));
    setCalender(true);
  };

  const onCreateMenu = (values) => {
    let menu = createMenuBody(
      values,
      menu_image,
      timings,
      selectedLocation?.id ?? location?.state?.location_id
    );
    dispatch(createMenu(menu, setQr, setMenuUrl));
    history.push("/menuitems");
  };

  const onUpdateMenu = (values) => {
    let menu = updateMenuBody(values, menu_image, timings);
    dispatch(updateMenu(menu, id));
    history.push("/menuitems");
  };

  const qrSave = () => {
    FileSaver.saveAs(qr_code + "?not-from-cache-please", "Menu-QR.png");
  };

  useEffect(() => {
    getAllCategories();
    id && getMenuDetail();
  }, []);

  return (
    <div className="body-wrapper width-38">
      <div className="location-box add-location common-box ">
        <Form form={form} onFinish={id ? onUpdateMenu : onCreateMenu}>
          <Row gutter={16}>
            <Col>
              <h3>{id ? "Edit Menu" : "New Menu"}</h3>
              <label>Name</label>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your Menu Name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <label>Description</label>
              <Form.Item name="description" noStyle>
                <TextArea autoSize={{ minRows: 3, maxRows: 4 }} />
              </Form.Item>
              <label>Availability</label>
              {/* <Switch
                checked={showCalender}
                onChange={(value) => {
                  setCalender(value)
                  setOpenCalendar(false)
                }}
              /> */}
              {/* {showCalender && ( */}
              <Button
                type="link"
                className="location-icons"
                onClick={() => setOpenCalendar(!openCalendar)}
              >
                <CalendarOutlined />
              </Button>
              {/* // )} */}
              {openCalendar && (
                <ul className="open-days-listing">
                  {Object.keys(timings).map((avail) => (
                    <li key={avail}>
                      <label>{capitalize(avail.substring(0, 3))}</label>
                      <TimePicker
                        className="time-picker"
                        onChange={(timeString, time) =>
                          onChange(avail, "openingTime", time)
                        }
                        placeholder={timings[avail]["openingTime"] ?? "00:00"}
                        use12Hours
                        format="h:mm A"
                        suffixIcon={<i className="icon-dropdown "></i>}
                      />
                      to
                      <TimePicker
                        className="time-picker"
                        onChange={(timeString, time) =>
                          onChange(avail, "closingTime", time)
                        }
                        placeholder={timings[avail]["closingTime"] ?? "00:00"}
                        use12Hours
                        format="h:mm A"
                        suffixIcon={<i className="icon-dropdown "></i>}
                      />
                    </li>
                  ))}
                </ul>
              )}
              <label>Online Ordering & Pay</label>
              <Form.Item
                name="online_ordering_and_pay"
                valuePropName="checked"
                noStyle
              >
                <Switch />
              </Form.Item>
              <label>Online Pay Only</label>
              <Form.Item name="online_pay" valuePropName="checked" noStyle>
                <Switch />
              </Form.Item>
              <label>Active</label>
              <Form.Item name="active" valuePropName="checked" noStyle>
                <Switch />
              </Form.Item>
              <label>Image</label>
              <div className="product-thumb">
                {menu_image && <img src={menu_image} alt="" />}
                <Upload
                  beforeUpload={beforeUpload}
                  customRequest={handleChange}
                  maxCount={1}
                  showUploadList={false}
                >
                  <Button className="primary-btn upload-btn">Add Image</Button>
                  <span className="span-text">JPG or PNG / 1MB Max</span>
                </Upload>
              </div>
              <label>Menu QR Code</label>
              <div className="button-group">
                <Button type="link" className="location-icons location-qr mr-2">
                  {qr_code ? (
                    <>
                      <img width={50} src={qr_code} />
                      <Button
                        type="link"
                        onClick={qrSave}
                        className="location-icons"
                      >
                        <DownloadOutlined />
                      </Button>
                    </>
                  ) : (
                    <QrcodeOutlined />
                  )}
                </Button>
              </div>
              <label>Menu URL</label>
              <div className="addition-field">
                <Input value={menu_url} disabled={true} />
                <Button type="link" onClick={() => copyUrl(menu_url)}>
                  <LinkOutlined />
                </Button>
              </div>
              <label>Categories</label>
              <div className="select-box mb-2">
                <p>Enter search term</p>

                <div className="select-items">
                  <Form.Item name="category" noStyle>
                    <Checkbox.Group>
                      {categories.map((cat) => (
                        <Checkbox key={cat?.id} value={cat?.id}>
                          {cat?.name ?? cat?.pos_category_name}
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="location-btn-bar align-items-center">
            <Button className="primary-btn" htmlType="submit" type="primary">
              {id ? "Update Menu" : "Add Menu"}
            </Button>
            <Link className="text-primary" to={"/menuitems"}>
              Cancel
            </Link>
          </Row>
        </Form>
      </div>
    </div>
  );
}
