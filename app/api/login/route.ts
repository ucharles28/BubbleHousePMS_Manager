import { NextRequest, NextResponse } from "next/server";
import { makeApiCall } from '../../helpers/apiRequest'
import { User } from '../../models/user'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const loginResponse = await makeApiCall('Auth/Staff/SignIn', 'POST', { email, password })

    if (loginResponse.successful) {
      const user = { hotelId: loginResponse.data.hotel.hotelId, userId: loginResponse.data.id } as User
      const response = new NextResponse(
        JSON.stringify(user),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );

      const tokenMaxAge = 60 * 60 * 24 * 2; //2 days
      const cookieOptions = {
        name: "user",
        value: JSON.stringify(user),
        // httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV !== "development",
        maxAge: tokenMaxAge,
      };


      await Promise.all([
        response.cookies.set(cookieOptions),
        response.cookies.set({
          name: "logged-in",
          value: "true",
          maxAge: tokenMaxAge,
        }),
      ]);

      return response;
    } else {
      return new NextResponse(
        JSON.stringify(loginResponse.data),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify('Something went wrong. Please try again later'),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}