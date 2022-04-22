const K = {
  Network: {
    URL: {
      // Production
      // Base: 'http://ninjirosoft.com:8080/',
      // BaseAPI: 'http://ninjirosoft.com:8080/api',
      // TenantURL: (domainPrefix = '') => {
      //     return 'http://' + domainPrefix + '.' + 'ninjirosoft.com:8080/api'
      // },
      // Client: {
      //     BaseHost: 'ninjirosoft.com',
      //     BasePort: '80',
      // },

      // Development
      Base: process.env.REACT_APP_BASE_URL,
      BaseAPI: process.env.REACT_APP_BASE_API_URL,
      CustomAPI: process.env.REACT_APP_CUSTOM_API_URL,
      // DomainName: process.env.REACT_APP_CLIENT_DOMAIN_NAME,
      Timeout: process.env.REACT_APP_TIMEOUT,
      TenantURL: (domainPrefix = '') => {
        return (
          `${process.env.REACT_APP_BASE_PROTOCOL}://` +
          domainPrefix +
          process.env.REACT_APP_TENANT_PARTIAL_URL
        )
      },
      Client: {
        // BaseHost: process.env.REACT_APP_CLIENT_BASE_HOST,
        // BasePort: process.env.REACT_APP_CLIENT_BASE_PORT,
      },

      // Protocol: process.env.REACT_APP_BASE_PROTOCOL,

      // Tenant
      GetTenant: '/tenant/get',

      // Assignment
      LoginUser: '/login',

      // Create Staff User
      CreateStaffUser: '/users/create_staff_member',

      // Fetch Users
      FetchUsers: '/users',

      // Fetch Users
      FilterUsers: '/users/search',

      // Edit profile
      UpdateUser: '/users/',

      // Change user password
      ChangeUserPassword: '/change_password',

      // Forget password
      ForgotPassword: '/forgot_password',

      //Reset password
      ResetPassword: '/reset_password',

      //Create and List Restaurants
      Restaurant: '/restaurants',

      //Create and List Restaurants
      UpdateRestaurant: '/restaurants/',

      //Create and List Restaurants
      FetchRestaurant: '/restaurants/',

      //search restaurants
      SearchRestaurants: '/restaurants/search',

      //Fetch all Restaurants without Page
      GetAllRestaurants: '/restaurants/get_restaurant_list',

      // Sync Products
      SyncProducts: '/products/fetch_products',

      // Get Products
      Products: '/products',

      // Get Products for Location
      ProductsForLocation: '/products/get_products',

      // Get Product detail
      ProductDetail: '/products/',

      // Edit Product
      EditProduct: '/products/',

      // Filter Products
      FilterProducts: '/products/search',

      //fetch pos vendors
      GetPosVendors: '/pos_vendors',

      // Get Categories
      Categories: '/categories',

      // Get Categories for Location
      CategoriesForLocation: '/categories/get_catgories',

      // Sync Categories
      SyncCategories: '/categories/fetch_categories',

      // Get Category detail
      CategoryDetail: '/categories/',

      // Update Category
      EditCategory: '/categories/',

      //Create Category
      CreateCategory: '/categories',

      // Filter Categories
      FilterCategories: '/categories/search',

      // fetch location from omnivore
      FetchLocationFromOmnivore: '/locations/fetch_location_detail',

      //save location after editing
      CreateLocation: '/locations',

      //save location after editing
      UpdateLocation: '/locations/',

      //fetch locations
      FetchLocations: '/locations',

      //fetch Restaurant locations
      FetchRestaurantLocations: '/locations/get_restaurant_locations',

      //Get All locations
      GetAllLocations: '/locations/fetch_locations',

      //fetch locations
      FetchLocation: '/locations/',

      //search locations
      FetchLocationsWithoutPage: '/locations/get_locations_list',

      //search locations
      SearchLocation: '/locations/search',

      //fetch service charges against location
      FetchServiceCharges: '/pos_service_charges',

      //fetch service charges against location
      FetchOrderTypes: '/pos_order_types',

      //fetch service charges against location
      FetchRevenueCenters: '/pos_revenue_centers',

      //fetch service charges against location
      FetchEmployees: '/pos_employees',

      //fetch service charges against location
      UpdateEmployee: '/pos_employees/',

      //fetch service charges against location
      UpdateRevenueCenters: '/pos_revenue_centers/',

      //fetch service charges against location
      UpdateOrderTypes: '/pos_order_types/',

      //fetch service charges against location
      UpdateServiceCharges: '/pos_service_charges/',

      //search locations
      SearchEmployees: '/pos_employees/search',

      //search locations
      SearchRevenueCenters: '/pos_revenue_centers/search',

      //search locations
      SearchOrderTypes: '/pos_order_types/search',

      //search locations
      SearchServiceCharges: '/pos_service_charges/search',

      //fetch tables
      FetchTables: '/tables',

      //sync tables
      SyncTables: '/tables/fetch_tables',

      //fetch single table
      FetchTable: '/tables/',

      //Update Table
      UpdateTable: '/tables/',

      //Create Meuu
      CreateMenu: '/menus',

      //Create Menu Items
      CreateMenuItems: '/menus/create_menu_items',

      //Fetch Menus
      FetchMenus: '/menus',

      //Get Menu detail
      MenuDetail: '/menus/',

      //Fetch MenuItems
      FetchMenuItems: '/menus/fetch_menuItems/',

      // Filter MenuItems
      FilterMenuItems: '/menus/search',

      // Filter MenuItems
      DeleteMenuItem: '/menus/delete_menu_item',

      // Update Menu
      EditMenu: '/menus/',

      //search locations
      SearchTables: '/tables/search',

      //Create User
      CreateUser: '/signup',

      //Change User Status
      ChangeUserStatus: '/users/user_status',
      // Get Orders
      Orders: '/orders',

      // Get Order detail
      OrderDetail: '/orders/',

      //Complete Order
      CompleteOrder: '/orders/complete_order',

      //Get Payment detail
      PaymentDetail: '/orders/fetch_payment_detail/',

      //Get Orders Analytics
      OrdersAnalytics: '/orders/orders_analytics/',

      // Filter Orders
      FilterOrders: '/orders/search',

      //Cancel Order
      CancelOrder: '/orders/cancel_order',

      //Create Help
      CreateHelp: '/helps',

      // Get Helps
      Helps: '/helps',

      // Get Help detail
      HelpDetail: '/helps/',

      // Filter Helps
      FilterHelps: '/helps/search',

      // Sync Modifiers
      SyncModifiers: '/modifier_groups/fetch_modifiers',

      // Get Addons
      Addons: '/add_ons',

      //Create Addon
      CreateAddons: '/add_ons',

      // Get Categories for Location
      AddonsForLocation: '/add_ons/get_add_ons',

      // Get Addon Detail
      AddonDetail: '/add_ons/',

      // Get Addon Items
      AddonItems: '/add_ons/get_addons_items',

      //Delete an Add on and it's relation with Products
      DeleteAddOn: '/add_ons/',

      //Delete the relation of add on and product
      DeleteProductAddOn: '/add_ons/delete_product_add_on',

      // Update Addon
      UpdateAddon: '/add_ons/',

      // Get Modifiers
      Modifiers: '/modifier_groups',

      // Get Modifier Detail
      ModifierDetail: '/modifier_groups/',

      // Get Modifier Item Detail
      ModifierItemDetail: '/modifier_group_items/',

      // Update Modifier
      UpdateModifier: '/modifier_groups/',

      // Update Modifier Item
      UpdateModifierItem: '/modifier_group_items/',

      // Filter Modifiers
      FilterModifiers: '/modifier_groups/search',

      // Get Active Modifiers
      ActiveModifiers: '/modifier_groups/get_active_modifiers',

      //Get All Customers
      GetAllCustomers: '/customers',

      // Filter Customers
      FilterCustomers: '/customers/search',

      // Add On
      AddOn: '/users/add_on_request',

      //Listing Loyalties
      FetchLoyalties: '/discounts',

      //Search Loyalties
      FilterLoyalties: '/discounts/search',

      //Sync Loyalties
      SyncLoyalties: '/discounts/sync_discounts',

      // Fetch single loyalty
      FetchLoyalty: '/discounts/',
    },
    Method: {
      GET: 'GET',
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE',
    },
    Header: {
      ContentType: 'Content-Type',
      ApplicationJson: 'application/json',
      Default: (token = '') => ({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      }),
      Authorization: (token = '') => ({
        Authorization: 'Bearer ' + token,
      }),
      Type: {
        Json: 'json',
        File: 'file',
      },
    },
    Default: {
      AssignmentStatusID: 1,
      ResourceAllocationPercentage: 100,
      ResourceAllocationType: 'percentage',
      WorkItem: '',
      Error: 'Opps, an error occurred!',
    },
    StatusCode: {
      Unauthorized: 401,
      Invalid: 401,
      NotFound: 404,
    },
  },
  Actions: {
    // General part of action
    CREATE: 'CREATE',
    UPSERT: 'UPSERT',
    DELETE: 'DELETE',
    DELETE_ALL: 'DELETE_ALL',
    SET: 'SET',

    // Settings
    UPSERT_SETTING: 'UPSERT_SETTING',
  },

  Cookie: {
    Key: {
      User: 'user',
      AuthToken: 'auth_token',
      EncryptionKey: 'blc_logged_in_user',
      Tenant: 'tenant_name',
    },
  },

  Roles: {
    Staff: 'Staff',
    SuperAdmin: 'Super Admin',
    Admin: 'Admin',
    User: 'User',
  },
  Tables: {
    tablesTitleHead: {
      tableName: 'Name',
      tablePOSNumber: 'POS Number',
      tablePOSName: 'POS Name',
      tableAvailability: 'Availability',
      tablePOSAvailability: 'POS Availability',
      tableOccupied: 'Occupied',
      tablePOSSeats: 'No. of Seats',
    },
    tablesTitleIndex: {
      tableName: 'name',
      tablePOSNumber: 'pos_table_number',
      tablePOSName: 'pos_table_name',
      tableAvailability: 'available',
      tablePOSAvailability: 'pos_table_availability',
      tableOccupied: 'occupied',
      tablePOSSeats: 'pos_table_seats',
    },
    brandTitleHead: {
      Name: 'Name',
    },
    brandTitleIndex: {
      Name: 'name',
    },
    locationTitleHead: {
      locationName: 'Name',
      locationActive: 'Availability Status',
      locationPOSName: 'POS Name',
      locationPOSId: 'POS ID',
    },
    locationTitleIndex: {
      locationName: 'name',
      locationActive: 'active',
      locationPOSName: 'pos_location_name',
      locationPOSId: 'pos_location_id',
    },
    productTitleHead: {
      prodName: 'Product',
      price: 'Price',
      category: 'Category',
      available: 'Availability',
    },
    productTitleIndex: {
      prodId: 'id',
      prodName: 'name',
      price: 'pos_price_per_unit',
      category: 'category',
      availablity: 'availablity',
    },
    userTitleHead: {
      firstName: 'First Name',
      lastName: 'Last Name',
      role: 'Role',
      phoneNumber: 'Phone',
      email: 'Email',
      verified: 'Verified',
      active: 'Active',
    },
    userTitleIndex: {
      firstName: 'first_name',
      lastName: 'last_name',
      role: 'user_role',
      phoneNumber: 'phone_number',
      email: 'email',
      verified: 'verified',
      active: 'active',
    },
    categoryTitleHead: {
      catName: 'Category',
      preference: 'Rank',
      available: 'Availability',
    },
    categoryTitleIndex: {
      catName: 'name',
      preference: 'preference',
      availablity: 'availablity',
    },
    orderTitleHead: {
      orderID: 'Order ID',
      orderPosID: 'POS Order ID',
      orderStatus: 'Status',
      orderTotal: 'Total',
    },
    orderTitleIndex: {
      orderID: 'id',
      orderPosID: 'pos_ticket_id',
      orderStatus: 'status',
      orderTotal: 'total',
    },
    helpTitleHead: {
      name: 'Name',
      phoneNo: 'Phone',
      email: 'Email',
    },
    helpTitleIndex: {
      help_id: 'id',
      name: 'name',
      phoneNo: 'phone_number',
      email: 'email',
    },
    modifierTitleHead: {
      modifierID: 'Modifier ID',
      modifierName: 'Name',
      available: 'Availability',
    },
    modifierTitleIndex: {
      modifierID: 'id',
      modifierName: 'name',
      availablity: 'availablity',
    },
    addOnTitleHead: {
      addonID: 'Add On ID',
      addonName: 'Name',
      available: 'Availability',
    },
    addOnTitleIndex: {
      addonID: 'id',
      addonName: 'name',
      availablity: 'availablity',
    },
    modifierItemsTitleHead: {
      modifierItemsID: 'Item ID',
      modifierItemsName: 'Name',
      modifierPrice: 'Price Levels',
      modifierSize: 'Size',
      available: 'Availability',
    },
    modifierItemsTitleIndex: {
      modifierItemsID: 'id',
      modifierItemsName: 'name',
      modifierPrice: 'pos_modifier_group_item_price_levels',
      modifierSize: 'pos_price_level_name',
      availablity: 'availablity',
    },
    revenueCentersTitleHead: {
      revenueCenterPOSId: 'POS ID',
      revenueCenterPOSName: 'POS Name',
      revenueCenterAvailability: 'Availability',
    },
    revenueCentersTitleIndex: {
      revenueCenterPOSId: 'pos_revenue_id',
      revenueCenterPOSName: 'pos_revenue_name',
      revenueCenterAvailability: 'is_active',
    },
    employeesTitleHead: {
      employeePOSId: 'POS ID',
      employeePOSFirstName: 'POS First Name',
      employeePOSLastName: 'POS Last Name',
      employeeAvailability: 'Availability',
    },
    employeesTitleIndex: {
      employeePOSId: 'pos_emp_id',
      employeePOSFirstName: 'pos_emp_firstname',
      employeePOSLastName: 'pos_emp_lastname',
      employeeAvailability: 'is_active',
    },
    orderTypeTitleHead: {
      orderTypeId: 'ID',
      orderTypePOSId: 'POS ID',
      orderTypePOSName: 'POS Name',
      orderTypeName: 'Name',
      orderTypeAvailability: 'Availability',
      orderTypePickUp: 'Pick Up',
      orderTypeDineIn: 'Dine In',
      orderTypeDelivery: 'Delivery',
    },
    orderTypeTitleIndex: {
      orderTypeId: 'id',
      orderTypePOSId: 'pos_order_type_id',
      orderTypePOSName: 'pos_order_type_name',
      orderTypeName: 'name',
      orderTypeAvailability: 'is_active',
      orderTypePickUp: 'is_pick_up',
      orderTypeDineIn: 'is_dine_in',
      orderTypeDelivery: 'is_delivery',
    },
    serviceChargeTitleHead: {
      serviceChargePOSId: 'POS ID',
      serviceChargePOSName: 'POS Name',
      serviceChargeAvailability: 'Availability',
      serviceChargePickUp: 'Pick Up',
      serviceChargeDineIn: 'Dine In',
      serviceChargeDelivery: 'Delivery',
    },
    serviceChargeTitleIndex: {
      serviceChargePOSId: 'pos_service_charge_id',
      serviceChargePOSName: 'pos_service_charge_name',
      serviceChargeAvailability: 'is_active',
      serviceChargePickUp: 'is_pick_up',
      serviceChargeDineIn: 'is_dine_in',
      serviceChargeDelivery: 'is_delivery',
    },
    customerTitleHead: {
      firstName: 'First Name',
      lastName: 'Last Name',
      phoneNo: 'Phone Number',
      email: 'Email',
    },
    customerTitleIndex: {
      firstName: 'first_name',
      lastName: 'last_name',
      phoneNo: 'phone_number',
      email: 'email',
    },
    loyaltyTitleHead: {
      posID: 'POS ID',
      posName: 'POS Name',
      posType: 'POS Type',
      availability: 'Availability',
    },
    loyaltyTitleIndex: {
      posID: 'pos_id',
      posName: 'pos_name',
      posType: 'pos_type',
      availability: 'is_active',
    },
  },
}

export default K
