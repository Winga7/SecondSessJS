import "./style.scss";
import "remixicon/fonts/remixicon.css";

import { app } from "./framework/app";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Restaurants } from "./pages/Restaurants/Restaurants";
import { Restaurant } from "./pages/Restaurants/Restaurant";
import { Panier } from "./pages/Panier";

const routes = {
	"/": Home,
	"/contact": Contact,
	"/restaurant": Restaurant,
	"/restaurants": Restaurants,
	"/panier": Panier,
};

app("#app", routes);
