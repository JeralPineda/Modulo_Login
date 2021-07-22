const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formCorreo input');

const expresiones = {
   correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-z]{3}$/,
};

const campos = {
   correo: false,
};

const validarFormulario = (e) => {
   switch (e.target.name) {
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
