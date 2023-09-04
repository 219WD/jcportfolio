      //Social media
      const dockContainer = document.querySelector(".dock");
const dockItems = dockContainer.querySelectorAll(".dock-item");

const defaultItemScale = 1;
const hoverItemScale = 2.5;
const neighborItemScale = 2;

const defaultMargin = "10px";
const expandedMargin = "20px";

// Función para actualizar los estilos de los ítems en el dock
const updateDockItems = () => {
    dockItems.forEach((item, index) => {
        let scale = defaultItemScale;
        let margin = defaultMargin;

        if (item.isHovered) {
            scale = hoverItemScale;
            margin = expandedMargin;
        } else if (item.isNeighbor) {
            scale = neighborItemScale;
            margin = expandedMargin;
        }

        item.style.transform = `scale(${scale})`;
        item.style.margin = `0 ${margin}`;
    });
};

dockItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        dockItems.forEach((otherItem) => {
            otherItem.isHovered = otherItem === item;
            otherItem.isNeighbor =
                Math.abs(
                    Array.from(dockItems).indexOf(otherItem) -
                    Array.from(dockItems).indexOf(item) 
                ) === 1;
        });
        updateDockItems();
    });

    // Reiniciar estado cuando el cursor sale de un ítem
    item.addEventListener("mouseleave", () => {
        dockItems.forEach((otherItem) => {
            otherItem.isHovered = false;
            otherItem.isNeighbor = false;
        });
        updateDockItems();
    });
});

// Reiniciar estado cuando el cursor sale de todo el dock
dockContainer.addEventListener("mouseleave", () => {
    dockItems.forEach((item) => {
        item.isHovered = false;
        item.isNeighbor = false;
    });
    updateDockItems();
});