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
    <table class="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
          <th>Quantité</th>
          <th>Total</th>
          <th>Actions</th>
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
                  <button class="btn btn-warning enleverProduit">-</button>
                  <button class="btn btn-danger supprimerProduit">
                    <i class="ri-delete-bin-line"></i>
                  </button>
                </td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
    <p id="Total">Total : <span>${total}</span> €</p>
    <button id='supprimerPanier' class='btn btn-danger'>
      Supprimer TOUT le Panier
    </button>
    <button id='confirmerCommande' class='btn btn-success' style='float: right;'>
      Confirmer la commande
    </button>
  `;

  document.querySelector("#supprimerPanier").addEventListener("click", () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer tout le panier ?")) {
      SupprimerPanier();
      Panier(element); // Permet de mettre automatiquement à jour la page
      alert("Votre panier a bien été supprimé.");
      document.dispatchEvent(new CustomEvent("panierChange"));
    }
  });

  document.querySelector("#confirmerCommande").addEventListener("click", () => {
    const adresse = prompt("Veuillez entrer votre adresse de livraison :");
    if (adresse) {
      alert("Votre commande arrivera d'ici 1 min par drone, vérifiez le ciel.");
      SupprimerPanier();
      Panier(element); // Met à jour l'affichage du panier
      document.dispatchEvent(new CustomEvent("panierChange"));
      setTimeout(() => {
        window.location.href =
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1";
      }, 3000); // Redirection après 3 secondes
    }
  });

  element.querySelectorAll(".ajouterProduit").forEach((bouton, index) => {
    bouton.addEventListener("click", () => {
      const produit = panier[index];
      AjouterPlat(produit);
      Panier(element); // Met à jour l'affichage du panier
      document.dispatchEvent(new CustomEvent("panierChange"));
    });
  });

  element.querySelectorAll(".enleverProduit").forEach((bouton, index) => {
    bouton.addEventListener("click", () => {
      const produit = panier[index];
      EnleverPlat(produit);
      Panier(element); // Met à jour l'affichage du panier
      document.dispatchEvent(new CustomEvent("panierChange"));
    });
  });

  element.querySelectorAll(".supprimerProduit").forEach((bouton, index) => {
    bouton.addEventListener("click", () => {
      const produit = panier[index];
      panier = panier.filter((p) => p.id !== produit.id);
      localStorage.setItem("panier", JSON.stringify(panier));
      Panier(element); // Met à jour l'affichage du panier
      document.dispatchEvent(new CustomEvent("panierChange"));
    });
  });
};
