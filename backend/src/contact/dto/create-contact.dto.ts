export class CreateContactDto {
  name: string;
  email: string;
  inquiryType?: string;
  subject?: string;
  message: string;
  website?: string;
}
