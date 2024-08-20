import { ROUTE_CHANGED_EVENT } from "../framework/app";
import { Pagination } from "./Pagination";
import { TextInput } from "./TextInput";

/**
 * Un composant pour afficher une liste de cartes paginée et filtrable.
 *
 * @param {HTMLElement} element
 * @param {Object[]} items
 * @param {Function} itemTemplate
 * @param {string[]} searchableFields
 * @returns {void}
 */
export const CardsList = (element, items, itemTemplate, searchableFields) => {
  let currentPage =
    parseInt(new URL(window.location).searchParams.get("page")) || 1;
  let searchInputValue =
    new URL(window.location).searchParams.get("search") || "";
  let filteredItems = items;

  const id = `list-${Math.random().toString(36).slice(2)}`;

  element.innerHTML = `
    <div class="row">
      <div class="col mb-2">
        ${TextInput("search", searchInputValue, "search", "Rechercher...")}
      </div>
    </div>
    <div id="categorieFiltre" class="d-flex flex-wrap justify-content-around mb-2"></div>
    <div id="${id}" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3"></div>
    <div id="pagination"></div>
  `;

  const searchInput = element.querySelector("input#search");
  const listElement = element.querySelector(`#${id}`);
  const paginationElement = element.querySelector("#pagination");

  // Extraire les catégories uniques
  const categories = [...new Set(items.map((item) => item.catégorie))];

  // Générer dynamiquement les cases à cocher pour les catégories
  const categorieFiltre = element.querySelector("#categorieFiltre");
  categories.forEach((categorie) => {
    categorieFiltre.innerHTML += `
      <div>
        <input type="checkbox" id="toggle-${categorie}" name="${categorie}" />
        <label for="toggle-${categorie}">${categorie}</label>
      </div>
    `;
  });

  // Fonction pour afficher la liste des items
  const renderList = (filteredItems) => {
    if (filteredItems.length === 0) {
      return `<p>Aucun résultat</p>`;
    }
    return `${filteredItems.map(itemTemplate).join("")}`;
  };

  // Fonction pour filtrer et paginer les items
  const filterAndPaginate = (perPage = 9) => {
    const value = searchInputValue.toLowerCase();
    if (value !== "") {
      filteredItems = items.filter((item) =>
        searchableFields.some(
          (field) =>
            item[field] && item[field].toString().toLowerCase().includes(value)
        )
      );
    } else {
      filteredItems = items;
    }

    // Filtrer par catégories sélectionnées
    const selectedCategories = Array.from(
      categorieFiltre.querySelectorAll("input[type=checkbox]:checked")
    ).map((checkbox) => checkbox.name);
    if (selectedCategories.length > 0) {
      filteredItems = filteredItems.filter((item) =>
        selectedCategories.includes(item.catégorie)
      );
    }

    const start = (currentPage - 1) * perPage;
    const end = Math.min(start + perPage, filteredItems.length);
    const pages = Math.ceil(filteredItems.length / perPage);
    filteredItems = filteredItems.slice(start, end);

    listElement.innerHTML = renderList(filteredItems);
    paginationElement.innerHTML = Pagination(currentPage, pages);

    const paginationLinks = paginationElement.querySelectorAll("a");
    const paginationLinkClickHandler = (event) => {
      /* ... */
    };
    for (let i = 0; i < paginationLinks.length; i++) {
      /* ... */
    }

    const cardsLinks = listElement.querySelectorAll("a");
    const cardLinkClickHandler = (event) => {
      /* ... */
    };
    for (let i = 0; i < cardsLinks.length; i++) {
      /* ... */
    }
  };

  // Initialisation de la liste de cartes
  filterAndPaginate();

  // Écouteur d'événement sur le champ de recherche
  searchInput.addEventListener("input", (e) => {
    e.preventDefault();
    searchInputValue = e.target.value;
    currentPage = 1;
    const url = new URL(window.location);
    url.searchParams.set("search", searchInputValue);
    url.searchParams.set("page", currentPage);
    window.history.pushState({}, "", url);
    filterAndPaginate();
  });

  // Écouteur d'événement sur les cases à cocher des catégories
  categorieFiltre.addEventListener("change", () => {
    currentPage = 1;
    filterAndPaginate();
  });

  // Écouteur d'événement sur le bouton précédent du navigateur
  window.addEventListener("popstate", () => {
    currentPage =
      parseInt(new URL(window.location).searchParams.get("page")) || 1;
    filterAndPaginate();
  });
};
