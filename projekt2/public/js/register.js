const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Hasła nie są takie same. Proszę spróbować ponownie.');
        return;
    }

    const formData = new FormData(registerForm);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    fetch('/registration', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Użytkownik o tym adresie e-mail już istnieje.') {
                alert(data.message);
            } else if (data.message === 'Użytkownik zarejestrowany pomyślnie.') {
                alert(data.message);
                window.location.href = '/login';
            }
        })
        .catch(error => {
            console.error('Błąd:', error);
            alert('Wystąpił błąd podczas rejestracji. Spróbuj ponownie później.');
        });
});
