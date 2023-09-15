import { NextRequest, NextResponse } from "next/server";
import recettesData from "../../../../public/recettes.json";

export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug; // 'a', 'b', or 'c'
    const recettes = recettesData.recettes;
    
    const recette = recettes.find((recette) => recette.nom === slug);
    
    if (!recette) {
        return NextResponse.redirect("/404");
    }
    
    return NextResponse.json(recette);

}
