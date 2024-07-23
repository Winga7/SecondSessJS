import { CategorieBadge } from "./CategorieBadge";

/**
 * @typedef {Object} Restaurant
 * @property {number} id - L'identifiant du Restaurant.
 * @property {string} name - Le nom du Restaurant.
 * @property {string} photo - La photo du restaurant.
 * @property {string} categorie - La categorie du restaurant.
 */

/**
 * Affiche une carte du Restaurant
 *
 * @param {Restaurant} restaurant
 * @returns {string} HTML string
 */
export const RestaurantsCard = (restaurant) => {
	return `
    <div class="col p-2">
      <a class="card restaurant-link" href="/restaurant?id=${restaurants.id}">
        <div class="card-body">
          <h5 class="card-title carte">${restaurants.name}</h5>
          <figure>
          <img src="${restaurants.photo}" class="card-img-top imgCard" alt="${restaurants.name}">
          </figure>
          <p class="card-im carte prix">${restaurants.prix} €</p>
          ${CategorieBadge(restaurants.catégorie)}
        </div>
      </a>
    </div>
    `;
};
