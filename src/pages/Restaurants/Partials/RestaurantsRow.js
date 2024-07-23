import { CategorieBadge } from "./CategorieBadge";

/**
 * @typedef {Object} Restaurant
 * @property {number} id - L'identifiant du restaurant.
 * @property {string} name - Le nom du restaurant.
 * @property {string} photo - La photo du restaurant.
 * @property {string} categorie - La catégorie du restaurant.
 */

/**
 * Affiche une ligne d'un tableau restaurants
 *
 * @param {Restaurant} restaurant
 * @returns {string} HTML string
 */
export const RestaurantsRow = (restaurant) => {
	return `
    <tr>
      <td class="rowcarte">${restaurants.name}</td>
      <td class="rowcarte">${restaurants.description}</td>
      <td>${CategorieBadge(restaurants.catégorie)}</td>
      <td class="prix">${restaurants.prix} €</td>
      <td><a class="btn btn-primary btn-sm" href="/restaurant?id=${restaurants.id}"><i class="ri-search-eye-line"></i></a></td>
    </tr>
    `;
};
