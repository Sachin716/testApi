import { Module } from '@nestjs/common';
import { Gateway } from './chat-gateway';

@Module({
    providers:[Gateway]
})
export class ChatModule {}
