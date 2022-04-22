import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table } from "antd";
import User from "../../../models/user/user";
import K from "../../../utilities/constants";
import {
  searchParams,
  getSearchedParams,
  setParams,
  deleteQueryParam,
} from "../../../utilities/generalUtility";
import { fetchAllGuests } from "../../../redux/slices/enganements";
import { searchCols, tableColumns } from "../../../helpers/enganement_helper";
import SearchBar from "../../../common/components/search/searchBar";

const Guests = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [restaurant_id, setRestaurant] = useState("");
  const [location_id, setLocationId] = useState("");
  const { guests } = useSelector((state) => state?.enganements);
  const location = useSelector((state) => state?.auth?.selectedLocation);

  useEffect(() => {
    // location_id && getGuests();
    getGuests();
  }, [location_id]);

  useEffect(() => {
    User.getRole() === K.Roles.Admin && setLocationId(location?.id);
  }, [location]);

  useEffect(() => {
    User.getRole() === K.Roles.SuperAdmin && restaurant_id && getGuests();
  }, [restaurant_id]);

  const getGuests = async (values, page = 1, pageSize = 10) => {
    try {
      let searchValues = {
        ...values,
        restaurant_id,
        location_id,
      };
      let search = searchParams(searchCols, searchValues);
      let res = await dispatch(
        fetchAllGuests({
          ...search,
          page,
          pageSize,
        })
      );
      console.dir(res);
      setParams(history, searchValues, page, pageSize);
    } catch (error) {
      console.log(error);
      // message.error(error.error.data.error)
    }
  };

  const resetSearch = (form) => {
    form.resetFields();
    getGuests(
      undefined,
      getSearchedParams()?.page,
      getSearchedParams()?.pageSize
    );
    deleteQueryParam(history, getSearchedParams());
  };

  return (
    <div className="body-wrapper">
      <Row className="common-box">
        <Col span={24}>
          <Row className="align-items-center justify-content-sm-between">
            <Col span={12}>
              <h2>Guests</h2>
            </Col>
          </Row>
          <SearchBar
            fields={searchCols}
            handleSearch={getGuests}
            resetSearch={resetSearch}
          />
          <div className="spacer-15"></div>
          <Table
            className="jetson-listing"
            columns={tableColumns()}
            dataSource={guests}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Guests;
