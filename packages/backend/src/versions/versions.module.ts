import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VersionsService } from './versions.service'
import { VersionsController } from './versions.controller'
import { VersionEntity } from '../entities/version.entity'

@Module({
  imports: [TypeOrmModule.forFeature([VersionEntity])],
  controllers: [VersionsController],
  providers: [VersionsService],
  exports: [VersionsService],
})
export class VersionsModule {}