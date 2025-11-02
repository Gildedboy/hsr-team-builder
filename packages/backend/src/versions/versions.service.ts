import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { VersionEntity } from '../entities/version.entity'
import { ChangelogQueryDto, CreateVersionDto, ReplaceVersionDto, UpdateVersionDto } from '../dto/version.dto'

@Injectable()
export class VersionsService {
  private readonly logger = new Logger(VersionsService.name)
  private static readonly MAX_CHANGELOG_LIMIT = 20

  constructor(
    @InjectRepository(VersionEntity)
    private readonly versionRepository: Repository<VersionEntity>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async seedVersions(): Promise<{ message: string; count: number }> {
    const seedData = [
      {
        version: 'v2.6.2',
        title: 'Responsive Character Details Fix',
        description: 'Improved mobile and desktop experience with better character detail layouts.',
        releaseDate: '2025-11-01',
        features: [
          'Responsive character details layout improvements',
          'Better mobile experience across all screen sizes',
          'Fixed text crowding on medium screens',
          'Improved character info visibility',
          'Dynamic version information system'
        ],
        bugFixes: [
          'Character details no longer hidden on smaller screens',
          'Mobile layout properly activates at correct breakpoints',
          'Fixed minimum width causing horizontal scroll issues'
        ],
        breakingChanges: [],
        knownIssues: [],
        isActive: true,
        isPrerelease: false
      },
      {
        version: 'v2.6.1',
        title: 'Performance Improvements',
        description: 'General performance improvements and bug fixes.',
        releaseDate: '2025-10-30',
        features: [
          'Performance optimizations',
          'Improved API response times'
        ],
        bugFixes: [
          'Various stability improvements',
          'Memory usage optimizations'
        ],
        breakingChanges: [],
        knownIssues: [],
        isActive: true,
        isPrerelease: false
      },
      {
        version: 'v2.6.0',
        title: 'Major Feature Release',
        description: 'New features and improvements to the team building experience.',
        releaseDate: '2025-10-25',
        features: [
          'Enhanced team recommendations',
          'Improved character filtering',
          'Better search functionality'
        ],
        bugFixes: [
          'Fixed various UI issues',
          'Improved mobile responsiveness'
        ],
        breakingChanges: [],
        knownIssues: [],
        isActive: true,
        isPrerelease: false
      }
    ]

    let seededCount = 0
    for (const versionData of seedData) {
      try {
        await this.create(versionData as CreateVersionDto)
        seededCount++
      } catch (error) {
        if (error instanceof Error && error.message.includes('already exists')) {
          this.logger.log(`Version ${versionData.version} already exists, skipping...`)
        } else {
          this.logger.error(`Failed to seed version ${versionData.version}:`, error)
        }
      }
    }

    this.logger.log(`✅ Seeded ${seededCount} versions`)
    return { message: `Seeded ${seededCount} versions successfully`, count: seededCount }
  }

  async clearVersions(): Promise<{ message: string; cleared: number }> {
    const versions = await this.versionRepository.find()
    const count = versions.length
    
    await this.versionRepository.remove(versions)
    await this.clearCache()
    
    this.logger.log(`🗑️ Cleared ${count} versions from database`)
    return { message: `Cleared ${count} versions successfully`, cleared: count }
  }

  async create(createVersionDto: CreateVersionDto): Promise<VersionEntity> {
    // Check if version already exists
    const existingVersion = await this.versionRepository.findOne({
      where: { version: createVersionDto.version },
    })

    if (existingVersion) {
      throw new BadRequestException(`Version ${createVersionDto.version} already exists`)
    }

    const version = this.versionRepository.create({
      ...createVersionDto,
      features: createVersionDto.features || [],
      bugFixes: createVersionDto.bugFixes || [],
      breakingChanges: createVersionDto.breakingChanges || [],
      knownIssues: createVersionDto.knownIssues || [],
      roadmapItems: createVersionDto.roadmapItems || [],
      isActive: createVersionDto.isActive ?? true,
      isPrerelease: createVersionDto.isPrerelease ?? false,
    })

    const savedVersion = await this.versionRepository.save(version)

    // Clear cache when new version is created
    await this.clearCache()

    return savedVersion
  }

  async findOne(version: string): Promise<VersionEntity> {
    const cacheKey = `version:${version}`
    
    // Try to get from cache first
    let versionData = await this.cacheManager.get<VersionEntity>(cacheKey)
    
    if (!versionData) {
      versionData = await this.versionRepository.findOne({
        where: { version, isActive: true },
      })

      if (!versionData) {
        throw new NotFoundException(`Version ${version} not found`)
      }

      // Cache for 30 minutes
      await this.cacheManager.set(cacheKey, versionData, 1800000)
    }

    return versionData
  }

  findAll(): Promise<VersionEntity[]> {
    return this.versionRepository.find({
      where: { isActive: true },
      order: { releaseDate: 'DESC', createdAt: 'DESC' },
    })
  }

  async getChangelog(query: ChangelogQueryDto): Promise<VersionEntity[]> {
    const limit = Math.min(Number.parseInt(query.limit || '5', 10), VersionsService.MAX_CHANGELOG_LIMIT) // Max limit entries
    const cacheKey = `changelog:${limit}:${query.includePrerelease || false}`
    
    // Try to get from cache first
    let changelog = await this.cacheManager.get<VersionEntity[]>(cacheKey)
    
    if (!changelog) {
      const queryBuilder = this.versionRepository
        .createQueryBuilder('version')
        .where('version.isActive = :isActive', { isActive: true })
        .orderBy('version.releaseDate', 'DESC')
        .addOrderBy('version.createdAt', 'DESC')
        .take(limit)

      if (!query.includePrerelease) {
        queryBuilder.andWhere('version.isPrerelease = :isPrerelease', { isPrerelease: false })
      }

      changelog = await queryBuilder.getMany()

      // Cache for 15 minutes
      await this.cacheManager.set(cacheKey, changelog, 900000)
    }

    return changelog
  }

  async getRoadmap(): Promise<string[]> {
    const cacheKey = 'roadmap-items'
    
    // Try to get from cache first
    let roadmapItems = await this.cacheManager.get<string[]>(cacheKey)
    
    if (!roadmapItems) {
      const versions = await this.versionRepository.find({
        where: { isActive: true },
        select: ['roadmapItems'],
      })

      // Flatten all roadmap items from all versions and remove duplicates
      roadmapItems = [...new Set(versions.flatMap(v => v.roadmapItems || []))].filter(item => item.trim() !== '')

      // Cache for 30 minutes
      await this.cacheManager.set(cacheKey, roadmapItems, 1800000)
    }

    return roadmapItems
  }

  async replace(version: string, replaceVersionDto: ReplaceVersionDto): Promise<VersionEntity> {
    const existingVersion = await this.versionRepository.findOne({
      where: { version },
    })

    if (!existingVersion) {
      throw new NotFoundException(`Version ${version} not found`)
    }

    // For PUT (replace), we replace ALL fields except version, id, createdAt, updatedAt
    const replacedVersion = this.versionRepository.create({
      ...existingVersion, // Keep id, version, createdAt
      ...replaceVersionDto,
      // Ensure arrays are properly set (empty if not provided)
      features: replaceVersionDto.features || [],
      bugFixes: replaceVersionDto.bugFixes || [],
      breakingChanges: replaceVersionDto.breakingChanges || [],
      knownIssues: replaceVersionDto.knownIssues || [],
      roadmapItems: replaceVersionDto.roadmapItems || [],
      isActive: replaceVersionDto.isActive ?? true,
      isPrerelease: replaceVersionDto.isPrerelease ?? false,
    })

    const savedVersion = await this.versionRepository.save(replacedVersion)

    // Clear cache when version is replaced
    await this.clearCache()

    return savedVersion
  }

  async update(version: string, updateVersionDto: UpdateVersionDto): Promise<VersionEntity> {
    const existingVersion = await this.versionRepository.findOne({
      where: { version },
    })

    if (!existingVersion) {
      throw new NotFoundException(`Version ${version} not found`)
    }

    Object.assign(existingVersion, updateVersionDto)
    const updatedVersion = await this.versionRepository.save(existingVersion)

    // Clear cache when version is updated
    await this.clearCache()

    return updatedVersion
  }

  async remove(version: string): Promise<void> {
    const existingVersion = await this.versionRepository.findOne({
      where: { version },
    })

    if (!existingVersion) {
      throw new NotFoundException(`Version ${version} not found`)
    }

    // Soft delete by setting isActive to false
    existingVersion.isActive = false
    await this.versionRepository.save(existingVersion)

    // Clear cache when version is deleted
    await this.clearCache()
  }

  async getLatestVersion(): Promise<VersionEntity | null> {
    const cacheKey = 'latest-version'
    
    let latestVersion = await this.cacheManager.get<VersionEntity>(cacheKey)
    
    if (!latestVersion) {
      latestVersion = await this.versionRepository.findOne({
        where: { isActive: true, isPrerelease: false },
        order: { releaseDate: 'DESC', createdAt: 'DESC' },
      })

      if (latestVersion) {
        // Cache for 1 hour
        await this.cacheManager.set(cacheKey, latestVersion, 3600000)
      }
    }

    return latestVersion
  }

  private async clearCache(): Promise<void> {
    // Clear all version-related cache entries
    const keys = ['latest-version', 'roadmap-items']
    
    // Generate possible cache keys for versions and changelog
    const versions = await this.versionRepository.find({ select: ['version'] })
    for (const version of versions) {
      keys.push(`version:${version.version}`)
    }
    
    // Add changelog cache keys (common combinations)
    for (let i = 1; i <= VersionsService.MAX_CHANGELOG_LIMIT; i++) {
      keys.push(`changelog:${i}:false`, `changelog:${i}:true`)
    }

    // Clear all keys
    await Promise.all(keys.map(key => this.cacheManager.del(key)))
  }
}