export const ADMIN_COOKIE = 'beinzirt_admin_session'

const sessionMaxAgeSeconds = 60 * 60 * 8

function getSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SANITY_API_TOKEN ||
    'beinzirt-local-admin-session'
  )
}

function getAdminUsername() {
  return process.env.ADMIN_USERNAME || 'admin'
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || 'beinzirt@2022'
}

function base64Url(bytes: ArrayBuffer) {
  const values = new Uint8Array(bytes)
  let binary = ''
  values.forEach((value) => {
    binary += String.fromCharCode(value)
  })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

async function sign(message: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
  return base64Url(signature)
}

export async function createAdminSessionToken() {
  const expires = Date.now() + sessionMaxAgeSeconds * 1000
  const username = getAdminUsername()
  const message = `${username}.${expires}`
  const signature = await sign(message)
  return `${username}.${expires}.${signature}`
}

export async function verifyAdminSession(token?: string | null) {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 3) return false

  const [username, expires, signature] = parts
  if (username !== getAdminUsername()) return false
  if (!expires || Number(expires) < Date.now()) return false

  const expected = await sign(`${username}.${expires}`)
  return expected === signature
}

export function verifyAdminCredentials(username: string, password: string) {
  return username === getAdminUsername() && password === getAdminPassword()
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    maxAge: sessionMaxAgeSeconds,
    path: '/',
  }
}
