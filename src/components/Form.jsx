import { useState, useEffect } from 'react';


export default function SendForm(mail) {
    const [name, setName] = useState("");
    const email = mail.mail;
    const tier = mail.tipo.id;
    const username = mail.username;
    const [description, setDescription] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [file, setFile] = useState(null);
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

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('description', description);
        formData.append('pronouns', pronouns);
        formData.append('tier', tier);
        formData.append('username', username);
        formData.append('file', file);

        try {
            const response = await fetch('/api/pedido', {
                method: 'POST',
                body: formData
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
            <form onSubmit={handleSubmit} enctype="multipart/form-data" className="flex flex-col items-center justify-center">
                <input type="text" name="name" placeholder="Nombre" required className="input input-bordered w-full max-w-xs" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" name="pronouns" placeholder="Pronombres" required className="input input-bordered w-full max-w-xs mt-5" value={pronouns} onChange={(e) => setPronouns(e.target.value)} />
                <textarea className="textarea textarea-bordered w-80 mt-5" name="description" placeholder="Descripción de la comisión" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <input multiple type="file" name="file" className="mt-10 file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={(e) => setFile(e.target.files[0])} />
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