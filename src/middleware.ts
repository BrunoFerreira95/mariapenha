import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const session = await supabase.auth.getSession();


  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Verifica se a sessão existe e se o campo app_metadata.claims_admin está definido
    if (!session || !session.data.session || !session.data.session.user || !session.data.session.user.app_metadata || !session.data.session.user.app_metadata.claims_admin) {
      return NextResponse.redirect(`${requestUrl.origin}/404`);
    }
  }
  

  if (req.nextUrl.pathname.startsWith("/guarda")) {
    // Verifica se a sessão existe e se o campo app_metadata.usuario está definido
    if (!session || !session.data.session || !session.data.session.user || !session.data.session.user.app_metadata || !session.data.session.user.app_metadata.usuario || session.data.session.user.app_metadata.usuario == 'guarda') {
      return NextResponse.redirect(`${requestUrl.origin}/404`);
    }
  }

  if (req.nextUrl.pathname.startsWith("/usuario")) {
    // Verifica se a sessão existe e se o campo app_metadata.usuario está definido
    if (!session || !session.data.session || !session.data.session.user || !session.data.session.user.app_metadata || !session.data.session.user.app_metadata.usuario || session.data.session.user.app_metadata.usuario == 'maria') {
      return NextResponse.redirect(`${requestUrl.origin}/404`);
    }
  }
  
  return res;
}
