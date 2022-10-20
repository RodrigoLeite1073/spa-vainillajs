export function SearchForm() {
  const d = document,
    $searchForm = d.createElement("form"),
    $input = d.createElement("input");
  $searchForm.appendChild($input);
  $searchForm.classList.add("search-form");
  $input.name = "search";
  $input.type = "search";
  $input.placeholder = "Buscar...";

  d.addEventListener("submit", (e) => {
    if (!e.target.matches(".search-form")) return false;
    e.preventDefault();
    //localStorage.setItem("wpSearch", e.target.search.value);
    location.hash = `#/search?search=${$input.value}`;
  });
  return $searchForm;
}
