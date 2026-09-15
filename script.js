
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

const terminalInput = document.querySelector(".terminal-input input");
const terminalOutput = document.querySelector(".terminal-output");

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
        commandHistory[commandHistory.length - 1 - historyIndex];

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
        commandHistory[commandHistory.length - 1 - historyIndex];

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
    if (command !== "") {
    terminalOutput.innerHTML += `
        <p><span>shaigan@lab:~$ ${command}</span></p>
    `;
    }

    if (command === "whoami") {
        terminalOutput.innerHTML += `
            <p>shaigan — IT Professional | DevOps | Cybersecurity</p>
        `;
    }

    else if (command === "cat /etc/skills") {
        terminalOutput.innerHTML += `
            <p>
                Development:<br>
                PHP · Python · JavaScript · HTML/CSS · MySQL · WordPress
            </p>
            <p>
                Systems:<br>
                Linux · Debian · Windows · Servers · Networking · VPN
            </p>
            <p>
                DevOps:<br>
                Git · GitHub · Docker · CI/CD · Cloud · Automation
            </p>
            <p>
                Security:<br>
                System Hardening · Network Security · Security Testing Labs
            </p>
        `;
    }

    else if (command === "ls /projects") {
        terminalOutput.innerHTML += `
            <p>
                debian-home-lab/<br>
                vpn-infrastructure/<br>
                devops-lab/<br>
                local-ai-automation/<br>
                web-applications/<br>
                cybersecurity-testing-lab/
            </p>
        `;
    }

    else if (command === "cat /etc/motd") {
        terminalOutput.innerHTML += `
            <p>
                Welcome to Shaigan's Lab.<br>
                Building systems. Automating infrastructure. Exploring security.
            </p>
        `;
    }

    else if (command === "help") {
        terminalOutput.innerHTML += `
            <p>
                Available commands:<br>
                whoami<br>
                cat /etc/skills<br>
                ls /projects<br>
                cat /etc/motd<br>
                clear<br>
                help
            </p>
        `;
    }

    else if (command === "clear") {
        terminalOutput.innerHTML = "";
    }

    else if (command !== "") {
        terminalOutput.innerHTML += `
            <p>Command not found: ${command}</p>
        `;
    }

    terminalInput.value = "";
    terminalInput.focus();
    
    requestAnimationFrame(() => {
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
});
    
});
