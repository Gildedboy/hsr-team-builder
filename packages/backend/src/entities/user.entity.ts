import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ default: 'user' })
  role: string

  @Column({ default: true })
  isActive: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
