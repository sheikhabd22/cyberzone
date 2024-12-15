// Visitor Counter
let visitorCount = localStorage.getItem('visitorCount') || 156234;
document.querySelector('.visitor-count').textContent = `Visitors: ${visitorCount}`;
localStorage.setItem('visitorCount', parseInt(visitorCount) + 1);

// Online Users Counter (Random fluctuation)
function updateOnlineUsers() {
    const baseCount = 42;
    const randomFluctuation = Math.floor(Math.random() * 10) - 5;
    document.getElementById('onlineCount').textContent = baseCount + randomFluctuation;
}
setInterval(updateOnlineUsers, 5000);





// Download Button Animation and Functionality
document.querySelectorAll('.download-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const downloadUrl = this.getAttribute('data-download-url');
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'rickroll.jpg'; // Specify the name for the downloaded file
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.classList.add('downloading');
        this.textContent = 'DOWNLOADING...';
        
        setTimeout(() => {
            this.textContent = 'DOWNLOADED!';
            setTimeout(() => {
                this.textContent = 'DOWNLOAD';
                this.classList.remove('downloading');
            }, 2000);
        }, 3000);
    });
});

// Search Functionality
const searchInput = document.querySelector('.search-input');
const cheatEntries = document.querySelectorAll('.cheat-entry');

searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    cheatEntries.forEach(entry => {
        const gameTitle = entry.querySelector('.game-title').textContent.toLowerCase();
        const cheatCode = entry.querySelector('.cheat-code').textContent.toLowerCase();
        const cheatEffect = entry.querySelector('.cheat-effect').textContent.toLowerCase();
        
        if (gameTitle.includes(searchTerm) || 
            cheatCode.includes(searchTerm) || 
            cheatEffect.includes(searchTerm)) {
            entry.style.display = 'block';
        } else {
            entry.style.display = 'none';
        }
    });
});

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const drops = [];
    const fontSize = 10;
    const columns = canvas.width / fontSize;

    for(let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, .05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        for(let i = 0; i < drops.length; i++) {
            const text = matrix[Math.floor(Math.random() * matrix.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if(drops[i] * fontSize > canvas.height && Math.random() > .95) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 35);
}

// Dial-up Sound Effect (Optional)
function playDialupSound() {
    const audio = new Audio('dialup.mp3');
    audio.volume = 0.2;
    const playButton = document.createElement('button');
    playButton.textContent = '🔊 Connect';
    playButton.className = 'dial-up-button';
    playButton.onclick = () => audio.play();
    document.body.appendChild(playButton);
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', function() {
    addConstructionGifs();
    createMatrixRain();
    updateOnlineUsers();
    // playDialupSound(); // Uncomment if you want the dial-up sound
});

// Add "Best Viewed in Netscape" Counter
const browserNote = document.querySelector('.browser-note');
let noteVisible = true;

setInterval(() => {
    noteVisible = !noteVisible;
    browserNote.style.visibility = noteVisible ? 'visible' : 'hidden';
}, 1000);

// Add random glitch effect to titles
const glitchTexts = document.querySelectorAll('.glitch');
setInterval(() => {
    glitchTexts.forEach(text => {
        if(Math.random() > 0.95) {
            text.style.transform = `translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`;
            setTimeout(() => {
                text.style.transform = 'translate(0, 0)';
            }, 100);
        }
    });
}, 50);

// Smooth scrolling for navigation
document.querySelectorAll('.main-nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Add offset for fixed header if needed
            const offset = 80; // Adjust this value based on your header height
            const targetPosition = targetSection.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to navigation buttons
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section, header');
    const navButtons = document.querySelectorAll('.main-nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150 && pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('href') === `#${currentSection}`) {
            button.classList.add('active');
        }
    });
});
// Motivational Quotes
const quotes = [
    "Believe in yourself and all that you are.",
    "The only way to do great work is to love what you do.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger."
];

// Function to change the quote
function changeQuote() {
    const quoteElement = document.querySelector('.motivational-quote');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
}

// Initialize the quote change
setInterval(changeQuote, 5000); // Change quote every 5 seconds
document.addEventListener('DOMContentLoaded', changeQuote); // Change quote on page load
// Make navigation sticky
const nav = document.querySelector('.main-nav');
const navTop = nav.offsetTop;

function stickyNavigation() {
    if (window.scrollY >= navTop) {
        document.body.style.paddingTop = nav.offsetHeight + 'px';
        nav.classList.add('sticky');
    } else {
        document.body.style.paddingTop = 0;
        nav.classList.remove('sticky');
    }
}

window.addEventListener('scroll', stickyNavigation);

// Clipboard functionality for copying cheats
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const cheatCode = this.getAttribute('data-clipboard-text');
        navigator.clipboard.writeText(cheatCode).then(() => {
            alert('Cheat copied to clipboard: ' + cheatCode);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});