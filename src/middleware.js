import { NextResponse , NextRequest} from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import { prisma } from '@prisma/client'; // Adjust the import based on your ORM
import { verifyToken } from './utils/jwtAuth';
// import Cookies from 'js-cookie';
// import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers'
const secret = 'national_plastic'; 

export async function middleware(req ) {
    // console.log("[][][][][][][][][][][]",req.cookies.get('auth'))
    const token = req.cookies.get('auth')?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

     try {
        const decodedToken = await verifyToken(token, secret);
    console.log("[][][][][][----][][][][][]",decodedToken)
    console.log("[][][][][][============][][][][][]",decodedToken.role)
    // console.log("[][][][][][+++++++++++++++][][][][][]",decodedToken[0].role)
        const role = decodedToken.role
        console.log("[][][][+++++++++++++++][][][][]",role, "brohhh")
    //     // Check if the user role is admin
        if (role === 'admin') {
          // User is not an admin, redirect to unauthorized page
          console.log('User is aaaaaaaaaaaaaaaaaaa an admin')
          return NextResponse.next();

        }
      } catch (error) {
        console.log(error.message);
        // Token is invalid, redirect to login page
        return NextResponse.redirect(new URL('/Login', req.url));
      }

      return NextResponse.redirect(new URL('/unauthorized', req.url));

}

export const config = {
    matcher: ['/admin/:path*'], // Routes that require admin access
};
