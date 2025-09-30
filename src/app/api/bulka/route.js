import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();

  const text = formData.get("text");
  const file = formData.get("file");

  const fileName = file ? file.name : null;

  return NextResponse.json({
    success: true,
    text,
    fileName,
    message: "Данные успешно получены!",
  });
}
