import {NextResponse} from 'next/server';
import dbConnect from "../../lib/mongodb";
import sgMail from '@sendgrid/mail';
import Newsletter from "../../models/Newsletter";
import {INewsletter} from "../../types/newsletter";

// @ts-ignore
const SENDGRID_API_KEY: string = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(SENDGRID_API_KEY);

export async function POST(req: Request): Promise<Response> {
    await dbConnect();
    const {email}: INewsletter = await req.json();

    try {
        const existingEmail = await Newsletter.findOne({email});
        if (existingEmail) {
            return NextResponse.json({error: 'Email déjà enregistré'}, {status: 400});
        }

        const newEmail = new Newsletter({email});
        await sgMail.send({
            to: email,
            from: 'r.benchouche1@gmail.com',
            subject: 'Bienvenue à la newsletter',
            text: 'Merci de vous être inscrit à notre newsletter!',
        });
        await newEmail.save();

        return NextResponse.json({message: 'Inscription réussie'}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: 'Erreur interne du serveur'}, {status: 500});
    }
}