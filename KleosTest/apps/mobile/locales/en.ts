export const en = {
  auth: {
    login: {
      title: 'Welcome to KLEOS',
      subtitle: 'Sign in to continue',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign In',
      register: 'Register ->',
      noAccount: "Don't have an account?",
    },
    register: {
      stepLabel: (current: number, total: number) =>
        `Step ${current} of ${total}`,
      validation: {
        firstNameRequired: 'First name is required',
        lastNameRequired: 'Last name is required',
        birthDateRequired: 'Birth date is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Enter a valid email',
        passwordRequired: 'Password is required',
        passwordMinLength: 'Password must be at least 6 characters',
        confirmPasswordRequired: 'Confirm your password',
        passwordsDoNotMatch: 'Passwords do not match',
      },
      step1: {
        back: 'Back',
        title: 'Create your account',
        subtitle: 'Complete your basic information to get started.',
        roleTitle: 'What is your role?',
        roles: {
          coach: 'Coach',
          athlete: 'Athlete',
        },
        firstName: 'First name',
        firstNamePlaceholder: 'John',
        lastName: 'Last name',
        lastNamePlaceholder: 'Perez',
        birthDate: 'Birth date',
        birthDatePlaceholder: '01/01/1990',
        email: 'Email',
        emailPlaceholder: 'john@email.com',
        password: 'Password',
        confirmPassword: 'Confirm password',
        passwordPlaceholder: '********',
        next: 'Next ->',
      },
      step2: {
        title: 'Registration started',
        subtitle: (step: number) =>
          `Your account was created. We will continue from step ${step}.`,
        disabledAction: 'Next step pending',
      },
    },
  },
};
