import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp_api.js";
import { Post } from "./Post.js";
import { PostCard } from "./PostCard.js";

export async function Router() {
  const d = document,
    w = window;

  let { hash } = location,
    $main = d.getElementById("main");

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
    $main.innerHTML = "<h2>Search</h2>";
  } else if (hash === "#/contact") {
    $main.innerHTML = "<h2>Contacto</h2>";
  } else {
    const urlString = window.location.href,
      regex = /idPost=(\d*)/,
      idPost = urlString.match(regex)[1];

    //const params = new URLSearchParams(querryString);
    //id = params.get("id");
    //console.log(`params ${params}`);

    $main.innerHTML = `<h2>Post Seleccionado</h2> url ${idPost}  `;
  }
  d.querySelector(".loader").style.display = "none";
}
