document.addEventListener("DOMContentLoaded", function () {
    const dih = document.getElementById("dih");
    let isDragging = false;

    // Vytvoření vlastního kurzoru
    const customCursor = document.createElement("div");
    customCursor.classList.add("custom-cursor");
    document.body.appendChild(customCursor);

    document.addEventListener("mousemove", (event) => {
        const dihRect = dih.getBoundingClientRect(); // Pozice dih.png
        const centerX = dihRect.left + dihRect.width / 2; // Střed X obrázku
        const lowestY = dihRect.bottom - 50; // Posunutí o 50px nahoru (dolní limit)
        const highestY = lowestY - 200; // Nejvyšší bod pohybu kurzoru

        if (
            event.clientX > dihRect.left - 20 &&  // Malá tolerance do stran
            event.clientX < dihRect.right + 20 &&
            event.clientY > dihRect.top &&
            event.clientY < dihRect.bottom
        ) {
            document.body.classList.add("locked-cursor");
            customCursor.style.left = `${centerX - 32}px`; // Přesně zarovnáme X
            customCursor.style.top = `${lowestY - 32}px`; // Y osa fix na spodek
        } else {
            document.body.classList.remove("locked-cursor");
            customCursor.style.left = `-100px`; // Skryjeme kurzor mimo obrazovku
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
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
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
        }
    });

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
