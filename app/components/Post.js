export function Post(props) {
  const { title, date, content } = props;
  let dateFormat = new Date(date).toLocaleString();
  return `
<section class="post-page">
  <aside>
    <h2>${title.rendered}</h2>
    <date datetime="${date}">${dateFormat}</date>
  </aside>
  <hr>
  <article>${content.rendered}</article>
</section>
  `;
}
