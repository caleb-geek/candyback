const User = require('../../models').User;
const {sendEmail} = require('../middlewares/SendEmail')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4, v4} = require('uuid');



// Get user
exports.getUser = (req, res) => {
  return User.findByPk(req.params.id).then(user => {
    res.status(200).json(user)
  }).catch((err) => {
    return res.status(400).json({ message: err.message })
  })
  }

  // Get all students
exports.getStudentUsers = (req, res) => {
  return User.findAll({where:{roleId:"student"}}).then(user => {
    res.status(200).json(user)
  }).catch((err) => {
    return res.status(400).json({ message: err.message })
  })
  }

// Create user
exports.createUser = async (req, res) => {
  const verificationString = v4()
 const {firstname,lastname,email,username,password,classname,roleId}=req.body;
  const hash = bcrypt.hashSync(password, 10);
 

  //Confirm if email/user exits
  const db_email = await User.findOne({ where: { email: email} })
  const db_user = await User.findOne({ where: { username: username} })

  if(db_email||db_user){
    res.sendStatus(409)
  }


    return User.create( {
      firstName:firstname,
      lastName:lastname,
      email:email,
      username:username,
      password:hash,
      classname:classname,
      roleId:roleId,
      isVerified:false,
      verificationString:verificationString 
    })
      .then((createdUser) => {
        return res.status(201).json(createdUser)
  
      })
      .catch((err) => {
        return res.status(400).json({ message: err.message })
      })
      
      
      

  }

// Login
exports.login = async (req, res) => {
    //1. check user email -exitst
    const { username, email, password } = req.body
    if ((!username || !email) && !password) {
      return res.status(400).status({ message: "fields are required" })
    }
  
    let userExist;
    if (username) {
      userExist = await User.findOne({ where: { username: username } })
    } else if (email) {
      userExist = await User.findOne({ where: { email: email } })
    }
  
  
    if (!userExist) {
      return res.status(401).json({ message: "Username/EMail does not exist" })
    }
  
    //2. password match
    const match = await bcrypt.compare(password, userExist.dataValues.password)
    // Load hash fom your password DB.
    if (match) {
      //3. generate token
      const token = jwt.sign(
        { userId: userExist.dataValues },
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' });
      return res.status(200).json({
        token: token
      })
     
    }else{
      return res.status(401).json({ message: "wrong password" })
    }
   }