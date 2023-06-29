import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userInfo = request.cookies.get('user')
    const result = JSON.parse(String(userInfo?.value))

    return new NextResponse(
        JSON.stringify(result),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );

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