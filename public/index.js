let selectedOptions = [];
const availableOptions = [
    "torURL",
    "activeChannels",
    "forward",
    "maxReceive",
    "maxSend",
    "syncProgress"
];

// Will remove all Selects
function clearLists() {
    const section = document.getElementById("editable-section");

    section.innerHTML = '';
}


async function getElements() {
    const response = await fetch("http://localhost:4200/data")
    const data = await response.json();
    return data;
};

async function updateList() {
    clearLists();
    const response = await fetch('http://localhost:4200/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedOptions),
    })
    const data = await response.json();
    console.log(data);
    loadUI(data);
}

function createOption(option) {
    const optionEl = document.createElement("option");
    optionEl.text = option;
    optionEl.value = option;
}

function createSelect(index, options) {
    // Create wrapper element
    const divEl = document.createElement("div");
    divEl.className = "info-section rounded-edge";

    // Create Select Element with options
    const selectEl = document.createElement("select");
    selectEl.className = "info-selector";
    selectEl.onchange = (event) => {
        // Update the index in array
        selectedOptions.splice(index, 1, event.target.value);
        updateList()
    }

    // Create options
    for (var i = 0; i < availableOptions.length; i++) { 
        const optionEl = document.createElement("option");
        optionEl.text = availableOptions[i];
        optionEl.value = availableOptions[i];
        selectEl.add(optionEl)
    }

    // Set index to correct item
    selectEl.value = options[index];

    // Add select element to div wrapper
    divEl.appendChild(selectEl);
    return divEl;
}

function setupLists(options) {
    const section = document.getElementById("editable-section");

    for (var i = 0; i < options.length; i++) {
        const select = createSelect(i, options);
        section.appendChild(select);
    }
}

async function loadElements() {
    const elements = await getElements();
    return elements;
}

function loadUI(data = undefined) {
    if (data) {
        console.log(data);
        setupLists(data.displayedElements);
    } else {
        loadElements().then((d) => {
            setupLists(d.displayedElements);
            selectedOptions = d.displayedElements;
        });
    }
}

loadUI();