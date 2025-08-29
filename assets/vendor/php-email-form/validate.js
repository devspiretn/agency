(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      Email(); // Call your Email function on form submission
    });
  });

})();

function Email() {
  let thisForm = document.querySelector('.php-email-form');
  
  // Show loading, hide messages
  thisForm.querySelector('.loading').classList.add('d-block');
  thisForm.querySelector('.error-message').classList.remove('d-block');
  thisForm.querySelector('.sent-message').classList.remove('d-block');

  // Validate form first
  if (!validateForm(thisForm)) {
    displayError(thisForm, 'Veuillez remplir correctement tous les champs obligatoires.');
    thisForm.querySelector('.loading').classList.remove('d-block');
    return;
  }

  // Get form data - FIXED THE TYPOS IN YOUR ORIGINAL CODE
  let emailsParms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
    date: new Date().toLocaleString()
  };

  // Replace with your actual EmailJS IDs
  const service_ID = "service_5eiokpi";
  const template_ID = "template_wltzw0w";

  emailjs
    .send(service_ID, template_ID, emailsParms)
    .then((res) => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.add('d-block');
      
      // Clear form fields
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
      
      console.log("E-mail envoyé avec succès !", res);
    })
    .catch((err) => {
      displayError(thisForm, `Échec de l'envoi du message. Veuillez réessayer ultérieurement.`);
      console.error('EmailJS error:', err);
    });
}

function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.style.borderColor = 'red';
    } else {
      input.style.borderColor = '';
    }
  });

  // Validate email format
  const emailInput = form.querySelector('input[type="email"]');
  if (emailInput && emailInput.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      isValid = false;
      emailInput.style.borderColor = 'red';
    }
  }

  return isValid;
}

function displayError(form, error) {
  form.querySelector('.loading').classList.remove('d-block');
  form.querySelector('.error-message').innerHTML = error;
  form.querySelector('.error-message').classList.add('d-block');
}