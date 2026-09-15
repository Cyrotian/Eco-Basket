document.addEventListener("DOMContentLoaded", () => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
        window.location.href = "index.html"; // Redirect if not logged in
    } else {
        document.getElementById("userEmail").innerText = `Logged in as: ${userEmail}`;
    }

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("userEmail");
        window.location.href = "index.html"; // Redirect to login
    });
});
