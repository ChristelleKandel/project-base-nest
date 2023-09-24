import { Injectable } from '@nestjs/common';

// on utilise le decorateur Injectable pour transformer une class en service
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
