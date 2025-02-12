import { NextResponse } from 'next/server';

export function middleware(req) {
  // Cloudflare Access が発行する JWT を取得
  const token = req.headers.get('cf-access-jwt');

  if (!token) {
    // 認証されていない場合は 401 エラーを返す
    return new NextResponse('Unauthorized', { status: 401 });
  }

  return NextResponse.next();
}

// Middleware を適用するパスを指定
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};