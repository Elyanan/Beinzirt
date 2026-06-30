import { NextResponse } from 'next/server'
import { sanityMutate } from '@/lib/sanity'

function requestId() {
  const stamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14)
  const random = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `BZ-CUSTOM-${stamp}-${random}`
}

function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = cleanString(body.name)
    const phone = cleanString(body.phone)
    const email = cleanString(body.email)
    const productType = cleanString(body.productType)
    const message = cleanString(body.message)
    const submissionId = cleanString(body.submissionId) || crypto.randomUUID()

    if (!name || !phone || !email || !productType || !message) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }

    const generatedRequestId = requestId()

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
          occasion: cleanString(body.occasion),
          colors: cleanString(body.colors),
          size: cleanString(body.size),
          deadline: cleanString(body.deadline),
          message,
          timestamp: new Date().toISOString(),
          status: 'Pending',
        },
      },
    ])

    return NextResponse.json({ requestId: generatedRequestId })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to submit custom order.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
