export const es = {
  auth: {
    login: {
      title: 'Bienvenido a KLEOS',
      subtitle: 'Inicia sesion para continuar',
      email: 'Email',
      password: 'Contrasena',
      signIn: 'Iniciar sesion',
      register: 'Registrate ->',
      noAccount: 'No tienes cuenta?',
    },
    register: {
      stepLabel: (current: number, total: number) =>
        `Paso ${current} de ${total}`,
      validation: {
        firstNameRequired: 'El nombre es obligatorio',
        lastNameRequired: 'El apellido es obligatorio',
        birthDateRequired: 'La fecha de nacimiento es obligatoria',
        emailRequired: 'El email es obligatorio',
        emailInvalid: 'Ingresa un email valido',
        passwordRequired: 'La contrasena es obligatoria',
        passwordMinLength: 'La contrasena debe tener al menos 6 caracteres',
        confirmPasswordRequired: 'Confirma tu contrasena',
        passwordsDoNotMatch: 'Las contrasenas no coinciden',
      },
      step1: {
        back: 'Volver',
        title: 'Crea tu cuenta',
        subtitle: 'Completa tus datos basicos para empezar.',
        roleTitle: 'Cual es tu rol?',
        roles: {
          coach: 'Coach',
          athlete: 'Atleta',
        },
        firstName: 'Nombre',
        firstNamePlaceholder: 'Juan',
        lastName: 'Apellido',
        lastNamePlaceholder: 'Perez',
        birthDate: 'Fecha de nacimiento',
        birthDatePlaceholder: '01/01/1990',
        email: 'Email',
        emailPlaceholder: 'juan@email.com',
        password: 'Contrasena',
        confirmPassword: 'Confirmar contrasena',
        passwordPlaceholder: '********',
        next: 'Siguiente ->',
      },
      step2: {
        title: 'Registro iniciado',
        subtitle: (step: number) =>
          `Tu cuenta fue creada. Continuaremos desde el paso ${step}.`,
        disabledAction: 'Proximo paso pendiente',
      },
    },
  },
};
