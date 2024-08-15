import { CardsList } from "../../components/CardsList";
import Restaurants from "../../storage/restaurants.json";
import { CategorieBadge } from "./Partials/CategorieBadge";
import plats from "../../storage/plats.json";
import { PlatCard } from "./Partials/RestaurantsCard";
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
  const restaurant = Restaurants.find(
    (restaurant) => restaurant.id === restaurantId
  );

  // si le restaurant n'existe pas, on affiche un message d'erreur
  // if (restaurant && restaurant.nom && restaurant.photo && restaurant.description && restaurant.prix && restaurant.catégorie) {
  element.innerHTML = `
      <h1 class="presentation">${escapeHTML(restaurant.nom)}</h1>
      <figure class="presentation">
      <img src="${escapeHTML(
        restaurant.photo
      )}" id="affiche" class="card-img-top" alt="${escapeHTML(restaurant.nom)}">
      </figure>
      <p class="presentation">${escapeHTML(restaurant.description)}</p>

      <p class="presentation">${CategorieBadge(
        escapeHTML(restaurant.catégorie)
      )}</p>

  <div id="plats-list"></div>

			
    `;
  const platsList = element.querySelector("#plats-list");

  function plat_restau(url) {
    let platrestau = [];
    for (let index = 0; index < plats.length; index++) {
      if (plats[index].restaurantsid === url) {
        platrestau.push(plats[index]);
      }
    }
    return platrestau;
  }

  function msgConfirmation(params) {}

  CardsList(platsList, plat_restau(restaurantId), PlatCard, [
    "nom",
    "description",
    "catégorie",
  ]);
  // let baliseQuantite = document.getElementById("quantite");
  let baliseEnvoyer = document.querySelectorAll(".envoyer");

  baliseEnvoyer.forEach((buttonenvoyer) => {
    if (baliseEnvoyer) {
      buttonenvoyer.addEventListener("click", () => {
        // 1) recuperer class de l'input qui contient l'id du produit e qui est egal a id du button.id
        let quantite = document.getElementsByClassName(
          `quantite ${buttonenvoyer.id}`
        )[0].value;
        quantite = parseInt(quantite);
        if (!isNaN(quantite) && quantite > 0) {
          try {
            let panier = JSON.parse(localStorage.getItem("panier")) || [];

            let platPanier = panier.find((plat) => plat.id == buttonenvoyer.id);

            let platsseul = plats.find((plat) => plat.id == buttonenvoyer.id);

            if (platPanier) {
              platPanier.quantite += quantite;
            } else {
              panier.push({ ...platsseul, quantite });
            }
            localStorage.setItem("panier", JSON.stringify(panier));

            // Afficher un message de confirmation
            let messageConfirmation = document.getElementsByClassName(
              `messageConfirmation ${buttonenvoyer.id}`
            )[0];

            messageConfirmation.innerHTML =
              "Le plat a bien été ajouté à votre panier.";
            messageConfirmation.style.display = "block";

            document.dispatchEvent(new CustomEvent("panierChange"));
            console.log(panier);

            // Masquer le message après 3 secondes
            setTimeout(() => {
              messageConfirmation.style.display = "none";
            }, 3000);

            // return Plat(element);
          } catch (e) {
            console.error("Erreur lors de la manipulation du panier", e);
          }
        }
      });
    } else {
      console.error(
        "Les éléments avec les IDs 'quantite' et 'envoyer' n'ont pas été trouvés."
      );
    }
  });
};
