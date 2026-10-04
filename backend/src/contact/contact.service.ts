import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private readonly filePath = join(process.cwd(), 'data', 'messages.json');

  constructor() {
    const dir = join(process.cwd(), 'data');
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    if (!existsSync(this.filePath)) {
      writeFileSync(this.filePath, '[]', 'utf8');
    }
  }

  create(dto: CreateContactDto) {
    if (dto.website?.trim()) {
      return { ok: true, message: 'Inquiry received. Thank you.' };
    }

    const name = dto.name?.trim();
    const email = dto.email?.trim();
    const subject = dto.subject?.trim() || dto.inquiryType?.trim() || 'General Connect';
    const message = dto.message?.trim();

    if (!name || !email || !message) {
      throw new BadRequestException(
        'name, email, and message are required',
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new BadRequestException('Please provide a valid email address');
    }

    const records = JSON.parse(readFileSync(this.filePath, 'utf8')) as Array<
      Record<string, unknown>
    >;

    const entry = {
      id: Date.now().toString(),
      name,
      email,
      inquiryType: dto.inquiryType?.trim() || 'General Connect',
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    records.push(entry);
    writeFileSync(this.filePath, JSON.stringify(records, null, 2), 'utf8');

    return {
      ok: true,
      message: 'Inquiry received. Smitraj will get back to you soon.',
    };
  }
}
