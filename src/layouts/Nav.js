import { ROUTE_CHANGED_EVENT } from "../framework/app";
import { quantiteTotalePanier, recupPanier } from "../pages/Panier";

/**
 * @typedef {Object} Link
 * @property {string} href - L'URL du lien.
 * @property {string} text - Le texte du lien.
 */

/**
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Nav = (element) => {
  const appName = "CroqueMinute";
  const quantite = quantiteTotalePanier();
  const elementQuantite = document.getElementById("cart-count");
  if (elementQuantite) {
    elementQuantite.textContent = quantite; // Met à jour le contenu de l'élément
  }

  /**
   * @type {Link[]}
   */
  const links = [
    { href: "/", text: "Accueil" },
    { href: "/restaurants", text: "Restaurants" },
    { href: "/contact", text: "Contact" },
    // { href: "/panier", text: "Panier" },
  ];

  const { panier } = recupPanier();
  let totalArticles = panier.reduce(
    (acc, produit) => acc + produit.quantite,
    0
  );

  element.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-navbar">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">${appName}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            ${links
              .map(
                (link) => `
                <li class="nav-item">
                  <a class="nav-link" href="${link.href}">${link.text}</a>
                </li>`
              )
              .join("")}
          </ul>
					<ul class="navbar-nav">
  					<li class="nav-item">
    				<a class="nav-link btn btn-primary btn-sm" href="/panier">
      			<span>
        			<i class="ri-shopping-cart-line bg-warning"></i>
        		<span id="cart-count" class="badge bg-success">${totalArticles}</span>
      			</span>
    				</a>
  					</li>
					</ul>
        </div>
      </div>
    </nav>
    `;

  // Remplace les liens par des événements de navigation
  const replaceLinksByEvents = () => {
    const navLinks = element.querySelectorAll("a");

    const linkClickHandler = (event) => {
      // Empêche la navigation par défaut
      event.preventDefault();
      // Modifie l'URL de la page sans recharger la page
      window.history.pushState({}, "", event.currentTarget.href);
      // Déclenche l'événement route-changed pour changer de page sans recharger la page
      element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));

      removeActive();
      markAsActive();
      changePageTitle();
    };

    // Ajoute un écouteur d'événement sur chaque lien de navigation
    for (let i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", linkClickHandler);
    }
  };

  // Supprime la classe active des liens de navigation
  const removeActive = () => {
    const activeLink = element.querySelector("a.active");
    if (activeLink) {
      activeLink.classList.remove("active");
    }
  };

  // Ajoute la classe active au lien de navigation correspondant à l'URL de la page courante
  const markAsActive = () => {
    const activeLink = element.querySelector(
      `a.nav-link[href="${window.location.pathname}"]`
    );
    if (!activeLink) {
      return;
    }
    activeLink.classList.add("active");
  };

  // Modifie le titre de la page en fonction du lien de navigation actif
  const changePageTitle = () => {
    const activeLink = element.querySelector("a.active");

    // Si la page courante n'est pas une page de navigation, on affiche uniquement le nom de l'application
    if (!activeLink) {
      document.title = appName;
      return;
    }

    document.title = `${activeLink.textContent} - ${appName}`;
  };

  // Initialise la barre de navigation
  markAsActive();
  replaceLinksByEvents();
  changePageTitle();

  // Ajoute un écouteur d'événement pour gérer les événements de navigation du navigateur (précédent/suivant)
  window.addEventListener("popstate", () => {
    removeActive();
    markAsActive();
    changePageTitle();
    element.dispatchEvent(new CustomEvent(ROUTE_CHANGED_EVENT));
  });

  document.addEventListener("panierChange", () => {
    const { panier } = recupPanier();
    let totalArticles = panier.reduce(
      (acc, produit) => acc + produit.quantite,
      0
    );
    let nombrePanier = document.getElementById("cart-count");
    console.log(nombrePanier);
    nombrePanier.innerHTML = totalArticles;
    console.log(totalArticles);
  });
};
