import {
  saveAboutAction,
  saveContactAction,
  saveFooterAction,
  saveHomepageAction,
} from '@/app/admin/actions'
import {
  getAboutContent,
  getContactContent,
  getFooterContent,
  getHomepageContent,
} from '@/lib/sanity'

export default async function AdminContentPage() {
  const [home, about, contact, footer] = await Promise.all([
    getHomepageContent(),
    getAboutContent(),
    getContactContent(),
    getFooterContent(),
  ])

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Website</p>
        <h1 className="mt-2 font-serif text-3xl">Content Management</h1>
      </div>

      <section className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
        <h2 className="font-serif text-xl">Home & Hero</h2>
        <form action={saveHomepageAction} className="mt-5 grid gap-4 lg:grid-cols-2">
          <input name="heroEyebrow" defaultValue={home.hero.eyebrow} placeholder="Hero eyebrow" className="admin-input" />
          <input name="heroHeading" defaultValue={home.hero.heading} placeholder="Hero heading" className="admin-input" />
          <textarea name="heroSubtitle" defaultValue={home.hero.subtitle} rows={3} placeholder="Hero subtitle" className="admin-textarea lg:col-span-2" />
          <input name="heroButtonText" defaultValue={home.hero.buttonText} placeholder="Primary button text" className="admin-input" />
          <input name="heroButtonLink" defaultValue={home.hero.buttonLink} placeholder="Primary button link" className="admin-input" />
          <input name="heroSecondaryButtonText" defaultValue={home.hero.secondaryButtonText} placeholder="Secondary button text" className="admin-input" />
          <input name="heroSecondaryButtonLink" defaultValue={home.hero.secondaryButtonLink} placeholder="Secondary button link" className="admin-input" />
          <input name="heroImageAlt" defaultValue={home.hero.imageAlt} placeholder="Hero image alt text" className="admin-input" />
          <input name="heroImage" type="file" accept="image/*" className="admin-file" />
          <input name="heritageEyebrow" defaultValue={home.heritageEyebrow} placeholder="Heritage eyebrow" className="admin-input" />
          <input name="heritageTitle" defaultValue={home.heritageTitle} placeholder="Heritage title" className="admin-input" />
          <textarea name="heritageText" defaultValue={home.heritageText} rows={4} placeholder="Heritage text" className="admin-textarea lg:col-span-2" />
          <input name="storyEyebrow" defaultValue={home.storyEyebrow} placeholder="Story eyebrow" className="admin-input" />
          <input name="storyTitle" defaultValue={home.storyTitle} placeholder="Story title" className="admin-input" />
          <textarea name="storyParagraphs" defaultValue={home.storyParagraphs.join('\n')} rows={5} placeholder="One story paragraph per line" className="admin-textarea lg:col-span-2" />
          <button type="submit" className="admin-submit lg:col-span-2">Save Home Content</button>
        </form>
      </section>

      <section className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
        <h2 className="font-serif text-xl">About Page</h2>
        <form action={saveAboutAction} className="mt-5 grid gap-4 lg:grid-cols-2">
          <textarea name="mission" defaultValue={about.mission} rows={4} placeholder="Mission" className="admin-textarea" />
          <textarea name="vision" defaultValue={about.vision} rows={4} placeholder="Vision" className="admin-textarea" />
          <textarea name="storyParagraphs" defaultValue={about.storyParagraphs.join('\n')} rows={7} placeholder="One paragraph per line" className="admin-textarea lg:col-span-2" />
          <label className="text-sm">
            Banner Image
            <input name="bannerImage" type="file" accept="image/*" className="admin-file mt-2" />
          </label>
          <label className="text-sm">
            Story Image
            <input name="storyImage" type="file" accept="image/*" className="admin-file mt-2" />
          </label>
          <button type="submit" className="admin-submit lg:col-span-2">Save About Content</button>
        </form>
      </section>

      <section className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
        <h2 className="font-serif text-xl">Contact Page</h2>
        <form action={saveContactAction} className="mt-5 grid gap-4 lg:grid-cols-2">
          <input name="phone" defaultValue={contact.phone} placeholder="Phone" className="admin-input" />
          <input name="email" defaultValue={contact.email} placeholder="Email" className="admin-input" />
          <input name="hours" defaultValue={contact.hours} placeholder="Business hours" className="admin-input" />
          <input name="instagram" defaultValue={contact.socialLinks.find((item) => item.label === 'Instagram')?.href ?? ''} placeholder="Instagram URL" className="admin-input" />
          <input name="facebook" defaultValue={contact.socialLinks.find((item) => item.label === 'Facebook')?.href ?? ''} placeholder="Facebook URL" className="admin-input" />
          <input name="tiktok" defaultValue={contact.socialLinks.find((item) => item.label === 'TikTok')?.href ?? ''} placeholder="TikTok URL" className="admin-input" />
          <input name="pinterest" defaultValue={contact.socialLinks.find((item) => item.label === 'Pinterest')?.href ?? ''} placeholder="Pinterest URL" className="admin-input" />
          <input name="telegram" defaultValue={contact.socialLinks.find((item) => item.label === 'Telegram Channel')?.href ?? ''} placeholder="Telegram Channel URL" className="admin-input" />
          <input name="whatsapp" defaultValue={contact.socialLinks.find((item) => item.label === 'WhatsApp')?.href ?? ''} placeholder="WhatsApp URL" className="admin-input" />
          <input name="storeImage" type="file" accept="image/*" className="admin-file" />
          <textarea name="address" defaultValue={contact.address} rows={3} placeholder="Address" className="admin-textarea lg:col-span-2" />
          <textarea name="mapIframe" defaultValue={contact.mapIframe} rows={4} placeholder="Google Maps iframe src" className="admin-textarea lg:col-span-2" />
          <button type="submit" className="admin-submit lg:col-span-2">Save Contact Content</button>
        </form>
      </section>

      <section className="rounded-xl border border-border/80 bg-card p-5 shadow-luxury">
        <h2 className="font-serif text-xl">Footer</h2>
        <form action={saveFooterAction} className="mt-5 grid gap-4 lg:grid-cols-2">
          <textarea name="description" defaultValue={footer.description} rows={3} placeholder="Footer description" className="admin-textarea lg:col-span-2" />
          <input name="copyright" defaultValue={footer.copyright} placeholder="Copyright" className="admin-input lg:col-span-2" />
          <input name="phone" defaultValue={footer.contactInfo.phone} placeholder="Phone" className="admin-input" />
          <input name="email" defaultValue={footer.contactInfo.email} placeholder="Email" className="admin-input" />
          <input name="hours" defaultValue={footer.contactInfo.hours} placeholder="Hours" className="admin-input" />
          <input name="logo" type="file" accept="image/*" className="admin-file" />
          <textarea name="location" defaultValue={footer.contactInfo.location} rows={3} placeholder="Location" className="admin-textarea lg:col-span-2" />
          <button type="submit" className="admin-submit lg:col-span-2">Save Footer Content</button>
        </form>
      </section>
    </div>
  )
}
