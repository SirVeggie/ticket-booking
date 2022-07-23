import mailer from 'nodemailer';

const email = 'no.reply.arcticensemblebooking@gmail.com';
const pass = process.env.EMAIL_PASS;
const baseUrl = 'http://localhost:3000/api/tickets/confirm/';

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass
    }
});

function ticketConfirmation(receiverEmail: string, id: string) {
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
    
    return;
}

function ticketConfirmAccept(id: string) {
    return;
}

export default { ticketConfirmation, ticketConfirmAccept };