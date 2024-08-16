import "./style.scss";
import "remixicon/fonts/remixicon.css";

import { app } from "./framework/app";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Restaurants } from "./pages/Restaurants/Restaurants";
import { Restaurant } from "./pages/Restaurants/Restaurant";
import { Repas } from "./pages/Restaurants/platdetails.js";
import { Panier } from "./pages/Panier";

const routes = {
  "/": Home,
  "/contact": Contact,
  "/restaurant": Restaurant,
  "/restaurants": Restaurants,
  "/repas": Repas,
  "/panier": Panier,
};

app("#app", routes);
