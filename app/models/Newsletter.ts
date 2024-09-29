import mongoose, {Schema, Document, Model} from 'mongoose';
import {INewsletter} from "../types/newsletter";

interface INewsletterDocument extends INewsletter, Document {
}

const NewsletterSchema: Schema<INewsletterDocument> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

const Newsletter: Model<INewsletterDocument> =
    mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);

export default Newsletter;