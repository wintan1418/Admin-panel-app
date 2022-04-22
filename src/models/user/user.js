import { attr } from "redux-orm";
import BaseModel from "../baseModel/baseModel";
import NetworkCall from "../../network/networkCall";
import Request from "../../network/request";
import baseReducer from "../baseModel/baseReducer";
import { upsertModel } from "../baseModel/baseActions";
import K from "../../utilities/constants";
import Cookies from "js-cookie";
import { redirectToLogin } from "../../utilities/generalUtility";
import CryptoJS from "crypto-js";

export default class User extends BaseModel {
  // API call using thunk.
  static loginCall(email, password, remember) {
    return async (dispatch) => {
      const user = await NetworkCall.fetch(Request.loginUser(email, password));
      let encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(user?.user),
        K.Cookie.Key.EncryptionKey
      );
      // Cookies.set(K.Cookie.Key.User, encryptedUser, {
      //   path: "/",
      //   domain: "." + K.Network.URL.Client.BaseHost,
      //   expires: remember ? 365 : "",
      // });
      Cookies.set(K.Cookie.Key.User, encryptedUser);
      console.log("--------user--------", Cookies.get(K.Cookie.Key.User));

      // Cookies.set(K.Cookie.Key.AuthToken, user?.auth_token, {
      //   path: "/",
      //   domain: "." + K.Network.URL.Client.BaseHost,
      //   expires: remember ? 365 : "",
      // });
      Cookies.set(K.Cookie.Key.AuthToken, user?.auth_token);
      console.log("--------auth--------", Cookies.get(K.Cookie.Key.AuthToken));

      dispatch(upsertModel(User, user));
      return user;
    };
  }

  static logoutCall(error = "") {
    Cookies.remove(K.Cookie.Key.User, {
      path: "/",
      // domain: "." + K.Network.URL.Client.BaseHost,
    });

    Cookies.remove(K.Cookie.Key.AuthToken, {
      path: "/",
      // domain: "." + K.Network.URL.Client.BaseHost,
    });

    redirectToLogin(error);
  }

  //Forgot password
  static async forgotPassword(email) {
    const user = await NetworkCall.fetch(Request.forgotPassword(email));
    console.log("User: ", user);
    return user;
  }

  //Reset password
  static resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {
      const user = await NetworkCall.fetch(
        Request.resetPassword(token, password, confirmPassword)
      );

      // Cookies.set(K.Cookie.Key.Token, user.apiToken, {
      //   path: "/",
      //   domain: "." + K.Network.URL.Client.BaseHost,
      //   expires: remember ? 365 : "",
      // });
      // Cookies.set(K.Cookie.Key.Tenant, user.tenant.domainPrefix, {
      //   path: "/",
      //   domain: "." + K.Network.URL.Client.BaseHost,
      //   expires: remember ? 365 : "",
      // });

      // dispatch(upsertModel(User, user));
      return user;
    };
  }

  // Selectors

  // Helpers
  static getUserObjectFromCookies() {
    let cookieUser = Cookies.get(K.Cookie.Key.User);
    let bytes = cookieUser
      ? CryptoJS.AES.decrypt(cookieUser, "blc_logged_in_user")
      : "{}";
    try {
      let utfBytes = bytes.toString(CryptoJS.enc.Utf8);
      // console.log("asdasdasdasd", JSON.parse(utfBytes))
      return JSON.parse(utfBytes);
    } catch (error) {
      console.log("error", error);
      return this.logoutCall("User unauthorized");
    }
  }

  static getAuthTokenFromCookies() {
    try {
      return Cookies.get(K.Cookie.Key.AuthToken);
    } catch (error) {
      console.log("error", error);
      return this.logoutCall("User unauthorized");
    }
  }

  static isTokenAvailable() {
    return this.getAuthTokenFromCookies()
      ? this.getAuthTokenFromCookies()
      : undefined;
  }

  static getTenant() {
    return this.getUserObjectFromCookies()?.tenant_name ?? null;
  }

  static getToken() {
    return this.getAuthTokenFromCookies() ?? "";
  }

  static getName() {
    return this.getUserObjectFromCookies().name ?? "";
  }

  static getEmail() {
    return this.getUserObjectFromCookies().email ?? "";
  }

  static getProfileImage() {
    return this.getUserObjectFromCookies().user_image_url ?? "";
  }
  static roles() {
    return [K.Roles.User];
  }
  static getRole() {
    return this.getUserObjectFromCookies()?.user_role ?? "";
  }
  static getUserId() {
    return this.getUserObjectFromCookies()?.id ?? "";
  }

  static getRoles() {
    return this.getUserObjectFromCookies().roles ?? "";
  }

  // Reducer
  static reducer(action, User, session) {
    baseReducer(action, User, session);
  }
}

User.modelName = "User";

User.fields = {
  // Attributes
  id: attr(),
  firstName: attr(),
  lastName: attr(),
  name: attr(),
  email: attr(),
  cellPhone: attr(),
  officePhone: attr(),
  employeeNumber: attr(),
  fullTimeAvailabilityStartDate: attr(),
  fullTimeAvailabilityEndDate: attr(),
  targetUtilization: attr(),
  billRate: attr(),
  isCustomBillRate: attr(),
  photoPath: attr(),
  roleId: attr(),
  locationId: attr(),
  subscriptionId: attr(),
  dob: attr(),
  joiningDate: attr(),
  prefix: attr(),
  type: attr(),
};
