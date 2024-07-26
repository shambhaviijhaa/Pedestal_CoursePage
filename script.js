const carousel = document.querySelector('.carousel');
const buttons = document.querySelectorAll('.carousel-button');
let offset = 0;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const direction = button.classList.contains('left') ? -1 : 1;
        const cardWidth = document.querySelector('.topic-card').offsetWidth;
        const maxOffset = -((carousel.childElementCount / 2) * cardWidth);

        offset += direction * cardWidth * 2;

        if (offset > 0) {
            offset = 0;
        } else if (offset < maxOffset) {
            offset = maxOffset;
        }

        carousel.style.transform = `translateX(${offset}px)`;
    });
});

const autoScroll = () => {
    const cardWidth = document.querySelector('.topic-card').offsetWidth;
    const maxOffset = -((carousel.childElementCount / 2) * cardWidth);

    offset -= cardWidth;

    if (offset < maxOffset) {
        offset = 0;
    }

    carousel.style.transform = `translateX(${offset}px)`;
};

let autoScrollInterval = setInterval(autoScroll, 3000);

carousel.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(autoScroll, 3000);
});

carousel.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = offset;
    clearInterval(autoScrollInterval);
});

carousel.addEventListener('mouseleave', () => {
    isMouseDown = false;
});

carousel.addEventListener('mouseup', () => {
    isMouseDown = false;
    autoScrollInterval = setInterval(autoScroll, 3000);
});

carousel.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 3; // Scroll-fast
    offset = scrollLeft - walk;
    carousel.style.transform = `translateX(${offset}px)`;
});

// Add event listeners for arrow key navigation
document.addEventListener('keydown', (e) => {
    const cardWidth = document.querySelector('.topic-card').offsetWidth;
    if (e.key === 'ArrowRight') {
        offset -= cardWidth;
    } else if (e.key === 'ArrowLeft') {
        offset += cardWidth;
    }

    const maxOffset = -((carousel.childElementCount / 2) * cardWidth);

    if (offset > 0) {
        offset = 0;
    } else if (offset < maxOffset) {
        offset = maxOffset;
    }

    carousel.style.transform = `translateX(${offset}px)`;
});

// Add event listener for mouse wheel scrolling
carousel.addEventListener('wheel', (e) => {
    const cardWidth = document.querySelector('.topic-card').offsetWidth;
    if (e.deltaY > 0) {
        offset -= cardWidth;
    } else {
        offset += cardWidth;
    }

    const maxOffset = -((carousel.childElementCount / 2) * cardWidth);

    if (offset > 0) {
        offset = 0;
    } else if (offset < maxOffset) {
        offset = maxOffset;
    }

    carousel.style.transform = `translateX(${offset}px)`;
});
