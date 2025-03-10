import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Solo le route che DEVONO essere protette
const protectedRoutes = ["/dashboard"]

export async function middleware(req: NextRequest) {
  // Non processare richieste non necessarie
  if (!protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.next()
  }

  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Reindirizza a login SOLO se non c'è sessione e siamo su una route protetta
  /* if (!session && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    const redirectUrl = new URL('/login', req.url)
    return NextResponse.redirect(redirectUrl)
  } */

  return res
}

export const config = {
  // Esegui il middleware SOLO sulle route che ci interessano veramente
  matcher: ['/dashboard/:path*']
}

"eyJhbGciOiJIUzI1NiIsImtpZCI6IjlmQlM3VW1maDVhdkJ5NFkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3Rjd2draWlnY3FxaXB5b3Nyc2dtLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJmMDJiOTZkNC04NDRmLTQ0YTQtYTg5Ny1lN2QxMDZlMTU0OWEiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzM4NzYyNzg5LCJpYXQiOjE3Mzg3NTkxODksImVtYWlsIjoibGVvbmFyZG8uY2FodWFzN0BnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imdvb2dsZSIsInByb3ZpZGVycyI6WyJnb29nbGUiXX0sInVzZXJfbWV0YWRhdGEiOnsiYXZhdGFyX3VybCI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tFVUpsci1Eb0szVFJpUVg5YW1qZzhGZmNWdmpRQUFkNDluSjNKaWcyUmR4WThxZz1zOTYtYyIsImVtYWlsIjoibGVvbmFyZG8uY2FodWFzN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZnVsbF9uYW1lIjoiTGVvbmFyZG8gQ2FodWFzIiwiaXNzIjoiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tIiwibmFtZSI6Ikxlb25hcmRvIENhaHVhcyIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tFVUpsci1Eb0szVFJpUVg5YW1qZzhGZmNWdmpRQUFkNDluSjNKaWcyUmR4WThxZz1zOTYtYyIsInByb3ZpZGVyX2lkIjoiMTEwODY2ODc5NTQ4NTUzODEyNDUwIiwic3ViIjoiMTEwODY2ODc5NTQ4NTUzODEyNDUwIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3Mzg3NTkxODh9XSwic2Vzc2lvbl9pZCI6IjViMDNmYTE2LWZiZDgtNGNhZC1iYzQxLTE1N2FjZmIyMTZjYyIsImlzX2Fub255bW91cyI6ZmFsc2V9.OVek1eutsgwVTX3X0GWfuizV6C7vS5VhC4vrc3KVvRo"