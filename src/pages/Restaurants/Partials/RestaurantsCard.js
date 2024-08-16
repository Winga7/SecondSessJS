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
          <img src="${
            restaurant.photo
          }" class="card-img-top object-fit-contain imgCard" alt="${
    restaurant.nom
  }">
          </figure>
          <p class="card-im carte description ">${restaurant.description} </p>
          ${CategorieBadge(restaurant.catégorie, restaurant.nomCatégorie)}
        </div>
      </a>
    </div>
    `;
};

export const PlatCard = (plat) => {
  return `
    <div class="col p-2">
		<div class="card card-body">
    <a class="card plat-link" href="/repas?id=${plat.id}">
			<h5 class="card-title carte text-dark text-center text-decoration-underline">${
        plat.nom
      }</h5>
			<figure>
				<img src="${
          plat.photo
        }" class="card-img-top object-fit-cover relative-top imgCard platimg" alt="${
    plat.nom
  }">
			</figure>
			<p class="card-im carte text-dark text-center description ">${
        plat.description
      }</p>
      ${CategorieBadge(plat.catégorie, plat.nomCatégorie)}
			<p id="${
        plat.id
      }" class="presentation p text-center text-dark ">${plat.prix.toString()} €</p>
      </a>
			<p class="presentation text-dark">
      <input class="quantite ${
        plat.id
      }"  type="number" name="quantity" value="1" min="1" max="10">
			<button id="${
        plat.id
      }" class="btn btn-success envoyer presentation">Ajouter au panier</button></p>
			<div class="messageConfirmation ${plat.id}" style="color: lime; "></div>
			</div>
      
		</div>

    `;
};
