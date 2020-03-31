const nodemailer = require('nodemailer');

module.exports = {
    mailSend: () => {
        transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: 'labhu.shingrakhiya@cloudedots.com',
                pass: 'yourpassword'
            }
        })

        var mailOptions = {
            from: 'labhu.shingrakhiya@cloudedots.com',
            to: 'shingrakhiyalabhu4@gmail.com',
            subject: 'Subject of your email',
            text: 'something here..........',
            attachments: [{
                filename: 'img.png',
                path: './img.png'
            }, {
                filename: 'index.txt',
                path: './index.txt'
            }]
        }

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log("error in sending mail.........", err)
            } else {
                console.log("info of mail...", info);
                return info;
            }
        })
    }
}