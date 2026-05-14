import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE } from './templates';

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.NODE_MAILER_EMAIL,
		pass: process.env.NODE_MAILER_PASSWORD,
	},
});

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
	const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace('{{name}}', name).replace('{{intro}}', intro);
	const mailOptions = {
		from: `Signalist <${process.env.NODE_MAILER_EMAIL}>`,
		to: email,
		subject: 'Welcome to Signalist',
		html: htmlTemplate,
	};
	return await transporter.sendMail(mailOptions);
};
