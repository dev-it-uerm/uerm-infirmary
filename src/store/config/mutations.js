export function setFieldGroups(state, data) {
  state.fieldGroups = data.rawData;
  state.fieldGroupsGrouped = data.grouped;
  state.fieldGroupsHashMap = data.hashMap;
}

export function setFields(state, data) {
  state.fields = data.rawData;
  state.fieldsGrouped = data.grouped;
  state.fieldsHashMap = data.hashMap;
}
