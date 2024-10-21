const utils = require("src/util");

export async function getFieldGroups(context, query = {}) {
  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/config/field-groups${queryStr}`,
      method: "get",
      detailed: true,
      headers: {},
      handler: async (data) => {
        if (utils.isObjAndNotEmpty(data)) {
          context.commit("setFieldGroups", {
            rawData: data.raw,
            grouped: data.grouped,
            hashMap: data.hashMap,
          });
        }
        // Response data can be modified here before setting it to the store
      },
    },
    { root: true }
  );
}

export async function getFields(context, query = {}) {
  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/config/fields${queryStr}`,
      method: "get",
      detailed: true,
      headers: {},
      handler: async (data) => {
        if (utils.isObjAndNotEmpty(data)) {
          context.commit("setFields", {
            rawData: data.raw,
            grouped: data.grouped,
            hashMap: data.hashMap,
          });
        }
        // Response data can be modified here before setting it to the store
      },
    },
    { root: true }
  );
}
