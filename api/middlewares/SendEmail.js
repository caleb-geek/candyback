
const  sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey('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')

exports.sendEmail = ({to,from,subject,text,html}) => {
   
    const msg = {to, from, subject, text,html}
    return sendgrid.send(msg)
}