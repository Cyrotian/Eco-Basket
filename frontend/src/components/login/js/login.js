document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    if (!form) {
        console.error("Login form not found.");
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
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // ✅ Fixes session handling
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                localStorage.setItem("userEmail", email);
                window.location.href = "dashboard.html";
            } else {
                const errorText = await response.text();
                document.getElementById("error").innerText = errorText || "Invalid credentials.";
            }
        } catch (error) {
            console.error("Login error:", error);
            document.getElementById("error").innerText = "Server error. Try again later.";
        }
    });
});
