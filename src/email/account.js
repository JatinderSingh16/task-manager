const sendMail = require('@sendgrid/mail')

const sendgridApiKey = process.env.SEND_GRID_KEY

sendMail.setApiKey(sendgridApiKey)

const sendWelcomeEmail = (name,email) => {

    sendMail.send({
        to:'vjatinder118@gmail.com',
        from:'test@test.io',
        subject:'Testing Mail',
        text:`Welcome ${name} to our site ,your email account: ${email} is saved and you are now registered`
    
    })
}

module.exports = {
    sendWelcomeEmail
}