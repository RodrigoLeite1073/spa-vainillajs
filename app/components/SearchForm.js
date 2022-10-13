export function SearchForm() {
  const $searchForm = document.createElement("form"),
    $input = document.createElement("input");
  $searchForm.appendChild($input);
  $searchForm.classList.add("search-form");
  $input.name = "search";
  $input.type = "search";
  $input.placeholder = "Buscar...";
  return $searchForm;
}
