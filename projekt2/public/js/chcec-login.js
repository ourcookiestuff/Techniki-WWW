document.addEventListener("DOMContentLoaded", () => {
    fetch('/check-login')
        .then(response => response.json())
        .then(data => {
            const dropdownMenu = document.getElementById('obkonta');

            const addRecipeLink = document.getElementById('addRecipeLink');
            if (!data.loggedIn) {
                addRecipeLink.classList.add('disabled');
            }

            if (data.loggedIn) {
                dropdownMenu.innerHTML = `
                    <li><span class="dropdown-item disabled">Witaj, ${data.user.name}!</span></li>
                    <li><a class="dropdown-item" href="#" id="logout">Wyloguj</a></li>
                `;

                document.getElementById('logout').addEventListener('click', () => {
                    fetch('/logout', { method: 'POST' })
                        .then(response => response.json())
                        .then(() =>
                        {
                            location.reload()
                            window.location.href = '/login';
                        });
                });
            }
        });
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".category-link").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const category = this.dataset.category;
            window.location.href = `/category?category=${encodeURIComponent(category)}`;
        });
    });
});