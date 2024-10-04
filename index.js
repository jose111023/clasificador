const animalForm = document.getElementById('animalForm');
const resultDiv = document.getElementById('result');

animalForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener todos los selects del formulario
    const selects = document.querySelectorAll('select');

    // Validar que todos los selects tengan un valor seleccionado
    if (!Array.from(selects).every(select => select.value)) {
        alert('Por favor, selecciona una opción para todos los campos.');
        return;
    }

    // Crear un objeto con los datos del formulario
    const formData = {};
    selects.forEach(select => {
        formData[select.id] = select.value;
    });

    // Enviar los datos al servidor
    fetch('clasificador_animales.py', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        resultDiv.textContent = `El animal clasificado es: ${data.resultado}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});