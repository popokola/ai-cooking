import { ChevronRightIcon } from '@heroicons/react/20/solid'

const RecetteListe = ({ recettes, onRecetteClique }) => {
    return (
      <div className="mx-auto pt-12 max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1>Liste des Recettes</h1>
        <ul role="list" className="divide-y divide-gray-100">
          {recettes.map((recette, index) => (
              <li key={index} className="relative flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                      <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="#" alt="" />
                      <div className="min-w-0 flex-auto">
                      <button className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => onRecetteClique(recette)}>
                      {recette.nom}
                      </button>
                      </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-x-4">
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">{recette.nom}
                      </p>
                      <p className="text-sm leading-5 text-gray-500">{recette.description}</p>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  </div>
                 
              </li>
          ))}
          </ul>
      </div>
    );
};
  
export default RecetteListe;