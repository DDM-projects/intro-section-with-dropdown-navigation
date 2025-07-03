const menuButton = document.querySelector("button.menu-bar");
const menuButtonOff = document.querySelector(".menu-off button");
const cover = document.querySelector("div.cover");
const mainMenu = document.querySelector(".main-menu");
const menuDropdownFirst = document.querySelector(".menu-dropdown-first");
const menuDropdownSecond = document.querySelector(".menu-dropdown-second");
const submenuFirst = document.querySelector(".submenu-first");
const submenuSecond = document.querySelector(".submenu-second");
const arrowDownFirst = document.querySelector("img.arrow-down.first");
const arrowUpFirst = document.querySelector("img.arrow-up.first");
const arrowUpSecond = document.querySelector("img.arrow-up.second");
const arrowDownSecond = document.querySelector("img.arrow-down.second");
let isFirstSubmenuOpen = false;
let isSecondSubmenuOpen = false;
let mediaSize = window.matchMedia("(min-width: 1024px)");
let isOldMobile = !mediaSize.matches;

menuButton.addEventListener("click", () => {
    cover.classList.add("active");
    mainMenu.classList.add("active");
    setTimeout(() => {
        mainMenu.style.right = 0;
    }, 0);
});

const closeMenuMobile = (timer = 400) => {
    mainMenu.style.right = "-100%";
    setTimeout(() => {
        mainMenu.classList.remove("active");
        submenuFirst.classList.remove("active");
        submenuSecond.classList.remove("active");
        arrowDownFirst.classList.remove("disactive");
        arrowUpFirst.classList.remove("active");
        arrowUpSecond.classList.remove("active");
        arrowDownSecond.classList.remove("disactive");
        cover.classList.remove("active");
    }, timer);
};

menuButtonOff.addEventListener("click", closeMenuMobile);

cover.addEventListener("click", closeMenuMobile);

menuDropdownFirst.addEventListener("click", () => {
    submenuFirst.classList.toggle("active");
    arrowDownFirst.classList.toggle("disactive");
    arrowUpFirst.classList.toggle("active");
    isFirstSubmenuOpen = !isFirstSubmenuOpen;
});

menuDropdownSecond.addEventListener("click", () => {
    submenuSecond.classList.toggle("active");
    arrowDownSecond.classList.toggle("disactive");
    arrowUpSecond.classList.toggle("active");
    isSecondSubmenuOpen = !isSecondSubmenuOpen;
});

const closeFirstDesktopSubmenu = () => {
    submenuFirst.classList.remove("active");
    arrowDownFirst.classList.remove("disactive");
    arrowUpFirst.classList.remove("active");
    isFirstSubmenuOpen = false;
};

const closeSecondDesktopSubmenu = () => {
    submenuSecond.classList.remove("active");
    arrowUpSecond.classList.remove("active");
    arrowDownSecond.classList.remove("disactive");
    isSecondSubmenuOpen = false;
};

document.addEventListener("click", (event) => {
    const isClickInsideFirst = submenuFirst.contains(event.target);
    const isClickInsideSecond = submenuSecond.contains(event.target);
    const isClickedMenuDropdownFirst = menuDropdownFirst.contains(event.target);
    const isClickedMenuDropdownSecond = menuDropdownSecond.contains(event.target);

    if (!isClickInsideFirst && isFirstSubmenuOpen && !isClickedMenuDropdownFirst && mediaSize.matches) {
        closeFirstDesktopSubmenu();
    } else if (!isClickInsideSecond && isSecondSubmenuOpen && !isClickedMenuDropdownSecond && mediaSize.matches) {
        closeSecondDesktopSubmenu();
    }
});

window.addEventListener("resize", () => {
    const isNewMobile = !mediaSize.matches;

    if (!(isNewMobile === isOldMobile) && isOldMobile === true) {
        closeMenuMobile(0);
    } else if (!(isNewMobile === isOldMobile) && isOldMobile === false) {
        closeFirstDesktopSubmenu();
        closeSecondDesktopSubmenu();
    }
    isOldMobile = isNewMobile;
});
