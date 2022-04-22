// import Dashboard from "../features/dashboard/dashboard";
import Login from "../features/login/login";
import ForgotPassword from "../features/forgotPassword/forgotPassword";
import SetPassword from "../features/setPassword/setPassword";
import NotFound from "../features/notFound/notFound";
import Unauthorized from "../features/unauthorized/unauthorized";
import Users from "../features/User/user";
import User from "../features/User/user";
import LocationComponent from "../features/location/locationFetch";
import LocationList from "../features/location/locationList";
import AddLocation from "../features/location/addLocation";
import EditLocation from "../features/location/editLocation";
import GuestPageLayout from "../layout/guestPageLayout";
import LoggedInPageLayout from "../layout/loggedInPageLayout";
import K from "../utilities/constants";
import ProductForm from "../features/products/productForm";
import CategoryForm from "../features/categories/categoryForm";
import AddBrand from "../features/Brand/AddBrand";
import EditBrand from "../features/Brand/EditBrand";
import Brand from "../features/Brand/Brand";
import Product from "../features/products/product";
import Categories from "../features/categories/categories";
import MenuItems from "../features/menus/menuItems";
import MenuForm from "../features/menus/menuForm";
import Order from "../features/Order/order";
import NeedHelpForm from "../features/NeedHelp/needHelpForm";
import Helps from "../features/NeedHelp/helps";
import Customers from "../features/customer/customers";
import Modifiers from "../features/modifiers/modifiers";
import Addons from "../features/add_ons/addons";
import Tables from "../features/Tables/Tables";
import EditTable from "../features/Tables/EditTable";
import Home from "../features/Home/Home";
import Profile from "../features/Profile/profile";
import LocationDetail from "../features/locationDetails/LocationDetail";
import { default as UserModel } from "../models/user/user";
import CreateUser from "../features/User/CreateUser";
import DiscountsListing from "../features/discounts/discountsListing";
import ManagementAnalytics from "../features/managements/analytics";
import EnganementGuests from "../features/enganements/guests"
import EnganementGuestsProfile from "../features/enganements/guests/Profile"
// Template for a route
// {
//   path: '/login',
//   name: "Login",
//   component: Login,
//   authenticated: false,
//   roles: [],
//   children: [],
//   exact: true,
//   layout: LoggedInPageLayout
// },

const defaultCrudChildren = [
  { path: "/details/:id", name: "Details" },
  { path: "/store/:id", name: "Edit" },
];

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: GuestPageLayout,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    layout: GuestPageLayout,
  },
  {
    path: "/set-password",
    name: "SetPassword",
    component: SetPassword,
    layout: GuestPageLayout,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    authenticated: true,
    roles: [],
    children: defaultCrudChildren,
    layout: LoggedInPageLayout,
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    component: Unauthorized,
    authenticated: true,
    roles: [],
    layout: GuestPageLayout,
  },
  // {
  //   path: "/",
  //   name: "Dashboard",
  //   exact: true,
  //   component: Dashboard,
  //   authenticated: true,
  //   layout: LoggedInPageLayout,
  // },
  {
    path: "/fetch-location",
    name: "fetchLocation",
    exact: true,
    roles: [K.Roles.SuperAdmin, K.Roles.Admin],
    component: LocationComponent,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/locations",
    name: "Location",
    exact: true,
    roles: [K.Roles.SuperAdmin, K.Roles.Admin],
    component: LocationList,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/locations/:id",
    name: "EditLocation",
    exact: true,
    roles: [K.Roles.SuperAdmin, K.Roles.Admin],
    component: EditLocation,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/add-location",
    name: "AddLocation",
    exact: true,
    component: AddLocation,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/",
    name: "Home",
    exact: true,
    component: UserModel.getRole() === K.Roles.SuperAdmin ? Brand : Home,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/products/:id",
    name: "ProductForm",
    exact: true,
    component: ProductForm,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/categories/:id",
    name: "CategoryForm",
    exact: true,
    component: CategoryForm,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/category-create",
    name: "CategoryForm",
    exact: true,
    component: CategoryForm,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/add-brand",
    name: "Add Brand",
    exact: true,
    component: AddBrand,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/brands",
    name: "Brands",
    exact: true,
    roles: [K.Roles.SuperAdmin],
    component: Brand,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/profile",
    name: "Profile",
    exact: true,
    component: Profile,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/brands/:id",
    name: "Edit Brand",
    exact: true,
    roles: [K.Roles.SuperAdmin],
    component: EditBrand,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/tables",
    name: "Tables",
    exact: true,
    component: Tables,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/tables/:id",
    name: "Edit Table",
    exact: true,
    component: EditTable,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/order",
    name: "Order",
    exact: true,
    component: Order,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/products",
    name: "product",
    exact: true,
    component: Product,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/create-user",
    name: "CreateUser",
    exact: true,
    component: CreateUser,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/modifiers",
    name: "Modifiers",
    exact: true,
    component: Modifiers,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/addons",
    name: "Addons",
    exact: true,
    component: Addons,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/categories",
    name: "categories",
    exact: true,
    component: Categories,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/menuitems",
    name: "menuItems",
    exact: true,
    component: MenuItems,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/menuitems/:id",
    name: "menuForm",
    exact: true,
    component: MenuForm,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/menu-create",
    name: "menuForm",
    exact: true,
    component: MenuForm,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/user",
    name: "User",
    exact: true,
    component: User,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/helps",
    name: "Helps",
    exact: true,
    component: Helps,
    authenticated: true,
    roles: [K.Roles.SuperAdmin],
    layout: LoggedInPageLayout,
  },
  {
    path: "/customers",
    name: "Customers",
    exact: true,
    component: Customers,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/help-create",
    name: "NeedHelpForm",
    exact: true,
    component: NeedHelpForm,
    authenticated: true,
    roles: [K.Roles.Admin, K.Roles.Staff],
    layout: LoggedInPageLayout,
  },
  {
    path: "/location-detail",
    name: "LocationDetail",
    exact: true,
    component: LocationDetail,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/loyalties",
    name: "Loyalties",
    exact: true,
    component: DiscountsListing,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/management/analytics",
    name: "Loyalties",
    exact: true,
    component: ManagementAnalytics,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/enganement/guests",
    name: "Loyalties",
    exact: true,
    component: EnganementGuests,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  {
    path: "/enganement/guests/:id",
    name: "Loyalties",
    exact: true,
    component: EnganementGuestsProfile,
    authenticated: true,
    layout: LoggedInPageLayout,
  },
  // {
  //   path: "/menus",
  //   name: "menus",
  //   exact: true,
  //   component: Menus,
  //   authenticated: false,
  //   layout: LoggedInPageLayout,
  // },
  {
    path: "*",
    name: "Not Found",
    component: NotFound,
    layout: GuestPageLayout,
  },
];

export default routes;
