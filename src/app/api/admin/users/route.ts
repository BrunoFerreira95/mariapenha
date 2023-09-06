import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const supabase = createRouteHandlerClient({ cookies });
  
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
  
    if (!id) {
      let { data: profiles, error } = await supabase.from("profiles").select("*");
  
      if (profiles) {
        return NextResponse.json(profiles);
      }
    } else if (id) {
      let { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id);
  
      if (profile) {
        return NextResponse.json(profile[0]);
      }
    }
  }