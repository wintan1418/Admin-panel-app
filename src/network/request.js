import K from "../utilities/constants";
// import Cookies from "js-cookie";
import queryParams from "../utilities/queryParams";

import User from "../models/user/user";
export default class Request {
  constructor(
    relativeURL,
    method = K.Network.Method.GET,
    body = null,
    defaultHeaderType = K.Network.Header.Type.Json,
    headers = {},
    isTenant = true,
    customUrl = false
  ) {
    // console.log("constructor --> : ", relativeURL, customUrl);
    const token = User.getToken();
    const domainPrefix = User.getTenant();
    headers = {
      ...(defaultHeaderType === K.Network.Header.Type.Json
        ? K.Network.Header.Default(token)
        : K.Network.Header.Authorization(token)),
      ...headers,
    };

    // console.log("constructor header--> : ", headers);

    this.url = !customUrl
      ? isTenant
        ? K.Network.URL.TenantURL(domainPrefix) + relativeURL
        : K.Network.URL.BaseAPI + relativeURL
      : relativeURL;
    this.method = method;
    this.body = body;
    this.headers = headers;
  }

  // Tenant calls.
  static getTenant() {
    return new Request(K.Network.URL.GetTenant, K.Network.Method.GET);
  }

  // User calls.
  static loginUser(email, password) {
    const body = {
      email,
      password,
    };
    return new Request(
      K.Network.URL.LoginUser,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      false
    );
  }

  static updateUser(user, user_image, id) {
    const body = {
      user,
      user_image,
    };
    return new Request(
      K.Network.URL.UpdateUser + id,
      K.Network.Method.PUT,
      body,
      K.Network.Header.Type.Json,
      {},
      false
    );
  }

  static changeUserPassword(values, id) {
    const body = {
      current_password: values.current_password,
      new_password: values.new_password,
      new_password_confirmation: values.new_password_confirmation,
    };
    return new Request(
      K.Network.URL.UpdateUser + id + K.Network.URL.ChangeUserPassword,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      false
    );
  }

  static forgotPassword(email) {
    const body = {
      email,
    };
    return new Request(
      K.Network.URL.ForgotPassword,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      false
    );
  }

  static resetPassword(token, password, password_confirmation) {
    const body = {
      token,
      password,
      password_confirmation,
    };
    return new Request(
      K.Network.URL.ResetPassword,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      false
    );
  }

  static fetchUsers(userBody) {
    const body = {
      ...userBody,
    };
    return new Request(
      K.Network.URL.FetchUsers + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterUsers(search, page, pageSize) {
    const body = {
      page,
      pageSize,
      ...search,
    };

    return new Request(
      K.Network.URL.FilterUsers + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static changeUserStatus(active, id) {
    const body = {
      id,
      active,
    };
    return new Request(
      K.Network.URL.ChangeUserStatus,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static createUser(body) {
    return new Request(
      K.Network.URL.CreateUser,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static syncProducts(location_id) {
    const body = {
      location_id,
    };
    return new Request(
      K.Network.URL.SyncProducts + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchProducts(productBody) {
    const body = {
      ...productBody,
    };
    return new Request(
      K.Network.URL.Products + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchProductsforLoc(location_id) {
    const body = {
      location_id,
    };
    return new Request(
      K.Network.URL.ProductsForLocation + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchProductDetail(id) {
    return new Request(
      K.Network.URL.ProductDetail + id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static editProductDetail(detail, product_id) {
    return new Request(
      K.Network.URL.EditProduct + `${product_id}`,
      K.Network.Method.PUT,
      detail,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterProduct(search, page, pageSize) {
    const body = {
      page,
      pageSize,
      ...search,
    };

    return new Request(
      K.Network.URL.FilterProducts + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchCategories(categoryBody) {
    const body = {
      ...categoryBody,
    };
    return new Request(
      K.Network.URL.Categories + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchCategoriesforLoc(forProduct, location_id) {
    const body = {
      forProduct,
      location_id,
    };
    return new Request(
      K.Network.URL.CategoriesForLocation + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchAddonsforLoc(location_id) {
    const body = {
      location_id,
    };
    return new Request(
      K.Network.URL.AddonsForLocation + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static syncCategories(location_id) {
    const body = {
      location_id,
    };
    return new Request(
      K.Network.URL.SyncCategories + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchCategoryDetail(id) {
    return new Request(
      K.Network.URL.CategoryDetail + id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateCategory(detail, id) {
    return new Request(
      K.Network.URL.EditCategory + id,
      K.Network.Method.PUT,
      detail,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static createCategory(body) {
    return new Request(
      K.Network.URL.CreateCategory,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterCategories(search, page, pageSize) {
    const body = {
      page,
      pageSize,
      ...search,
    };

    return new Request(
      K.Network.URL.FilterCategories + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static createRestaurant(name, subdomain) {
    const body = {
      name,
      subdomain,
    };
    return new Request(
      K.Network.URL.Restaurant,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateRestaurant({ name, subdomain }, id) {
    const body = {
      name,
      subdomain,
    };
    return new Request(
      K.Network.URL.UpdateRestaurant + id,
      K.Network.Method.PUT,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchRestaurants(page, pageSize) {
    const body = { page, pageSize };
    return new Request(
      K.Network.URL.Restaurant + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchRestaurant(id) {
    // const body = {};
    return new Request(
      K.Network.URL.FetchRestaurant + id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterRestaurants(search) {
    const body = { ...search };
    return new Request(
      K.Network.URL.SearchRestaurants + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchAllRestaurants() {
    // const body = {};
    return new Request(
      K.Network.URL.GetAllRestaurants,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchSingleLocation(id) {
    // const body = {};
    return new Request(
      K.Network.URL.FetchLocation + id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchLocationFromOmnivore(pos_location_id, pos_name, pos_type) {
    console.log("inside fetch location");
    const body = {
      pos_location_id,
      pos_name,
      pos_type,
    };
    return new Request(
      K.Network.URL.FetchLocationFromOmnivore + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static getVendors() {
    // const body = {};
    return new Request(
      K.Network.URL.GetPosVendors,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static saveLocation(location) {
    const body = { location };
    return new Request(
      K.Network.URL.CreateLocation,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateLocation(location, id) {
    const body = { location };
    return new Request(
      K.Network.URL.UpdateLocation + id,
      K.Network.Method.PUT,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  // static filterLocations(search) {
  //   const body = { ...search };
  //   return new Request(
  //     K.Network.URL.SearchLocation + queryParams(body),
  //     K.Network.Method.GET,
  //     null,
  //     K.Network.Header.Type.Json,
  //     {},
  //     true
  //   );
  // }

  static fetchLocations(locationParams) {
    const body = { ...locationParams };
    return new Request(
      K.Network.URL.FetchLocations + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchRestaurantLocations(restaurant_id) {
    const body = { restaurant_id };
    return new Request(
      K.Network.URL.FetchRestaurantLocations + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static GetAllLocations() {
    return new Request(
      K.Network.URL.GetAllLocations,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchLocationsWithoutPage() {
    // const body = {};
    return new Request(
      K.Network.URL.FetchLocationsWithoutPage,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchServiceCharges(id) {
    const body = { location_id: id };
    return new Request(
      K.Network.URL.FetchServiceCharges + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchOrderTypes(id) {
    const body = { location_id: id };
    return new Request(
      K.Network.URL.FetchOrderTypes + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchRevenueCenters(id) {
    const body = { location_id: id };
    return new Request(
      K.Network.URL.FetchRevenueCenters + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchEmployees(id) {
    const body = { location_id: id };
    return new Request(
      K.Network.URL.FetchEmployees + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateEmployeeStatus(employee, id) {
    const body = { pos_employee: employee };
    return new Request(
      K.Network.URL.UpdateEmployee + id,
      K.Network.Method.PUT,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateRevenueCenterStatus(center, id) {
    const body = { pos_revenue_center: center };
    return new Request(
      K.Network.URL.UpdateRevenueCenters + id,
      K.Network.Method.PUT,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateServiceChargeStatus(charge, id) {
    const body = { pos_service_charge: charge };
    return new Request(
      K.Network.URL.UpdateServiceCharges + id,
      K.Network.Method.PUT,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateOrderTypeStatus(type, id) {
    const body = { pos_order_type: type };
    return new Request(
      K.Network.URL.UpdateOrderTypes + id,
      K.Network.Method.PUT,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterEmployees(search, id) {
    const body = { ...search };
    return new Request(
      K.Network.URL.SearchEmployees + queryParams(body) + "&location_id=" + id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterRevenueCenters(search, id) {
    const body = { ...search };
    return new Request(
      K.Network.URL.SearchRevenueCenters +
        queryParams(body) +
        "&location_id=" +
        id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterServiceCharges(search, id) {
    const body = { ...search };
    return new Request(
      K.Network.URL.SearchServiceCharges +
        queryParams(body) +
        "&location_id=" +
        id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterOrderTypes(search, id) {
    const body = { ...search };
    return new Request(
      K.Network.URL.SearchOrderTypes + queryParams(body) + "&location_id=" + id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static syncTables(location_id) {
    const body = { location_id };
    return new Request(
      K.Network.URL.SyncTables + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchTables(tableParams) {
    const body = { ...tableParams };
    return new Request(
      K.Network.URL.FetchTables + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchTable(id) {
    // const body = {};
    return new Request(
      K.Network.URL.FetchTable + id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateTable(table) {
    const body = { table };
    return new Request(
      K.Network.URL.UpdateTable + table?.id,
      K.Network.Method.PUT,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateTableStatus(table) {
    const body = { table };
    return new Request(
      K.Network.URL.UpdateTable + table?.id + "/status_handler",
      K.Network.Method.PUT,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterTables(search) {
    const body = { ...search };
    return new Request(
      K.Network.URL.SearchTables + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static createMenu(body) {
    return new Request(
      K.Network.URL.CreateMenu,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static createMenuItem(menu_id, product_ids) {
    let body = {
      menu_id,
      product_ids,
    };
    return new Request(
      K.Network.URL.CreateMenuItems,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchMenus(menuBody) {
    const body = {
      ...menuBody,
    };
    return new Request(
      K.Network.URL.FetchMenus + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchMenuDetail(id) {
    return new Request(
      K.Network.URL.MenuDetail + id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchMenuItems(menu_id, page, pageSize) {
    const body = {
      menu_id,
      page,
      pageSize,
    };
    return new Request(
      K.Network.URL.FetchMenuItems + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterMenuItems(menu_id, search, page, pageSize) {
    const body = {
      menu_id,
      page,
      pageSize,
      ...search,
    };

    return new Request(
      K.Network.URL.FilterMenuItems + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static deleteMenuItem(menu_id, product_id) {
    const body = {
      menu_id,
      product_id,
    };

    return new Request(
      K.Network.URL.DeleteMenuItem + queryParams(body),
      K.Network.Method.DELETE,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateMenu(detail, id) {
    return new Request(
      K.Network.URL.EditMenu + id,
      K.Network.Method.PUT,
      detail,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchOrders(orderBody) {
    const body = {
      ...orderBody,
    };
    return new Request(
      K.Network.URL.Orders + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchOrderDetail(id) {
    return new Request(
      K.Network.URL.OrderDetail + id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchPaymentDetail(order_id) {
    let body = {
      order_id,
    };
    return new Request(
      K.Network.URL.PaymentDetail + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchOrdersAnalytics(type, location_id) {
    let body = {
      type,
      location_id,
    };
    return new Request(
      K.Network.URL.OrdersAnalytics + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static completeOrder(order_id) {
    const body = {
      order_id,
    };
    return new Request(
      K.Network.URL.CompleteOrder,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static cancelOrder(order_id) {
    const body = {
      order_id,
    };
    return new Request(
      K.Network.URL.CancelOrder,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterOrders(search, page, pageSize) {
    const body = {
      page,
      pageSize,
      ...search,
    };
    return new Request(
      K.Network.URL.FilterOrders + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static createHelp(body) {
    return new Request(
      K.Network.URL.CreateHelp,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchHelps(page, pageSize) {
    const body = {
      page,
      pageSize,
    };
    return new Request(
      K.Network.URL.Helps + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchHelpDetail(id) {
    return new Request(
      K.Network.URL.HelpDetail + id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterHelps(search, page, pageSize) {
    const body = {
      page,
      pageSize,
      ...search,
    };
    return new Request(
      K.Network.URL.FilterHelps + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static syncModifiers(location_id) {
    const body = {
      location_id,
    };
    return new Request(
      K.Network.URL.SyncModifiers + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchModifiers(modifierBody) {
    const body = {
      ...modifierBody,
    };
    return new Request(
      K.Network.URL.Modifiers + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchAddOns(addOnBody) {
    const body = {
      ...addOnBody,
    };
    return new Request(
      K.Network.URL.Addons + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }
  static fetchModifier(id) {
    return new Request(
      K.Network.URL.ModifierDetail + id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }
  static fetchAddOn(id) {
    return new Request(
      K.Network.URL.AddonDetail + id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchAddOnItems(addon_id) {
    const body = {
      addon_id,
    };
    return new Request(
      K.Network.URL.AddonItems + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static deleteAddOn(id) {
    // const body = {};
    return new Request(
      K.Network.URL.DeleteAddOn + id,
      K.Network.Method.DELETE,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static deleteProductAddOn(product_id, add_on_id) {
    const body = { product_id, add_on_id };
    return new Request(
      K.Network.URL.DeleteProductAddOn + queryParams(body),
      K.Network.Method.DELETE,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchModifierItem(id) {
    return new Request(
      K.Network.URL.ModifierItemDetail + id,
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateModifier({ id, ...detail }) {
    return new Request(
      K.Network.URL.UpdateModifier + id,
      K.Network.Method.PUT,
      detail,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateAddon({ id, ...detail }) {
    return new Request(
      K.Network.URL.UpdateAddon + id,
      K.Network.Method.PUT,
      detail,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static createAddOn(body) {
    return new Request(
      K.Network.URL.CreateAddons,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateModifierItem({ id, ...detail }) {
    return new Request(
      K.Network.URL.UpdateModifierItem + id,
      K.Network.Method.PUT,
      detail,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterModifiers(search, page, pageSize) {
    const body = {
      page,
      pageSize,
      ...search,
    };

    return new Request(
      K.Network.URL.FilterModifiers + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchActiveModifiers(location_id) {
    const body = {
      location_id,
    };
    return new Request(
      K.Network.URL.ActiveModifiers + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static GetAllCustomers(customerBody) {
    const body = {
      ...customerBody,
    };
    return new Request(
      K.Network.URL.GetAllCustomers + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static filterCustomers(search, page, pageSize) {
    const body = {
      page,
      pageSize,
      ...search,
    };
    return new Request(
      K.Network.URL.FilterCustomers + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static addOnRequest(add_on) {
    const body = {
      add_on: add_on,
    };
    return new Request(
      K.Network.URL.AddOn + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchDiscounts(discountParams) {
    const body = { ...discountParams };
    return new Request(
      K.Network.URL.FetchLoyalties + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static syncDiscounts(location_id) {
    const body = { location_id };
    return new Request(
      K.Network.URL.SyncLoyalties + queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static updateDiscount(discount) {
    const body = { ...discount };
    return new Request(
      K.Network.URL.FetchLoyalty + discount?.id + "/status_handler",
      K.Network.Method.PUT,
      body,
      K.Network.Header.Type.Json,
      {},
      true
    );
  }

  static fetchEnganementGuests(enganementGuestsParams) {
    const body = { ...enganementGuestsParams };
    // console.log("custom api url -----------", K.Network.URL.CustomAPI);
    return new Request(
      "https://6q7trsg26h.execute-api.us-east-2.amazonaws.com/Prod" +
        queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      { authorizationToken: "Ec9BB&d%?YfV&9nGd5&EC8j7dcuN@y" },
      true,
      true
    );
  }

  static fetchEnganementGuestbyId(enganementGuestsParams) {
    const body = { ...enganementGuestsParams };
    return new Request(
      "https://6q7trsg26h.execute-api.us-east-2.amazonaws.com/Prod" +
        queryParams(body),
      K.Network.Method.GET,
      null,
      K.Network.Header.Type.Json,
      { authorizationToken: "Ec9BB&d%?YfV&9nGd5&EC8j7dcuN@y" },
      true,
      true
    );
  }

  // static fetchSingleLocationById() {
  //   const body = { ...enganementGuestsParams };
  //   return new Request(
  //     "https://6q7trsg26h.execute-api.us-east-2.amazonaws.com/Prod" + queryParams(body),
  //     K.Network.Method.GET,
  //     null,
  //     K.Network.Header.Type.Json,
  //     {},
  //     true,
  //     true
  //   );
  // }
}
