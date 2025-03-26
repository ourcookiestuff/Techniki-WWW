document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("newsletter-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        alert(`Dziękujemy za zapisanie się do newslettera, ${email}!`);
        this.reset();
    });
});
