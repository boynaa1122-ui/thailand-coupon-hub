import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = createAdminClient();

    await supabase.from("analytics").insert({
      event_type: body.event_type,
      entity_type: body.entity_type || null,
      entity_id: body.entity_id || null,
      metadata: body.metadata || {},
      referrer: body.referrer || null,
      user_agent: request.headers.get("user-agent") || null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Analytics failures should never break the client experience.
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
