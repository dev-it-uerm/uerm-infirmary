const utils = require("src/util");

export async function getInfirmaryPatients(context, query = {}) {
  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/patients${queryStr}`,
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

export async function getEncounters(context, query = {}) {
  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/encounters${queryStr}`,
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

export async function getNotes(context, query = {}) {
  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/notes${queryStr}`,
      method: "get",
      detailed: true,
      headers: {},
      handler: async (data) => {
        // Response data can be modified here before setting it to the store
      },
    },
    { root: true }
  );
}

export async function getLabPDFList(context, query = {}) {
  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/lab-pdf-list${queryStr}`,
      method: "get",
      detailed: true,
      headers: {},
      handler: async (data) => {
        // Response data can be modified here before setting it to the store
      },
    },
    { root: true }
  );
}

export async function getLabPDFFile(context, query = {}) {
  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/lab-pdf-file${queryStr}`,
      method: "get",
      detailed: true,
      headers: {},
      handler: async (data) => {
        // Response data can be modified here before setting it to the store
      },
    },
    { root: true }
  );
}

export async function postLabPDFFile(context, query = {}) {
  const queryStr = await context.dispatch("helpers/queryToStr", query, {
    root: true,
  });
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/lab-pdf-file`,
      method: "post",
      detailed: true,
      headers: {},
      handler: async (data) => {
        // Response data can be modified here before setting it to the store
      },
    },
    { root: true }
  );
}

export async function postEncounter(context, payload) {
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/encounters`,
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

export async function postNotes(context, payload) {
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/notes`,
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

export async function putNotes(context, payload) {
  const noteCode = payload.code;
  delete payload.code;
  return await context.dispatch(
    "helpers/request",
    {
      url: `${context.rootState.helpers.apiHost}/notes/${noteCode}`,
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
