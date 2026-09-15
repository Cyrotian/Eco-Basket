import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../css/registration.css";
import background from "../../assets/images/background.jpg";



export default function Registration() {
  const { register, watch, trigger, handleSubmit, formState: { errors } } = useForm();
  
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Watching form inputs for validation
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const name = watch("name");
  const email = watch("email");

  useEffect(() => {
    if (password) trigger("password");
  }, [password, trigger]);

  useEffect(() => {
    if (confirmPassword) trigger("confirmPassword");
  }, [confirmPassword, trigger]);

  useEffect(() => {
    if (name) trigger("name");
    if (email) trigger("email");
  }, [name, email, trigger]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("userid");
      localStorage.removeItem("userProfile");
      localStorage.removeItem("isLoggedIn");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const onSubmit = async (data) => {
    console.log(data, "onsumbit triggered");
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await axios.post("http://localhost:8080/register", data);

      if (response.status === 201) {
        const userID = BigInt(response.data.userId);
        localStorage.setItem("userid", String(userID));
        localStorage.setItem("isLoggedIn", "true");

        const userProfile = {
          name: data.name,
          email: data.email,
        };
        localStorage.setItem("userProfile", JSON.stringify(userProfile));

        if (data.userType === "SELLER" || data.userType === "BULK_SELLER") {
          navigate("/seller-registration");
        } else {
          navigate("/product-gallery");
        }
      } else {
        setErrorMessage(response.data.message || "Registration failed");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="RegistrationContainer">
      <div className="FORM">
        <h2 className="text">Begin Your Journey</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="Box">Name</label>
            <input
              {...register("name", { 
                required: "Incomplete field", 
                pattern: { value: /^[A-Za-z\s]+$/, message: "Please use letters only." }
              })}
              className="name.input"
            />
            {errors.name && <p className="err-msg">{errors.name.message}</p>}
          </div>

          <div>
            <label className="Box">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" }
              })}
              className="Email.input"
            />
            {errors.email && <p className="err-msg">{errors.email.message}</p>}
          </div>

          <div>
            <label className="Box">Password</label>
            <div className="Password-Box">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be 8 characters" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                    message: "Password must contain an uppercase letter, a number, and a special character."
                  }
                })}
                className="Password.input"
              />
              <button
                type="button"
                className="showpass-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "🙈"}
              </button>
            </div>
            {errors.password && <p className="err-msg">{errors.password.message}</p>}
          </div>

          <div>
            <label className="Box">Re-enter Password</label>
            <input 
              type="password"
              {...register("confirmPassword", {
                required: "Please re-enter your password",
                validate: (value) => value === password || "Passwords do not match"
              })}
              className="Password-input"
            />
            {errors.confirmPassword && <p className="err-msg">{errors.confirmPassword.message}</p>}
          </div>

          <div>
            <select {...register("userType", { required: "Select Your User Type" })} className="User_Selection">
              <option value="BUYER">Buyer</option>
              <option value="SELLER">Seller</option>
              <option value="BULK_BUYER">Bulk Buyer</option>
              <option value="BULK_SELLER">Bulk Seller</option>
            </select>
            {errors.userType && <p className="err-msg">{errors.userType.message}</p>}
          </div>

          <div className="submisson_Buttons">
            <div className="sub_box1">
              <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
            <div className="sub_box2">
              <button type="button" className="tooltip-btn" onClick={() => navigate("/login")}>
                Login
                <span className="tooltip-text"> Already have an account?</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      
      <div className="RegistrationDescription">
        <img src={background} alt="Eco Basket" className="registration-image" />
      
        <div className="description-text">
          <h3>Welcome to Eco Basket</h3>
          <p>Join the community and explore sustainable shopping options with Eco Basket. Start your journey now!</p>
        </div>
      </div>
    </div>
  );
}
