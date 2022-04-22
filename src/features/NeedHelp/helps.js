import React, { useEffect, useState } from "react";
import { Table, Drawer, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getHelps, getHelp, filterHelps } from "../../redux/slices/helpSlice";
import { createHelpCols, searchCols } from "../../helpers/help_helpers";
import SearchBar from "../../common/components/search/searchBar";
import {
  searchParams,
  setParams,
  getSearchedParams,
  deleteQueryParam,
} from "../../utilities/generalUtility";
import { useHistory } from "react-router-dom";

export default function Help() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { helps, help, helpsCount } = useSelector((state) => state.help);
  const [open, setOpenDrawer] = useState(false);

  const getAllHelps = (page = 1, pageSize = 10) => {
    dispatch(getHelps(page, pageSize));
  };

  const getHelpDetail = (order_id) => {
    dispatch(getHelp(order_id));
  };

  const openDrawer = (id) => {
    setOpenDrawer(true);
    getHelpDetail(id);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const searchHelps = (values, page = 1, pageSize = 10) => {
    let search = searchParams(searchCols, values);
    dispatch(filterHelps(search, page, pageSize));
    setParams(history, values, page, pageSize);
  };

  const onPageChange = (pageNo, pageSize) => {
    getSearchedParams()
      ? searchHelps(getSearchedParams(), pageNo, pageSize)
      : getAllHelps(pageNo, pageSize);
  };

  const resetSearch = (form) => {
    form.resetFields();
    getAllHelps();
    deleteQueryParam(history, getSearchedParams());
  };

  useEffect(() => {
    getAllHelps();
  }, []);

  return (
    <>
      <div className="body-wrapper">
        <div className="common-box">
          <h2>Help</h2>
          <SearchBar
            fields={searchCols}
            handleSearch={searchHelps}
            resetSearch={resetSearch}
          />

          <div className="spacer-25"></div>
          <Table
            className="jetson-listing"
            columns={createHelpCols(openDrawer)}
            dataSource={helps}
            pagination={{
              showSizeChanger: true,
              total: helpsCount,
              onChange: function (page, pageSize) {
                onPageChange(page, pageSize);
              },
            }}
          />
        </div>
      </div>
      <Drawer
        className="menus-drawer"
        width={645}
        title="Help Detail"
        placement="right"
        onClose={closeDrawer}
        visible={open}
        maskClosable={false}
      >
        <Row className="justify-content-between" gutter={16}>
          <Col span={12}>
            <ul className="item-result-list list-unstyled pl-0">
              <li>
                <span className="bold-text">Name</span>
              </li>
              <span className="bold-text">{help?.name}</span>
              <li>
                <span className="bold-text">Email </span>
              </li>
              <a className="bold-text" href={`mailto:${help?.email}`}>
                {help?.email}
              </a>
              <li>
                <span className="bold-text">Phone Number</span>
              </li>
              <a className="bold-text" href={`tel:${help?.phone_number}`}>
                {help?.phone_number}
              </a>
              <li>
                <span className="bold-text">Message</span>
              </li>
              <span className="bold-text">{help?.message}</span>
            </ul>
          </Col>
        </Row>
      </Drawer>
    </>
  );
}
