const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formPreguntas input');

const expresiones = {
   respuesta: /^[a-zA-ZÀ-ÿ0-9\_\-\s]{4,20}$/, // Letras, numeros, guion y guion_bajo
   correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-z]{3}$/,
};

const campos = {
   respuesta: false, //el respuesta es la respuesta  ingresada
   correo: false,
};

const validarFormulario = (e) => {
   switch (e.target.name) {
      case 'respuesta':
         validarCampo(expresiones.respuesta, e.target, 'respuesta');
         break;
      case 'correo':
         validarCampo(expresiones.correo, e.target, 'correo');
         break;
   }
};

const validarCampo = (expresion, input, campo) => {
   if (expresion.test(input.value)) {
      document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
      document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
      document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
      campos[campo] = true;
   } else {
      document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
      document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
      document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
      campos[campo] = false;
   }
};

inputs.forEach((input) => {
   input.addEventListener('keyup', validarFormulario);
   input.addEventListener('blur', validarFormulario);
});
