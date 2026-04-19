window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      for (const movie of movies) {
      const article = document.createElement("article")
      article.id = movie.imdbID

      const title = document.createElement("h2")
      title.textContent = movie.Title

      const year = document.createElement("p")
      year.textContent = "Released: " + movie.Released

      const button = document.createElement("button")
      button.textContent = "Edit"

      // 👉 Navigation zur edit Seite
      button.onclick = function () {
        location.href = "edit.html?imdbID=" + movie.imdbID
      }

      // alles zusammenbauen
      article.appendChild(title)
      article.appendChild(year)
      article.appendChild(button)

      bodyElement.appendChild(article)
            }

    } else {
      bodyElement.append(
        "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
