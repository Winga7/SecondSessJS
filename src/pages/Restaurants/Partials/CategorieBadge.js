/**
 * Badge de categorie produit
 *
 * @param {string} categorie
 * @returns {string} HTML string
 */
export const CategorieBadge = (categorie) => {
  const categories = {
    Fast_Food: "text-bg-danger",
    Français: "text-bg-primary",
    Italien: "text-bg-success",
    Japonais: "text-bg-warning",
    Oriental: "text-bg-dark",
    Mexicain: "text-bg-info",
  };

  const categorieBadge = categories[categorie] || "text-bg-secondary";

  return `
    <span class="badge ${categorieBadge}">${categorie}</span>
    `;
};
