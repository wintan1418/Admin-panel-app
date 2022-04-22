import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table, message } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../common/components/search/searchBar";
import SuperAdminSelect from "../../common/components/Select/select";
import {
  syncCategories,
  getCategories,
  updateCategory,
} from "../../redux/slices/categorySlice";
import { searchCols, createCatCols } from "../../helpers/category_helpers";
import {
  searchParams,
  setParams,
  getSearchedParams,
  deleteQueryParam,
} from "../../utilities/generalUtility";
import User from "../../models/user/user";

export default function Category() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { categories, categoriesCount } = useSelector(
    (state) => state.category
  );
  const selectedLocation = useSelector((state) => state.auth.selectedLocation);
  const [restaurant_id, setRestaurant] = useState("");
  const [location_id, setLocation] = useState("");

  const getAllCategories = (values, page = 1, pageSize = 10) => {
    let searchValues = {
      ...values,
      restaurant_id,
      location_id: location_id ? location_id : selectedLocation?.id,
    };
    let search = searchParams(searchCols, searchValues);
    let body = {
      ...search,
      page,
      pageSize,
    };
    dispatch(getCategories(body));
    setParams(history, searchValues, page, pageSize);
  };

  // Need to clear after new index api  that inlcludes also search
  // const searchCategories = (values, page = 1, pageSize = 10) => {
  //   let searchValues = { ...values, restaurant_id, location_id };
  //   let search = searchParams(searchCols, searchValues);
  //   dispatch(filterCategories(search, page, pageSize));
  //   setParams(history, searchValues, page, pageSize);
  // };

  const addCatHandle = () => {
    if (User.getRole() === "Super Admin") {
      if (location_id)
        history.push({
          pathname: "/category-create",
          state: { location_id: location_id },
        });
      else message.warning("Please Select Location First");
    } else {
      history.push("/category-create");
    }
  };

  const categoryStatusHandler = (category) => {
    dispatch(updateCategory(category, category?.id));
  };

  const onPageChange = (pageNo, pageSize) => {
    getSearchedParams()
      ? getAllCategories(getSearchedParams(), pageNo, pageSize)
      : getAllCategories(undefined, pageNo, pageSize);
  };

  const resetSearch = (form) => {
    form.resetFields();
    getAllCategories(
      undefined,
      getSearchedParams()?.page,
      getSearchedParams()?.pageSize
    );
    deleteQueryParam(history, getSearchedParams());
  };

  const syncAllCategories = () => {
    let location = location_id ? location_id : selectedLocation?.id;
    if (location) {
      dispatch(syncCategories(location));
    } else message.warning("Please Select Location First");
  };

  useEffect(() => {
    getSearchedParams()
      ? getAllCategories(getSearchedParams())
      : getAllCategories();
  }, [selectedLocation, restaurant_id, location_id]);

  return (
    <>
      <div className="body-wrapper">
        <div className="spacer-25"></div>
        <Row className="common-box">
          <Col span={24}>
            <Row className="align-items-center justify-content-sm-between">
              <Col span={12}>
                <h2>Categories</h2>
              </Col>
              <Col span={1} className="text-right">
                <Button
                  onClick={addCatHandle}
                  type="primary"
                  className="primary-btn"
                >
                  Add Category
                </Button>
              </Col>
              <Col span={6} className="text-right">
                <Button
                  type="link"
                  onClick={syncAllCategories}
                  className="text-primary"
                >
                  Sync Now
                </Button>
              </Col>
            </Row>
            {User.getRole() === "Super Admin" && (
              <SuperAdminSelect
                setRestaurant={setRestaurant}
                setLocation={setLocation}
                location_id={location_id}
                restaurant_id={restaurant_id}
              />
            )}
            <SearchBar
              fields={searchCols}
              handleSearch={getAllCategories}
              resetSearch={resetSearch}
            />

            <div className="spacer-25"></div>
            <Table
              className="jetson-listing"
              columns={createCatCols(categoryStatusHandler)}
              dataSource={categories}
              pagination={{
                showSizeChanger: true,
                current: parseInt(getSearchedParams()?.page),
                total: categoriesCount,
                onChange: function (page, pageSize) {
                  onPageChange(page, pageSize);
                },
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}
