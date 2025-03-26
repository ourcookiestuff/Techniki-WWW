let stepIndex = 1;

document.getElementById('add-step').addEventListener('click', function () {
    const stepsList = document.getElementById('steps-list');

    const newStep = document.createElement('div');
    newStep.classList.add('step-item');
    newStep.innerHTML = `
    <div class="mb-3">
      <label for="step-${stepIndex}" class="form-label">Krok ${stepIndex + 1}</label>
      <textarea class="form-control" id="step-${stepIndex}" name="steps[${stepIndex}]" placeholder="Opisz krok przygotowania" rows="3" required></textarea>
    </div>
  `;

    stepsList.appendChild(newStep);
    stepIndex++;
});
