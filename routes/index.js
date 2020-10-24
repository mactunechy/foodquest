var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        emailSuccess: null,
        emailError: null
    });
});
/* GET About page. */
router.get('/about', function (req, res, next) {
    res.render('about', { title: 'About Us' });
});
/* GET Contact page. */
router.get('/contacts', function (req, res, next) {
    res.render('contacts', {
        title: 'Contacts',

        emailSuccess: null,
        emailError: null
    });
});
/* GET FAQ page. */
router.get('/faq', function (req, res, next) {
    res.render('faq', { title: 'F.A.Q' });
});

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

// POST route from contact form
router.post('/contacts', (req, res) => {
    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    });

    // Specify what the email will look like
    const mailOpts = {
        from: 'Food Quest', // This is ignored by Gmail
        to: GMAIL_USER,
        subject: 'Contact from a client',
        text: `${req.body.name} (${req.body.email}) says: \n ${req.body.message} \n\n ${req.body.phone} `
    };

    try {
        // Attempt to send the email
        smtpTrans.sendMail(mailOpts, (error, response) => {
            if (error) {
                console.log(error);
                res.render('contacts', {
                    title: 'Contacts',
                    emailError: 'Failed to send email, try again'
                }); // Show a page indicating failure
            } else {
                console.log('alert-success: email sent');
                res.render('contacts', {
                    emailSuccess: 'Email sent successfully',
                    title: 'Contacts',
                    emailError: null
                }); // Show a page indicating success
            }
        });
    } catch (error) {
        console.log(error);
        res.render('contacts', {
            title: 'Contacts',
            emailSuccess: null,
            emailError: 'Failed to send email, try again'
        }); // Show a page indicating failure
    }
});
// POST route from contact form
router.post('/', (req, res) => {
    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: GMAIL_USER,
            pass: GMAIL_PASS
        }
    });

    // Specify what the email will look like
    const mailOpts = {
        from: 'Food Quest', // This is ignored by Gmail
        to: GMAIL_USER,
        subject: 'Qoutation Request',
        text: `${req.body.firstName} ${req.body.lastName} (${req.body.email}) is requesting for qoutation of: \n product: ${req.body.product} \n quantity(units or kgs): ${req.body.quantity} \n\n reply to the customers email `
    };

    try {
        // Attempt to send the email
        smtpTrans.sendMail(mailOpts, (error, response) => {
            if (error) {
                console.log(error);
                res.render('/', {
                    title: 'Home',
                    emailError: 'Failed to send email, try again',
                    emailSuccess: null
                }); // Show a page indicating failure
            } else {
                console.log('alert-success: email sent');
                res.render('/', {
                    emailSuccess: 'Email sent successfully',
                    title: 'Home',
                    emailError: null
                }); // Show a page indicating success
            }
        });
    } catch (error) {
        console.log(error);
        res.render('/', {
            title: 'Home',
            emailSuccess: null,
            emailError: 'Failed to send email, try again'
        }); // Show a page indicating failure
    }
});

module.exports = router;
