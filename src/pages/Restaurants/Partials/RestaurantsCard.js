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
      <a class="card restaurant-link" href="/restaurant?id=${restaurant.id}">
        <div class="card-body">
          <h5 class="card-title carte text-decoration-underline">${
            restaurant.nom
          }</h5>
          <figure>
          <img src="${restaurant.photo}" class="card-img-top imgCard" alt="${
    restaurant.nom
  }">
          </figure>
          <p class="card-im carte description ">${restaurant.description} </p>
          ${CategorieBadge(restaurant.catégorie)}
        </div>
      </a>
    </div>
    `;
};

export const PlatCard = (plat) => {
  return `
    <div class="col p-2">
		<div class="card card-body">
			<h5 class="card-title carte text-dark text-center text-decoration-underline">${
        plat.nom
      }</h5>
			<figure>
				<img src="${plat.photo}" class="card-img-top imgCard" alt="${plat.nom}">
			</figure>
			<p class="card-im carte text-dark text-center description ">${
        plat.description
      }</p>
			<p id="prix" class="presentation text-center text-dark ">${plat.prix.toString()} €</p>
			<p class="presentation text-dark"><input id="quantite"  type="number" name="quantity" value="1" min="1" max="10">
			<button id="envoyer" class="btn btn-success presentation">Ajouter au panier</button></p>
			<div id="messageConfirmation" style="color: lime; "></div>
			</div>
		</div>

    `;
};
