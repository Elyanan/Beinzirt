import { NextResponse } from 'next/server'
import { ORDERS_EMAIL } from '@/lib/email-config'
import { customOrderEmailHtml, sendEmail } from '@/lib/email'
import { imageReference, sanityMutate, uploadSanityImage } from '@/lib/sanity'

function requestId() {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14)
  const random = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `BZ-CUSTOM-${stamp}-${random}`
}

function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function bodyValue(body: FormData | Record<string, unknown>, key: string) {
  return body instanceof FormData ? body.get(key) : body[key]
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get('content-type') ?? ''
    const body = contentType.includes('multipart/form-data')
      ? await request.formData()
      : await request.json() as Record<string, unknown>
    const name = cleanString(bodyValue(body, 'name'))
    const phone = cleanString(bodyValue(body, 'phone'))
    const email = cleanString(bodyValue(body, 'email'))
    const productType = cleanString(bodyValue(body, 'productType'))
    const message = cleanString(bodyValue(body, 'message'))
    const submissionId = cleanString(bodyValue(body, 'submissionId')) || crypto.randomUUID()

    if (!name || !phone || !email || !productType || !message) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }

    const generatedRequestId = requestId()
    const timestamp = new Date().toISOString()
    const sampleImages = []
    const sampleImageUrls: string[] = []
    const sampleImage = body instanceof FormData ? body.get('sampleImage') : null

    if (sampleImage instanceof File && sampleImage.size > 0) {
      const uploaded = await uploadSanityImage(sampleImage)
      if (uploaded) {
        sampleImages.push(imageReference(uploaded.assetRef, `${name} sample design`))
        sampleImageUrls.push(uploaded.url)
      }
    }

    const customOrder = {
      requestId: generatedRequestId,
      name,
      phone,
      email,
      productType,
      occasion: cleanString(bodyValue(body, 'occasion')),
      colors: cleanString(bodyValue(body, 'colors')),
      size: cleanString(bodyValue(body, 'size')),
      deadline: cleanString(bodyValue(body, 'deadline')),
      message,
      timestamp,
      sampleImageUrls,
    }

    await sanityMutate([
      {
        createIfNotExists: {
          _id: `customOrder.${submissionId}`,
          _type: 'customOrder',
          requestId: generatedRequestId,
          name,
          phone,
          email,
          productType,
          occasion: customOrder.occasion,
          colors: customOrder.colors,
          size: customOrder.size,
          deadline: customOrder.deadline,
          message,
          sampleImages,
          timestamp,
          status: 'Pending',
        },
      },
    ])

    const emailResult = await sendEmail({
      to: ORDERS_EMAIL,
      subject: `New Beinzirt custom request ${generatedRequestId}`,
      replyTo: email,
      html: customOrderEmailHtml(customOrder),
    })

    if (!emailResult.ok && !emailResult.skipped) {
      console.error('Custom order email failed:', emailResult.error)
    }

    return NextResponse.json({ requestId: generatedRequestId })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to submit custom order.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
