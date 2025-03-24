// Show alert when button is clicked
function showAlert() {
    alert("Hello! Welcome to my advanced website.");
}

const firebaseConfig = {
    apiKey: "AIzaSyBR57Hc4rbpIclVIiMIErgb7yGP2J396hE",
    authDomain: "javascript-f778d.firebaseapp.com",
    databaseURL: "https://javascript-f778d-default-rtdb.firebaseio.com",
    projectId: "javascript-f778d",
    storageBucket: "javascript-f778d.firebasestorage.app",
    messagingSenderId: "352477140510",
    appId: "1:352477140510:web:ec3e0d025e4815b704000f"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const darkModeToggle = document.getElementById("darkModeToggle");
if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
        darkModeToggle.innerText = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });
}

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.innerText = "☀️";
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
    });
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const statusMessage = document.getElementById("statusMessage");

    if (name === "" || email === "" || message === "") {
        statusMessage.innerText = "Please fill in all fields.";
        statusMessage.style.color = "red";
        return;
    }

    database.ref("messages").push({
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
    });

    statusMessage.innerText = "Message sent successfully!";
    statusMessage.style.color = "green";

    document.getElementById("contactForm").reset();
});
