import { NextRequest, NextResponse } from "next/server";
import recette from "../../../public/recettes.json";

export async function GET(request: NextRequest) {
  return NextResponse.json(recette);
}
