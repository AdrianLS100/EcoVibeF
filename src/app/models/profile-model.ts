export class Profile {
  id: number;
  username: string;
  email: string;
  huellaTotalKgCO2e: number;
  nombreFamilia?: string;
}

export class UpdatePassword {
  newPassword: string;
}
