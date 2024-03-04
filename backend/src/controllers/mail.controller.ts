import { Controller } from '@nestjs/common';
import { MailService } from 'src/services/mail.service';

@Controller('email')
export class MailController {
  constructor(private mailService: MailService) {}
}
