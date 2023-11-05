export class LoginDto {
  email: string;
  password: string;
}

export class RegistrationDto extends LoginDto {
  confirmPassword: string;
}
