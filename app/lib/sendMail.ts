import sgMail from '@sendgrid/mail';

// @ts-ignore
const SENDGRID_API_KEY: string = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

export const sendNewsletterEmail = async (email: string) => {
    const msg = {
        to: email,
        from: 'ton-email@example.com',
        subject: 'Découvrez notre nouveau contenu sur le blog !',
        text: 'Consultez notre blog pour les dernières mises à jour.',
        html: '<strong>Consultez notre blog pour les dernières mises à jour.</strong>',
    };
    await sgMail.send(msg);
};