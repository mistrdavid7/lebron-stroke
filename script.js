document.addEventListener("DOMContentLoaded", function () {
    const dih = document.getElementById("dih");
    const progressBar = document.getElementById("progressBar");
    let isDragging = false;
    let progress = 0;
    let decayInterval;

    // Vytvoření vlastního kurzoru
    const customCursor = document.createElement("div");
    customCursor.classList.add("custom-cursor");
    document.body.appendChild(customCursor);

    document.addEventListener("mousemove", (event) => {
        const dihRect = dih.getBoundingClientRect();
        const centerX = dihRect.left + dihRect.width / 2;
        const lowestY = dihRect.bottom - 50;
        const highestY = lowestY - 200;

        if (
            event.clientX > dihRect.left - 20 &&
            event.clientX < dihRect.right + 20 &&
            event.clientY > dihRect.top &&
            event.clientY < dihRect.bottom
        ) {
            document.body.classList.add("locked-cursor");
            customCursor.style.left = `${centerX - 32}px`;
            customCursor.style.top = `${lowestY - 32}px`;
        } else {
            document.body.classList.remove("locked-cursor");
            customCursor.style.left = `-100px`;
            customCursor.style.top = `-100px`;
        }
    });

    // Povolíme tahání myší nahoru/dolu
    document.addEventListener("mousedown", (event) => {
        const dihRect = dih.getBoundingClientRect();
        if (
            event.clientX > dihRect.left - 20 &&
            event.clientX < dihRect.right + 20 &&
            event.clientY > dihRect.top &&
            event.clientY < dihRect.bottom
        ) {
            isDragging = true;
            clearInterval(decayInterval); // Zastaví pokles progress baru
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        startDecay(); // Spustí pomalé klesání progress baru
    });

    document.addEventListener("mousemove", (event) => {
        if (isDragging) {
            const dihRect = dih.getBoundingClientRect();
            const lowestY = dihRect.bottom - 50;
            const highestY = lowestY - 200;

            let newY = Math.max(Math.min(event.clientY, lowestY), highestY);

            // Udržení kurzoru ve středu X
            customCursor.style.left = `${dihRect.left + dihRect.width / 2 - 32}px`;
            customCursor.style.top = `${newY}px`;

            // Zpomalené naplňování progressu (cca 30 sekund na 100%)
            let targetProgress = ((newY - highestY) / (lowestY - highestY)) * 100;
            progress += (targetProgress - progress) * 0.02; // Plynulejší a pomalejší změna
            progressBar.style.width = `${progress}%`;
        }
    });

    function startDecay() {
        decayInterval = setInterval(() => {
            if (progress > 0) {
                progress -= 0.2; // Zpomalíme rychlost poklesu progressu
                progressBar.style.width = `${Math.max(progress, 0)}%`;
            } else {
                clearInterval(decayInterval);
            }
        }, 50); // Jak často se bude progress snižovat
    }

    // ÚPLNÁ blokace drag & drop
    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("draggable", "false");
        img.addEventListener("dragstart", event => event.preventDefault());
        img.addEventListener("mousedown", event => event.preventDefault());
    });

    // Blokace drag & drop na celé stránce
    document.addEventListener("dragstart", event => event.preventDefault());
    document.addEventListener("drop", event => event.preventDefault());
});
