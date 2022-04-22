import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../common/components/search/searchBar";
import SuperAdminSelect from "../../common/components/Select/select";
import {
  getProducts,
  syncProducts,
  updateProduct,
} from "../../redux/slices/productSlice";
import { searchCols, createProductCols } from "../../helpers/product_helpers";
import {
  searchParams,
  setParams,
  getSearchedParams,
  deleteQueryParam,
} from "../../utilities/generalUtility";
import User from "../../models/user/user";
import { useHistory } from "react-router-dom";

export default function Product() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { products, productsCount } = useSelector((state) => state.product);
  const selectedLocation = useSelector((state) => state.auth.selectedLocation);
  const [restaurant_id, setRestaurant] = useState("");
  const [location_id, setLocation] = useState("");

  const getAllProduct = (values, page = 1, pageSize = 10) => {
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
    dispatch(getProducts(body));
    setParams(history, searchValues, page, pageSize);
  };

  // Need to clear after new index api  that inlcludes also search
  // const searchProducts = (values, page = 1, pageSize = 10) => {
  //   let searchValues = { ...values, restaurant_id, location_id };
  //   let search = searchParams(searchCols, searchValues);
  //   let body = {
  //     ...search,
  //     page,
  //     pageSize,
  //   };
  //   dispatch(getProducts(body));
  //   setParams(history, search, page, pageSize);
  // };

  const productStatusHandler = (product) => {
    dispatch(updateProduct(product, product?.id));
  };

  const onPageChange = (pageNo, pageSize) => {
    getSearchedParams()
      ? getAllProduct(getSearchedParams(), pageNo, pageSize)
      : getAllProduct(undefined, pageNo, pageSize);
  };

  const resetSearch = (form) => {
    form.resetFields();
    getAllProduct(
      undefined,
      getSearchedParams()?.page,
      getSearchedParams()?.pageSize
    );
    deleteQueryParam(history, getSearchedParams());
  };

  const syncAllProducts = () => {
    let location = location_id ? location_id : selectedLocation?.id;
    if (location) {
      dispatch(syncProducts(location));
    } else message.warning("Please Select Location First");
  };

  const editProductHandle = (product_id, location_id) => {
    if (User.getRole() === "Super Admin") {
      history.push({
        pathname: `/products/${product_id}`,
        state: { location_id: location_id },
      });
    } else {
      history.push(`/products/${product_id}`);
    }
  };

  useEffect(() => {
    getSearchedParams() ? getAllProduct(getSearchedParams()) : getAllProduct();
  }, [selectedLocation, restaurant_id, location_id]);

  return (
    <>
      <div className="body-wrapper ">
        <div className="spacer-25"></div>
        <Row className="common-box">
          <Col span={24}>
            <Row className="align-items-center justify-content-sm-between">
              <Col span={12}>
                <h2>Menu Items</h2>
              </Col>
              <Col span={12} className="text-right">
                <Button
                  type="link"
                  onClick={syncAllProducts}
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
              handleSearch={getAllProduct}
              resetSearch={resetSearch}
            />

            <div className="spacer-25"></div>
            <Table
              className="jetson-listing"
              columns={createProductCols(
                editProductHandle,
                productStatusHandler
              )}
              dataSource={products}
              pagination={{
                showSizeChanger: true,
                current: parseInt(getSearchedParams()?.page),
                total: productsCount,
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
