import { NextResponse, type NextRequest } from "next/server";

/**
 * Barreira rápida: sem cookie de sessão, o painel manda para o login.
 * A validação real da sessão e do perfil acontece no servidor (requireUser).
 */
export function middleware(request: NextRequest) {
  if (!request.cookies.has("sintaema_sessao")) {
    const url = request.nextUrl.clone();
    url.pathname = "/entrar";
    url.search = "";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/painel/:path*"],
};
