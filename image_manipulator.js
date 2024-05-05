document.addEventListener("keydown", function (event) {
  // Get the key pressed
  const keyPressed = event.key.toUpperCase();

  // Get the corresponding img element
  const imgElement = document.getElementById(`key${keyPressed}`);

  // If img element found, update its src attribute
  if (imgElement) {
    imgElement.src = `./${keyPressed}-KeyPressed.png`;
  }
});

document.addEventListener("keyup", function (event) {
  // Get the key released
  const keyReleased = event.key.toUpperCase();

  // Get the corresponding img element
  const imgElement = document.getElementById(`key${keyReleased}`);

  // If img element found, update its src attribute
  if (imgElement) {
    imgElement.src = `./${keyReleased}-KeyNotPressed.png`;
  }
});
