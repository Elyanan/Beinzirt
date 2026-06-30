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
    'መ�nen ሀበሻ ቀሚስ',
    'በሥነ-ጥበብ የተሰራ ወርቃማ ጥeb borders ያለው በእጅ የተሰራ ጨርቃ ጨርቅ፣ ለበዓላትና ለሥነ-ጥበብ አጋጣሚዎች ፍperfect።',
  ],
  'Zuria Ceremonial Dress': [
    'ዙሪያ ሴረሞኒያል ፍግም',
    'በቀይ፣ በአረንጓዴ እና በወርቅ ጥeb borders የተሞላ elegant ሴረሞኒያል ጨርቃ ጨርቅ።',
  ],
  'Tibeb Celebration Dress': [
    'ቲቤብ ተከታታይ ፍግም',
    'ዘመናዊ ቅርፅን ከባህላዊ woven border ጋር የሚያጣመር graceful handmade dress።',
  ],
  'Bridal Gold Border Dress': [
    'bridal ወርቃማ border ፍግም',
    'ለሠርግ እና ለspecial occasions luminous ወርቃማ detail ያለው statement dress።',
  ],
  'Netela Sheer Scarf': [
    'ነጠላ sheer ሻማ',
    'ንፁህ woven border ያለው lightweight netela፣ የባህል daily emblem።',
  ],
  'Golden Border Shawl': [
    'ወርቃማ border shawl',
    'ለspecial occasions rich ወርቃማ woven border ያለው luxurious shawl።',
  ],
  'Classic Cotton Scarf': [
    'ክላሲክ cotton ሻማ',
    'ለdaily wear traditional finish ያለው soft handwoven cotton።',
  ],
  'Heritage Pattern Scarf': [
    'heritage pattern ሻማ',
    'modern እና traditional looks ጋር beautifully የሚጣጣሙ refined handloom patterns።',
  ],
}

const categoryTranslations = {
  Dresses: 'ጨርቃ ጨርቅ',
  Scarves: 'ሻማዎች',
}

const galleryTranslations = {
  'Wedding Cultural Outfit': ['የሠርግ cultural outfit', 'ወርቃማ ጥeb borders ያለው hand-embroidered bridal ensemble።'],
  'Handwoven Traditional Dress': ['handwoven traditional dress', 'delicate woven detail ያለው flowing cotton kemis።'],
  'Beinzirt Flagship Store': ['Beinzirt flagship store', 'በአዲስ አበባ showroom ይጎቡ።'],
  'Golden Border Netela': ['ወርቃማ border netela', 'rich woven border accents ያለው sheer scarf።'],
  'Festival Celebration Wear': ['festival celebration wear', 'ለcultural gatherings vibrant traditional attire።'],
  'Handwoven Scarf Detail': ['handwoven scarf detail', 'traditional tibeb edge ያለው fine cotton netela።'],
  "Children's Celebration Wear": ['children celebration wear', 'ለlittle ones adorable handmade outfit።'],
  'Woven Textile Close-up': ['woven textile close-up', 'decorative handloom patterns and motifs።'],
  'Bridal Tibeb Border': ['bridal tibeb border', 'ለspecial occasions exquisite ወርቃማ embroidery።'],
}

const storyParagraphsAm = [
  'Selam፣ visionary designer፣ በEthiopian culture rich tapestry ተነሳሽተች። በtraditional textiles beauty እና new life potential አየች።',
  'Beinzirt journey በskilled artisans small workshop ይጀመረ። Cottonን stunning garments ይለውጣሉ።',
]

const homepageAm = {
  heroAm: {
    eyebrow: 'በአዲስ አበባ በእጅ የተሰራ',
    heading: 'Handcrafted Heritage, በኩራት የሚለበስ!',
    subtitle: 'በአዲስ አበባ በእጅ የተሰሩ የኢትዮጵያ textiles፣ garments እና cultural designs ዘለቄታዊ beauty ይሞክሩ።',
    buttonText: 'مجموعه ይመልከቱ',
    secondaryButtonText: 'ብጁ ትዕዛዝ',
  },
  heritageEyebrowAm: 'ልዩ ባህላችን',
  heritageTitleAm: 'የኢትዮጵያ Textiles Rich Variety',
  heritageTextAm: 'በexquisite Ethiopian cloths ጀርባ captivating stories ያግኙ። እያንዳንዱ piece craftsmanship story እና artistry legacy ይዟል።',
  storyEyebrowAm: 'ታሪካችን',
  storyTitleAm: 'እኛ ማን ነን',
  storyParagraphsAm,
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
  if (!translation) continue
  mutations.push({
    patch: { id: product._id, set: { nameAm: translation[0], descriptionAm: translation[1] } },
  })
}

for (const category of await fetchDocs('category', 'title')) {
  const titleAm = categoryTranslations[category.title]
  if (!titleAm) continue
  mutations.push({ patch: { id: category._id, set: { titleAm } } })
}

for (const item of await fetchDocs('galleryItem', 'title, caption')) {
  const translation = galleryTranslations[item.title]
  if (!translation) continue
  mutations.push({
    patch: { id: item._id, set: { titleAm: translation[0], captionAm: translation[1] } },
  })
}

mutations.push({ patch: { id: 'homepage', set: homepageAm } })
mutations.push({
  patch: {
    id: 'aboutPage',
    set: {
      missionAm: 'Ethiopian heritageን በhandmade fashion እና home textiles celebrate ማድረግ፣ ለcustomers እና artisans lasting value መፍጠር።',
      visionAm: 'በculture፣ quality እና women-led artistry rooted globally recognized Ethiopian luxury craft house መሆን።',
      storyParagraphsAm,
    },
  },
})
mutations.push({
  patch: {
    id: 'footer',
    set: {
      descriptionAm: 'በአዲስ አበባ በኩራት የተሰሩ handmade Ethiopian traditional clothing እና textiles።',
      copyrightAm: 'Copyright © 2026 Beinzirt Design. All rights reserved.',
    },
  },
})

for (let index = 0; index < mutations.length; index += 25) {
  await mutate(mutations.slice(index, index + 25))
}

console.log(`Migrated ${mutations.length} Amharic content patches into Sanity.`)
