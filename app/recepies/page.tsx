'use client';
import React, { useState, useEffect } from 'react';
import RecetteListe from '../components/RecetteListe';
import RecetteFiche from '../components/RecetteFiche';

const ListeRecettesPage = () => {
  const [recettes, setRecettes] = useState([]);
  //const [recetteSelectionnee, setRecetteSelectionnee] = useState(null);

  useEffect(() => {
    // Load recipes from recettes.json when the component mounts
    fetch('/api/recepy')
      .then((response) => response.json())
      .then((data) => setRecettes(data.recettes))
      .catch((error) => console.error('Erreur de chargement des recettes :', error));
  }, []);

  
  const handleRecetteClique = (recette) => {
    //setRecetteSelectionnee(recette);

    // Navigate to the recipe page when the user clicks on a recipe
    window.location.href = `/recepies/${recette.nom}`;

  };

  return (
    <div>
        <RecetteListe recettes={recettes} onRecetteClique={handleRecetteClique} />
    </div>
  );
};


export default ListeRecettesPage;


