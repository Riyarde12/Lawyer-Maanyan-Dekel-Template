// EmailJS Helper Functions
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
    emailjs.send("service_ck6hb9l", "template_0dyulej", {
        title: "בדיקה 4",
        name: "ירדן ראשוני",
        time: 1234546,
        message: "בדיקה הודעה קצרה 4",
        email: "dendenrinsh@gmail.com",
    })
        .then(function () {
            // Success message
            console.log("Email sent successfully!");
            alert("ההודעה נשלחה בהצלחה! נחזור אליך בהקדם.");
            document.getElementById("contact-form").reset();
            document.getElementById("submit-btn").disabled = false;
            document.getElementById("submit-btn").textContent = "שלח עכשיו";
        }, function (error) {
            // Error message
            console.error("EmailJS error:", error);
            alert("אירעה שגיאה בשליחת ההודעה: " + error);
            document.getElementById("submit-btn").disabled = false;
            document.getElementById("submit-btn").textContent = "שלח עכשיו";
        });
}
