import { ajax } from '../helpers/ajax.js';
import api from '../helpers/wp_api.js';
import { PostCard } from './PostCard.js';

export function Router() {
  const d = document;
  ajax({
    url: api.POSTS,
    cbSuccess: (posts) => {
      let html = '';
      posts.forEach((el) => (html += PostCard(el)));
      d.querySelector('.loader').style.display = 'none';
      d.getElementById('posts').innerHTML = html;
    },
  });
}
