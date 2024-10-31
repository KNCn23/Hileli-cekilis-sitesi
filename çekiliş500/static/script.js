function startDraw() {
    const drawButton = document.getElementById('draw-button');
    const loadingIndicator = document.getElementById('loading-indicator');
    const winnerElement = document.getElementById('winner');
    const wishElement = document.getElementById('wish');

    // Çekiliş yap butonunu gizle ve yükleme animasyonunu göster
    drawButton.classList.add('hidden');
    loadingIndicator.classList.add('visible');

    // 0.5 saniye sonra yükleme animasyonunu durdur ve kazananı göster
    setTimeout(() => {
        loadingIndicator.classList.remove('visible');
        winnerElement.classList.remove('hidden');
        winnerElement.classList.add('visible');
        wishElement.classList.remove('hidden');
        wishElement.classList.add('visible');
        launchConfetti();
    }, 500); // 0.5 saniye bekleme süresi
}

function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    const confettiPieces = [];

    // İlk iki konfeti patlaması (aşağıdan yukarıya)
    for (let i = 0; i < 100; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: canvas.height, // Aşağıdan başlar
            size: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            rotation: Math.random() * 360,
            velocityY: -Math.random() * 4 - 2 // Yukarı doğru hareket
        });
    }

    // Yukarıdan aşağıya akan konfeti
    setTimeout(() => {
        for (let i = 0; i < 150; i++) {
            confettiPieces.push({
                x: Math.random() * canvas.width,
                y: -Math.random() * canvas.height, // Yukarıdan başlar
                size: Math.random() * 5 + 2,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                rotation: Math.random() * 360,
                velocityY: Math.random() * 3 + 2 // Aşağı doğru hareket
            });
        }
    }, 1000); // 1 saniye sonra yukarıdan aşağıya konfeti eklenir

    function drawConfetti() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach((piece, index) => {
            piece.y += piece.velocityY;
            piece.rotation += 2;

            // Konfeti ekran dışına çıkarsa yeniden başlat
            if (piece.y < 0 - piece.size || piece.y > canvas.height + piece.size) {
                confettiPieces[index].y = Math.random() < 0.5 ? canvas.height : -piece.size;
                piece.x = Math.random() * canvas.width;
            }

            context.save();
            context.translate(piece.x, piece.y);
            context.rotate(piece.rotation * Math.PI / 180);
            context.fillStyle = piece.color;
            context.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            context.restore();
        });
        requestAnimationFrame(drawConfetti);
    }

    drawConfetti();
}
