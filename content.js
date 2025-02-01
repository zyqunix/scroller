(function () {
    let scrolling = false;
    let scrollSpeed = window.innerHeight * 5;
    let downButton = document.createElement("button");
    downButton.innerHTML = `<svg height="24px" width="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#000000"></path> </g></svg>`;
    downButton.style.position = "fixed";
    downButton.style.zIndex = "9999";
    downButton.style.padding = "4px 5px";
    downButton.style.fontSize = "20px";
    downButton.style.cursor = "pointer";
    downButton.style.bottom = "10px";
    downButton.style.right = "10px";
    downButton.style.borderRadius = "50%";
    downButton.style.border = "none";
    downButton.style.transform = "none !important";
    downButton.style.pointerEvents = "auto";

    let upButton = document.createElement("button");
    upButton.innerHTML = `<svg style="transform: rotate(180deg);" height="24px" width="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z" fill="#000000"></path> </g></svg>`;
    upButton.style.position = "fixed";
    upButton.style.zIndex = "9999";
    upButton.style.padding = "4px 5px";
    upButton.style.fontSize = "20px";
    upButton.style.cursor = "pointer";
    upButton.style.bottom = "10px";
    upButton.style.left = "10px";
    upButton.style.borderRadius = "50%";
    upButton.style.border = "none";
    upButton.style.transform = "none !important";
    upButton.style.pointerEvents = "auto";

    function updatePosition() {
        browser.storage.sync.get("position", (data) => {
            let pos = data.position || "bottom-right";
            downButton.style.top = pos.includes("top") ? "10px" : "";
            downButton.style.bottom = pos.includes("bottom") ? "10px" : "";
            downButton.style.left = pos.includes("left") ? "10px" : "";
            downButton.style.right = pos.includes("right") ? "10px" : "";
        });
    }

    function scrollDown() {
        if (scrolling) {
            downButton.style.backgroundColor = "#aaaaaa";
            window.scrollBy({
                top: scrollSpeed, 
                behavior: "smooth"
            });
            setTimeout(scrollDown, 50);
        } else {
            downButton.style.backgroundColor = "#cccccc";
        }
    }

    function scrollUp() {
        if (scrolling) {
            upButton.style.backgroundColor = "#aaaaaa";
            window.scrollBy({
                top: -scrollSpeed, 
                behavior: "smooth"
            });
            setTimeout(scrollUp, 50);
        } else {
            upButton.style.backgroundColor = "#cccccc";
        }
    }

    downButton.addEventListener("click", (event) => {
        if (event.ctrlKey && event.button === 0 || event.shiftKey && event.button === 0) {
            scrolling = false;
        } else {
            scrolling = ! scrolling;
            if (scrolling) 
                scrollDown();
            

        }
    });

    upButton.addEventListener("click", (event) => {
        if (event.ctrlKey && event.button === 0 || event.shiftKey && event.button === 0) {
            scrolling = false;
        } else {
            scrolling = ! scrolling;
            if (scrolling) 
                scrollUp();
            

        }
    });

    downButton.addEventListener("contextmenu", (event) => {
        if (event.shiftKey) {
            event.preventDefault();
            let newPos = prompt("Enter position (top-left, top-right, bottom-left, bottom-right):", "bottom-right");
            if (["top-left", "top-right", "bottom-left", "bottom-right"].includes(newPos)) {
                browser.storage.sync.set({
                    position: newPos
                }, updatePosition);
            }
        }
    });

    upButton.addEventListener("contextmenu", (event) => {
        if (event.shiftKey) {
            event.preventDefault();
            let newPos = prompt("Enter position (top-left, top-right, bottom-left, bottom-right):", "bottom-right");
            if (["top-left", "top-right", "bottom-left", "bottom-right"].includes(newPos)) {
                browser.storage.sync.set({
                    position: newPos
                }, updatePosition);
            }
        }
    });

    downButton.addEventListener("mousedown", (event) => {
        if (event.shiftKey && event.button === 0) {
            event.preventDefault();
            let newSpeed = prompt("Enter scroll speed (px per step):", scrollSpeed);
            if (!isNaN(newSpeed) && newSpeed > 0) {
                scrollSpeed = parseInt(newSpeed, 10);
            }
        }
        if (event.ctrlKey && event.button === 0) {
            event.preventDefault();
            let newPos = prompt("Enter position (top-left, top-right, bottom-left, bottom-right):", "bottom-right");
            if (["top-left", "top-right", "bottom-left", "bottom-right"].includes(newPos)) {
                browser.storage.sync.set({
                    position: newPos
                }, updatePosition);
            }
        }
    });

    upButton.addEventListener("mousedown", (event) => {
        if (event.shiftKey && event.button === 0) {
            event.preventDefault();
            let newSpeed = prompt("Enter scroll speed (px per step):", scrollSpeed);
            if (!isNaN(newSpeed) && newSpeed > 0) {
                scrollSpeed = parseInt(newSpeed, 10);
            }
        }
        if (event.ctrlKey && event.button === 0) {
            event.preventDefault();
            let newPos = prompt("Enter position (top-left, top-right, bottom-left, bottom-right):", "bottom-right");
            if (["top-left", "top-right", "bottom-left", "bottom-right"].includes(newPos)) {
                browser.storage.sync.set({
                    position: newPos
                }, updatePosition);
            }
        }
    });

    document.body.appendChild(downButton);
    document.body.appendChild(upButton);
    updatePosition();
})();
