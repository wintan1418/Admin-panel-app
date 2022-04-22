import React, { useState } from "react";
import { Row, Button, Col } from "antd";
import EditProfile from "./edit-profile";
import ChangePassword from "./change-password";
import ViewProfile from "./view-profile";
import EditPassword from "./edit-password";

export default function Profile() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditPassword, setShowEditPassword] = useState(false);

  return (
    <>
      <div className="body-wrapper">
        <div className="common-box profile-box">
          <h2 className="mb-0">Profile</h2>
          <h3>View or edit your Profile</h3>
          <Button
            className="edit-profile-btn"
            type="link"
            onClick={() => setShowEditProfile(true)}
          >
            <i className="icon-edit"></i>
          </Button>
          <div className="profile-inr-box">
            <Row>
              <Col xs="24" md="24" xl={12}>
                {showEditProfile === true ? (
                  <EditProfile showHandler={setShowEditProfile} />
                ) : (
                  <ViewProfile />
                )}
              </Col>
            </Row>
          </div>
        </div>

        <div className="spacer-25"></div>

        <div className="common-box profile-box">
          <h2 className="mb-0">Password</h2>
          <h3>Change Password</h3>
          <Button className="edit-profile-btn" type="link">
            <i
              className="icon-edit"
              onClick={() => setShowEditPassword(true)}
            ></i>
          </Button>
          <Row>
            <Col xs="24" md="24" xl="24">
              {showEditPassword === true ? (
                <ChangePassword showHandler={setShowEditPassword} />
              ) : (
                <EditPassword />
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
