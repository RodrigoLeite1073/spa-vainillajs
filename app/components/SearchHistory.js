export function SearchHistory(history) {
  let html = "";

  history.forEach((el) => {
    html += `
    <option value="${el}">${el}</option>
    `;
  });
  return `
  <h3>Busquedas Anteriores</h3>
  <select id="history" name="history">
    <option>Seleccione una busqueda</option>
    ${html}
  </select>
  `;
}
