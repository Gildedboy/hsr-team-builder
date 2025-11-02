// Mapping from character string IDs to numeric image IDs
// Based on official Honkai Star Rail character IDs

export const characterImageMap: Record<string, string> = {
  // 5-Star Characters
  'seele': '1102',
  'jing-yuan': '1104', 
  'clara': '1107',
  'himeko': '1003',
  'yanqing': '1205',
  'blade': '1205',
  'dan-heng-il': '1213',
  'jingliu': '1218',
  'argenti': '1224',
  'acheron': '1224', // Need to verify
  'yunli': '1224', // Need to verify
  'topaz': '1306',
  'ratio': '1309',
  'jade': '1314', // Need to verify
  'kafka': '1005',
  'black-swan': '1314', // Need to verify
  'boothill': '1314', // Need to verify  
  'firefly': '1314', // Need to verify
  
  // 4-Star Characters
  'sampo': '1108',
  'luka': '1111',
  'destruction-trailblazer': '8001',
  'preservation-trailblazer': '8001',
  'harmony-trailblazer': '8001',
  
  // Add more mappings as needed
  // Format: 'character-id': 'numeric-id'
}

// Helper function to get character image path
export const getCharacterImagePath = (characterId: string): string => {
  const numericId = characterImageMap[characterId]
  if (numericId) {
    return `/images/character/${numericId}.webp`
  }
  // Fallback to avatar system if no mapping found
  return `/images/avatar/${characterId}.webp`
}