import { NotificationComponent } from "./components/notificationComponent.js";
import { CreateCard } from "./components/cardComponent.js";
import { fetchMoviesData } from "./services/getMovies.js";
import { navbarComponent} from "./components/navbarComponent.js";
import { HTML_ElEMENTS } from "./utils/config.js";

const getMovieData = async (val) => {
    try {
        HTML_ElEMENTS.mainContent.innerHTML = null;
        const movieData = await fetchMoviesData(val);
        movieData.forEach(element => {
            HTML_ElEMENTS.mainContent.appendChild(CreateCard(element));
        });
        }catch(error) {
        NotificationComponent(error);
    }
};

getMovieData();

const nav = navbarComponent(getMovieData);

HTML_ElEMENTS.mainPage.prepend(nav);









