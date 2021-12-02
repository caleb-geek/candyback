const express = require('express');
const Router = express.Router();
const { checkToken } = require('../middlewares/Auth')
const { getUser,createUser,login,getStudentUsers} = require('../controllers/User');
const {sendEmailTest} = require('../controllers/TestEmail')


Router.get('/:id', getUser)
Router.get('/', getStudentUsers)
Router.post('/', createUser)
Router.post('/login', login)
//Router.post('/sendemail', sendEmailTest)



module.exports = Router;