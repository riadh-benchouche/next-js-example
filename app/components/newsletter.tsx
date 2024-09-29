"use client";
import React, { useState } from 'react';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const res = await fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        setLoading(false); // End loading

        if (res.ok) {
            setMessage('Merci de vous être inscrit à notre newsletter!');
            setEmail(''); // Clear the input after success
        } else {
            setMessage('Erreur lors de l’inscription.');
        }
    };

    return (
        <div>
            <h2>S'inscrire à la newsletter</h2>
            <form onSubmit={handleSubmit} className="flex max-w-lg text-start">
                <div className="mt-2 flex-1">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-2 block w-full text-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        placeholder="you@example.com"
                        disabled={loading} // Disable input while loading
                    />
                </div>
                <button
                    type="submit"
                    className={`mt-2 ml-2 max-w-fit rounded bg-indigo-500 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? 'En cours...' : "S'inscrire"}
                </button>
            </form>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
};

export default Newsletter;
