import { ajax } from "../helpers/ajax.js"
import api from "../helpers/wp_api.js"
import { Post } from "./Post.js"
import { PostCard } from "./PostCard.js"
import { SearchCard } from "./SearchCard.js"

const searchParams = () => {
  const urlString = window.location.hash,
    results = urlString.match(/\?(\w+?=)(\w+((%20){0,1}\w+)*)/)
  if (!results) {
    return false
  }
  let result = results[2].replaceAll("%20", " ")
  return result
}

export async function Router() {
  const d = document,
    w = window

  let { hash } = location,
    $main = d.getElementById("main")

  if (!hash || hash === "#/") {
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        let html = ""
        posts.forEach((el) => (html += PostCard(el)))
        $main.innerHTML = html
      },
    })
  } else if (hash.includes("#/search")) {
    const param = searchParams()
    if (param) {
      d.querySelector(".search-form input").value = param
      await ajax({
        url: `${api.SEARCH}${param}`,
        cbSuccess: (posts) => {
          let html = ``
          if (posts.length < 1) {
            $main.innerHTML = `
            <div class="error">
              <h2>No hay resultados para el término <mark>${param}</mark></h2>
            </div>
            `
          } else {
            posts.forEach((el) => (html += SearchCard(el._embedded.self[0])))
            $main.innerHTML = html
          }
        },
      })
    } else {
      $main.innerHTML = `
      <div class="error">
        <h2>No has escrito nada en el campo de busqueda.</h2>
        </div>
        `
    }
  } else if (hash === "#/contact") {
    $main.innerHTML = "<h2>Contacto</h2>"
  } else {
    const idPost = searchParams()

    await ajax({
      url: `${api.POST}/${idPost}`,
      cbSuccess: (post) => {
        $main.innerHTML = Post(post)
      },
    })
  }
  d.querySelector(".loader").style.display = "none"
}
