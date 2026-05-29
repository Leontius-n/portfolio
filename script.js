const track = document.getElementById('carouselTrack');

if (track) {
    const slides = Array.from(track.children);
    const dotsBox = document.getElementById('carouselDots');
    let current = 0;

    slides.forEach((_,i) => {
        const dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i+1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsBox.appendChild(dot);
    });

    function goTo(idx) {
        current = (idx + slides.length) % slides.length;
        track.style.transform = `translateX(-${current*100}%)`;
        document.querySelectorAll('.dot').forEach((d,i) =>
            d.classList.toggle('active', i === current)
        );
    }

    document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
    document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

    let autoplay = setInterval(() => goTo(current+1), 5000);
    const wrapper = document.querySelector('.carousel-wrapper');
    wrapper.addEventListener('mouseenter', () => clearInterval(autoplay));
    wrapper.addEventListener('mouseleave', () => {
        autoplay = setInterval(() => goTo(current+1), 5000);
    });
}