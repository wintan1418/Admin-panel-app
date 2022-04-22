import React from "react";
import { Link } from "react-router-dom";
import { CloseCircleOutlined } from "@ant-design/icons";

export default function ErrorNote({ message, link, linkMsg }) {
  return (
    <div class="jetson-alert-message">
      <h4>
        <CloseCircleOutlined style={{ color: "red" }} /> {message}
      </h4>
      <Link to={link}>{linkMsg}</Link>
    </div>
  );
}
