import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Seller_registration.css"

export default function SellerRegistration() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const storedUserId = localStorage.getItem("userid");
            const userId = storedUserId ? BigInt(storedUserId) : null;

             if (!userId) {
             alert("User ID not found. Please register first.");
             navigate("/Registration");
            return;
             }
           
           
            
            const requestData = {
                userId: userId.toString(),
                businessName: data.businessName,
                phoneNumber: data.phoneNumber,
                businessDesc: data.businessDesc
            };

            console.log(requestData)

            const response = await axios.post("http://localhost:8080/register_seller", requestData);

            if (response.status === 201) {
                alert("Seller registered successfully!");
                navigate("/product-management");
            } else {

                alert("Failed to register seller. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting seller registration:",  error.response ? error.response.data : error.message);
            alert("An error occurred. Please check your details and try again.");
        }
    };

    return (
        <div className="SellerRegistration">
            <h2>Seller Registration</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="Box">Business Name</label>
                    <input {...register("businessName", { required: "Enter your Business Name" })} />
                    {errors.businessName && <p className="err-msg">{errors.businessName.message}</p>}
                </div>

                <div>
                    <label className="Box">Phone Number</label>
                    <input {...register("phoneNumber", { required: "Enter your phone number" })} />
                    {errors.phoneNumber && <p className="err-msg">{errors.phoneNumber.message}</p>}
                </div>

                <div>
                    <label className="Box">Farm Story</label>
                    <textarea {...register("businessDesc", { required: "Enter a short description" })} placeholder="Tell your farm's story" />
                    {errors.businessDesc && <p className="err-msg">{errors.businessDesc.message}</p>}
                </div>

                <button type="submit">Submit Seller Details</button>
            </form>
        </div>
    );
}
