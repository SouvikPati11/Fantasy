document.addEventListener('DOMContentLoaded', () => {

    // Navigation Menu Logic
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('nav-menu');
    const closeIcon = document.getElementById('close-icon');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('#nav-menu a');

    const openMenu = () => {
        navMenu.classList.add('active');
        overlay.classList.add('active');
    };

    const closeMenu = () => {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
    };

    menuIcon.addEventListener('click', openMenu);
    closeIcon.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    

    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.faq-answer').style.maxHeight = 0;
            }

            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = 0;
            }
        });
    });

    // Razorpay Payment Logic
    const paymentButtons = document.querySelectorAll('#pay-button, #pay-button-2, .join-now-btn-nav');
    const successModal = document.getElementById('success-modal');
    const telegramLink = document.getElementById('telegram-link');
    
    // !!! IMPORTANT: REPLACE WITH YOUR ACTUAL LINK !!!
    const privateTelegramLink = "https://t.me/your_private_channel_link"; 
    
    const razorpayOptions = {
        "key": "YOUR_RAZORPAY_KEY_ID", // !!! IMPORTANT: REPLACE WITH YOUR KEY ID !!!
        "amount": "49900", // Amount is in currency subunits. 499 * 100 = 49900 paise
        "currency": "INR",
        "name": "Fantasy Experts Club",
        "description": "Lifetime Membership Access",
        "image": "https://i.imgur.com/gJnJzJ4.png", // A sample logo
        "handler": function (response) {
            // This function is called after a successful payment
            console.log(response);
            telegramLink.href = privateTelegramLink;
            successModal.classList.add('show');
        },
        "prefill": {
            "name": "", // You can prefill user's name
            "email": "", // You can prefill user's email
            "contact": "" // You can prefill user's phone number
        },
        "notes": {
            "address": "Fantasy Experts Club Purchase"
        },
        "theme": {
            "color": "#667eea"
        }
    };

    const openCheckout = (e) => {
        e.preventDefault(); // prevent default link behavior for nav button
        const rzp = new Razorpay(razorpayOptions);
        rzp.open();
    };
    
    paymentButtons.forEach(button => {
        button.addEventListener('click', openCheckout);
    });

});