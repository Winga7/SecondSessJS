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
    <p class="Accueil">Bienvenue sur CroqueMinute. <img src="/img/croqueminute.png" id="accueilimg" alt="" srcset="" /></p>
    <p class="Accueil">Vos plats préférés, prêts en un clin d'oeil !</p>
    <p id="suggestion" class="Accueil">Nos suggestion.</p>
    ${Carousel(images)}
    `;
};
