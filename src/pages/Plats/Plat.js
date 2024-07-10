import Plats from "../../storage/plats.json";
import { CategorieBadge } from "./Partials/CategorieBadge";

/**
 * Page des détails d'un produit
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

export const Plat = (element) => {
	// on récupère l'identifiant du Plat depuis l'URL
	const url = new URL(window.location.href);
	const produitId = parseInt(url.searchParams.get("id"));
	// on récupère le produit correspondant à l'identifiant
	const produit = Plats.find((produit) => plat.id === platId);

	// si le Plat n'existe pas, on affiche un message d'erreur
	if (plat && plat.name && plat.photo && plat.description && plat.prix && plat.catégorie) {
		element.innerHTML = `
      <h1 class="presentation">${escapeHTML(produit.name)}</h1>
      <figure class="presentation">
      <img src="${escapeHTML(plat.photo)}" id="affiche" class="card-img-top" alt="${escapeHTML(plat.name)}">
      </figure>
      <p class="presentation">${escapeHTML(plat.description)}</p>
      <p id="prix" class="presentation">${escapeHTML(plat.prix.toString())} €</p>
      <p class="presentation">${CategorieBadge(escapeHTML(plat.catégorie))}</p>
      <p class="presentation"><input id="quantite"  type="number" name="quantity" value="1" min="1" max="10">
      <button id="envoyer" class="btn btn-success presentation">Ajouter au panier</button></p>
			<div id="messageConfirmation" style="color: lime; "></div>
    `;

		let baliseQuantite = document.getElementById("quantite");
		let baliseEnvoyer = document.getElementById("envoyer");
		if (baliseEnvoyer && baliseQuantite) {
			baliseEnvoyer.addEventListener("click", () => {
				let quantite = parseInt(baliseQuantite.value);
				if (!isNaN(quantite) && quantite > 0) {
					try {
						let panier = JSON.parse(localStorage.getItem("panier")) || [];
						let produitPanier = panier.find((produit) => produit.id === produitId);
						if (produitPanier) {
							produitPanier.quantite += quantite;
						} else {
							panier.push({ ...produit, quantite });
						}
						localStorage.setItem("panier", JSON.stringify(panier));

						// Afficher un message de confirmation
						let messageConfirmation = document.getElementById("messageConfirmation");
						messageConfirmation.innerHTML = "Le produit a bien été ajouté à votre panier.";
						messageConfirmation.style.display = "block ";

						document.dispatchEvent(new CustomEvent("panierChange"));

						// Masquer le message après 3 secondes
						setTimeout(() => {
							messageConfirmation.style.display = "none";
						}, 3000);

						// return Produit(element);
					} catch (e) {
						console.error("Erreur lors de la manipulation du panier", e);
					}
				}
			});
		}
	}
};
