document.addEventListener("DOMContentLoaded", function () {
    function enableTab(stepId) {
        const tab = document.getElementById(stepId + "-tab");
        tab.classList.remove("disabled-tab");
        tab.removeAttribute("disabled");
    }

    function switchTab(stepId) {
        const tab = new bootstrap.Tab(document.getElementById(stepId + "-tab"));
        tab.show();
    }

    // Obsługa Kroku 1
    document.getElementById("saveStep1").addEventListener("click", function () {
        const formStep1 = document.getElementById("formStep1");
        if (formStep1.checkValidity()) {
            enableTab("step2");
            switchTab("step2");
        } else {
            alert("Proszę wypełnić wszystkie wymagane pola w Kroku 1!");
        }
    });

    // Obsługa Kroku 2
    document.getElementById("saveStep2").addEventListener("click", function () {
        const formStep2 = document.getElementById("formStep2");
        if (formStep2.checkValidity()) {
            enableTab("step3");
            switchTab("step3");
        } else {
            alert("Proszę wypełnić wszystkie wymagane pola w Kroku 2!");
        }
    });

    // Obsługa Kroku 3
    document.getElementById("saveStep3").addEventListener("click", function () {
        const steps = document.getElementsByName("steps[0]");
        const isValid = Array.from(steps).every(step => step.value.trim() !== "");
        if (isValid) {
            enableTab("step4");
            switchTab("step4");
        } else {
            alert("Proszę wypełnić wszystkie kroki przygotowania!");
        }
    });

    // Dodawanie nowego składnika w Kroku 2
    document.getElementById("addIngredient").addEventListener("click", function () {
        const ingredientsList = document.getElementById("ingredients-list");
        const index = ingredientsList.children.length;

        const ingredientHTML = `
            <div class="ingredient-item">
                <div class="row mb-3">
                    <div class="col-md-5">
                        <label for="ingredient-${index}">Nazwa składnika</label>
                        <input type="text" class="form-control" id="ingredient-${index}" name="ingredients[${index}][name]" placeholder="Podaj nazwę składnika" required>
                    </div>
                    <div class="col-md-3">
                        <label for="amount-${index}">Ilość</label>
                        <input type="number" min="1" class="form-control" id="amount-${index}" name="ingredients[${index}][amount]" placeholder="Podaj ilość">
                    </div>
                    <div class="col-md-3">
                        <label for="unit-${index}">Jednostka</label>
                        <select class="form-control" id="unit-${index}" name="ingredients[${index}][unit]">
                            <option value="">Wybierz jednostkę</option>
                            <option value="g">g</option>
                            <option value="ml">ml</option>
                            <option value="łyżka">łyżka</option>
                            <option value="łyżeczka">łyżeczka</option>
                            <option value="szklanka">szklanka</option>
                            <option value="sztuka">sztuka</option>
                        </select>
                    </div>
                    <div class="col-md-1">
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <button type="button" class="btn btn-lg btn-outline-danger remove-ingredient">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        ingredientsList.insertAdjacentHTML("beforeend", ingredientHTML);

    });

    // Delegacja zdarzeń dla dynamicznie dodanych przycisków usuwania
    document.getElementById("ingredients-list").addEventListener("click", function (e) {
        // Sprawdź, czy kliknięto przycisk usuwania
        if (e.target && e.target.classList.contains("remove-ingredient")) {
            // Usuwamy najbliższy element ingredient-item
            e.target.closest(".ingredient-item").remove();
        }
    });

    // Dodawanie nowego kroku przepisu
    document.getElementById("add-step").addEventListener("click", function () {
        const stepsList = document.getElementById("steps-list");
        const index = stepsList.children.length;

        const stepHTML = `
            <div class="step-item">
                <div class="mb-3">
                    <label for="step-${index}" class="form-label">Krok ${index + 1}</label>
                    <textarea class="form-control" id="step-${index}" name="steps[${index}]" placeholder="Opisz krok przygotowania" rows="3" required></textarea>
                </div>
                <div class="text-end">
                    <button type="button" class="btn btn-danger remove-step"> 
                        <i class="bi bi-trash"></i> Usuń krok 
                    </button>
                </div>
            </div>
        `;

        stepsList.insertAdjacentHTML("beforeend", stepHTML);
    });

    // Delegacja zdarzeń dla dynamicznie dodanych przycisków usuwania
    document.getElementById("steps-list").addEventListener("click", function (e) {
        // Sprawdź, czy kliknięto przycisk usuwania
        if (e.target && e.target.classList.contains("remove-step")) {
            // Usuwamy najbliższy element ingredient-item
            e.target.closest(".step-item").remove();
        }
    });

    let recipeData = {
        title: "",
        category: "",
        difficulty: "",
        prepTime: "",
        ingredients: [],
        steps: []
    };

    // Zbieranie danych z Kroku 1
    document.getElementById("saveStep1").addEventListener("click", function () {
        const formStep1 = document.getElementById("formStep1");
        if (formStep1.checkValidity()) {
            recipeData.title = document.getElementById("title").value;
            recipeData.category = document.getElementById("category").value;
            recipeData.difficulty = document.getElementById("customRange2").value;
            recipeData.prepTime = document.getElementById("time-1").value;
            console.log(recipeData);
        }
    });

    // Zbieranie danych z Kroku 2
    document.getElementById("saveStep2").addEventListener("click", function () {
        const ingredients = document.getElementsByClassName("ingredient-item");
        recipeData.ingredients = Array.from(ingredients).map(item => ({
            name: item.querySelector(`[name*="[name]"]`).value,
            amount: item.querySelector(`[name*="[amount]"]`).value,
            unit: item.querySelector(`[name*="[unit]"]`).value
        }));
    });

    // Zbieranie danych z Kroku 3
    document.getElementById("saveStep3").addEventListener("click", function () {
        const steps = document.getElementsByClassName("step-item");
        recipeData.steps = Array.from(steps).map(item =>
            item.querySelector("textarea").value
        );
    });

    // Przesyłanie danych na serwer w Kroku 4
    document.getElementById("step4").addEventListener("submit", async function (e) {
        e.preventDefault();
        console.log(this);
        // Przesłanie danych na serwer
        const formData = new FormData();

        recipeData.date = new Date().toISOString();
        formData.append("recipeData", JSON.stringify(recipeData));

        const fileInput = document.querySelector('input[type="file"]'); // Pobierz input pliku
        if (fileInput && fileInput.files.length > 0) {
            formData.append("recipeImage", fileInput.files[0]); // Dodaj plik do FormData
        }

        try {
            const response = await fetch("/add-recipe/submit", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                alert("Przepis został zapisany! lalala");
                window.location.href = "/";
            } else {
                alert("Wystąpił błąd podczas zapisywania przepisu.");
            }
        } catch (error) {
            console.error("Błąd sieci:", error);
            alert("Nie udało się zapisać przepisu.");
        }
    });
});



