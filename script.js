const inputArrayInput = document.getElementById("input-array");
const calculateButton = document.getElementById("calculate-button");
const resultText = document.getElementById("result-text");
const svgContainer = document.getElementById("svg-container");

calculateButton.addEventListener("click", () => {
  const inputArray = inputArrayInput.value.split(",").map(Number);
  const waterUnits = calculateWaterUnits(inputArray);
  resultText.textContent = `Water Units: ${waterUnits}`;
  drawSVG(inputArray, waterUnits);
});

function calculateWaterUnits(arr) {
  let maxLeft = 0;
  let maxRight = 0;
  let left = 0;
  let right = arr.length - 1;
  console.log(right)
  let waterUnits = 0;

  while (left < right) {
    if (arr[left] < arr[right]) {
      if (arr[left] >= maxLeft) {
        maxLeft = arr[left];
      } else {
        waterUnits += maxLeft - arr[left];
      }
      left++;
    } else {
      if (arr[right] >= maxRight) {
        maxRight = arr[right];
      } else {
        waterUnits += maxRight - arr[right];
      }
      right--;
    }
  }

  return waterUnits;
}

function drawSVG(arr, waterUnits) {
  const svgWidth = 500;
  const svgHeight = 100;
  const blockWidth = 50;
  const blockHeight = 50;

  svgContainer.innerHTML = ""; 

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", svgWidth);
  svg.setAttribute("height", svgHeight);
  svgContainer.appendChild(svg);

  let x = 0;
  let y = 0;

  arr.forEach((height) => {
    if (height > 0) {
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", blockWidth);
      rect.setAttribute("height", blockHeight * height);
      rect.classList.add("block");
      svg.appendChild(rect);

      y += blockHeight * height;
    }

    x += blockWidth;
  });

  x = 0;
  y = 0;

  let waterHeight = 0;

  arr.forEach((height) => {
    if (height > 0 && x < svgWidth - blockWidth) {
      y += blockHeight * height;
    }

    if (x < svgWidth - blockWidth && x + blockWidth < svgWidth) {
      if (arr[x + blockWidth] > 0 && arr[x + blockWidth] > height) {
        waterHeight = arr[x + blockWidth] - height;
      } else if (arr[x + blockWidth] === 0) {
        waterHeight = 0;
      } else {
        waterHeight = height;
      }

      if (waterHeight > 0) {
        const rect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        rect.setAttribute("x", x + blockWidth - 1);
        rect.setAttribute("y", y);
        rect.setAttribute("width", 1);
        rect.setAttribute("height", blockHeight * waterHeight);
        rect.classList.add("water");
        svg.appendChild(rect);
      }
    }

    x += blockWidth;
  });
}
