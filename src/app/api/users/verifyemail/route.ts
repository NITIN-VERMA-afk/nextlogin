import { connectdb } from "@/dbConfig/dbConfig";

import User from "@/models/userModel";
import { verify } from "crypto";
import { NextRequest, NextResponse } from "next/server";
connectdb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTOkenEXpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ error: "invalid token" }, { status: 400 });
    }
    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTOkenEXpiry = undefined;

    await user.save();

    return NextResponse.json(
      {
        message: "email verified succcesfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
