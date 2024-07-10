import { Carousel } from "../components/Carousel";
import images from "../storage/homepageCarousel.json";

/**
 * Page d'accueil
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Home = (element) => {
	element.innerHTML = `
    <h1 class="Accueil">Accueil</h1>
    <p class="Accueil">Bienvenue sur tous pour les Fauconniers !</p>
    ${Carousel(images)}
    `;
};
