document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    
    if (!form) {
        console.error("Register form not found.");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!email || !password) {
            document.getElementById("error").innerText = "Please enter both email and password.";
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert("User registered successfully! Please log in.");
                window.location.href = "index.html";
            } else {
                document.getElementById("error").innerText = "Registration failed.";
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    });
});
