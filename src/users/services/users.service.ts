import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class UsersService {
    constructor(
        private configService: ConfigService
    ){}

    findAll(){
        const apiKey = this.configService.get('API_KEY');
        console.log(apiKey);
    }
}
