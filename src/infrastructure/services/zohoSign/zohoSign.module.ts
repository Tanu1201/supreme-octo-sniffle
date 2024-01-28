import { Module } from '@nestjs/common';
import { ZohoSignService } from './zohoSign.service';

@Module({
  imports: [],
  providers: [ZohoSignService],
  exports: [ZohoSignService],
})
export class ZohoSignServiceModule {}
