
// Internal state
let energy = 60;
let attention = "gentle";
let isQuiet = true;
let mood = "happy";

// Expressive responses for each mood
const reactions = {
  happy: {
    title: "Happy ♡",
    eyes: "⌒　⌒",
    symbol: "♡",
    message: "I feel safe with you."
  },
  sleepy: {
    title: "Sleepy...",
    eyes: "—　—",
    symbol: "zZ",
    message: "Just let me dream a little longer."
  },
  annoyed: {
    title: "A little grumpy",
    eyes: "¬　¬",
    symbol: "…",
    message: "I'm tired. I need some space right now."
  },
  overwhelmed: {
    title: "Overwhelmed!",
    eyes: ">　<",
    symbol: "!",
    message: "Too much attention! Please give me a break."
  },
  nervous: {
    title: "Feeling nervous",
    eyes: "◉　◉",
    symbol: "!",
    message: "It's a little too noisy here..."
  },
  curious: {
    title: "Curious!",
    eyes: "●　●",
    symbol: "?",
    message: "I'm ready to explore at my own pace."
  }
};

// Determine mood through combinations of inputs
function determineMood() {
  if (attention === "lots") {
    return "overwhelmed";
  } else if (!isQuiet) {
    return "nervous";
  } else if (energy < 30 && attention === "none") {
    return "sleepy";
  } else if (energy < 30 && attention === "gentle") {
    return "annoyed";
  } else if (attention === "gentle") {
    return "happy";
  } else {
    return "curious";
  }
}

// Update visible and expressive feedback
function updateMood() {
  mood = determineMood();
  const reaction = reactions[mood];

  document.getElementById("room").dataset.mood = mood;
  document.getElementById("energyValue").textContent = energy + "%";
  document.getElementById("mood").textContent = reaction.title;
  document.getElementById("eyes").textContent = reaction.eyes;
  document.getElementById("symbol").textContent = reaction.symbol;
  document.getElementById("message").textContent = reaction.message;
}

// Slider event listener
document.getElementById("energy").addEventListener("input", (event) => {
  energy = Number(event.target.value);
  updateMood();
});

// Radio button event listeners
document.querySelectorAll('input[name="attention"]').forEach((input) => {
  input.addEventListener("change", (event) => {
    attention = event.target.value;
    updateMood();
  });
});

// Checkbox event listener
document.getElementById("quiet").addEventListener("change", (event) => {
  isQuiet = event.target.checked;
  updateMood();
});

// Reset event listener
document.getElementById("reset").addEventListener("click", () => {
  energy = 60;
  attention = "gentle";
  isQuiet = true;

  document.getElementById("energy").value = energy;
  document.querySelector('input[value="gentle"]').checked = true;
  document.getElementById("quiet").checked = true;

  updateMood();
});

updateMood();
