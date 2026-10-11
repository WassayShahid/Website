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
