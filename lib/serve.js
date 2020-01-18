const _ = require('lodash')
const loader = require('conficurse')
const Sirloin = require('sirloin')
const i18n = require('./i18n.js')
const markup = require('./markup.js')
const route = require('./route.js')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'dev'
}

module.exports = function(options = {}) {
  const server = new Sirloin({
    port: process.env.PRESANG_PORT || 5000,
    files: 'app/assets',
    ...options
  })

  const app = {
    layouts: loader.load('app/layouts'),
    pages: loader.load('app/pages'),
    config: loader.load('app/config'),
    locales: loader.load('app/locales')
  }

  const defaultLang = _.get(app, 'config.routes.lang') || 'en'
  const routeOptions = _.get(app, 'config.routes') || {}

  server.get('*', async function(req, res) {
    const params = {}
    const client = { req, res }
    const tools = {}
    const $ = route(app, params, client, tools, defaultLang)
    return markup(req, res, routeOptions)($)
  })
}