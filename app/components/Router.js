import { ajax } from '../helpers/ajax.js';
import api from '../helpers/wp_api.js';
import { PostCard } from './PostCard.js';

export function Router() {
  const d = document,
    w = window;

  let { hash } = location,
    $posts = d.getElementById('posts');

  d.querySelector('.loader').style.display = 'none';
  if (!hash || hash === '#/') {
    ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        let html = '';
        posts.forEach((el) => (html += PostCard(el)));
        d.querySelector('.loader').style.display = 'none';
        $posts.innerHTML = html;
      },
    });
  } else if (hash.includes('#/search')) {
    $posts.innerHTML = '<h2>Search</h2>';
  } else if (hash === '#/constact') {
    $posts.innerHTML = '<h2>Contacto</h2>';
  } else {
    $posts.innerHTML = '<h2>Post Seleccionado</h2>';
  }
}
