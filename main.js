// JavaScript variables for each selected HTML element

// Controls section
const gridSizeInput = document.getElementById("grid-size"); // Input field for grid size
const submitButton = document.getElementById("submit-btn"); // Button to generate the grid
const resetButton = document.getElementById("reset-btn"); // Button to reset the grid

// Status display
const currentGridSizeDisplay = document.getElementById("current-grid-size"); // Span showing current grid size

// Etch-a-Sketch grid container
const etchContainer = document.getElementById("etch-container"); // Main container for the grid

submitButton.addEventListener("click", () => {
  const gridSize = parseInt(gridSizeInput.value);
  gridGenerator(gridSize);
});

resetButton.addEventListener("click", () => {
  gridSizeInput.value = 16;
  gridGenerator(16);
});

let isDrawing = false;

function gridGenerator(total) {
  currentGridSizeDisplay.innerHTML = total;
  etchContainer.innerHTML = "";
  if (total >= 4 && total <= 100) {
    let squareSize = 100 / total;

    for (let i = 0; i < total * total; i++) {
      const square = document.createElement("div");
      square.className = "square";
      square.style.flex = `1 0 ${squareSize}%`;
      square.dataset.darkness = 0;

      square.addEventListener("mousedown", () => {
        isDrawing = true;
        colorSquare(square);
      });

      square.addEventListener("mouseover", () => {
        if (isDrawing) {
          colorSquare(square);
        }
      });
      etchContainer.appendChild(square);
    }
    document.addEventListener("mouseup", () => {
      isDrawing = false;
    });

    function colorSquare(square) {
      let darkness = parseInt(square.dataset.darkness);

      if (darkness < 10) {
        darkness += 1;
        square.dataset.darkness = darkness;

        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        square.style.background = `rgb(${r * (1 - darkness / 10)}, ${
          g * (1 - darkness / 10)
        }, ${b * (1 - darkness / 10)})`;
      }
    }
  } else {
    gridSizeInput.value = 16;
    gridGenerator(16);
    alert("Oops !!! Input should be more than 4 and less than 100 Try again");
  }
}

gridGenerator(16);
