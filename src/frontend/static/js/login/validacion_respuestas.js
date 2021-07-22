const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formRespuestas input');

const expresiones = {
   respuesta: /^[a-zA-ZÀ-ÿ0-9\_\-\s]{4,20}$/, // Letras, numeros,
   respuesta2: /^[a-zA-ZÀ-ÿ0-9\_\-\s]{4,20}$/,
};

const campos = {
   respuesta: false,
   respuesta2: false,
};

const validarFormulario = (e) => {
   switch (e.target.name) {
      case 'respuesta':
         validarCampo(expresiones.respuesta, e.target, 'respuesta');
         break;
      case 'respuesta2':
         validarCampo(expresiones.respuesta, e.target, 'respuesta2');
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
