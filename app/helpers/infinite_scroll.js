import { PostCard } from "../components/PostCard.js";
import { SearchCard } from "../components/SearchCard.js";
import { ajax } from "./ajax.js";
import { searchParams } from "./SearchParams.js";
import api from "./wp_api.js";

export async function InfiniteScroll() {
  const d = document,
    w = window;

  let querry = searchParams("search"),
    apiURL,
    Component;

  w.addEventListener("scroll", async () => {
    let { scrollTop, clientHeight, scrollHeight } = d.documentElement,
      { hash } = location;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      api.page++;

      if (!hash || hash === "#/") {
        apiURL = `${api.POSTS}&page=${api.page}`;
        Component = PostCard;
      } else if (hash.includes("#/search") && querry) {
        console.log(querry);
        apiURL = `${api.SEARCH}${querry}&page=${api.page}`;
        Component = SearchCard;
      } else return false;

      d.querySelector(".loader").style.display = "block";

      await ajax({
        url: apiURL,
        cbSuccess: (posts) => {
          let html = "";
          posts.forEach((el) => (html += Component(el)));

          d.getElementById("main").insertAdjacentHTML("beforeend", html);

          d.querySelector(".loader").style.display = "none";
        },
      });
    }
  });
}
