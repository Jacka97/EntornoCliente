// Selecciona todos los campos del formulario
const campos = document.querySelectorAll('#formulario input, #formulario select');

// Agrega un evento de escucha para el evento invalid
campos.forEach(campo => {
  campo.addEventListener('invalid', (evento) => {
    // Evita que se muestre el mensaje de error por defecto
    evento.preventDefault();

    // Obtiene el mensaje de error personalizado
    const mensajeError = obtenerMensajeError(campo);

    // Establece el mensaje de error personalizado
    campo.setCustomValidity(mensajeError);

    // Muestra el mensaje de error
    campo.reportValidity();
  });

  // Resetea el mensaje de error cuando el campo es válido
  campo.addEventListener('input', () => {
    campo.setCustomValidity(''); // Resetea el mensaje de error
  });
});

// Función para obtener el mensaje de error personalizado
function obtenerMensajeError(campo) {
  const tipo = campo.type;
  const valor = campo.value;
  const minlength = campo.minLength;
  const maxlength = campo.maxLength;
  const pattern = campo.pattern;

  if (tipo === 'text' || tipo === 'email') {
    if (valor.length < minlength) {
      return `El campo debe tener al menos ${minlength} caracteres`;
    } else if (maxlength && valor.length > maxlength) {
      return `El campo no debe superar los ${maxlength} caracteres`;
    }
  } else if (tipo === 'number') {
    const min = campo.min;
    const max = campo.max;
    if (valor < min) {
      return `El valor debe ser mayor o igual a ${min}`;
    } else if (valor > max) {
      return `El valor no debe superar ${max}`;
    }
  } else if (pattern) {
    const regex = new RegExp(pattern);
    if (!regex.test(valor)) {
      return `El formato del campo es incorrecto`;
    }
  }

  return 'El campo es obligatorio';
}