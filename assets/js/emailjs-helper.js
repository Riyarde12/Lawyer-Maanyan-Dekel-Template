// EmailJS Helper Functions

// Create notification popup element if it doesn't exist
function createNotificationPopup() {
    if (!document.getElementById("notification-popup")) {
        // First load the CSS if not already loaded
        if (!document.getElementById("notification-css")) {
            const link = document.createElement("link");
            link.id = "notification-css";
            link.rel = "stylesheet";
            link.href = "assets/css/notification.css";
            document.head.appendChild(link);
        }

        const popup = document.createElement("div");
        popup.id = "notification-popup";
        popup.className = "notification-popup";

        const popupContent = document.createElement("div");
        popupContent.className = "notification-content";

        const popupIcon = document.createElement("div");
        popupIcon.className = "notification-icon";
        popupContent.appendChild(popupIcon);

        const popupMessage = document.createElement("div");
        popupMessage.className = "notification-message";
        popupContent.appendChild(popupMessage);

        const closeBtn = document.createElement("button");
        closeBtn.className = "notification-close";
        closeBtn.innerHTML = "×";
        closeBtn.onclick = function () {
            hideNotification();
        };
        popupContent.appendChild(closeBtn);

        // Add OK button for interaction
        const okBtn = document.createElement("button");
        okBtn.className = "notification-btn";
        okBtn.innerHTML = "אישור";
        okBtn.onclick = function () {
            hideNotification();
        };
        popupContent.appendChild(okBtn);

        popup.appendChild(popupContent);
        document.body.appendChild(popup);
    }
}

// Show notification with message
function showNotification(message, type) {
    createNotificationPopup();
    const popup = document.getElementById("notification-popup");
    const icon = popup.querySelector(".notification-icon");
    const msgElement = popup.querySelector(".notification-message");

    // Set message and type
    msgElement.textContent = message;
    icon.className = "notification-icon " + type;

    // Show popup
    popup.classList.add("show");

    // Hide popup after a delay if it's a success message
    if (type === "success") {
        setTimeout(() => {
            hideNotification();
        }, 4000);
    }
}

// Hide notification
function hideNotification() {
    const popup = document.getElementById("notification-popup");
    if (popup) {
        popup.classList.remove("show");
    }
}

function sendEmailWithTemplateParams(e) {
    e.preventDefault();

    // Show loading indicator
    document.getElementById("submit-btn").disabled = true;
    document.getElementById("submit-btn").textContent = "שולח...";

    // Create template parameters object to ensure all fields are sent properly
    const templateParams = {
        name: document.getElementById('from_name').value,
        email: document.getElementById('user_email').value,
        title: document.getElementById('subject').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Send email using EmailJS send method with parameters object
    emailjs.send("service_ck6hb9l", "template_0dyulej", templateParams)
        .then(function () {
            // Success message
            console.log("Email sent successfully!");
            showNotification("ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.", "success");
            document.getElementById("contact-form").reset();
            document.getElementById("submit-btn").disabled = false;
            document.getElementById("submit-btn").textContent = "שלח עכשיו";
        }, function (error) {
            // Error message
            console.error("EmailJS error:", error);
            showNotification("אירעה שגיאה בשליחת ההודעה. נא לנסות שוב מאוחר יותר.", "error");
            document.getElementById("submit-btn").disabled = false;
            document.getElementById("submit-btn").textContent = "שלח עכשיו";
        });
}
