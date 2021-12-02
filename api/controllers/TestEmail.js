
 const {sendEmail} = require('../middlewares/SendEmail')

exports.sendEmailTest = async(req, res) => {
    try{
        await sendEmail({
            to:'caleb.osano.co+test1@gmail.com',
            from:'caleb.osano.co@gmail.com',
            subject:'Does this work',
            text:'If you are reading this'

        })
        res.sendStatus(200)
    }catch(e){
     console.log(e)
    }
    }
  