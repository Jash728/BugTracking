// omdjuhbhmalooneg

const mailer = require('nodemailer');

const sendMail = async(to) => {

        const transporter = mailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: "jsforproject@gmail.com",
                pass: "omdjuhbhmalooneg"
            }
        })

        const options = {
            from: 'jsforproject@gmail.com',
            to: to,
            subject: "Assigning Task",
            text: "Manager assigns you tasks"

        }

        var res = await transporter.sendMail(options)
        return res

    }
    // sendMail("samir.vithlani83955@gmail.com","hi","hello").then((data)=>{
    //     console.log(data);
    // }).catch((err)=>{
    //     console.log(err);
    // })
module.exports = { sendMail }