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
      <td class="rowcarte">${restaurant.nom}</td>
      <td class="rowcarte">${restaurant.description}</td>
      <td>${CategorieBadge(restaurant.catégorie, restaurant.nomCatégorie)}</td>
      <td><a class="btn btn-primary btn-sm" href="/restaurant?id=${
        restaurant.id
      }"><i class="ri-search-eye-line"></i></a></td>
    </tr>
    `;
};
