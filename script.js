function showSurprise() {
  document.getElementById('surprise').classList.remove('hidden');
  startConfetti();
}

const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sparkles = [];

function Sparkle(x, y) {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 3 + 2;
  this.speedY = Math.random() * 1.5 + 0.5;
  this.alpha = 1;

  this.draw = function () {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  this.update = function () {
    this.y += this.speedY;
    this.alpha -= 0.008;
  }
}

function startConfetti() {
  setInterval(() => {
    const x = Math.random() * canvas.width;
    sparkles.push(new Sparkle(x, 0));
  }, 100);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sparkles.forEach((s, index) => {
    s.update();
    s.draw();
    if (s.alpha <= 0) {
      sparkles.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}

animate();
