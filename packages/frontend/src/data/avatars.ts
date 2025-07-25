// Character ID to avatar mapping (based on Honkai Star Rail character IDs)
const characterAvatarMap: Record<string, string> = {
  // Main characters (1000 series)
  'destruction-trailblazer': '8002',
  'fire-trailblazer': '8004',
  'harmony-trailblazer': '8006',
  'dan-heng': '1002',
  'march-7th': '1001',
  himeko: '1003',
  welt: '1004',
  kafka: '1005b1',
  'silver-wolf': '1006b1',
  arlan: '1008',
  asta: '1009',
  herta: '1013',
  bronya: '1101',
  seele: '1102',
  serval: '1103',
  gepard: '1104',
  natasha: '1105',
  pela: '1106',
  clara: '1107',
  sampo: '1108',
  hook: '1109',
  lynx: '1110',
  luka: '1111',
  topaz: '1112',
  qingque: '1201',
  tingyun: '1202',
  luocha: '1203',
  'jing-yuan': '1204',
  guinaifen: '1210',
  yukong: '1207',
  'fu-xuan': '1208',
  yanqing: '1209',
  'dan-heng-il': '1213',
  jingliu: '1212b1',
  huohuo: '1217',
  argenti: '1302',
  'ruan-mei': '1303',
  ratio: '1305',
  'black-swan': '1307',
  sparkle: '1306',
  misha: '1312',
  acheron: '1308',
  aventurine: '1304',
  gallagher: '1301',
  robin: '1309',
  boothill: '1315',
  firefly: '1310',
  jade: '1314',
  jiaoqiu: '1218',
  yunli: '1221',
  'hunt-march-7th': '1224',
  feixiao: '1220',
  lingsha: '1222',
  moze: '1223',
  rappa: '1317',
  sunday: '1313',
  blade: '1205b1',
  sushang: '1206',
  bailu: '1211',
  xueyi: '1214',
  hanya: '1215',
  cipher: '1406',
  'remembrance-trailblazer': '8008',
  tribbie: '1403',
  fugue: '1225',
  'the-herta': '1401',
  aglaea: '1402',
  anaxa: '1405',
  castorice: '1407',
  mydei: '1404',
  phainon: '1408',
  hyacine: '1409',
  saber: '1014',
  archer: '1015',
}

export const getCharacterAvatar = (characterId: string): string => {
  const avatarId = characterAvatarMap[characterId]
  if (avatarId) {
    return `/images/avatar/${avatarId}.webp`
  }
  return '/images/placeholder.svg' // fallback
}

// Handle image loading errors silently
export const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  if (img.src !== '/images/placeholder.svg') {
    img.src = '/images/placeholder.svg'
  }
  // Prevent console error logging
  event.preventDefault()
  event.stopPropagation()
}
