import { BlogPosts } from 'app/components/posts';
import Newsletter from "./components/newsletter";

export default function Page() {
    return (
        <section>
            <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
                Mon Blog Extraordinaire 🚀
            </h1>
            <p className="mb-4">
                {`Bienvenue dans mon antre numérique ! Fidèle chevalier de Vim et
                grand défenseur des onglets, je maîtrise l'art du code à chaque
                pression de touche. Qui a besoin d'une souris, sérieusement ? Le typage
                statique ? Oh oui, je me prosterne devant sa gloire de détection
                d'erreurs ! Et parlons du mode sombre – parce que personne ne veut se
                brûler la rétine en conquérant le monde du code, non ?`}
            </p>
            <div className="my-8">
                <BlogPosts />
            </div>
            <div className="my-8">
                <Newsletter />
            </div>
        </section>
    )
}
