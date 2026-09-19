console.log("Shaigan's Lab JS loaded");

const nav = document.querySelector("nav");

if (nav) {
    const menuButton = document.createElement("button");

    menuButton.classList.add("menu-button");
    menuButton.setAttribute("aria-label", "Toggle navigation");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";

    nav.prepend(menuButton);

    menuButton.addEventListener("click", () => {
        nav.classList.toggle("menu-open");

        const isOpen = nav.classList.contains("menu-open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
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
}


/* ================================
   SCROLL REVEAL
================================ */

/* ================================
   SCROLL REVEAL
================================ */

const revealElements = document.querySelectorAll(
    "section:not(#github-projects), .skills div"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
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

} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}


/* ================================
   TERMINAL
================================ */

const terminalInput =
    document.querySelector(".terminal-input input");

const terminalOutput =
    document.querySelector(".terminal-output");

if (terminalInput && terminalOutput) {

    const commandHistory = [];
    let historyIndex = -1;

    terminalInput.addEventListener("keydown", event => {

        if (event.key === "Tab") {
            event.preventDefault();

            const availableCommands = [
                "whoami",
                "cat /etc/skills",
                "cat /etc/motd",
                "ls /projects",
                "help",
                "clear"
            ];

            const matches = availableCommands.filter(command =>
                command.startsWith(terminalInput.value.trim())
            );

            if (matches.length === 1) {
                terminalInput.value = matches[0];
            }

            return;
        }


        if (event.key === "ArrowUp") {

            if (commandHistory.length === 0) {
                return;
            }

            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
            }

            terminalInput.value =
                commandHistory[
                    commandHistory.length - 1 - historyIndex
                ];

            return;
        }


        if (event.key === "ArrowDown") {

            if (historyIndex <= 0) {
                historyIndex = -1;
                terminalInput.value = "";
                return;
            }

            historyIndex--;

            terminalInput.value =
                commandHistory[
                    commandHistory.length - 1 - historyIndex
                ];

            return;
        }


        if (event.key !== "Enter") {
            return;
        }


        const command = terminalInput.value.trim();

        if (command !== "") {
            commandHistory.push(command);
            historyIndex = -1;
        }


        /* Command line */

        if (command !== "") {

            const commandLine = document.createElement("p");

            const commandSpan = document.createElement("span");

            commandSpan.textContent =
                "shaigan@lab:~$ " + command;

            commandLine.appendChild(commandSpan);

            terminalOutput.appendChild(commandLine);
        }


        /* whoami */

        if (command === "whoami") {

            const output = document.createElement("p");

            output.textContent =
                "shaigan — IT Professional | DevOps | Cybersecurity";

            terminalOutput.appendChild(output);
        }


        /* skills */

        else if (command === "cat /etc/skills") {

            const output = document.createElement("div");

            output.innerHTML =
                "Development:<br>" +
                "PHP · Python · JavaScript · HTML/CSS · MySQL · WordPress" +
                "<p>Systems:<br>" +
                "Linux · Debian · Windows · Servers · Networking · VPN</p>" +
                "<p>DevOps:<br>" +
                "Git · GitHub · Docker · CI/CD · Cloud · Automation</p>" +
                "<p>Security:<br>" +
                "System Hardening · Network Security · Security Testing Labs</p>";

            terminalOutput.appendChild(output);
        }


        /* projects */

        else if (command === "ls /projects") {

            const output = document.createElement("p");

            output.innerHTML =
                "debian-home-lab/<br>" +
                "vpn-infrastructure/<br>" +
                "devops-lab/<br>" +
                "local-ai-automation/<br>" +
                "web-applications/<br>" +
                "cybersecurity-testing-lab/";

            terminalOutput.appendChild(output);
        }


        /* motd */

        else if (command === "cat /etc/motd") {

            const output = document.createElement("p");

            output.innerHTML =
                "Welcome to Shaigan's Lab.<br>" +
                "Building systems. Automating infrastructure. Exploring security.";

            terminalOutput.appendChild(output);
        }


        /* help */

        else if (command === "help") {

            const output = document.createElement("p");

            output.innerHTML =
                "Available commands:<br>" +
                "whoami<br>" +
                "cat /etc/skills<br>" +
                "ls /projects<br>" +
                "cat /etc/motd<br>" +
                "clear<br>" +
                "help";

            terminalOutput.appendChild(output);
        }


        /* clear */

        else if (command === "clear") {
            terminalOutput.innerHTML = "";
        }


        /* unknown command */

        else if (command !== "") {

            const output = document.createElement("p");

            output.textContent =
                "Command not found: " + command;

            terminalOutput.appendChild(output);
        }


        terminalInput.value = "";
        terminalInput.focus();

        requestAnimationFrame(() => {
            terminalOutput.scrollTop =
                terminalOutput.scrollHeight;
        });

    });
}


/* ================================
   GITHUB PROJECTS
================================ */

const githubProjectGrid =
    document.querySelector("#github-project-grid");

if (githubProjectGrid) {

    fetch(
        "https://api.github.com/users/ShaigansCyberLab/repos?sort=updated&per_page=100",
        {
            headers: {
                Accept: "application/vnd.github+json"
            }
        }
    )

        .then(response => {

            if (!response.ok) {
                throw new Error(
                    "GitHub API returned HTTP " + response.status
                );
            }

            return response.json();
        })

        .then(repositories => {

            console.log(
                "GitHub repositories:",
                repositories
            );

            githubProjectGrid.innerHTML = "";

            if (
                !Array.isArray(repositories) ||
                repositories.length === 0
            ) {

                const message = document.createElement("p");

                message.textContent =
                    "No public GitHub projects available yet.";

                githubProjectGrid.appendChild(message);

                return;
            }


            repositories.forEach(repo => {

                const projectCard =
                    document.createElement("article");

                projectCard.classList.add("project-card");


                const title =
                    document.createElement("h3");

                title.textContent = repo.name;


                const description =
                    document.createElement("p");

                description.textContent =
                    repo.description ||
                    "No description provided.";


                const tags =
                    document.createElement("div");

                tags.classList.add("project-tags");


                if (
                    Array.isArray(repo.topics) &&
                    repo.topics.length > 0
                ) {

                    repo.topics.forEach(topic => {

                        const tag =
                            document.createElement("span");

                        tag.textContent = topic;

                        tags.appendChild(tag);
                    });

                } else {

                    const tag =
                        document.createElement("span");

                    tag.textContent =
                        repo.language ||
                        "GitHub Repository";

                    tags.appendChild(tag);
                }


                const meta =
                    document.createElement("div");

                meta.classList.add("project-meta");


                const stars =
                    document.createElement("span");

                stars.textContent =
                    "★ " + repo.stargazers_count;


                const updated =
                    document.createElement("span");

                updated.textContent =
                    "Updated " +
                    new Date(
                        repo.updated_at
                    ).toLocaleDateString();


                meta.appendChild(stars);
                meta.appendChild(updated);


                if (repo.visibility === "public") {

                    const visibility =
                        document.createElement("span");

                    visibility.textContent =
                        "OPEN SOURCE";

                    meta.appendChild(visibility);
                }


                const links =
                    document.createElement("div");

                links.classList.add("project-links");


                const githubLink =
                    document.createElement("a");

                githubLink.href =
                    repo.html_url;

                githubLink.target = "_blank";

                githubLink.rel =
                    "noopener noreferrer";

                githubLink.textContent =
                    "GitHub";


                links.appendChild(githubLink);


                projectCard.appendChild(title);
                projectCard.appendChild(description);
                projectCard.appendChild(tags);
                projectCard.appendChild(meta);
                projectCard.appendChild(links);

                githubProjectGrid.appendChild(projectCard);
            });
        })

        .catch(error => {

            console.error(
                "GitHub projects error:",
                error
            );

            githubProjectGrid.innerHTML = "";

            const message =
                document.createElement("p");

            message.textContent =
                "Unable to load GitHub projects.";

            githubProjectGrid.appendChild(message);
        });
}
