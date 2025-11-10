// Lightcone ID to asset mapping (based on your actual image files)
const lightconeAssetMap: Record<string, string> = {
  // 4-star lightcones (20xxx series)
  'insert-id-here-20000': '20000',
  'insert-id-here-20001': '20001',
  'insert-id-here-20002': '20002',
  'insert-id-here-20003': '20003',
  'insert-id-here-20004': '20004',
  'insert-id-here-20005': '20005',
  'insert-id-here-20006': '20006',
  'insert-id-here-20007': '20007',
  'insert-id-here-20008': '20008',
  'insert-id-here-20009': '20009',
  'insert-id-here-20010': '20010',
  'insert-id-here-20011': '20011',
  'insert-id-here-20012': '20012',
  'insert-id-here-20013': '20013',
  'insert-id-here-20014': '20014',
  'insert-id-here-20015': '20015',
  'insert-id-here-20016': '20016',
  'insert-id-here-20017': '20017',
  'insert-id-here-20018': '20018',
  'insert-id-here-20019': '20019',
  'insert-id-here-20020': '20020',
  'insert-id-here-20021': '20021',
  'insert-id-here-20022': '20022',

  // 5-star lightcones (21xxx series)
  'insert-id-here-21000': '21000',
  'insert-id-here-21001': '21001',
  'insert-id-here-21002': '21002',
  'insert-id-here-21003': '21003',
  'insert-id-here-21004': '21004',
  'insert-id-here-21005': '21005',
  'insert-id-here-21006': '21006',
  'insert-id-here-21007': '21007',
  'insert-id-here-21008': '21008',
  'insert-id-here-21009': '21009',
  'insert-id-here-21010': '21010',
  'insert-id-here-21011': '21011',
  'insert-id-here-21012': '21012',
  'insert-id-here-21013': '21013',
  'insert-id-here-21014': '21014',
  'insert-id-here-21015': '21015',
  'insert-id-here-21016': '21016',
  'insert-id-here-21017': '21017',
  'insert-id-here-21018': '21018',
  'insert-id-here-21019': '21019',
  'insert-id-here-21020': '21020',
  'insert-id-here-21021': '21021',
  'insert-id-here-21022': '21022',
  'insert-id-here-21023': '21023',
  'insert-id-here-21024': '21024',
  'insert-id-here-21025': '21025',
  'insert-id-here-21026': '21026',
  'insert-id-here-21027': '21027',
  'insert-id-here-21028': '21028',
  'insert-id-here-21029': '21029',
  'insert-id-here-21030': '21030',
  'insert-id-here-21031': '21031',
  'insert-id-here-21032': '21032',
  'insert-id-here-21033': '21033',
  'insert-id-here-21034': '21034',
  'insert-id-here-21035': '21035',
  'insert-id-here-21036': '21036',
  'insert-id-here-21037': '21037',
  'insert-id-here-21038': '21038',
  'insert-id-here-21039': '21039',
  'insert-id-here-21040': '21040',
  'insert-id-here-21041': '21041',
  'insert-id-here-21042': '21042',
  'insert-id-here-21043': '21043',
  'insert-id-here-21044': '21044',
  'insert-id-here-21045': '21045',
  'insert-id-here-21046': '21046',
  'insert-id-here-21047': '21047',
  'insert-id-here-21048': '21048',
  'insert-id-here-21050': '21050', // Note: 21049 missing
  'insert-id-here-21051': '21051',
  'insert-id-here-21052': '21052',
  'insert-id-here-21053': '21053',
  'insert-id-here-21054': '21054',
  'insert-id-here-21055': '21055',
  'insert-id-here-21056': '21056',
  'insert-id-here-21057': '21057',
  'insert-id-here-21058': '21058',
  'insert-id-here-21060': '21060', // Note: 21059 missing
  'insert-id-here-21061': '21061',
  'insert-id-here-21062': '21062',

  // Additional series (22xxx)
  'insert-id-here-22000': '22000',
  'insert-id-here-22001': '22001',
  'insert-id-here-22002': '22002',
  'insert-id-here-22003': '22003',
  'insert-id-here-22004': '22004',
  'insert-id-here-22005': '22005',
  'insert-id-here-22006': '22006',

  // Additional series (23xxx)
  'insert-id-here-23000': '23000',
  'insert-id-here-23001': '23001',
  'insert-id-here-23002': '23002',
  'insert-id-here-23003': '23003',
  'insert-id-here-23004': '23004',
  'insert-id-here-23005': '23005',
  'insert-id-here-23006': '23006',
  'insert-id-here-23007': '23007',
  'insert-id-here-23008': '23008',
  'insert-id-here-23009': '23009',
  'insert-id-here-23010': '23010',
  'insert-id-here-23011': '23011',
  'insert-id-here-23012': '23012',
  'insert-id-here-23013': '23013',
  'insert-id-here-23014': '23014',
  'insert-id-here-23015': '23015',
  'insert-id-here-23016': '23016',
  'insert-id-here-23017': '23017',
  'insert-id-here-23018': '23018',
  'insert-id-here-23019': '23019',
  'insert-id-here-23020': '23020',
  'insert-id-here-23021': '23021',
  'insert-id-here-23022': '23022',
  'insert-id-here-23023': '23023',
  'insert-id-here-23024': '23024',
  'whereabouts-should-dreams-rest': '23025',
  'insert-id-here-23026': '23026',
  'insert-id-here-23027': '23027',
  'insert-id-here-23028': '23028',
  'insert-id-here-23029': '23029',
  'insert-id-here-23030': '23030',
  'insert-id-here-23031': '23031',
  'insert-id-here-23032': '23032',
  'insert-id-here-23033': '23033',
  'insert-id-here-23034': '23034',
  'insert-id-here-23035': '23035',
  'insert-id-here-23036': '23036',
  'insert-id-here-23037': '23037',
  'insert-id-here-23038': '23038',
  'insert-id-here-23039': '23039',
  'insert-id-here-23040': '23040',
  'insert-id-here-23041': '23041',
  'insert-id-here-23042': '23042',
  'insert-id-here-23043': '23043',
  'insert-id-here-23044': '23044',
  'insert-id-here-23045': '23045',
  'insert-id-here-23046': '23046',
  'insert-id-here-23047': '23047',
  'insert-id-here-23048': '23048',
  'insert-id-here-23049': '23049',
  'insert-id-here-23051': '23051', // Note: 23050 missing
  'insert-id-here-23052': '23052',

  // Additional series (24xxx)
  'insert-id-here-24000': '24000',
  'insert-id-here-24001': '24001',
  'insert-id-here-24002': '24002',
  'insert-id-here-24003': '24003',
  'insert-id-here-24004': '24004',
  'insert-id-here-24005': '24005',
}

export const getLightconeImage = (lightconeId: string): string => {
  const assetId = lightconeAssetMap[lightconeId]
  if (assetId) {
    return `/images/lightcones/${assetId}.webp`
  }
  return '/images/anime-satania.gif' // Satania fallback! XD
}

// Get lightcone icon for smaller displays
export const getLightconeIcon = (lightconeId: string): string => {
  const assetId = lightconeAssetMap[lightconeId]
  if (assetId) {
    return `/images/lightcones/icons/${assetId}.webp`
  }
  return '/images/anime-satania.gif' // Satania fallback! XD
}

// Handle lightcone image loading errors
export const handleLightconeImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (img.src !== '/images/anime-satania.gif') {
    img.src = '/images/anime-satania.gif' // Satania to the rescue! XD
  }
  event.preventDefault()
  event.stopPropagation()
}

// Helper to get lightcone rarity color (moved here for reusability)
export function getLightconeRarityColor(rarity: 3 | 4 | 5): string {
  switch (rarity) {
    case 3:
      return '#4a90e2' // Blue
    case 4:
      return '#8a5fcc' // Purple
    case 5:
      return '#ffd700' // Gold
    default:
      return '#ffffff' // White fallback
  }
}
