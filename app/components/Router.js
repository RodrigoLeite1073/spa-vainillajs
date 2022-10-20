import { ajax } from "../helpers/ajax.js";
import api from "../helpers/wp_api.js";
import { Post } from "./Post.js";
import { PostCard } from "./PostCard.js";

const searchParams = (regex) => {
  const urlString = window.location.hash,
    results = urlString.match(/(\w+=)(\w+((%20){0,1}\w+)*)/)[2];
  let result = results.replaceAll("%20", " ");
  return result;
};

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
    const param = searchParams();
    $main.innerHTML = `<h2>${param}</h2>`;
  } else if (hash === "#/contact") {
    $main.innerHTML = "<h2>Contacto</h2>";
  } else {
    const idPost = searchParams();

    await ajax({
      url: `${api.POST}/${idPost}`,
      cbSuccess: (post) => {
        $main.innerHTML = Post(post);
      },
    });
  }
  d.querySelector(".loader").style.display = "none";
}
