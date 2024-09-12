const utils = require("src/util");

export async function getProcessors(context, query = {}) {
  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/processors${queryStr}`,
      method: "get",
      detailed: true,
      headers: {},
      handler: async (data) => {
        if (data.length > 0) {
          const optionData = utils.buildOptionsArray(
            data,
            "longName",
            "procId"
          );
          const hashMap = utils.buildHashTable(data, "procId");
          context.commit("setProcessors", {
            rawData: data,
            optionData: optionData,
            hashMap: hashMap,
          });
        }
        // Response data can be modified here before setting it to the store
      },
    },
    { root: true }
  );
}

export async function getApplications(context, query = {}) {
  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/applications${queryStr}`,
      method: "get",
      detailed: true,
      headers: {},
      handler: async (data) => {
        if (data.length > 0) {
          const optionData = utils.buildOptionsArray(data, "app", "code");
          const hashMap = utils.buildHashTable(data, "code");
          context.commit("setApplications", {
            rawData: data,
            optionData: optionData,
            hashMap: hashMap,
          });
        }
        // Response data can be modified here before setting it to the store
      },
    },
    { root: true }
  );
}

export async function getCollections(context, query = {}) {
  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/collections${queryStr}`,
      method: "get",
      detailed: true,
      headers: {},
      handler: async (data) => {
        if (data.length > 0) {
        }
        // Response data can be modified here before setting it to the store
      },
    },
    { root: true }
  );
}

export async function initiatePayment(context, payload) {
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/initiate-transaction`,
      method: "post",
      headers: {
        // Authorization: `bearer ${context.rootState.users.userLoginInfo.userToken}`,
      },
      detailed: true,
      data: payload,
      handler: async (data) => {},
    },
    { root: true }
  );
}

export async function putPaymentDetails(context, payload) {
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/collections/update`,
      method: "put",
      headers: {
        // Authorization: `bearer ${context.rootState.users.userLoginInfo.userToken}`,
      },
      detailed: true,
      data: payload,
      handler: async (data) => {},
    },
    { root: true }
  );
}
