// Lightcone ID to asset mapping (based on your actual image files)
const lightconeAssetMap: Record<string, string> = {
  // 3-star lightcones (20xxx series)
  arrows: '20000',
  cornucopia: '20001',
  'collapsing-sky': '20002',
  amber: '20003',
  void: '20004',
  chorus: '20005',
  'data-bank': '20006',
  'darting-arrow': '20007',
  'fine-fruit': '20008',
  'shattered-home': '20009',
  defense: '20010',
  loop: '20011',
  'meshing-cogs': '20012',
  passkey: '20013',
  adversarial: '20014',
  multiplication: '20015',
  'mutual-demise': '20016',
  pioneering: '20017',
  'hidden-shadow': '20018',
  mediation: '20019',
  sagacity: '20020',
  shadowburn: '20021',
  reminiscence: '20022',

  // 4-star lightcones (21xxx series)
  'post-op-conversation': '21000',
  'good-night-and-sleep-well': '21001',
  'day-one-of-my-new-life': '21002',
  'only-silence-remains': '21003',
  'memories-of-the-past': '21004',
  'the-moles-welcome-you': '21005',
  'the-birth-of-the-self': '21006',
  'shared-feeling': '21007',
  'eyes-of-the-prey': '21008',
  'landaus-choice': '21009',
  swordplay: '21010',
  'planetary-rendezvous': '21011',
  'a-secret-vow': '21012',
  'make-the-world-clamor': '21013',
  'perfect-timing': '21014',
  'resolution-shines-as-pearls-of-sweat': '21015',
  'trend-of-the-universal-market': '21016',
  'subscribe-for-more': '21017',
  'dance-dance-dance': '21018',
  'under-the-blue-sky': '21019',
  'geniuses-repose': '21020',
  'quid-pro-quo': '21021',
  fermata: '21022',
  'we-are-wildfire': '21023',
  'river-flows-in-spring': '21024',
  'past-and-future': '21025',
  'woof-walk-time': '21026',
  'the-seriousness-of-breakfast': '21027',
  'warmth-shortens-cold-nights': '21028',
  'we-will-meet-again': '21029',
  'this-is-me': '21030',
  'return-to-darkness': '21031',
  'carve-the-moon-weave-the-clouds': '21032',
  'nowhere-to-run': '21033',
  'today-is-another-peaceful-day': '21034',
  'what-is-real': '21035',
  'dreamville-adventure': '21036',
  'final-victor': '21037',
  'flames-afar': '21038',
  'destinys-threads-forewoven': '21039',
  'the-day-the-cosmos-fell': '21040',
  'its-showtime': '21041',
  'indelible-promise': '21042',
  'concert-for-two': '21043',
  'boundless-choreo': '21044',
  'after-the-charmony-fall': '21045',
  'poised-to-bloom': '21046',
  'shadowed-by-night': '21047',
  'dreams-montage': '21048',
  'victory-in-a-blink': '21050',
  'geniuses-greetings': '21051',
  'sweat-now-cry-less': '21052',
  'journey-forever-peaceful': '21053',
  'the-storys-next-page': '21054',
  'unto-tomorrows-morrow': '21055',
  'in-pursuit-of-the-wind': '21056',
  'the-flower-remembers': '21057',
  'a-trail-of-bygone-blood': '21058',
  'a-dream-scented-in-wheat': '21060',
  'holiday-thermae-escapade': '21061',
  'see-you-at-the-end': '21062',

  // 4-star event lightcones (22xxx series)
  'before-the-tutorial-mission-starts': '22000',
  'hey-over-here': '22001',
  'for-tomorrows-journey': '22002',
  'ninja-record-sound-hunt': '22003',
  'the-great-cosmic-enterprise': '22004',
  'the-forever-victual': '22005',
  'fly-into-a-pink-tomorrow': '22006',

  // 5-star lightcones (23xxx)
  'night-on-the-milky-way': '23000',
  'in-the-night': '23001',
  'something-irreplaceable': '23002',
  'but-the-battle-isnt-over': '23003',
  'in-the-name-of-the-world': '23004',
  'moment-of-victory': '23005',
  'patience-is-all-you-need': '23006',
  'incessant-rain': '23007',
  'echoes-of-the-coffin': '23008',
  'the-unreachable-side': '23009',
  'before-dawn': '23010',
  'she-already-shut-her-eyes': '23011',
  'sleep-like-the-dead': '23012',
  'time-waits-for-no-one': '23013',
  'i-shall-be-my-own-sword': '23014',
  'brighter-than-the-sun': '23015',
  'worrisome-blissful': '23016',
  'night-of-fright': '23017',
  'an-instant-before-a-gaze': '23018',
  'past-self-in-mirror': '23019',
  'baptism-of-pure-thought': '23020',
  'earthly-escapade': '23021',
  'reforged-remembrance': '23022',
  'inherently-unjust-destiny': '23023',
  'along-the-passing-shore': '23024',
  'whereabouts-should-dreams-rest': '23025',
  'flowing-nightglow': '23026',
  'sailing-towards-a-second-life': '23027',
  'yet-hope-is-priceless': '23028',
  'those-many-springs': '23029',
  'dance-at-sunset': '23030',
  'i-venture-forth-to-hunt': '23031',
  'scent-alone-stays-true': '23032',
  'ninjutsu-inscription-dazzling-evilbreaker': '23033',
  'a-grounded-ascent': '23034',
  'long-road-leads-home': '23035',
  'time-woven-into-gold': '23036',
  'into-the-unreachable-veil': '23037',
  'if-time-were-a-flower': '23038',
  'flame-of-blood-blaze-my-path': '23039',
  'make-farewells-more-beatiful': '23040',
  'life-should-be-cast-to-flames': '23041',
  'long-may-rainbows-adorn-the-sky': '23042',
  'lies-dance-on-the-breeze': '23043',
  'thus-burns-the-dawn': '23044',
  'a-thankless-coronation': '23045',
  'the-hell-where-ideals-burn': '23046',
  'why-does-the-ocean-sing': '23047',
  'epoch-etched-in-golden-blood': '23048',
  'to-evernights-stars': '23049',
  'thought-worlds-apart': '23051',
  'this-love-forever': '23052',

  // 5-star simulated universe lightcones (24xxx)
  'on-the-fall-on-an-aeon': '24000',
  'cruising-in-the-stellar-sea': '24001',
  'texture-of-memories': '24002',
  'solitary-healing': '24003',
  'eternal-calculus': '24004',
  'memorys-curtain-never-falls': '24005',
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
