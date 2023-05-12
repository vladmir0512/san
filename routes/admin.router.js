const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize')

AdminBro.registerAdapter(AdminBroSequelize)

const db = require('../models');
const adminBro = new AdminBro({
  databases: [db],
  rootPath: '/admin',
})



const router = AdminBroExpress.buildRouter(adminBro)

module.exports = router