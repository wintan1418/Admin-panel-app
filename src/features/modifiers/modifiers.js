import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table, Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../common/components/search/searchBar";
import SuperAdminSelect from "../../common/components/Select/select";
import {
  syncModifiers,
  getModifiers,
  getModifier,
  getModifierItem,
  updateModifier,
  updateModifierItem,
} from "../../redux/slices/modifierSlice";
import {
  createModCols,
  itemsTable,
  searchCols,
} from "../../helpers/modifier_helpers";
import { useHistory } from "react-router-dom";
import {
  searchParams,
  setParams,
  getSearchedParams,
  deleteQueryParam,
} from "../../utilities/generalUtility";
import ModifierDrawer from "./modifierDrawer";
import ModifierGroupForm from "./modifierGroupForm";
import ModifierItemForm from "./modifierItemForm";
import User from "../../models/user/user";

export default function Modifiers() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const { modifierGroups, modifierGroupItems, modifierGroupsCount } =
    useSelector((state) => state.modifier);
  const selectedLocation = useSelector((state) => state.auth.selectedLocation);
  // const [expandedKey, setExpandedKey] = useState(null);
  const [open, setOpenDrawer] = useState(false);
  const [formType, setType] = useState();
  const [restaurant_id, setRestaurant] = useState("");
  const [location_id, setLocation] = useState("");

  const getAllModifiers = (values, page = 1, pageSize = 10) => {
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
    dispatch(getModifiers(body));
    setParams(history, searchValues, page, pageSize);
  };

  const getModifierDetail = (id) => {
    setType("ModifierGroupForm");
    setOpenDrawer(true);
    dispatch(getModifier(id, form));
  };

  const getModifierItemDetail = (id) => {
    setType("ModifierItemForm");
    setOpenDrawer(true);
    dispatch(getModifierItem(id, form));
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const onUpdateModifier = (values) => {
    dispatch(updateModifier(values));
    getAllModifiers();
    setOpenDrawer(false);
  };

  const onUpdateModifierItem = (values) => {
    dispatch(updateModifierItem(values));
    setOpenDrawer(false);
  };

  // const getAllModifierItems = (opened, modifier) => {
  //   expandedKey === modifier?.id
  //     ? setExpandedKey(null)
  //     : setExpandedKey(modifier?.id);
  //   opened && dispatch(getModifierItems(modifier?.id));
  // };

  // Need to clear after new index api  that inlcludes also search
  // const searchModifiers = (values, page = 1, pageSize = 10) => {
  //   let searchValues = { ...values, restaurant_id, location_id };
  //   let search = searchParams(searchCols, searchValues);
  //   dispatch(filterModifiers(search, page, pageSize));
  //   setParams(history, searchValues, page, pageSize);
  // };

  const onPageChange = (pageNo, pageSize) => {
    getSearchedParams()
      ? getAllModifiers(getSearchedParams(), pageNo, pageSize)
      : getAllModifiers(undefined, pageNo, pageSize);
  };

  const resetSearch = (form) => {
    form.resetFields();
    getAllModifiers(
      undefined,
      getSearchedParams()?.page,
      getSearchedParams()?.pageSize
    );
    deleteQueryParam(history, getSearchedParams());
  };

  const syncAllModifiers = () => {
    let location = location_id ? location_id : selectedLocation?.id;
    if (location) {
      dispatch(syncModifiers(location));
    } else message.warning("Please Select Location First");
  };

  useEffect(() => {
    getSearchedParams()
      ? getAllModifiers(getSearchedParams())
      : getAllModifiers();
  }, [selectedLocation, restaurant_id, location_id]);

  return (
    <>
      <div className="body-wrapper">
        <div className="spacer-25"></div>
        <Row className="common-box">
          <Col span={24}>
            <Row className="align-items-center justify-content-sm-between">
              <Col span={12}>
                <h2>Modifiers</h2>
              </Col>
              <Col span={12} className="text-right">
                <Button
                  type="link"
                  onClick={syncAllModifiers}
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
              handleSearch={getAllModifiers}
              resetSearch={resetSearch}
            />

            <div className="spacer-25"></div>
            <Table
              className="jetson-listing"
              columns={createModCols(getModifierDetail, onUpdateModifier)}
              dataSource={modifierGroups}
              expandable={{
                expandedRowRender: () =>
                  itemsTable(
                    modifierGroupItems,
                    getModifierItemDetail,
                    onUpdateModifierItem
                  ),
                // onExpand: function (expanded, record) {
                //   getAllModifierItems(expanded, record);
                // },
                // expandedRowKeys: [expandedKey],
                rowExpandable: (record) => record.availablity,
              }}
              pagination={{
                showSizeChanger: true,
                current: parseInt(getSearchedParams()?.page),
                total: modifierGroupsCount,
                onChange: function (page, pageSize) {
                  onPageChange(page, pageSize);
                },
              }}
            />
          </Col>
        </Row>
      </div>
      <ModifierDrawer onClose={closeDrawer} visible={open}>
        {formType === "ModifierGroupForm" ? (
          <ModifierGroupForm form={form} handleUpdate={onUpdateModifier} />
        ) : (
          <ModifierItemForm form={form} handleUpdate={onUpdateModifierItem} />
        )}
      </ModifierDrawer>
    </>
  );
}
