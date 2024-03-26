import React, { useState } from 'react'
import "./DonationModel.css"
import { makingDonation } from '../../requestMethods'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import noImage from "../../images/noimage.avif"

const DonationModel = ({ data, setDonationModel, setDonation, donateUser }) => {
    const user = useSelector(state => state.auth.user)
    const [inputs, setInputs] = useState({})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleDonation = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!user) {
            window.location.replace("/login")
            return
        }

        if (parseInt(inputs.amount) > donateUser?.balance) {
            setLoading(false)
            return toast.warn("You don't have Suffient Balance Please Add Balance")
        }

        let token = JSON.parse(localStorage.getItem("token"))

        let donation = {
            userId: user._id,
            projectId: data._id,
            risedAmount: parseInt(inputs.amount),
            email: inputs.email
        }

        makingDonation(`/donation/${data._id}`, 'POST', donation, token)
            .then((response) => {
                setDonationModel(false)
                setDonation(prev => [...prev, response])
                toast.success("Donated sucessfully")
            })
            .catch((error) => {
                if (error === "jwt expired") {
                    toast.warning("Session expired please login again")
                    setLoading(false)
                }
                if (error === "jwt malformed") {
                    toast.warning("something went wrong refresh page and try again")
                    setLoading(false)
                }

            });

    }


    return (
        <div className='dm'>
            <div className="dm-container">
                <span className='cancel' onClick={() => setDonationModel(false)}>X</span>
                <div className="dm-left">
                    <img src={data.image ? data.image : noImage} alt={data.title} />
                    <h2 style={{ fontWeight: "600" }}>{data.title}</h2>
                    <p>{data.description}</p>
                </div>
                <div className="dm-right">
                    <h1>Be a Donar</h1>
                    <form action="" onSubmit={handleDonation}>
                        <div className="first-name">
                            <div className="inputs">
                                <label htmlFor="">First Name</label>
                                <input type="text" placeholder="First Name" name='firstname' required onChange={handleChange} />
                            </div>
                            <div className="inputs">
                                <label htmlFor="">Last Name</label>
                                <input type="text" placeholder="Last Name" name='lastname' required onChange={handleChange} />
                            </div>
                        </div>
                        <div className="inputs">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" required placeholder="example@gamil.com" onChange={handleChange} />
                        </div>
                        <div className="first-name">
                            <div className="inputs">
                                <label htmlFor="">Country</label>
                                <input type="text" placeholder="Country" name='country'  onChange={handleChange} />
                            </div>
                        </div>
                        <div className="inputs">
                            <label htmlFor="Amount">Donation Amount</label>
                            <input type="number" name="amount" id="Amount" placeholder="Amount" required onChange={handleChange} />
                        </div>
                        <p>Thank You for your Support</p>
                        <button type="submit" className={loading ? "disable" : ""}>{loading ? "Please Wait" : "Donate"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DonationModel
