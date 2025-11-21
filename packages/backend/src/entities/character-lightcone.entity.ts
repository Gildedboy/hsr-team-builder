import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { CharacterEntity } from './character.entity';
import { LightconeEntity } from './lightcone.entity';

@Entity('character_lightcones')
export class CharacterLightconeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CharacterEntity, character => character.characterLightcones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'character_id' })
  character: CharacterEntity;

  @ManyToOne(() => LightconeEntity, lightcone => lightcone.characterLightcones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lightcone_id' })
  lightcone: LightconeEntity;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
