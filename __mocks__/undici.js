'use strict'

// Strip the undici dispatcher so nock can intercept the fetch calls in tests.
// @actions/github v8 passes undici.fetch with a custom ProxyAgent dispatcher,
// which bypasses globalThis.fetch (the one nock patches).
module.exports = {
  fetch: (url, opts = {}) => {
    // eslint-disable-next-line no-unused-vars
    const { dispatcher, ...rest } = opts
    return globalThis.fetch(url, rest)
  },
  Agent: class Agent {},
  ProxyAgent: class ProxyAgent {},
  FormData: globalThis.FormData,
  File: globalThis.File,
}
