document.addEventListener("DOMContentLoaded", function () {
    const dih = document.getElementById("dih");
    let animationInterval = null;
    let movingUp = true;

    // Vytvoření vlastního kurzoru
    const customCursor = document.createElement("div");
    customCursor.classList.add("custom-cursor");
    document.body.appendChild(customCursor);

    document.addEventListener("mousemove", (event) => {
        const dihRect = dih.getBoundingClientRect(); // Pozice dih.png
        const centerX = dihRect.left + dihRect.width / 2; // Střed X obrázku
        const lowestY = dihRect.bottom - 50; // Posunutí o 10px nahoru
        const highestY = lowestY - 200; // Kurzoru dovolíme jen 30px pohybu nahoru

        if (
            event.clientX > dihRect.left &&
            event.clientX < dihRect.right &&
            event.clientY > dihRect.top &&
            event.clientY < dihRect.bottom
        ) {
            document.body.classList.add("locked-cursor");
            customCursor.style.left = `${centerX - 32}px`; // Přesně zarovnáme X
            customCursor.style.top = `${lowestY - 32}px`; // Y osa fix na spodek

            // Spustíme oscilaci, pokud ještě neběží
            if (!animationInterval) {
                animationInterval = setInterval(() => {
                    let currentY = parseInt(customCursor.style.top) || lowestY;
                    let moveSpeed = 2; // Jak rychle se bude pohybovat

                    if (movingUp) {
                        customCursor.style.top = `${Math.max(currentY - moveSpeed, highestY)}px`;
                        if (currentY <= highestY + moveSpeed) movingUp = false; // Změní směr
                    } else {
                        customCursor.style.top = `${Math.min(currentY + moveSpeed, lowestY)}px`;
                        if (currentY >= lowestY - moveSpeed) movingUp = true; // Změní směr
                    }
                }, 50); // Jak často se bude měnit poloha (plynulost)
            }
        } else {
            document.body.classList.remove("locked-cursor");
            customCursor.style.left = `-100px`; // Skryjeme kurzor mimo obrazovku
            customCursor.style.top = `-100px`;

            // Zastavíme oscilaci, pokud opustí dih.png
            if (animationInterval) {
                clearInterval(animationInterval);
                animationInterval = null;
            }
        }
    });

    // ÚPLNÁ blokace drag & drop
    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("draggable", "false"); // Jistota z HTML
        img.addEventListener("dragstart", event => event.preventDefault());
        img.addEventListener("mousedown", event => event.preventDefault());
    });

    // Blokace drag & drop na celé stránce
    document.addEventListener("dragstart", event => event.preventDefault());
    document.addEventListener("drop", event => event.preventDefault());
});
