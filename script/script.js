

// ====== Personalized Name Feature ======
const heading = document.querySelector("h1"); // Target the Hello World heading
const changeNameBtn = document.querySelector(".button:nth-child(2)"); // 📝 Change Name button

// Function to ask and save the user's name
function askName() {
  const name = prompt("What’s your name?");
  if (name && name.trim() !== "") {
    localStorage.setItem("username", name.trim());
    displayGreeting(name.trim());
  } else {
    heading.textContent = "Hello, Friend 👋";
  }
}

// Function to display greeting
function displayGreeting(name) {
  heading.textContent = `Hello, ${name} `;
}

// When the page loads
window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("username");
  if (savedName) {
    displayGreeting(savedName);
  } else {
    askName();
  }
});

// When the user clicks “Change Name”
changeNameBtn.addEventListener("click", askName);

document.querySelector('.button').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
// Array of Bible verses
const verses = [
  '"The fear of the Lord is the beginning of wisdom." — Proverbs 9:10',
  '"For God so loved the world that He gave His only begotten Son." — John 3:16',
  '"I can do all things through Christ who strengthens me." — Philippians 4:13',
  '"Trust in the Lord with all your heart and lean not on your own understanding." — Proverbs 3:5',
  '"Be still, and know that I am God." — Psalm 46:10',
  '"The Lord is my shepherd; I shall not want." — Psalm 23:1'
];

// Select the verse banner element
const verseBanner = document.querySelector('.verse-banner p');

// Set initial index
let index = 0;

// Function to change the verse
function changeVerse() {
  index = (index + 1) % verses.length; // move to next verse, loop back to start
  verseBanner.textContent = verses[index];
}

// Change verse every 10 seconds (10000 milliseconds)
setInterval(changeVerse, 10000);

function changeVerse() {
  verseBanner.classList.add('fade-out');
  setTimeout(() => {
    index = (index + 1) % verses.length;
    verseBanner.textContent = verses[index];
    verseBanner.classList.remove('fade-out');
  }, 1000);
}
