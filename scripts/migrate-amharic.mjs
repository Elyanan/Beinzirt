import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const envPath = path.join(root, '.env.local')

if (existsSync(envPath)) {
  const envText = await readFile(envPath, 'utf8')
  for (const line of envText.split(/\r?\n/)) {
    const match = line.match(/^([^#=\s]+)=(.*)$/)
    if (match) process.env[match[1]] = match[2]
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN
const apiVersion = 'v2025-02-19'

if (!projectId || !dataset || !token) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_TOKEN.')
}

const productTranslations = {
  'Menen Habesha Kemis': [
    'ምነን ሀበሻ ቀሚስ',
    'በወርቃማ ጥለት የተሸለመ የእጅ ስራ ቀሚስ፣ ለበዓላትና ለክብረ በዓላት ተስማሚ ምርጥ ምርጫ።',
  ],
  'Zuria Ceremonial Dress': [
    'ዙሪያ ሥነ ሥርዓት ቀሚስ',
    'በቀይ፣ በአረንጓዴ እና በወርቅ የተሸለመ ውብ ባህላዊ ቀሚስ።',
  ],
  'Tibeb Celebration Dress': [
    'ጥበብ የበዓል ቀሚስ',
    'ዘመናዊ አቀራረብን ከባህላዊ ጥለት ጋር የሚያጣምር የእጅ ስራ ቀሚስ።',
  ],
  'Bridal Gold Border Dress': [
    'የሙሽራ ወርቃማ ጠርዝ ቀሚስ',
    'ለሠርግ እና ለልዩ ዝግጅቶች የተዘጋጀ በወርቃማ ዝርዝር የሚያበራ ቀሚስ።',
  ],
  'Netela Sheer Scarf': [
    'ለስላሳ ነጠላ',
    'ቀላል እና ውብ ጠርዝ ያለው ነጠላ፣ ለዕለታዊም ለልዩ ቀንም ተስማሚ።',
  ],
  'Golden Border Shawl': [
    'ወርቃማ ጠርዝ ሻል',
    'በብሩህ ወርቃማ ጥለት የተሸለመ ለልዩ አጋጣሚዎች የተመቸ ሻል።',
  ],
  'Classic Cotton Scarf': [
    'ክላሲክ የጥጥ ሻማ',
    'ለዕለታዊ አለባበስ የተመቸ ለስላሳ የእጅ ስራ የጥጥ ሻማ።',
  ],
  'Heritage Pattern Scarf': [
    'ባህላዊ ጥለት ሻማ',
    'ከዘመናዊ እና ከባህላዊ አለባበስ ጋር የሚስማማ ውብ ጥለት ያለው ሻማ።',
  ],
}

const categoryTranslations = {
  Dresses: 'ጨርቃ ጨርቅ',
  Scarves: 'ሻማዎች',
}

const galleryTranslations = {
  'Wedding Cultural Outfit': ['የሠርግ ባህላዊ ልብስ', 'በወርቃማ ጥለት የተሸለመ የሙሽራ አለባበስ።'],
  'Handwoven Traditional Dress': ['በእጅ የተሰራ ባህላዊ ቀሚስ', 'ለስላሳ ጥለት ያለው የጥጥ ቀሚስ።'],
  'Beinzirt Flagship Store': ['የበይንዝርት ዋና መደብር', 'በአዲስ አበባ ያለውን ዋና መደብራችን ይጎብኙ።'],
  'Golden Border Netela': ['ወርቃማ ጠርዝ ነጠላ', 'በውብ ወርቃማ ጥለት የተሰራ ነጠላ።'],
  'Festival Celebration Wear': ['የበዓል ባህላዊ አለባበስ', 'ለባህላዊ ስብሰባዎች ተስማሚ ውብ አለባበስ።'],
  'Handwoven Scarf Detail': ['የበእጅ ሻማ ዝርዝር', 'በባህላዊ ጥለት የተሸለመ ነጠላ ዝርዝር።'],
  "Children's Celebration Wear": ['የህጻናት የበዓል አለባበስ', 'ለህጻናት በእጅ የተሰራ ውብ አለባበስ።'],
  'Woven Textile Close-up': ['የተጠለፈ ጨርቅ ቅርብ ምስል', 'የእጅ ጥልፍ ጥለቶችን በቅርብ የሚያሳይ ምስል።'],
  'Bridal Tibeb Border': ['የሙሽራ ጥበብ ጠርዝ', 'ለልዩ አጋጣሚዎች የተሰራ የሙሽራ ጠርዝ ዝርዝር።'],
}

const storyParagraphsAm = [
  'ሰላም በኢትዮጵያ ባህል ውበት ተነሳሽታ በእጅ የተሰሩ ጨርቆችን በዘመናዊ አቀራረብ ለማቅረብ ጉዞዋን ጀመረች።',
  'በይንዝርት ከባለሙያ አርቲዛኖች ጋር በመስራት ባህላዊ ጥበብን ወደ ዘመናዊ እና ክቡር የአለባበስ ንድፎች ይቀይራል።',
]

const homepageAm = {
  heroAm: {
    eyebrow: 'በአዲስ አበባ በእጅ የተሰራ',
    heading: 'የእጅ ጥበብ ቅርስ፣ በኩራት የሚለበስ!',
    subtitle: 'በአዲስ አበባ በፍቅር የተሰሩ የኢትዮጵያ ጨርቆችና ባህላዊ ዲዛይኖችን ያግኙ።',
    buttonText: 'ስብስቡን ይመልከቱ',
    secondaryButtonText: 'ብጁ ትዕዛዝ',
  },
  heritageEyebrowAm: 'ልዩ ባህላችን',
  heritageTitleAm: 'የኢትዮጵያ ጨርቃ ጨርቅ ባለጠግነትን ያስሱ',
  heritageTextAm: 'እያንዳንዱ ቁራጭ የእጅ ጥበብ ታሪክን ይሸከማል፤ የአርቲዛኖቻችንን ባህላዊ ቅርስ ያሳያል።',
  storyEyebrowAm: 'ታሪካችን',
  storyTitleAm: 'እኛ ማን ነን',
  storyParagraphsAm,
}

function fallbackAmharicName(value, fallback) {
  const normalized = String(value ?? '').trim()
  return normalized || fallback
}

function fallbackAmharicDescription(value, fallback) {
  const normalized = String(value ?? '').trim()
  if (!normalized) return fallback
  return `${fallback} (${normalized.length > 60 ? normalized.slice(0, 60) + '...' : normalized})`
}

async function mutate(mutations) {
  const response = await fetch(
    `https://${projectId}.api.sanity.io/${apiVersion}/data/mutate/${dataset}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mutations }),
    },
  )
  if (!response.ok) throw new Error(await response.text())
  return response.json()
}

async function fetchDocs(type, fields) {
  const query = encodeURIComponent(`*[_type == "${type}"]{ _id, ${fields} }`)
  const response = await fetch(
    `https://${projectId}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${query}`,
    { headers: { Authorization: `Bearer ${token}` } },
  )
  const payload = await response.json()
  return payload.result ?? []
}

const mutations = []

for (const product of await fetchDocs('product', 'name, description')) {
  const translation = productTranslations[product.name]
  const nameAm = translation?.[0] ?? fallbackAmharicName('', 'የበይንዝርት የእጅ ስራ ምርት')
  const descriptionAm =
    translation?.[1] ??
    fallbackAmharicDescription(
      product.description,
      'የኢትዮጵያ ባህላዊ ጥበብን የሚያንጸባርቅ ፕሪሚየም የእጅ ስራ ምርት።',
    )
  mutations.push({
    patch: { id: product._id, set: { nameAm, descriptionAm } },
  })
}

for (const category of await fetchDocs('category', 'title')) {
  const titleAm = categoryTranslations[category.title] ?? 'ስብስብ'
  mutations.push({ patch: { id: category._id, set: { titleAm } } })
}

for (const item of await fetchDocs('galleryItem', 'title, caption')) {
  const translation = galleryTranslations[item.title]
  const titleAm = translation?.[0] ?? fallbackAmharicName('', 'የበይንዝርት ጋለሪ ምስል')
  const captionAm =
    translation?.[1] ??
    fallbackAmharicDescription(
      item.caption,
      'የበይንዝርት እጅ ስራ እና ባህላዊ ውበትን የሚያሳይ ምስል።',
    )
  mutations.push({
    patch: { id: item._id, set: { titleAm, captionAm } },
  })
}

mutations.push({ patch: { id: 'homepage', set: homepageAm } })
mutations.push({
  patch: {
    id: 'aboutPage',
    set: {
      missionAm: 'የኢትዮጵያ ባህላዊ ቅርስን በእጅ የተሰራ ፋሽን እና የቤት ጨርቃ ጨርቅ በኩል ማክበር፣ ለደንበኞችና ለአርቲዛኖች ዘላቂ ዋጋ መፍጠር።',
      visionAm: 'በባህል፣ በጥራት እና በሴቶች የሚመራ እጅ ጥበብ ላይ የተመሰረተ ዓለም አቀፍ የኢትዮጵያ ፕሪሚየም ብራንድ መሆን።',
      storyParagraphsAm,
    },
  },
})
mutations.push({
  patch: {
    id: 'footer',
    set: {
      descriptionAm: 'በአዲስ አበባ በኩራት የተሰሩ የኢትዮጵያ ባህላዊ አለባበሶች እና ጨርቃ ጨርቆች።',
      copyrightAm: 'የቅጂ መብት © 2026 በይንዝርት ዲዛይን። መብቶች በሙሉ የተጠበቁ ናቸው።',
    },
  },
})

for (let index = 0; index < mutations.length; index += 25) {
  await mutate(mutations.slice(index, index + 25))
}

console.log(`Migrated ${mutations.length} Amharic content patches into Sanity.`)
