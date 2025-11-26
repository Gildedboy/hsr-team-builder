import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LightconeEntity } from '../entities/lightcone.entity'
import { Lightcone } from '../types/Lightcone'

@Injectable()
export class LightconesService {
  constructor(
    @InjectRepository(LightconeEntity)
    private readonly lightconeRepository: Repository<LightconeEntity>,
  ) {}

  async findAll(): Promise<Lightcone[]> {
    const lightcones = await this.lightconeRepository.find()

    return lightcones.map(this.entityToLightcone)
  }

  async findById(id: string): Promise<Lightcone | null> {
    const lightcone = await this.lightconeRepository.findOne({
      where: { id },
    })

    if (!lightcone) {
      return null
    }

    return this.entityToLightcone(lightcone)
  }

  async createLightcone(lightcone: Lightcone): Promise<Lightcone> {
    // Check if lightcone already exists
    const existing = await this.lightconeRepository.findOne({ where: { id: lightcone.id } })
    if (existing) {
      throw new Error(`Lightcone with ID "${lightcone.id}" already exists`)
    }

    const entity = this.lightconeRepository.create({
      id: lightcone.id,
      name: lightcone.name,
      rarity: lightcone.rarity,
      path: lightcone.path,
    })

    const savedEntity = await this.lightconeRepository.save(entity)
    return this.entityToLightcone(savedEntity)
  }

  async updateLightcone(id: string, updates: Partial<Lightcone>): Promise<Lightcone | null> {
    const lightcone = await this.lightconeRepository.findOne({ where: { id } })
    if (!lightcone) {
      return null
    }

    Object.assign(lightcone, updates, { updatedAt: new Date() })
    const savedEntity = await this.lightconeRepository.save(lightcone)
    return this.entityToLightcone(savedEntity)
  }

  async deleteLightcone(id: string): Promise<boolean> {
    const result = await this.lightconeRepository.delete(id)
    return result.affected > 0
  }

  private entityToLightcone(entity: LightconeEntity): Lightcone {
    return {
      id: entity.id,
      name: entity.name,
      rarity: entity.rarity as 3 | 4 | 5,
      path: entity.path as
        | 'Destruction'
        | 'Hunt'
        | 'Erudition'
        | 'Harmony'
        | 'Nihility'
        | 'Preservation'
        | 'Abundance'
        | 'Remembrance',
    }
  }
}
