let numbers = [];
let originalNumbers = [];
let step = 0;
const positions = ["Ones", "Tens", "Hundreds"];

function generateRandomNumbers() {
  return Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 900) + 100
  );
}

function renderNumbers(arr) {
  const container = document.getElementById("numbers");
  container.innerHTML = "";
  arr.forEach(num => {
    const div = document.createElement("div");
    div.className = "number";
    div.textContent = num;
    container.appendChild(div);
  });
}

function createBuckets() {
  const bucketContainer = document.getElementById("buckets");
  bucketContainer.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    const bucket = document.createElement("div");
    bucket.className = "bucket";
    bucket.id = `bucket-${i}`;
    bucket.innerHTML = `<div class="bucket-title">${i}</div>`;
    bucketContainer.appendChild(bucket);
  }
}

function nextStep() {
  if (step >= 3) {
    document.getElementById("stepInfo").textContent =
      "Sorting complete!";
    return;
  }

  createBuckets();
  document.getElementById("stepInfo").textContent =
    `Sorting by ${positions[step]} Digit`;

  let buckets = Array.from({ length: 10 }, () => []);

  numbers.forEach(num => {
    let digit = Math.floor(num / Math.pow(10, step)) % 10;
    buckets[digit].push(num);
  });

  buckets.forEach((bucket, i) => {
    const bucketDiv = document.getElementById(`bucket-${i}`);
    bucket.forEach(num => {
      const div = document.createElement("div");
      div.className = "number";
      div.textContent = num;
      bucketDiv.appendChild(div);
    });
  });

  numbers = buckets.flat();
  step++;

  renderNumbers(numbers);
}

function resetSort() {
  numbers = generateRandomNumbers();
  originalNumbers = [...numbers];
  step = 0;

  document.getElementById("stepInfo").textContent =
    "New random numbers generated. Ready to sort!";

  document.getElementById("buckets").innerHTML = "";
  renderNumbers(numbers);
}

// Initialize on load
resetSort();
