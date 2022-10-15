export function PostCard(props) {
  let { date, slug, title, _embedded, id } = props;
  let dateFormat = new Date(date).toLocaleString(),
    urlPoster = _embedded["wp:featuredmedia"]
      ? _embedded["wp:featuredmedia"][0].source_url
      : "./app/assets/no-images.png";
  return `
  <article class="post-card">
    <img src=${urlPoster} alt="${title.rendered}">
    <h2>${title.rendered}</h2>
      <p>
      <date datetime="${dateFormat}">${dateFormat}</date>
      <a href="#/${slug}/?idPost=${id}">Ver publicación</a>
      </p>
    </article>
    `;
}
