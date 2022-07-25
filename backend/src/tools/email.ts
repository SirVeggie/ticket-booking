import mailer from 'nodemailer';

const email = 'test.mail.arctic@gmail.com';
const pass = process.env.EMAIL_PASS;
const baseUrl = `http://${process.env.DOMAIN}/confirm/`;
const ticketUrl = `http://${process.env.DOMAIN}/ticket/`;

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass
    }
});

export function ticketConfirmation(receiverEmail: string, id: string) {
    const options = {
        from: 'Arctic Ensemble ' + email,
        to: receiverEmail,
        subject: 'Arctic Ensemble lippuvarauksen varmennus',
        text: 'Varmista lippuvarauksesi klikkaamalla seuraavaa linkkiä:\n' + baseUrl + id
    };
    
    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + JSON.stringify(info));
        }
    });
}

export function ticketConfirmAccept(receiverEmail: string, id: string) {
    const options = {
        from: 'Arctic Ensemble ' + email,
        to: receiverEmail,
        subject: 'Arctic Ensemble lippuvaraus',
        text: `Lippuvarauksesi on hyväksytty!\n\nTässä linkki varaukseesi:\n${ticketUrl}${id}`
    };

    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + JSON.stringify(info));
        }
    });
}
