import "./style.scss";
import "remixicon/fonts/remixicon.css";

import { app } from "./framework/app";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Plats } from "./pages/Plats/Plats";
import { Plat } from "./pages/Plats/Plat";
import { Panier } from "./pages/Panier";

const routes = {
	"/": Home,
	"/contact": Contact,
	"/plat": Plat,
	"/plats": Plats,
	"/panier": Panier,
};

app("#app", routes);
