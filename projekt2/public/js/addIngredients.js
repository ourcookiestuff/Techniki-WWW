let ingredientIndex = 1;

document.getElementById('add-ingredient').addEventListener('click', function () {
    const ingredientsList = document.getElementById('ingredients-list');

    const newIngredient = document.createElement('div');
    newIngredient.classList.add('ingredient-item');
    newIngredient.innerHTML = `
    <div class="row mb-3">
      <div class="col-md-6">
        <label for="ingredient-${ingredientIndex}">Nazwa składnika</label>
        <input type="text" class="form-control" id="ingredient-${ingredientIndex}" name="ingredients[${ingredientIndex}][name]" placeholder="Podaj nazwę składnika" required>
      </div>
      <div class="col-md-3">
        <label for="amount-${ingredientIndex}">Ilość</label>
        <input type="number" class="form-control" id="amount-${ingredientIndex}" name="ingredients[${ingredientIndex}][amount]" placeholder="Podaj ilość" required>
      </div>
      <div class="col-md-3">
        <label for="unit-${ingredientIndex}">Jednostka</label>
        <select class="form-control" id="unit-${ingredientIndex}" name="ingredients[${ingredientIndex}][unit]" required>
          <option value="">Wybierz jednostkę</option>
          <option value="g">g</option>
          <option value="ml">ml</option>
          <option value="łyżka">łyżka</option>
          <option value="łyżeczka">łyżeczka</option>
          <option value="szklanka">szklanka</option>
          <option value="sztuka">sztuka</option>
        </select>
      </div>
    </div>
  `;

    ingredientsList.appendChild(newIngredient);
    ingredientIndex++;
});
