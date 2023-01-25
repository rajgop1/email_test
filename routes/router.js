const express = require("express")
const router = new express.Router()
const nodemailer = require("nodemailer")

router.post("/register", (req, res) => {
    const { first_name, last_name, email, phone, message, resume_location } = req.body
    console.log(first_name, last_name, email, phone, message, resume_location)
    const messageToSend = `
        <h1>Test Mail</h1>
        <h2>User Information</h2>
        <p>First Name: ${first_name} </p>
        <p>Last Name:  ${last_name}</p>
        <p>Email:  ${email}</p>
        <p>Phone:  ${phone}</p>
        <p>Message:  ${message}</p>
        <p>Resume Link:  ${resume_location}</p>
        
    `

    Promise.all([sendToClient(email), sendToHr(messageToSend)]).then((msg) => {
        console.log(msg)
        res.status(201).json({ status: 201, msg })
    }).catch((err) => {
        console.log(err)
        res.status(401).json({ status: 401, err })
    })


})


function sendToClient(email) {
    // client
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Sending Mail for testing to Client",
            html: `
            <h1>Heading for test</h1>
            <p>Para for test</p>
        `
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("client failed")
                reject(error)
            } else {
                console.log("Email sent" + info.response)
                resolve("success sent to client")
            }
        })
    })
}

function sendToHr(messageToSend) {
    // hr
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    return new Promise((resolve, reject) => {
        const mailOptions2 = {
            from: process.env.EMAIL,
            to: "rajgopaljakhmola@gmail.com",
            subject: "Sending Mail for testing to HR",
            html: messageToSend
        }
        transporter.sendMail(mailOptions2, (error, info) => {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                console.log("Email sent" + info.response)
                resolve("suceess sent to server")
            }
        })
    })

}

module.exports = router
