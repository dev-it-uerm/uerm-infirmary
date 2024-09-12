export function setProcessors(state, data) {
  state.processors = data.rawData;
  state.processorsOptions = data.optionData;
  state.processorsHashMap = data.hashMap;
}

export function setApplications(state, data) {
  state.applications = data.rawData;
  state.applicationsOptions = data.optionData;
  state.applicationsHashMap = data.hashMap;
}
