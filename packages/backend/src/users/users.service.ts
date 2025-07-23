import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '../entities/user.entity'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { username } })
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } })
  }

  async findById(id: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { id } })
  }

  async create(username: string, email: string, password: string): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = new UserEntity()
    user.username = username
    user.email = email
    user.password = hashedPassword
    
    return this.userRepository.save(user)
  }

  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword)
  }
}
