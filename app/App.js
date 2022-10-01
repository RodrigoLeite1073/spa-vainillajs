import api from './helpers/wp_api.js';
import { ajax } from './helpers/ajax.js';
import { Title } from './components/Title.js';
import { Loader } from './components/Loader.js';
import { Header } from './components/Header.js';
import { Post } from './components/Posts.js';
import { PostCard } from './components/PostCard.js';

export function App() {
  const d = document,
    $root = d.getElementById('root');

  $root.appendChild(Header());
  $root.appendChild(Post());
  $root.appendChild(Loader());

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
