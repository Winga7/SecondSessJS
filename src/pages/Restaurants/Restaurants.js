import { CardsList } from "../../components/CardsList";
import { DataTable } from "../../components/DataTable";
import restaurants from "../../storage/restaurants.json";
import { RestaurantsCard } from "./Partials/RestaurantsCard";
import { RestaurantsRow } from "./Partials/RestaurantsRow";

/**
 * Page de la liste des restaurants
 * 2 modes d'affichage : grille et tableau
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Restaurants = (element) => {
  // on récupère le mode d'affichage depuis l'URL
  const url = new URL(window.location.href);
  const modeFromQueryString = url.searchParams.get("mode");
  let mode = modeFromQueryString || "grid";

  element.innerHTML = `
    <div class="d-flex justify-content-between">
      <h1>Restaurants</h1>
      <div>
        <button id="grid-mode-btn" class="btn btn-sm btn-secondary mr-3">
          <i class="ri-layout-grid-line"></i>
        </button>
        <button id="table-mode-btn" class="btn btn-sm btn-secondary mr-3">
          <i class="ri-table-line"></i>
        </button>
      </div>
    </div>
    <div id="restaurants-list"></div>
		
    `;

  const restaurantsList = element.querySelector("#restaurants-list");

  // Fonction pour afficher les restaurants en fonction du mode d'affichage
  const render = () => {
    if (mode === "grid") {
      CardsList(restaurantsList, restaurants, RestaurantsCard, [
        "nom",
        "description",
        "catégorie",
      ]);
    } else if (mode === "table") {
      DataTable(
        restaurantsList,
        restaurants,
        RestaurantsRow,
        ["nom", "description", "catégorie", "prix"],
        ["Nom", "Description", "Catégorie", "Actions"]
      );
    }
  };

  // Met à jour le mode dans l'URL
  const putModeInQueryString = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", mode);
    window.history.pushState({}, "", url);
  };

  // Met en surbrillance le mode d'affichage actif
  const markActiveMode = () => {
    if (mode === "grid") {
      tableModeBtn.classList.remove("active");
      gridModeBtn.classList.add("active");
    } else if (mode === "table") {
      gridModeBtn.classList.remove("active");
      tableModeBtn.classList.add("active");
    }
  };

  // Initialisation de la page
  render();

  const gridModeBtn = document.querySelector("#grid-mode-btn");
  const tableModeBtn = document.querySelector("#table-mode-btn");

  markActiveMode();

  // Ajout des écouteurs d'événements sur les boutons de mode d'affichage
  gridModeBtn.addEventListener("click", () => {
    mode = "grid";
    markActiveMode();
    putModeInQueryString();
    render();
  });

  // Ajout des écouteurs d'événements sur les boutons de mode d'affichage
  tableModeBtn.addEventListener("click", () => {
    mode = "table";
    markActiveMode();
    putModeInQueryString();
    render();
  });

  // Ajout d'un écouteur d'événement sur le bouton de retour arrière du navigateur
  window.addEventListener("popstate", () => {
    const url = new URL(window.location.href);
    mode = url.searchParams.get("mode") || "grid";
    render();
    markActiveMode();
  });
};
