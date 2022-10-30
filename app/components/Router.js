import { ajax } from "../helpers/ajax.js";
import { searchParams } from "../helpers/SearchParams.js";
import api from "../helpers/wp_api.js";
import { Post } from "./Post.js";
import { PostCard } from "./PostCard.js";
import { SearchCard } from "./SearchCard.js";
import { SearchHistory } from "./SearchHistory.js";

export async function Router() {
  const d = document,
    w = window;

  let { hash } = location,
    $main = d.getElementById("main"),
    historyString = "{}",
    historyArray = [];

  if (!hash || hash === "#/") {
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        let html = "";
        posts.forEach((el) => (html += PostCard(el)));
        $main.innerHTML = html;
      },
    });
  } else if (hash.includes("#/search")) {
    historyString = localStorage.getItem("search");
    if (historyString) historyArray = JSON.parse(historyString);

    const param = searchParams("search");
    if (param) {
      d.querySelector(".search-form input").value = param.replaceAll(
        "%20",
        " "
      );
      await ajax({
        url: `${api.SEARCH}${param}`,
        cbSuccess: (posts) => {
          if (!historyArray.includes(param))
            historyArray.push(param.replaceAll("%20", " "));
          localStorage.setItem("search", JSON.stringify(historyArray));
          let html = ``;
          if (posts.length < 1) {
            $main.innerHTML = `
            <div class="error">
              <h2>No hay resultados para el término <mark>${param}</mark></h2>
            </div>
            `;
          } else {
            posts.forEach((el) => (html += SearchCard(el._embedded.self[0])));
            $main.innerHTML = html;
          }
        },
      });
    } else {
      const $select = SearchHistory(historyArray);
      $main.innerHTML = $select;
      /*$main.innerHTML = `
      <div class="error">
        <h2>No has escrito nada en el campo de busqueda.</h2>
        </div>
        `*/
    }
  } else if (hash === "#/contact") {
    $main.innerHTML = "<h2>Contacto</h2>";
  } else {
    const idPost = searchParams("idPost");
    if (idPost) {
      await ajax({
        url: `${api.POST}/${idPost}`,
        cbSuccess: (post) => {
          $main.innerHTML = Post(post);
        },
      });
    }
  }
  d.querySelector(".loader").style.display = "none";
}
