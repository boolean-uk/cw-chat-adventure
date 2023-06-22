const init = () => {
  const genres = document.querySelectorAll('.genre');
  genres.forEach((button) => button.addEventListener(
    'click',
    () => alert(`You selected the genre: ${button.dataset.genre}`))
  )
}

init()
