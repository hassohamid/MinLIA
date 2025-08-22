import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { z, ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase.from("aplications").select("*");
    if (error) throw error;
    if (!data?.length) return NextResponse.json([], { status: 200 });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Internal server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
const ApplicationSchema = z.object({
  company: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  status: z.enum(["skickat", "besvarat", "antagen"]),
  applied_date: z.iso.date(),
});
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.json();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const validatedData = ApplicationSchema.parse(body);
    console.log(validatedData);
    return NextResponse.json(
      {
        message: "Success",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: err.issues, // array of issues with paths + messages
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        error: "Internal server error",
        details: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
