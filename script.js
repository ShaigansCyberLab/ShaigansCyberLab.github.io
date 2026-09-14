
console.log("Shaigan's Lab JS loaded");

const nav = document.querySelector("nav");

const menuButton = document.createElement("button");

menuButton.classList.add("menu-button");

menuButton.setAttribute("aria-label", "Toggle navigation");
menuButton.setAttribute("aria-expanded", "false");

menuButton.textContent = "☰";

nav.prepend(menuButton);


menuButton.addEventListener("click", () => {

    nav.classList.toggle("menu-open");

    const isOpen = nav.classList.contains("menu-open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.textContent = isOpen ? "×" : "☰";
});


const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("menu-open");

        menuButton.setAttribute("aria-expanded", "false");

        menuButton.textContent = "☰";
    });

});


const revealElements = document.querySelectorAll(
    "section, .skills div"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

            entry.target.classList.add("visible");

         } else {

            entry.target.classList.remove("visible");
}
        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


