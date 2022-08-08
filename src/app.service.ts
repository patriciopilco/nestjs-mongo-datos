import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private configService:ConfigService){}

  getHello(): string {
    const apikey = this.configService.get<string>('API_KEY');
    return `ApiKey = ${apikey}`;
  }
}
