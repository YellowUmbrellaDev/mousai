import { getSession } from 'auth-astro/server';
import { useState, useEffect } from 'react';

export default function SendForm(mail) {
    console.log(mail);
    const [name, setName] = useState("");
    const email = mail.mail;
    const [description, setDescription] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        let timeoutId;
        if (isSuccess) {
            timeoutId = setTimeout(() => {
                setIsSuccess(false);
            }, 2000);
        }
        return () => clearTimeout(timeoutId);
    }, [isSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            email,
            description,
            pronouns
        };
        try {
            const response = await fetch('/api/pedido', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setIsSuccess(true);
                setName("");
                setDescription("");
                setPronouns("");
            } else {
                setIsSuccess(false);
            }
        } catch (error) {
            console.error(error);
            setIsSuccess(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
                <input type="text" name="name" placeholder="Nombre" required className="input input-bordered w-full max-w-xs" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" name="pronouns" placeholder="Pronombres" required className="input input-bordered w-full max-w-xs mt-5" value={pronouns} onChange={(e) => setPronouns(e.target.value)} />
                <textarea className="textarea textarea-bordered w-80 mt-5" name="description" placeholder="Descripción de la comisión" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <button type="submit" className="btn btn-primary mt-5">Enviar</button>
            </form>
            {isSuccess && (
                <div id="toast" className="toast toast-top toast-start">
                    <div className="alert alert-success">
                        <span>Message sent successfully.</span>
                    </div>
                </div>
            )}
        </div>
    );
}