const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formPassword input');

const expresiones = {
   password: /^.{6,12}$/, // 4 a 12 digitos.
};

const campos = {
   password: false,
};

const validarFormulario = (e) => {
   switch (e.target.name) {
      case 'password':
         validarCampo(expresiones.password, e.target, 'password');
         validarPassword2();
         break;
      case 'password2':
         validarPassword2();
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

const validarPassword2 = () => {
   const inputPassword1 = document.getElementById('password');
   const inputPassword2 = document.getElementById('password2');

   if (inputPassword1.value !== inputPassword2.value) {
      document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
      document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
      document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
      campos['password'] = false;
   } else {
      document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
      document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');

      document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
      campos['password'] = true;
   }
};

inputs.forEach((input) => {
   input.addEventListener('keyup', validarFormulario);
   input.addEventListener('blur', validarFormulario);
});
