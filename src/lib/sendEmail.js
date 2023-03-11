import nodemailer from 'nodemailer'
import mailConfig from '@/constants/mailConfig';

export default async function sendEmail(
    template,
    data,
    options = {
        sender: null,
        recipient: null,
        subject: null,
        replyTo: null
    }) {
    const optionsConcat = {
        ...options,
        ...template.options
    }

    let body = template.body;
    for (const k in data) {
        const regex = new RegExp(`\{\{${k}\}\}`, 'g');
        body = body.replace(regex, data[k]);
    }

    // Create our Nodemailer transport handler
    let transporter = nodemailer.createTransport(mailConfig.transport);

    // Send email
    const result = await transporter.sendMail({
        from: optionsConcat.sendEmail,
        replyTo: optionsConcat.replyTo,
        to: optionsConcat.recipient,
        subject: optionsConcat.subject,
        text: body
    });

    return result;
}