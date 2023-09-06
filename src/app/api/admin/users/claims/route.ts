import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("id");

  const { data, error } = await supabase.rpc("get_claims", { uid });
  if (data) {
    return NextResponse.json(data);
  }
}

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("id");
  const handleClaim = searchParams.get("handleClaim");


  try {
    const { data: data1, error } = await supabase.rpc("set_claim", {
      uid,
      claim: "usuario",
      value: handleClaim,
    });
  } catch (error) {
    
  }
}
