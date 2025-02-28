document.addEventListener("DOMContentLoaded", function () {
    const dih = document.getElementById("dih");
    const xRange = document.getElementById("xRange");
    const yRange = document.getElementById("yRange");

    function updatePosition() {
        const x = xRange.value;
        const y = yRange.value;
        dih.style.left = x + "%";
        dih.style.top = y + "%";
    }

    xRange.addEventListener("input", updatePosition);
    yRange.addEventListener("input", updatePosition);

    // ÚPLNÁ blokace drag & drop
    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("draggable", "false"); // Jistota z HTML
        img.addEventListener("dragstart", event => event.preventDefault());
        img.addEventListener("mousedown", event => event.preventDefault());
    });

    // Blokace drag & drop na celé stránce
    document.addEventListener("dragstart", event => event.preventDefault());
    document.addEventListener("drop", event => event.preventDefault());

    // Blokace jakéhokoliv přetahování myší
    document.addEventListener("mousedown", event => event.preventDefault());
});
