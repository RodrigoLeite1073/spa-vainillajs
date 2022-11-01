import { PostCard } from "../components/PostCard";
import { SearchCard } from "../components/SearchCard";
import { ajax } from "./ajax";
import { searchParams } from "./SearchParams";
import api from "./wp_api.js";

export async function InfiniteScroll() {
  const d = document,
    w = window;

  let querry = searchParams("search"),
    apiUrl,
    Component;

  w.addEventListener("scroll", (e) => {
    let { scrollTop, clientHeight, scrollHeight } = d.documentElement,
      { hash } = w.location;

    if (scrollTop + clientHeight >= scrollHeight) {
      console.log(scrollTop, clientHeight, scrollHeight);
      api.page++;

      if (!hash || hash === "#/") {
        apiUrl = `${api.POSTS}&page=${api.page}`;
        Component = PostCard;
      } else if (hash === "#/search") {
        apiUrl = `${api.SEARCH}${querry}&page=${api.page}`;
        Component = SearchCard;
      } else {
        return false;
      }
    }
  });

  await ajax({
    url: apiUrl,
    cbSuccess: (posts) => {
      console.log(posts);
    },
  });
}
