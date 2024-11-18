import { NextResponse } from "next/server";

export function middleware(request){
    if(request.nextUrl.pathname.startsWith('/about')){
        return NextResponse.rewrite(new URL('/', request.url))
    }
    // return NextResponse.json({msg:"This is a message"})
    // return NextResponse.redirect(new URL('/', request.url));
    

}

// export const config  = {
//     matcher: '/about/:path*'
// }