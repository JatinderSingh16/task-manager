const sendMail = require('@sendgrid/mail')

const sendgridApiKey = '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'

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