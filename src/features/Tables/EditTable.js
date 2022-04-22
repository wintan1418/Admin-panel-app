import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, message, Row, Col, Switch } from "antd";
import { fetchSingleTable, updateTable } from "../../redux/slices/tableSlice";
import { useHistory, useParams } from "react-router";
import { DownloadOutlined, LinkOutlined } from "@ant-design/icons";
import FileSaver from "file-saver";
import { copyUrl } from "../../utilities/generalUtility";

export default function EditTable() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState({});

  const getTable = async () => {
    setLoading(true);
    try {
      let res = await dispatch(fetchSingleTable(id));
      console.log(res.table);
      if (res?.error) {
        message.error("Something went wrong!", 5);
      } else {
        setTable(res?.table);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTable();
  }, []);

  const saveTable = async () => {
    try {
      let res = await dispatch(updateTable(table));
      console.log(res);
      if (res?.error) {
        message.error("Something went wrong!", 5);
      } else {
        message.success("Table updated successfully!", 5);
        history.push("/tables");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeTableName = (e) => {
    console.log(e.target.value);
    setTable({ ...table, name: e.target.value });
  };

  const changeTableAvailability = (checked) => {
    console.log(checked);
    setTable({ ...table, available: checked });
  };

  return (
    <React.Fragment>
      <div className="body-wrapper width-38">
        <div className="location-box add-location common-box">
          <h3>Edit Table Info</h3>
          {!loading && (
            <>
              {" "}
              <Row gutter={16}>
                <Col>
                  <label>Name</label>
                  <Input
                    defaultValue={table?.name}
                    onChange={changeTableName}
                  />
                  <label>POS Table Name</label>
                  <Input defaultValue={table?.pos_table_name} disabled={true} />
                  <label>POS Table Number</label>
                  <Input
                    defaultValue={table?.pos_table_number}
                    disabled={true}
                  />
                  <label>POS Table Seats</label>
                  <Input
                    defaultValue={table?.pos_table_seats}
                    disabled={true}
                  />
                  <label>Availability</label>
                  <Switch
                    defaultChecked={table?.available}
                    onChange={changeTableAvailability}
                  />
                  <label>Table QR Code</label>
                  <div className="button-group">
                    <img
                      width={50}
                      height={50}
                      src={table?.qr_image_url}
                      alt=""
                    />
                    <Button
                      type="link"
                      className="location-icons"
                      onClick={() => {
                        FileSaver.saveAs(
                          table?.qr_image_url + "?not-from-cache-please",
                          "Table-QR.png"
                        );
                      }}
                    >
                      <DownloadOutlined />
                    </Button>
                  </div>
                  <label>Table URL</label>
                  <div className="addition-field">
                    <Input defaultValue={table?.table_url} disabled={true} />
                    <Button
                      type="link"
                      onClick={() => {
                        copyUrl(table?.table_url);
                      }}
                    >
                      <LinkOutlined />
                    </Button>
                  </div>
                </Col>
              </Row>
              <Row className="location-btn-bar align-items-center">
                <Button
                  className="primary-btn"
                  type="primary"
                  onClick={saveTable}
                >
                  Save Table
                </Button>
                <a
                  href="#"
                  className="text-primary"
                  onClick={() => history.push("/tables")}
                >
                  Cancel
                </a>
              </Row>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
