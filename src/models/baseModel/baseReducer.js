import K from "../../utilities/constants";

export default function baseReducer(action, modelClass, session) {
  const { type, payload } = action;

  switch (type) {
    case K.Actions.UPSERT + "_" + modelClass.capitalModelName():
      modelClass.upsert(payload.modelRef);
      break;

    case K.Actions.DELETE +
      "_AND_" +
      K.Actions.UPSERT +
      "_" +
      modelClass.capitalModelName():
      modelClass.withId(payload.modelRef.id).delete();
      modelClass.upsert(payload.modelRef);
      break;

    case K.Actions.UPSERT + "_" + modelClass.capitalModelName() + "S":
      payload.modelRefs.map((modelRef) => modelClass.upsert(modelRef));
      break;

    case K.Actions.DELETE + "_" + modelClass.capitalModelName():
      modelClass.withId(payload.id).delete();
      break;

    case K.Actions.CREATE + "_" + modelClass.capitalModelName():
      modelClass.create(payload.modelRef);
      break;

    case K.Actions.CREATE + "_" + modelClass.capitalModelName() + "S":
      payload.modelRefs.map((modelRef) => modelClass.create(modelRef));
      break;

    case K.Actions.DELETE + "_" + modelClass.capitalModelName() + "S":
      payload.ids.map((id) => modelClass.withId(id).delete());
      break;

    case K.Actions.DELETE_ALL + "_" + modelClass.capitalModelName() + "S":
      modelClass.all().delete();
      break;

    case K.Actions.DELETE_ALL +
      "_AND_" +
      K.Actions.UPSERT +
      "_" +
      modelClass.capitalModelName():
      modelClass.all().delete();
      payload.modelRefs.map((modelRef) => modelClass.create(modelRef));
      break;

    case K.Actions.SET + "_" + modelClass.capitalModelName() + "_ATTRIBUTE":
      modelClass.withId(payload.id).set(payload.key, payload.value);
      break;

    case K.Actions.UPDATE + "_" + modelClass.capitalModelName():
      modelClass.withId(payload.id).update(payload.value);
      break;

    case K.Actions.UPDATE_ALL + "_" + modelClass.capitalModelName():
      modelClass.all().update(payload.values);
      break;

    case K.Actions.UPDATE + "_" + modelClass.capitalModelName() + "S":
      payload.ids.map((id) => modelClass.withId(id)?.update(payload.value));
      break;

    default:
      break;
  }
}
