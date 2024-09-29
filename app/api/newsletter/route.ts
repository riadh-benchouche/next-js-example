import {NextResponse} from 'next/server';
import dbConnect from "../../lib/mongodb";
import Newsletter from "../../models/Newsletter";
import {INewsletter} from "../../types/newsletter";

export async function POST(req: Request): Promise<Response> {
    await dbConnect();
    const {email}: INewsletter = await req.json();

    try {
        const existingEmail = await Newsletter.findOne({email});
        if (existingEmail) {
            return NextResponse.json({error: 'Email déjà enregistré'}, {status: 400});
        }

        const newEmail = new Newsletter({email});
        await newEmail.save();

        return NextResponse.json({message: 'Inscription réussie'}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: 'Erreur interne du serveur'}, {status: 500});
    }
}