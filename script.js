function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

// Touch screens have no hover, so a tap shows a project's description instead.
document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (event) => {
        if (window.matchMedia("(hover: hover)").matches) return;
        if (event.target.closest("a")) return;
        document.querySelectorAll(".project-card.is-active").forEach((other) => {
            if (other !== card) other.classList.remove("is-active");
        });
        card.classList.toggle("is-active");
    });
});

// Give the sticky nav a border and shadow once the page is scrolled.
const navs = document.querySelectorAll("#desktop-nav, #hamburger-nav");
const updateNav = () => navs.forEach((nav) => nav.classList.toggle("scrolled", window.scrollY > 10));
window.addEventListener("scroll", updateNav, { passive: true });
updateNav();

// Fade sections in as they scroll into view.
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.classList.add("visible");
            observer.unobserve(el);
            // Once faded in, drop the reveal styles so the element's own hover transitions apply again.
            setTimeout(() => {
                el.classList.remove("reveal", "visible");
                el.style.transitionDelay = "";
            }, 900);
        });
    }, { threshold: 0.12 });

    document.querySelectorAll(
        "section:not(#profile) .section__text__p1, section:not(#profile) .title, .about-details-container, " +
        "#about .section__pic-container, .skills-grid .details-container, .project-card, .contact-info-upper-container"
    ).forEach((el, i) => {
        el.classList.add("reveal");
        el.style.transitionDelay = `${(i % 3) * 80}ms`;
        observer.observe(el);
    });
}

document.getElementById("year").textContent = new Date().getFullYear();
