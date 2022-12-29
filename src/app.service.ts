import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';

import config from './config';

@Injectable()
export class AppService {

  constructor(
    @Inject('MONGO') private database:Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ){}

  getHello(): string {
    const apikey = this.configService.apiKey;
    return `ApiKey = ${apikey}`;
  }

  getTasks() {
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
