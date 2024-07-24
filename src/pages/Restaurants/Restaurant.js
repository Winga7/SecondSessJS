import Restaurants from "../../storage/restaurants.json";
import { CategorieBadge } from "./Partials/CategorieBadge";
import plats from "../../storage/plats.json";
/**
 * Page des détails d'un restaurant.
 *
 * @param {HTMLElement} element
 * @returns {void}
 */

function escapeHTML(str) {
	return str.replace(
		/[&<>'"]/g,
		(tag) =>
			({
				"&": "&amp;",
				"<": "&lt;",
				">": "&gt;",
				"'": "&#39;",
				'"': "&quot;",
			}[tag] || tag)
	);
}





export const Restaurant = (element) => {
	// on récupère l'identifiant du restaurant depuis l'URL
	const url = new URL(window.location.href);
	const restaurantId = parseInt(url.searchParams.get("id"));
	// on récupère le restaurant correspondant à l'identifiant
	const restaurant = Restaurants.find((restaurant) => restaurant.id === restaurantId);


	// si le restaurant n'existe pas, on affiche un message d'erreur
	// if (restaurant && restaurant.nom && restaurant.photo && restaurant.description && restaurant.prix && restaurant.catégorie) {
		
		element.innerHTML = `
      <h1 class="presentation">${escapeHTML(restaurant.nom)}</h1>
      <figure class="presentation">
      <img src="${escapeHTML(restaurant.photo)}" id="affiche" class="card-img-top" alt="${escapeHTML(restaurant.nom)}">
      </figure>
      <p class="presentation">${escapeHTML(restaurant.description)}</p>

      <p class="presentation">${CategorieBadge(escapeHTML(restaurant.catégorie))}</p>



	<div class="col p-2">
        <div class="card-body">
          <h5 class="card-title carte text-decoration-underline">${ restaurant.id == plats.restaurantsid ? plats.nom : ''     }</h5>
          <figure>
          <img src="${ restaurant.id == plats.restaurantsid ? plats.photo : ''     }o}" class="card-img-top imgCard" alt="${ restaurant.id == plats.restaurantsid ? plats.nom : ''     }}">
          </figure>
          <p class="card-im carte description ">${ restaurant.id == plats.restaurantsid ? plats.description : ''     }} </p>
        </div>
    </div>

			
    `;

		// let baliseQuantite = document.getElementById("quantite");
		// let baliseEnvoyer = document.getElementById("envoyer");
		// if (baliseEnvoyer && baliseQuantite) {
		// 	baliseEnvoyer.addEventListener("click", () => {
		// 		let quantite = parseInt(baliseQuantite.value);
		// 		if (!isNaN(quantite) && quantite > 0) {
		// 			try {
		// 				let panier = JSON.parse(localStorage.getItem("panier")) || [];
		// 				let restaurantPanier = panier.find((restaurant) => restaurant.id === restaurantId);
		// 				if (restaurantPanier) {
		// 					restaurantPanier.quantite += quantite;
		// 				} else {
		// 					panier.push({ ...restaurant, quantite });
		// 				}
		// 				localStorage.setItem("panier", JSON.stringify(panier));

		// 				// Afficher un message de confirmation
		// 				let messageConfirmation = document.getElementById("messageConfirmation");
		// 				messageConfirmation.innerHTML = "Le plat a bien été ajouté à votre panier.";
		// 				messageConfirmation.style.display = "block ";

		// 				document.dispatchEvent(new CustomEvent("panierChange"));

		// 				// Masquer le message après 3 secondes
		// 				setTimeout(() => {
		// 					messageConfirmation.style.display = "none";
		// 				}, 3000);

		// 				// return Plat(element);
		// 			} catch (e) {
		// 				console.error("Erreur lors de la manipulation du panier", e);
		// 			}
		// 		}
		// 	});
		// }
	// }
};
{/* <p class="presentation"><input id="quantite"  type="number" name="quantity" value="1" min="1" max="10">
      <button id="envoyer" class="btn btn-success presentation">Ajouter au panier</button></p>
			<div id="messageConfirmation" style="color: lime; "></div> */}