import {NextResponse} from 'next/server';
import dbConnect from "../../lib/mongodb";
import sgMail from '@sendgrid/mail';
import Newsletter from "../../models/Newsletter";

// @ts-ignore
const SENDGRID_API_KEY: string = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

export async function GET(): Promise<Response> {
    await dbConnect();

    try {
        const subscribers = await Newsletter.find();

        if (subscribers.length === 0) {
            return NextResponse.json({message: 'Aucun abonné trouvé.'}, {status: 404});
        }

        const emailPromises = subscribers.map(async (subscriber: any) => {
            return sgMail.send({
                to: subscriber.email,
                from: 'r.benchouche1@gmail.com',
                subject: 'Découvrez nos derniers articles sur le blog !',
                text: 'Nous avons de nouveaux articles sur le blog, venez les consulter.',
                html: '<strong>Nous avons de nouveaux articles sur le blog, consultez-les maintenant !</strong>',
            });
        });

        // Envoyer tous les emails
        await Promise.all(emailPromises);

        return NextResponse.json({message: 'Emails envoyés avec succès !'}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: 'Erreur lors de l\'envoi des emails.'}, {status: 500});
    }
}
