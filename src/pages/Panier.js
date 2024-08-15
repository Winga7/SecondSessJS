// import { Panier } from "../pages/Plats/Produit.js";
// import { SupprimerPanier } from "./Plats/Produit.js";
// import { EnleverProduit } from "./Plats/Produit.js";
// import { ProduitPanier } from "./Plats/Produit.js";

// Panier();

// ProduitPanier();

export function recupPanier() {
  try {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    let total = 0;
    panier.forEach((plat) => {
      total += parseFloat(plat.prix) * plat.quantite;
    });
    return { panier, total: total.toFixed(2) };
  } catch (e) {
    console.error("Erreur lors de la récupération du panier", e);
    return { panier: [], total: 0 };
  }
}

export function quantitePanier() {
  let panier = recupPanier().panier; // Correction pour accéder correctement à l'objet panier
  let total = 0;

  for (let i = 0; i < panier.length; i++) {
    total += parseFloat(panier[i].quantite); // Correction de 'quantité' à 'quantite'
  }
  if (total > 999) {
    return "999+";
  }
  return total.toString();
}

export { quantitePanier as quantiteTotalePanier };

const SupprimerPanier = () => {
  localStorage.removeItem("panier");
};

const AjouterPlat = (plat) => {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  let platPanier = panier.find((p) => plat.id === p.id);
  if (platPanier) {
    platPanier.quantite++;
  } else {
    panier.push({ ...plat, quantite: 1 });
  }
  localStorage.setItem("panier", JSON.stringify(panier));
  document.dispatchEvent(new CustomEvent("panierChange"));
};

const EnleverPlat = (plat) => {
  let panier = JSON.parse(localStorage.getItem("panier")) || [];
  let platPanier = panier.find((p) => p.id === plat.id);

  if (platPanier) {
    platPanier.quantite--;
    if (platPanier.quantite === 0) {
      panier = panier.filter((p) => p.id !== plat.id);
    }
  }
  localStorage.setItem("panier", JSON.stringify(panier));
  document.dispatchEvent(new CustomEvent("panierChange"));
};

export const Panier = (element) => {
  let { panier, total } = recupPanier();
  element.innerHTML = `
	<h1 class="Panier">Panier</h1>
	<table class="table">
		<thead>
			<tr>
				<th scope="col" class="Panier">Nom</th>
				<th scope="col" class="Panier">Prix unitaire</th>
				<th scope="col" class="Panier">Quantité</th>
				<th scope="col" class="Panier">Prix total</th>
			</tr>
		</thead>
		<tbody>
			${panier
        .map(
          (plat) => `
				<tr>
					<td class="Panier">${plat.nom}</td>
					<td class="Panier">${plat.prix} €</td>
					<td class="Panier">${plat.quantite}</td>
					<td class="Panier">${plat.prix * plat.quantite} €</td>
          <td class="Panier">
            <button class="btn btn-primary ajouterProduit">+</button>
            <button class="btn btn-danger enleverProduit">-</button>
				</tr>
			`
        )
        .join("")}
		</tbody>
	</table>
	<p id="Total" >Total : <span>${total}</span> €</p>
	<button id='supprimerPanier' class='btn btn-danger'>
	Supprimer TOUT le Panier
	</button>
	`;
  document.querySelector("#supprimerPanier").addEventListener("click", () => {
    SupprimerPanier();
    Panier(element); // Permet de mettre automatiquement à jour la page
  });
  element.querySelectorAll(".ajouterProduit").forEach((bouton, index) => {
    bouton.addEventListener("click", () => {
      const produit = panier[index];
      AjouterPlat(produit);
      Panier(element); // Met à jour l'affichage du panier
    });
  });
  element.querySelectorAll(".enleverProduit").forEach((bouton, index) => {
    bouton.addEventListener("click", () => {
      const produit = panier[index];
      EnleverPlat(produit);
      Panier(element); // Met à jour l'affichage du panier
    });
  });
};
