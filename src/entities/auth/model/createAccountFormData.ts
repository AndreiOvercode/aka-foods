import * as z from 'zod';

const passMinLength = 8;
const oneSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/;
const oneUppercase = /[A-Z]/;
const oneLowercase = /[a-z]/;
const oneNumber = /[0-9]/;

export const createAccountSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email required' })
      .email('Invalid email format'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        oneSpecialChar,
        'Password must contain at least one special character',
      )
      .regex(
        oneUppercase,
        'Password must contain at least one uppercase letter',
      )
      .regex(
        oneLowercase,
        'Password must contain at least one lowercase letter',
      )
      .regex(oneNumber, 'Password must contain at least one number'),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type TCreateAccountFormType = z.infer<typeof createAccountSchema>;

export type TCreateAccountDefaultFieldItem = {
  label: string;
  name: keyof TCreateAccountFormType;
  type: 'email' | 'password' | 'text';
  placeholder: string;
  changeableType?: 'email' | 'password' | 'text';
};

export const validPassList = [
  {
    text: 'Minimum 8 characters',
    validation: (value: string) => value.length >= passMinLength,
  },
  {
    text: 'One special character',
    validation: (value: string) => oneSpecialChar.test(value),
  },
  {
    text: 'One uppercase letter',
    validation: (value: string) => oneUppercase.test(value),
  },
  {
    text: 'One lowercase letter',
    validation: (value: string) => oneLowercase.test(value),
  },
  {
    text: 'One number',
    validation: (value: string) => oneNumber.test(value),
  },
  {
    text: 'Passwords do match',
    validation: (pass: string, confirmPass: string) =>
      pass && confirmPass && pass === confirmPass,
  },
];

export const createAccountDefaultValues: TCreateAccountFormType = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const createAccountDefaultFields: TCreateAccountDefaultFieldItem[] = [
  {
    label: 'Email address',
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
  },
  {
    label: 'Confirm the password',
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm the password',
  },
];
