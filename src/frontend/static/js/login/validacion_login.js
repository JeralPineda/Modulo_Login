const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formLogin input');

const expresiones = {
   password: /^.{6,12}$/, // 4 a 12 digitos.
   correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-z]{3}$/,
   usuario: /^[a-zA-ZÀ-ÿ0-9\_\-\s]{6,30}$/, // Letras y espacios, pueden llevar acentos
};

const campos = {
   password: false,
   correo: false,
   usuario: false,
};

const validarFormulario = (e) => {
   switch (e.target.name) {
      case 'password':
         validarCampo(expresiones.password, e.target, 'password');
         break;
      case 'correo':
         validarCampo(expresiones.correo, e.target, 'correo');
         break;
      case 'usuario':
         validarCampo(expresiones.usuario, e.target, 'usuario');
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

// formulario.addEventListener('submit', (e) => {
//    e.preventDefault();

//    const terminos = document.getElementById('terminos');
//    if (campos.usuario && campos.password && campos.correo && terminos.checked) {
//       formulario.reset();

//       document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
//       setTimeout(() => {
//          document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
//       }, 5000);
//    } else {
//       document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
//    }
// });
