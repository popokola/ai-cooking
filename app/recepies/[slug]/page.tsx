import RecetteFiche from "@/app/components/RecetteFiche"

async function getRecepy(slug: string) {
    const res = await fetch(`http://localhost:3000/api/recepy/${slug}`)
    return res.json()
}


export default async function Page({ params }: { params: { slug: string } }) {
    const recetteData = getRecepy(params.slug)

    const [recette] = await Promise.all([recetteData])
   

    return (
        <div>
            <RecetteFiche recette={recette} />
        </div>
    )

    /*
    return (
        <div>
            <RecetteFiche recette={recette} />
        </div>
    )
    */
}