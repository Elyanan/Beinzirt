import { NextResponse } from 'next/server'
import { ORDERS_EMAIL } from '@/lib/email-config'
import { orderEmailHtml, sendEmail } from '@/lib/email'
import { sanityMutate, type OrderLineItem } from '@/lib/sanity'
import { deliveryFeeForBirr } from '@/lib/pricing'

function orderId() {
  const now = new Date()
  const stamp = now
    .toISOString()
    .replace(/[-:TZ.]/g, '')
    .slice(0, 14)
  const random = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `BZ-${stamp}-${random}`
}

function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const customerName = cleanString(body.customerName)
    const phone = cleanString(body.phone)
    const email = cleanString(body.email)
    const address = cleanString(body.address)
    const notes = cleanString(body.notes)
    const submissionId = cleanString(body.submissionId) || crypto.randomUUID()
    const items = Array.isArray(body.items) ? body.items : []

    if (!customerName || !phone || !email || !address) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }

    if (!items.length) {
      return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 })
    }

    const normalizedItems: OrderLineItem[] = items.map((item: any) => {
      const quantity = Math.max(1, Number(item.quantity ?? 1))
      const priceBirr = Math.max(0, Number(item.priceBirr ?? item.price ?? 0))
      const priceUsd = Math.max(0, Number(item.priceUsd ?? item.price ?? 0))
      return {
        productId: cleanString(item.productId || item.id),
        name: cleanString(item.name),
        category: cleanString(item.category),
        quantity,
        price: priceUsd,
        subtotal: quantity * priceUsd,
        priceBirr,
        priceUsd,
        subtotalBirr: quantity * priceBirr,
        subtotalUsd: quantity * priceUsd,
        image: cleanString(item.image),
      }
    })

    const subtotalBirr = normalizedItems.reduce((sum, item) => sum + item.subtotalBirr, 0)
    const subtotalUsd = normalizedItems.reduce((sum, item) => sum + item.subtotalUsd, 0)
    const deliveryFeeBirr = Math.max(
      0,
      Number(body.deliveryFeeBirr ?? deliveryFeeForBirr(subtotalBirr)),
    )
    const totalBirr = subtotalBirr + deliveryFeeBirr
    const totalUsd = subtotalUsd
    const generatedOrderId = orderId()
    const documentId = `order.${submissionId}`
    const timestamp = new Date().toISOString()

    await sanityMutate([
      {
        createIfNotExists: {
          _id: documentId,
          _type: 'order',
          orderId: generatedOrderId,
          customerName,
          phone,
          email,
          address,
          notes,
          items: normalizedItems,
          subtotalBirr,
          subtotalUsd,
          deliveryFeeBirr,
          totalBirr,
          totalUsd,
          total: totalBirr,
          timestamp,
          status: 'Pending',
        },
      },
    ])

    const emailResult = await sendEmail({
      to: ORDERS_EMAIL,
      subject: `New Beinzirt order ${generatedOrderId}`,
      replyTo: email,
      html: orderEmailHtml({
        orderId: generatedOrderId,
        customerName,
        phone,
        email,
        address,
        notes,
        items: normalizedItems,
        subtotalBirr,
        subtotalUsd,
        deliveryFeeBirr,
        totalBirr,
        totalUsd,
        timestamp,
      }),
    })

    if (!emailResult.ok && !emailResult.skipped) {
      console.error('Order email failed:', emailResult.error)
    }

    return NextResponse.json({ orderId: generatedOrderId })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to place order.'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
