//create props interface
interface RecetteFicheProps {
    recette: {
        nom: string;
        description: string;
        ingredients: string[];
        instructions: string[];
    };
}

const RecetteFiche = ({ recette } : RecetteFicheProps) => {
    return (
      <div>
        <h1>{recette.nom}</h1>
        <p>{recette.description}</p>
        <h2>Ingrédients</h2>
        <ul>
          {recette.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2>Instructions</h2>
        <ol>
          {recette.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
        
      </div>
    );
  };

export default RecetteFiche;