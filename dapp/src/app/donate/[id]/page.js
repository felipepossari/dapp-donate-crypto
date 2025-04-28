"use client"

import { useEffect, useState } from "react";
import { getCampaing, donate } from "@/services/web3Service";
import { useParams } from "next/navigation";
import { Web3 } from "web3";

export default function Donate() {

    const params = useParams();
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [campaing, setCampaing] = useState({});
    const [donation, setDonation] = useState('');

    function onDonationChange(event) {
        setDonation(event.target.value)
    }

    function btnDonateClick() {
        setMessage("Donating...");
        donate(campaing.id, donation)
            .then(() => {
                setMessage("Donated!");
                setDonation(0);
            })
            .catch(err => {
                setMessage('');
                console.error(err);
                setErrorMessage(err.message);
            });
    }

    useEffect(() => {
        setMessage('Loading campaign...');
        getCampaing(params.id)
            .then(result => {
                result.id = params.id;
                setCampaing(result);
                console.log(result)
                setMessage('');
            })
            .catch(err => {
                setMessage('');
                console.error(err);
                setErrorMessage(err.message);
            });
    }, []);

    return (
        <>
            <div className="container">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 mt-5">Donate Crypto</h1>
                <hr />
                <div className="row flex-lg-row-reverse align-items-center g-5">
                    <div className="col-7">
                        {
                            campaing.videoUrl ?
                                <iframe width="100%" height="480" src={`https://www.youtube.com/embed/${campaing.videoUrl}`}></iframe>
                                : <img src={campaing.imageUrl} alt="image" className="d-block mx-lg-auto img-fluid" height="640" width="480" />
                        }
                    </div>
                    <div className="col-5 mb-5" style={{ height: 480, scrollbars: true }}>
                        <h2>{campaing.title}</h2>
                        <p><strong>Author:</strong> {campaing.author}</p>
                        <p className="mb-3">{campaing.description}</p>
                        <p className="mb-3 fst-italic mt-5">
                            Total donated so far: {Web3.utils.fromWei(campaing.balance || '0', 'ether')} POL.
                        </p>
                        <div className="mb-3">
                            <div className="input-group">
                                <input type="number" id="donation" className="form-control p-3 w-50" placeholder="Donation"
                                    value={donation} onChange={onDonationChange} />
                                <span className="input-group-text">POL</span>
                                <button type="button" className="btn btn-primary p-3 w-25" onClick={btnDonateClick}>Donate</button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    message ?
                        <div className="alert alert-success p-3 col-12 mt-3" role="alert">{message}</div> :
                        <></>
                }
                {
                    errorMessage ?
                        <div className="alert alert-danger p-3 col-12 mt-3" role="alert">{errorMessage}</div> :
                        <></>
                }
            </div >
        </>
    )
}