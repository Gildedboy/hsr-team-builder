import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LightconesController } from './lightcones.controller'
import { LightconesService } from './lightcones.service'
import { LightconeEntity } from '../entities/lightcone.entity'

@Module({
  imports: [TypeOrmModule.forFeature([LightconeEntity])],
  controllers: [LightconesController],
  providers: [LightconesService],
  exports: [LightconesService],
})
export class LightconesModule {}
