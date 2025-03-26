document.getElementById('loginForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Zalogowano pomyślnie') {
                window.location.href = '/';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Błąd:', error);
            alert('Wystąpił błąd podczas logowania.');
        });
});
