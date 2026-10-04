import { Controller, Get, NotFoundException, Res } from '@nestjs/common';
import type { Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';

@Controller('resume')
export class ResumeController {
  @Get()
  download(@Res() res: Response) {
    const fileName = 'Smitraj_Makvana_FullStack_Resume.pdf';
    const filePath = join(process.cwd(), 'assets', fileName);

    if (!existsSync(filePath)) {
      throw new NotFoundException('Resume PDF was not found on the server');
    }

    return res.download(filePath, fileName);
  }
}
