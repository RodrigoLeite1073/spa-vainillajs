export function SearchCard(props) {
  let { date, slug, title, excerpt, id } = props._embedded.self[0];
  let dateFormat = new Date(date).toLocaleString();
  return `
  <article class="post-card">
    <h2>${title.rendered}</h2>
      ${excerpt.rendered}
      <p>
      <date datetime="${dateFormat}">${dateFormat}</date>
      <a href="#/${slug}/?idPost=${id}">Ver publicación</a>
      </p>
    </article>
    `;
}
