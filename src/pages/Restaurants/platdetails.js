import plats from "../../storage/plats.json";
import { CategorieBadge } from "./Partials/CategorieBadge";
import { escapeHTML } from "./Restaurant.js";

/**
 * Page des détails d'un plat.
 *
 * @param {HTMLElement} element
 * @returns {void}
 */

export const Repas = (element) => {
  // on récupère l'identifiant du plat depuis l'URL
  const url = new URL(window.location.href);
  const platId = parseInt(url.searchParams.get("id"));
  // on récupère le plat correspondant à l'identifiant
  const plat = plats.find((plat) => plat.id === platId);

  // si le plat n'existe pas, on affiche un message d'erreur
  // if (plat && plat.nom && plat.photo && plat.description && plat.prix && plat.catégorie) {
  element.innerHTML = `
      <h1 class="presentation">${escapeHTML(plat.nom)}</h1>
      <figure class="presentation">
      <img src="${escapeHTML(
        plat.photo
      )}" id="affiche" class="card-img-top" alt="${escapeHTML(plat.nom)}">
      </figure>
      <p class="presentation">${escapeHTML(plat.description)}</p>

      <p class="presentation">${CategorieBadge(escapeHTML(plat.catégorie))}</p>
      <p class="presentation">${plat.prix.toFixed(2)} €</p>

  <div id="repas-list"></div>

			
    `;
};
