//Capturar el elemento del DOM donde se mostrará el calendario
const element = document.getElementById("calendar");

// Configuración del calendario
const options = {
  autohide: true,
  format: "dd/mm/yyyy",
  todayHighlight: true,
  maxDate: new Date(), // Evita seleccionar fechas futuras
};

// Crear una instancia del calendario, pasando el elemento y las opciones de configuración
const datapicker = new Datepicker(element, options);

// Agregar un evento para detectar cuando se selecciona una fecha
// El evento 'changeDate' se dispara cuando se selecciona una fecha en el calendario
element.addEventListener("changeDate", function () {
  // 1. Obtener la fecha seleccionada
  const selectedDate = datapicker.getDate();

  // 2. Convertir la fecha seleccionada a un objeto DateTime de Luxon
  const selectedDateTime = luxon.DateTime.fromJSDate(selectedDate);

  // 3. Obtenemos la fecha de "hoy" para compararla con la fecha seleccionada
  const now = luxon.DateTime.now();

  // 4. Calculamos la diferencia en días entre la fecha seleccionada y la fecha actual
  const difference = now
    .diff(selectedDateTime, ["years", "months", "days"])
    .toObject();

  // 5. Verificar si la fecha seleccionada es mayor a la fecha actual (fecha futura)
  if (selectedDateTime > now) {
    alert("The date cannot be in the future. Please select a valid date.");
    return;
  }

  // 6. Mostrar resultado en el div "result"
  const resultDiv = document.getElementById("result");
  // Eliminar la clase "hidden" para mostrar el div de resultado
  resultDiv.classList.remove("hidden");

  resultDiv.textContent = `Your are  ${Math.floor(difference.years)} years, 
        ${Math.floor(difference.months)} months and 
        ${Math.floor(difference.days)} days old.`;
});

