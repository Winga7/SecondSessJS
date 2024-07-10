import { CategorieBadge } from "./CategorieBadge";

/**
 * @typedef {Object} Produit
 * @property {number} id - L'identifiant du Produit.
 * @property {string} name - Le nom du Produit.
 * @property {string} photo - La photo du produit.
 * @property {string} categorie - La categorie du produit.
 */

/**
 * Affiche une carte du Produit
 *
 * @param {Produit} produit
 * @returns {string} HTML string
 */
export const ProduitCard = (produit) => {
	return `
    <div class="col p-2">
      <a class="card produit-link" href="/produit?id=${produit.id}">
        <div class="card-body">
          <h5 class="card-title carte">${produit.name}</h5>
          <figure>
          <img src="${produit.photo}" class="card-img-top imgCard" alt="${produit.name}">
          </figure>
          <p class="card-im carte prix">${produit.prix} €</p>
          ${CategorieBadge(produit.catégorie)}
        </div>
      </a>
    </div>
    `;
};
