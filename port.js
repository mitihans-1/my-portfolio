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

// --- Profile Picture Adjustment Engine ---
const profileUpload = document.getElementById('profile-upload');
const profileDisplay = document.getElementById('profile-display');
const uploadModal = document.getElementById('uploadModal');
const imagePreview = document.getElementById('imagePreview');
const closeUploadModal = document.getElementById('closeUploadModal');
const zoomSlider = document.getElementById('zoomSlider');
const zoomValue = document.getElementById('zoomValue');
const zoomIn = document.getElementById('zoomIn');
const zoomOut = document.getElementById('zoomOut');
const saveProfileBtn = document.getElementById('saveProfileBtn');
const resetProfileBtn = document.getElementById('resetProfileBtn');
const posBtns = document.querySelectorAll('.pos-btn');

let currentScale = 1;
let currentX = 0;
let currentY = 0;
let isDragging = false;
let startX, startY;

function updatePreview() {
    imagePreview.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
    zoomSlider.value = currentScale;
    zoomValue.textContent = Math.round(currentScale * 100) + '%';
}

if (profileUpload) {
    profileUpload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                imagePreview.src = event.target.result;
                uploadModal.style.display = 'flex';
                // Reset state
                currentScale = 1;
                currentX = 0;
                currentY = 0;
                updatePreview();
            };
            reader.readAsDataURL(file);
        }
    });
}

// Zoom Controls
if (zoomSlider) {
    zoomSlider.addEventListener('input', () => {
        currentScale = parseFloat(zoomSlider.value);
        updatePreview();
    });
}

if (zoomIn) {
    zoomIn.addEventListener('click', () => {
        currentScale = Math.min(3, currentScale + 0.1);
        updatePreview();
    });
}

if (zoomOut) {
    zoomOut.addEventListener('click', () => {
        currentScale = Math.max(1, currentScale - 0.1);
        updatePreview();
    });
}

// Drag Logic
if (imagePreview) {
    imagePreview.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
        imagePreview.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX - startX;
        currentY = e.clientY - startY;
        updatePreview();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        imagePreview.style.cursor = 'move';
    });
}

// Quick Position Buttons
posBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        posBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const pos = btn.dataset.pos;

        currentX = 0;
        currentY = 0;
        if (pos.includes('top')) currentY = 50;
        if (pos.includes('bottom')) currentY = -50;
        if (pos.includes('left')) currentX = 50;
        if (pos.includes('right')) currentX = -50;

        updatePreview();
    });
});

// Modal Actions
if (closeUploadModal) {
    closeUploadModal.addEventListener('click', () => uploadModal.style.display = 'none');
}

if (resetProfileBtn) {
    resetProfileBtn.addEventListener('click', () => {
        currentScale = 1;
        currentX = 0;
        currentY = 0;
        updatePreview();
    });
}

if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => {
        const finalStyle = {
            src: imagePreview.src,
            transform: imagePreview.style.transform
        };

        // Matching styles with preview to ensure no distortion
        profileDisplay.innerHTML = `<img src="${finalStyle.src}" style="width: 100%; height: auto; display: block; transform: ${finalStyle.transform}; border-radius: 50%;">`;
        localStorage.setItem('profile_pic_data', JSON.stringify(finalStyle));
        uploadModal.style.display = 'none';
    });
}

// Check for stored profile picture on load
window.addEventListener('load', () => {
    const saved = JSON.parse(localStorage.getItem('profile_pic_data'));
    if (saved && profileDisplay) {
        profileDisplay.innerHTML = `<img src="${saved.src}" style="width: 100%; height: auto; display: block; transform: ${saved.transform}; border-radius: 50%;">`;
    }
});


// Scroll Progress Bar Logic
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scrollProgress').style.width = scrolled + '%';
});


