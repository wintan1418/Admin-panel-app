import { useRef, useEffect, useState } from "react";
import { Button, Col, Progress, Row } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSingleGuestbyId } from "../../../redux/slices/enganements";

import {
  ArrowLeftOutlined,
  InstagramFilled,
  FacebookFilled,
} from "@ant-design/icons";
import { Form, Avatar, Image, message } from "antd";
import avatarImg from "../../../assets/images/avatar.png";
import markerImg from "../../../assets/images/icons/marker.svg";
import mailImg from "../../../assets/images/icons/mail.svg";
import atImg from "../../../assets/images/icons/at.svg";
import phoneImg from "../../../assets/images/icons/phone.svg";
import cakeImg from "../../../assets/images/icons/cake.svg";
import questionImg from "../../../assets/images/icons/question.svg";
import AddTag from "./AddTag";

const Profile = () => {
  const dispatch = useDispatch();
  const histoy = useHistory();
  const addTagRef = useRef();
  const { id } = useParams();
  // const [form] = Form.useForm();
  const [guestInfo, setGuestInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const getGuestsById = async () => {
    setLoading(true);

    try {
      let guestId = id;

      let res = await dispatch(
        fetchSingleGuestbyId({
          guestId,
        })
      );
      if (res?.error) {
        message.error("Something went wrong!", 5);
      } else {
        // form.setFieldsValue({});
        console.log("guest by id: ", res);
        let guu = res[0];
        console.log("guu: ", guu);
        setGuestInfo({ ...guestInfo, ...guu });

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getGuestsById();
  }, []);

  useEffect(() => {
    // console.log("guestInfo --->", guestInfo);
  }, [guestInfo]);

  const handleChangeRoute = (route, e) => {
    if (e) e.preventDefault();

    histoy.push("/enganement/guests");
  };

  const showAddTag = (e) => {
    e.preventDefault();

    addTagRef.current.changeStatus();
  };

  return (
    <>
      <AddTag ref={addTagRef} />
      <div className="w-100 guests-profile">
        <Row>
          <Col className="d-print-none" span={24}>
            <div className="d-flex justify-content-between mb-4">
              <a
                href="/"
                onClick={(e) => handleChangeRoute("enganement/guests", e)}
              >
                <ArrowLeftOutlined />
                <span className="pl-2 color-default font-weight-700 back">
                  Back
                </span>
              </a>
              <Button
                className="px-4 font-weight-600 d-print-none d-none d-sm-block"
                type="primary"
                title="Print Chit"
                onClick={() => window.print()}
              >
                Print Chit
              </Button>
            </div>
          </Col>
          <Col span={24}>
            <div className="d-md-flex align-items-center text-center">
              <Image src={avatarImg} className="profile-avatar d-print-none" />
              <div className="ml-4 ml-sm-0 full_Name mt-sm-3">
                {`${guestInfo?.FirstName} ${guestInfo?.LastName}`}
                <span className="color-gray pl-sm-0 pl-2 level">(1)*</span>
              </div>
              <div className="ml-4 ml-sm-0 mt-2 mt-sm-3 d-print-none">
                <FacebookFilled className="header-icon" />
                <InstagramFilled className="header-icon ml-2" />
              </div>
            </div>
          </Col>
          <Col span={24}>
            <div className="mt-4 d-flex icons-header">
              <div className="d-lg-flex">
                <div className="info-bet d-print-none">
                  <div className="d-flex align-items-center icons-header-item">
                    <div className="icon">
                      <img src={markerImg} />
                    </div>
                    <span className="ml-2 color-gray font-weight-700">
                      Malibu, CA
                    </span>
                  </div>
                  <div className="d-flex align-items-center icons-header-item">
                    <div className="icon">
                      <img src={mailImg} />
                    </div>
                    <span className="ml-2 color-blue font-weight-700">
                      {guestInfo?.EmailId}
                    </span>
                  </div>
                </div>
                <div className="info-bet d-print-none">
                  <div className="d-flex align-items-center icons-header-item">
                    <div className="icon">
                      <img src={atImg} />
                    </div>
                    <span className="ml-2 color-gray font-weight-700">
                      official_michealjorden
                    </span>
                  </div>
                  <div className="d-flex align-items-center icons-header-item">
                    <div className="icon">
                      <img src={phoneImg} />
                    </div>
                    <span className="ml-2 color-gray font-weight-700">
                      (123) 2321 232
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center icons-header-item">
                  <div className="icon">
                    <img src={cakeImg} />
                  </div>
                  <span className="ml-2 color-gray font-weight-700">
                    January 12, 1999
                  </span>
                </div>
              </div>
            </div>
          </Col>
          <Col className="d-print-none" span={24}>
            <div className="mt-3 text-center text-sm-left">
              <span className="color-gray font-weight-700">
                Micheal Jorden uses the following cards:
              </span>
              <span className="pl-1 color-blue font-weight-700 d-block d-md-inline-block mt-1">
                VISA 2123, AMEX 3412, DISC 1232
              </span>
            </div>
          </Col>
          <Col span={24}>
            <div className="mt-4 d-flex icons-header">
              <div className="d-sm-flex justify-content-center">
                <div className="btn-bet">
                  <div className="d-flex align-items-center icons-header-item mr-3">
                    <Button size="large" className="primary">
                      VIP
                    </Button>
                  </div>
                  <div className="d-flex align-items-center icons-header-item mr-3">
                    <Button size="large" className="primary">
                      Regular
                    </Button>
                  </div>
                </div>
                <div className="btn-bet">
                  <div className="d-flex align-items-center icons-header-item mr-3">
                    <Button size="large" className="primary">
                      Allergy <img className="pl-2" src={questionImg} />
                    </Button>
                  </div>
                  <div className="d-flex align-items-center icons-header-item mr-3">
                    <Button size="large" className="success">
                      Talkative
                    </Button>
                  </div>
                </div>
                <div className="btn-bet">
                  <div className="d-flex align-items-center icons-header-item mr-3">
                    <a
                      href="/"
                      className="d-none d-lg-block add-tag-btn"
                      onClick={showAddTag}
                    >
                      + Add Tags
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={24} className="mt-4 common-box d-print-none">
            <Row>
              <Col
                className="w-100 text-center px-2 px-md-3 px-lg-5 mb-4 mb-lg-0"
                lg={6}
                md={12}
              >
                <div className="font-weight-700 color-gray">Total Sales</div>
                <div className="font-weight-700 color-gray-200 mt-1">
                  $300,000.00
                </div>
                <Progress
                  className="progress-wrapper mt-3"
                  percent={80}
                  showInfo={false}
                />
                <div className="progress-value">90%</div>
              </Col>
              <Col
                className="w-100 text-center px-2 px-md-3 px-lg-5 mb-4 mb-lg-0"
                lg={6}
                md={12}
              >
                <div className="font-weight-700 color-gray">Total Sales</div>
                <div className="font-weight-700 color-gray-200 mt-1">
                  $300,000.00
                </div>
                <Progress
                  className="progress-wrapper mt-3"
                  percent={80}
                  showInfo={false}
                />
                <div className="progress-value">90%</div>
              </Col>
              <Col
                className="w-100 text-center px-2 px-md-3 px-lg-5 mb-4 mb-lg-0"
                lg={6}
                md={12}
              >
                <div className="font-weight-700 color-gray">Total Sales</div>
                <div className="font-weight-700 color-gray-200 mt-1">
                  $300,000.00
                </div>
                <Progress
                  className="progress-wrapper mt-3"
                  percent={80}
                  showInfo={false}
                />
                <div className="progress-value">90%</div>
              </Col>
              <Col
                className="w-100 text-center px-2 px-md-3 px-lg-5 mb-4 mb-lg-0"
                lg={6}
                md={12}
              >
                <div className="font-weight-700 color-gray">Total Sales</div>
                <div className="font-weight-700 color-gray-200 mt-1">
                  $300,000.00
                </div>
                <Progress
                  className="progress-wrapper mt-3"
                  percent={80}
                  showInfo={false}
                />
                <div className="progress-value">90%</div>
              </Col>
            </Row>
          </Col>
          <Col span={24} className="mt-4 common-box">
            <Row>
              <Col className="mb-3" span={24}>
                <div className="font-weight-700 color-gray mb-2">
                  Preferences
                </div>
                <div className="font-weight-700 color-gray-400 mb-1">
                  Liquor: Bourbon
                </div>
                <div className="color-gray font-weight-600">
                  <span className="color-blue">Last Order:</span>
                  <span className="color-app pl-1">Item Name</span> (21);
                  <span className="color-app pl-1">Item Name</span> (23);
                  <span className="color-app pl-1">Item Name </span>(21)
                </div>
              </Col>
              <Col className="mb-3" span={24}>
                <div className="font-weight-700 color-gray-400 mb-1">
                  Beer: Pilsner
                </div>
                <div className="color-gray font-weight-600">
                  <span className="color-blue">Last Order:</span>
                  <span className="color-app pl-1">Item Name</span> (21);
                  <span className="color-app pl-1">Item Name</span> (23);
                  <span className="color-app pl-1">Item Name </span>(21)
                </div>
              </Col>
              <Col className="mb-3" span={24}>
                <div className="font-weight-700 color-gray-400 mb-1">
                  Wine: Franzia
                </div>
                <div className="color-gray font-weight-600">
                  <span className="color-blue">Last Order:</span>
                  <span className="color-app pl-1">Item Name</span> (21);
                  <span className="color-app pl-1">Item Name</span> (23);
                  <span className="color-app pl-1">Item Name </span>(21)
                </div>
              </Col>
              <Col className="mb-3" span={24}>
                <div className="font-weight-700 color-gray mb-2">
                  Beverages Serving
                </div>
                <div className="font-weight-700 color-gray-400 mb-1">
                  Start with
                </div>
                <div className="color-gray font-weight-600">
                  <span className="color-blue">Last Order:</span>
                  <span className="color-app pl-1">Item Name</span> (21);
                  <span className="color-app pl-1">Item Name</span> (23);
                  <span className="color-app pl-1">Item Name </span>(21)
                </div>
              </Col>
              <Col className="mb-3" span={24}>
                <div className="font-weight-700 color-gray mb-2">
                  Food Serving
                </div>
                <div className="font-weight-700 color-gray-400 mb-1">
                  Popular Items
                </div>
                <div className="color-gray font-weight-600">
                  <span className="color-blue">Last Order:</span>
                  <span className="color-app pl-1">Item Name</span> (21);
                  <span className="color-app pl-1">Item Name</span> (23);
                  <span className="color-app pl-1">Item Name </span>(21)
                </div>
              </Col>
              <Col className="mb-3" span={24}>
                <div className="font-weight-700 color-gray mb-2">
                  Deitary Restrctions
                </div>
                <div className="font-weight-700 color-gray-400 mb-1">Vegan</div>
                <div className="color-gray-400 font-weight-600">
                  Item Name; Item Name
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Profile;
