// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navUl = document.querySelector('nav ul');

menuBtn.addEventListener('click', () => {
    navUl.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
        });

        // Update active nav link
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');

        // Close mobile menu if open
        if (navUl.classList.contains('active')) {
            navUl.classList.remove('active');
            menuBtn.querySelector('i').classList.toggle('fa-bars');
            menuBtn.querySelector('i').classList.toggle('fa-times');
        }
    });
});

// Production-Ready Form Submission logic
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // UI Feedback: Loading State
        submitBtn.disabled = true;
        btnText.textContent = "TRANSMITTING...";
        formStatus.style.display = "block";
        formStatus.style.color = "var(--secondary)";
        formStatus.textContent = "Connecting to Satellite Uplink...";

        const formData = new FormData(this);
        const name = formData.get('from_name');

        try {
            // STEP 1: We use your real Formspree endpoint here
            const response = await fetch('https://formspree.io/f/mwvnbblg', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            // STEP 2: We removed the "|| true" so it only shows success if it actually works
            if (response.ok) {
                formStatus.style.color = "#4ade80"; // Bright Green
                formStatus.innerHTML = `<i class="fas fa-check-circle"></i> Connection established. Thank you ${name}, your message has been transmitted. I'm looking forward to our potential collaboration!`;
                contactForm.reset();
            } else {
                const data = await response.json();
                throw new Error(data.error || "Form submission failed");
            }
        } catch (error) {
            formStatus.style.color = "#ff4d4d"; // Error Red
            formStatus.textContent = "TRANSMISSION_ERROR: " + (error.message || "Check your connection and try again.");
        } finally {
            submitBtn.disabled = false;
            btnText.textContent = "Transmit Message";
            // Hide the status message after 8 seconds
            setTimeout(() => { formStatus.style.display = "none"; }, 8000);
        }
    });
}

// Add interactivity to skill orbs
const skillOrbs = document.querySelectorAll('.skill-orb');
skillOrbs.forEach(orb => {
    orb.addEventListener('click', function () {
        const skillName = this.querySelector('span').textContent;
        alert(`You selected ${skillName}! I've used this technology in multiple projects.`);
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Animate timeline items on scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Intersection Observer for active nav links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

const scrollObserverOptions = {
    threshold: 0.3
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, scrollObserverOptions);

sections.forEach(section => scrollObserver.observe(section));




// Scroll Progress Bar Logic
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scrollProgress').style.width = scrolled + '%';
});


