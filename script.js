// Initialize Supabase client
const supabaseUrl = "https://pnuhuhtcwljyjjkzekyi.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudWh1aHRjd2xqeWpqa3pla3lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MDUyMjUsImV4cCI6MjA3NzI4MTIyNX0.OmhqpOVj8X4Mo1G8SQ_X2aoJpH_-dMQSRbEPis7q0";
const supabase = supabaseJs.createClient(supabaseUrl, supabaseKey);

// Hamburger menu toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Contact form submission
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !phone || !message) {
        formMessage.textContent = "Please fill all fields before submitting!";
        formMessage.className = "form-message error";
        formMessage.style.display = "block";
        return;
    }

    const { data, error } = await supabase.from("messages").insert([
        { name, email, phone, service, message }
    ]);

    if (error) {
        console.error("Error submitting form:", error);
        formMessage.textContent = "❌ Failed to submit. Please try again.";
        formMessage.className = "form-message error";
        formMessage.style.display = "block";
    } else {
        formMessage.textContent = "✅ Message sent successfully!";
        formMessage.className = "form-message success";
        formMessage.style.display = "block";
        contactForm.reset();
    }
});
