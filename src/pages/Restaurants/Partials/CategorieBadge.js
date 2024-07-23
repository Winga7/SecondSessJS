/**
 * Badge de categorie produit
 *
 * @param {string} categorie
 * @returns {string} HTML string
 */
export const CategorieBadge = (categorie) => {
	const categories = {
		admin: "text-bg-danger",
		Chaperons: "text-bg-primary",
		Gants: "text-bg-success",
		Blocs: "text-bg-warning",
		Leurre: "text-bg-dark",
		Telemetrie: "text-bg-danger",
		Rapaces: "text-bg-secondary",
		Divers: "text-bg-info",
	};

	const categorieBadge = categories[categorie] || "text-bg-secondary";

	return `
    <span class="badge ${categorieBadge}">${categorie}</span>
    `;
};
