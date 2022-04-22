import K from "../utilities/constants";

// Template a navigation item
// {
//     name: 'User',
//     path: '/user/list',
//     icon: <ProjectOutlined />,
//     roles: [],
//     children: [], // If item has children, then the path field will be ignored.
// }

const defaultChildren = (basePath) => [
  { path: basePath, name: "List" },
  { path: `${basePath}/store/create`, name: "Create", roles: [K.Roles.Admin] },
];

const navigations = [
  {
    name: "Home",
    path: "/",
    // icon: <ProjectOutlined />,
    roles: [K.Roles.Admin, K.Roles.Staff],
    // children: defaultChildren('/projects'),
  },
  {
    name: "Analytics",
    path: "/management/analytics",
  },
  {
    name: "Guests",
    // path: '/Customers',
    path: "/enganement/guests",
    // icon: <DashboardOutlined />,
  },
  {
    name: "Brand",
    path: "/brands",
    // icon: <ProjectOutlined />,
    roles: [K.Roles.SuperAdmin],
    // children: defaultChildren('/projects'),
  },
  {
    name: "Menu",
    path: "/menuitems",
    // icon: <UserOutlined />,
    children: defaultChildren("/users"),
  },
  {
    name: "Menu Items",
    path: "/products",
    // icon: <UserOutlined />,
    // children: defaultChildren("/users"),
  },
  {
    name: "Categories",
    path: "/categories",
    // icon: <UserOutlined />,
    // children: defaultChildren("/users"),
  },
  {
    name: "Modifiers",
    path: "/modifiers",
    // icon: <UserOutlined />,
    // children: defaultChildren("/users"),
  },
  {
    name: "Add Ons",
    path: "/addons",
    // icon: <UserOutlined />,
    // children: defaultChildren("/users"),
  },
  {
    name: "Tables",
    path: "/tables",
    roles: [K.Roles.SuperAdmin, K.Roles.Admin, K.Roles.Staff],
  },
  {
    name: "Locations",
    path: "/locations",
    roles: [K.Roles.SuperAdmin, K.Roles.Admin],
    // icon: <DashboardOutlined />,
  },
  {
    name: "Orders",
    path: "/order",
    // icon: <DashboardOutlined />,
  },
  {
    name: "Loyalty",
    path: "/loyalties",
    roles: [],
  },
  {
    name: "Users",
    path: "/Users",
    // icon: <DashboardOutlined />,
  },
  {
    name: "Help",
    path: "/help-create",
    roles: [K.Roles.Admin, K.Roles.Staff],
    // icon: <DashboardOutlined />,
  },
  {
    name: "Help",
    path: "/helps",
    roles: [K.Roles.SuperAdmin],
    // icon: <DashboardOutlined />,
  },
  // {
  //   name: "Log out",
  //   path: "/logout",
  //   // icon: <DashboardOutlined />,
  // },
];

export default navigations;
