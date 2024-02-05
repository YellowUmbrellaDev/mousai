import { useState, useEffect, useRef } from 'react';

export default function SendForm(mail) {
    const [name, setName] = useState("");
    const email = mail.mail;
    const tier = mail.tipo.id;
    const username = mail.username;
    const [description, setDescription] = useState("");
    const [pronouns, setPronouns] = useState("");
    const [files, setFile] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [fileSizeError, setFileSizeError] = useState(false);
    const [isLoading, setIsLoading] = useState(false); 
    const formRef = useRef(null);// Added state for loading screen

    useEffect(() => {
        let timeoutId;
        if (isSuccess) {
            timeoutId = setTimeout(() => {
                setIsSuccess(false);
            }, 2000);
        }
        return () => clearTimeout(timeoutId);
    }, [isSuccess]);

    useEffect(() => {
        let fileSizeTimeoutId;
        if (fileSizeError) {
            fileSizeTimeoutId = setTimeout(() => {
                setFileSizeError(false);
            }, 2000);
        }
        return () => clearTimeout(fileSizeTimeoutId);
    }, [fileSizeError]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('description', description);
        formData.append('pronouns', pronouns);
        formData.append('tier', tier);
        formData.append('username', username);
        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('file', files[i]);
            }
        }

        try {
            setIsLoading(true);

            // Check file size before sending
            const fileSizeLimit = 10 * 1024 * 1024; // 10MB
            let isFileSizeValid = true;
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    if (files[i].size > fileSizeLimit) {
                        isFileSizeValid = false;
                        break;
                    }
                }
            }

            if (!isFileSizeValid) {
                setFileSizeError(true);
                setIsLoading(false); // Hide loading screen
                return;
            }

            const response = await fetch('/api/commissions/create', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                setIsSuccess(true);
                setName("");
                setDescription("");
                setPronouns("");
                setFile(null); 
                formRef.current.reset(); 
            } else {
                setIsSuccess(false);
            }
        } catch (error) {
            console.error(error);
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form ref={formRef} onSubmit={handleSubmit} enctype="multipart/form-data" className="flex flex-col items-center justify-center form-control">
                <input type="text" name="name" placeholder="Nombre" required className="input input-bordered w-full max-w-xs" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" name="pronouns" placeholder="Pronombres" required className="input input-bordered w-full max-w-xs mt-5" value={pronouns} onChange={(e) => setPronouns(e.target.value)} />
                <textarea className="textarea textarea-bordered w-80 mt-5" name="description" placeholder="Descripción de la comisión" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <label className="label mt-5">Refrencias para la comisión</label>
                <input multiple type="file" name="files"  className="mt-10 file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={(e) => setFile(e.target.files)}/>
                <div role="alert" class="alert alert-info mt-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="label text-xs"> El límite de tamaño de los archivos es 10MB</span>
                </div>
                {isLoading ? (
                    <div className="flex items-center justify-center mt-5">
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                ) : (
                    <button type="submit" className="btn btn-primary mt-5">Enviar</button>
                )}
            </form>
            {isSuccess && (
                <div id="toast" className="toast toast-top toast-start">
                    <div className="alert alert-success">
                        <span>Message sent successfully.</span>
                    </div>
                </div>
            )}
            {fileSizeError && (
                <div id="toast" className="toast toast-top toast-start">
                    <div className="alert alert-error">
                        <span>File size exceeds the limit of 10MB.</span>
                    </div>
                </div>
            )}
        </div>
    );
}