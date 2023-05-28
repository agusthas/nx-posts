import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  imports: [HttpModule],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
