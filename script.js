const pages = document.querySelectorAll('.page');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.turn-btn');
let currentPage = Array.from(pages).findIndex(p => p.classList.contains('active'));
if (currentPage === -1) currentPage = 0;

function showPage(index) {
    if (index < 0 || index >= pages.length) return;
    pages.forEach((page) => {
        page.classList.remove('active');
        page.style.transform = 'none';
        page.style.opacity = '1';
        page.style.transition = '';
    });

    currentPage = index;
    pages[currentPage].classList.add('active');

    // Hide prev button on first page, hide next button on last page
    if (prevBtn) prevBtn.style.display = (currentPage > 0) ? 'block' : 'none';
    if (nextBtn) nextBtn.style.display = (currentPage < pages.length - 1) ? 'block' : 'none';

    console.log('Opened page:', index);
}

function nextPage() {
    if (currentPage >= pages.length - 1) return;

    const current = pages[currentPage];
    const next = pages[currentPage + 1];

    if (next) {
        next.classList.add('active');
        next.style.zIndex = '1';
    }
    current.style.zIndex = '2';

    const currentRight = current.querySelector('.right-page');
    if (!currentRight) {
        current.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        current.style.transformOrigin = 'left center';
        requestAnimationFrame(() => {
            current.style.transform = 'perspective(2000px) rotateY(-120deg)';
            current.style.opacity = '0';
        });
        setTimeout(() => {
            showPage(currentPage + 1);
            current.style.zIndex = '';
        }, 800);
        return;
    }

    currentRight.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
    currentRight.style.transformOrigin = 'left center';
    currentRight.style.willChange = 'transform, opacity';

    requestAnimationFrame(() => {
        currentRight.style.transform = 'perspective(2000px) rotateY(-180deg)';
        currentRight.style.opacity = '0';
    });

    setTimeout(() => {
        currentRight.style.transition = '';
        currentRight.style.transform = 'none';
        currentRight.style.opacity = '1';

        current.style.zIndex = '';
        if (next) next.style.zIndex = '';

        showPage(currentPage + 1);
    }, 820);
}

function prevPage() {
    if (currentPage <= 0) return;

    const current = pages[currentPage];
    const prev = pages[currentPage - 1];

    if (prev) {
        prev.classList.add('active');
        prev.style.zIndex = '1';
    }
    current.style.zIndex = '2';

    const prevRight = prev ? prev.querySelector('.right-page') : null;
    if (!prevRight) {
        showPage(currentPage - 1);
        return;
    }

    prevRight.style.transition = 'none';
    prevRight.style.transform = 'perspective(2000px) rotateY(-180deg)';
    prevRight.style.opacity = '0';
    prevRight.style.willChange = 'transform, opacity';

    requestAnimationFrame(() => {
        prevRight.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        prevRight.style.transform = 'perspective(2000px) rotateY(0deg)';
        prevRight.style.opacity = '1';
    });

    setTimeout(() => {
        prevRight.style.transition = '';
        prevRight.style.transform = 'none';
        prevRight.style.opacity = '1';

        current.style.zIndex = '';
        if (prev) prev.style.zIndex = '';

        showPage(currentPage - 1);
    }, 820);
}

function goToPage(index) {
    showPage(index);
}

// initialize UI state
showPage(currentPage);
