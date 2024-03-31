import { connectdb } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

import User from "@/models/userModel";
import { verify } from "crypto";
import { NextRequest, NextResponse } from "next/server";

connectdb();

export async function POST(request: NextRequest) {
  // extract data from token

  const userId = await getDataFromToken(request);

  const user= await User.findOne({ _id: userId }).select("-password");

  return NextResponse.json({
    message:"User found",
    data:user
  })
}
