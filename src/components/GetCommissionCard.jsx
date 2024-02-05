import React, { useEffect, useState } from 'react';

const GetCommissionCard = () => {
    const [commissions, setCommissions] = useState([]);

    useEffect(() => {
        fetch('/api/commissions/get')
            .then(response => response.json())
            .then(data => setCommissions(data))
            .catch(error => console.error('Error al obtener las comisiones:', error));
    }, []);

    return (
        <div className='grid xl:grid-cols-3 gap-5 mt-5'>
            {commissions.map((commission, index) => (
                <div className="card w-96 bg-primary text-primary-content" key={index}>
                    <div className="card-body">
                        <h2 className="card-title">[{commission.tier}]{commission.name}</h2>
                        <p>{commission.description}</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-accent">{new Date(commission.date).toLocaleDateString('en-GB')}</div>
                            {commission.price !== null && (
                                <div className="badge badge-accent">{commission.price}</div>
                            )}
                            <div className="badge badge-accent">{commission.status}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GetCommissionCard;