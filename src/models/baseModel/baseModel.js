import { createSelector, Model } from "redux-orm";
import orm from "../../app/orm";

export default class BaseModel extends Model {
  static capitalModelName() {
    return this.modelName
      .split(/(?=[A-Z])/)
      .join("_")
      .toUpperCase();
  }

  // Selectors
  static getSelector(modelClass) {
    return createSelector(orm[modelClass.modelName]);
  }
}
