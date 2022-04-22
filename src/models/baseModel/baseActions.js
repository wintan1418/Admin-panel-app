import K from "../../utilities/constants";

export const upsertModel = (modelClass, modelRef) => {
  return {
    type: K.Actions.UPSERT + "_" + modelClass.capitalModelName(),
    payload: { modelRef },
  };
};

export const deleteAndUpsertModel = (modelClass, modelRef) => {
  return {
    type:
      K.Actions.DELETE +
      "_AND_" +
      K.Actions.UPSERT +
      "_" +
      modelClass.capitalModelName(),
    payload: { modelRef },
  };
};

export const upsertModels = (modelClass, modelRefs) => {
  return {
    type: K.Actions.UPSERT + "_" + modelClass.capitalModelName() + "S",
    payload: { modelRefs },
  };
};

export const createModel = (modelClass, modelRef) => {
  return {
    type: K.Actions.CREATE + "_" + modelClass.capitalModelName(),
    payload: { modelRef },
  };
};

export const createModels = (modelClass, modelRefs) => {
  return {
    type: K.Actions.CREATE + "_" + modelClass.capitalModelName() + "S",
    payload: { modelRefs },
  };
};

export const deleteModel = (modelClass, id) => {
  return {
    type: K.Actions.DELETE + "_" + modelClass.capitalModelName(),
    payload: { id },
  };
};

export const deleteModels = (modelClass, ids) => {
  return {
    type: K.Actions.DELETE + "_" + modelClass.capitalModelName() + "S",
    payload: { ids },
  };
};

export const deleteAllModels = (modelClass) => {
  return {
    type: K.Actions.DELETE_ALL + "_" + modelClass.capitalModelName() + "S",
  };
};

export const setAttribute = (modelClass, id, key, value) => {
  return {
    type: K.Actions.SET + "_" + modelClass.capitalModelName() + "_ATTRIBUTE",
    payload: { id, key, value },
  };
};
