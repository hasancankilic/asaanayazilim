/**
 * Secure Session Manager using Web Crypto API
 * 
 * Works in both Node.js and Edge Runtime (Next.js Middleware).
 * Provides signed JWT-like session tokens to prevent tampering.
 */

const encoder = new TextEncoder();

/**
 * Import the secret key for HMAC operations
 */
async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const keyData = encoder.encode(secret);
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

/**
 * Base64 URL encode helper
 */
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

/**
 * Base64 URL decode helper
 */
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

/**
 * Signs a session payload and returns a token string
 */
export async function signSession(payload: Record<string, any>): Promise<string> {
  const secret = process.env.ADMIN_SECRET || 'asaanayazilim-default-session-secret-key-2026';
  
  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days expiration
  const body = base64UrlEncode(JSON.stringify({ ...payload, exp }));
  
  const key = await getCryptoKey(secret);
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(`${header}.${body}`)
  );
  
  const signatureArray = new Uint8Array(signatureBuffer);
  let signatureBin = '';
  for (let i = 0; i < signatureArray.length; i++) {
    signatureBin += String.fromCharCode(signatureArray[i]);
  }
  const signature = base64UrlEncode(signatureBin);
  
  return `${header}.${body}.${signature}`;
}

/**
 * Verifies a token and returns the payload, or null if invalid/expired
 */
export async function verifySession(token: string): Promise<Record<string, any> | null> {
  try {
    const secret = process.env.ADMIN_SECRET || 'asaanayazilim-default-session-secret-key-2026';
    
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [header, body, signature] = parts;
    
    const key = await getCryptoKey(secret);
    const data = encoder.encode(`${header}.${body}`);
    
    // Reconstruct signature buffer from base64url
    const sigBin = base64UrlDecode(signature);
    const sigBytes = new Uint8Array(sigBin.length);
    for (let i = 0; i < sigBin.length; i++) {
      sigBytes[i] = sigBin.charCodeAt(i);
    }
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes,
      data
    );
    
    if (!isValid) return null;
    
    const payload = JSON.parse(base64UrlDecode(body));
    
    // Check expiration
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Session verification error:', error);
    return null;
  }
}
