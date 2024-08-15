/**
 * Badge de categorie produit
 *
 * @param {string} categorie
 * @returns {string} HTML string
 */
export const CategorieBadge = (categorie) => {
  const categories = {
    "Fast Food": "text-bg-danger",
    Français: "text-bg-primary",
    Italien: "text-bg-success",
    Japonais: "text-bg-warning",
    Oriental: "text-bg-dark",
    Mexicain: "text-bg-info",
    Burger: "text-bg-burger",
    Accompagnement: "text-bg-accompagnement",
    Dessert: "text-bg-dessert",
    "Finger Food": "text-bg-fingerfood",
    Pizza: "text-bg-pizza",
    Entrée: "text-bg-entree",
    Salade: "text-bg-salade",
    Boisson: "text-bg-boisson",
    Sushi: "text-bg-sushi",
    Ramen: "text-bg-ramen",
    Pâtes: "text-bg-pates",
    "Plat Principal": "text-bg-platprincipal",
    Soupe: "text-bg-soupe",
    Sandwich: "text-bg-sandwich",
    Wrap: "text-bg-wrap",
  };

  const categorieBadge = categories[categorie] || "text-bg-secondary";

  return `
    <span class="badge ${categorieBadge}">${categorie}</span>
    `;
};
