import data from './data.json' with { type: 'json' };

var buttons = {

    // resource button
    iron_button: document.getElementById("button-iron"),
    wood_button: document.getElementById("button-wood"),
    leather_button: document.getElementById("button-leather"),



    //assembly button
    screw_button: document.getElementById("button-screw"),
    handle_button: document.getElementById("button-handle"),
    strap_button: document.getElementById("button-strap"),

    hammer_button: document.getElementById("button-hammer"),
    axe_button: document.getElementById("button-axe"),
    knive_button: document.getElementById("button-knive"),
    toolbox_button: document.getElementById("button-toolbox"),

    workbench_button: document.getElementById("button-workbench"),
    anvil_button: document.getElementById("button-anvil"),
    sawbench_button: document.getElementById("button-sawbench"),
    skinning_table_button: document.getElementById("button-skinning_table")
}


var resources = {
    //resource text
    iron_resource: document.getElementById("resource-iron"),
    wood_resource: document.getElementById("resource-wood"),
    leather_resource: document.getElementById("resource-leather"),

    // assembly text
    screw_resource: document.getElementById("resource-screw"),
    handle_resource: document.getElementById("resource-handle"),
    strap_resource: document.getElementById("resource-strap"),

    hammer_resource: document.getElementById("resource-hammer"),
    axe_resource: document.getElementById("resource-axe"),
    knive_resource: document.getElementById("resource-knive"),
    toolbox_resource: document.getElementById("resource-toolbox"),

    workbench_resource: document.getElementById("resource-workbench"),
    anvil_resource: document.getElementById("resource-anvil"),
    sawbench_resource: document.getElementById("resource-sawbench"),
    skinning_table_resource: document.getElementById("resource-skinning_table")
}

var requirerments = {

    screw_requirerment: document.getElementById("screw-requirerments"),
    handle_requirerment: document.getElementById("handle-requirerments"),
    strap_requirerment: document.getElementById("strap-requirerments"),

    hammer_requirerment: document.getElementById("hammer-requirerments"),
    axe_requirerment: document.getElementById("axe-requirerments"),
    knive_requirerment: document.getElementById("knive-requirerments"),
    toolbox_requirerment: document.getElementById("toolbox-requirerments"),

    workbench_requirerment: document.getElementById("workbench-requirerments"),
    anvil_requirerment: document.getElementById("anvil-requirerments"),
    sawbench_requirerment: document.getElementById("sawbench-requirerments"),
    skinning_table_requirerment: document.getElementById("skinning_table-requirerments")
}

var persecond = {
    //resource text
    iron_persecond: document.getElementById("persecond-iron"),
    wood_persecond: document.getElementById("persecond-wood"),
    leather_persecond: document.getElementById("persecond-leather"),

    // assembly text
    screw_persecond: document.getElementById("persecond-screw"),
    handle_persecond: document.getElementById("persecond-handle"),
    strap_persecond: document.getElementById("persecond-strap"),

    hammer_persecond: document.getElementById("persecond-hammer"),
    axe_persecond: document.getElementById("persecond-axe"),
    knive_persecond: document.getElementById("persecond-knive"),
    toolbox_persecond: document.getElementById("persecond-toolbox"),

    workbench_persecond: document.getElementById("persecond-workbench"),
    anvil_persecond: document.getElementById("persecond-anvil"),
    sawbench_persecond: document.getElementById("persecond-sawbench"),
    skinning_table_persecond: document.getElementById("persecond-skinning_table")
}




// ------------

var counts = {

    // resource count
    iron_count: 120,
    wood_count: 120,
    leather_count: 120,

    //assembly count
    screw_count: 120,
    handle_count: 120,
    strap_count: 120,

    hammer_count: 120,
    axe_count: 120,
    knive_count: 120,
    toolbox_count: 120000,

    workbench_count: 5,
    anvil_count: 0,
    sawbench_count: 0,
    skinning_table_count: 0

}



update_text();
// ----
buttons["iron_button"].onclick = function () {
    counts["iron_count"] += (counts["screw_count"] + 1) * Math.max((1.5 * counts["toolbox_count"]), 1);
    update_text();
};

buttons["wood_button"].onclick = function () {
    counts["wood_count"] += (counts["handle_count"] + 1) * Math.max((1.5 * counts["toolbox_count"]), 1);
    update_text();
};

buttons["leather_button"].onclick = function () {
    counts["leather_count"] += (counts["strap_count"] + 1) * Math.max((1.5 * counts["toolbox_count"]), 1);
    update_text();
};
// ----


for (let item in data) {
    let requirerment = requirerments[item + "_requirerment"]

    requirerment.innerHTML = "Requires: "

    for (let ingredient of data[item]["ingredients"]) {
        requirerment.innerHTML += `${ingredient[1]} ${capitalize(ingredient[0])}; `
    }
    requirerment.innerHTML = requirerment.innerHTML.slice(0, -2);
}

for (let item in data) {
    let button = buttons[item + "_button"];
    if (button) {
        button.onclick = function () {

            var buyable = true;

            for (let educt of data[item]["ingredients"]) {
                // console.log(`${educt[0]} required: ${educt[1]}, items available: ${counts[educt[0] + "_count"]}`);
                if (counts[educt[0] + "_count"] < educt[1]) {
                    buyable = false;
                }
            }

            if (buyable) {
                for (let educt of data[item]["ingredients"]) {
                    // console.log(`Will take away ${educt[1]} times ${educt[0]}`);
                    counts[educt[0] + "_count"] -= educt[1];

                }
                counts[item + "_count"] += 1;
            }


            update_text();
        };


        button.setAttribute("data_title", data[item]["tooltip"])
    }
}



// ----


function update_text() {
    // update gathering count
    resources["iron_resource"].innerHTML = round(counts["iron_count"]);
    resources["wood_resource"].innerHTML = round(counts["wood_count"]);
    resources["leather_resource"].innerHTML = round(counts["leather_count"]);

    // update resources count
    for (let item in data) {
        let text = resources[item + "_resource"];
        text.innerHTML = round(counts[item + "_count"]);
    }

    // update persecond count
    persecond["iron_persecond"].innerHTML = `(+${round(counts["hammer_count"])}/s)`
    persecond["wood_persecond"].innerHTML = `(+${round(counts["axe_count"])}/s)`
    persecond["leather_persecond"].innerHTML = `(+${round(counts["knive_count"])}/s)`

    persecond["screw_persecond"].innerHTML = `(+${round(counts["anvil_count"] + counts["anvil_count"] * (counts["workbench_count"] * 0.01))}/s)`
    persecond["handle_persecond"].innerHTML = `(+${round(counts["sawbench_count"] + counts["sawbench_count"] * (counts["workbench_count"] * 0.01))}/s)`
    persecond["strap_persecond"].innerHTML = `(+${round(counts["skinning_table_count"] + counts["skinning_table_count"] * (counts["workbench_count"] * 0.01))}/s)`
}

function update_numbers() {
    counts["iron_count"] += counts["hammer_count"];
    counts["wood_count"] += counts["axe_count"];
    counts["leather_count"] += counts["knive_count"];

    counts["screw_count"] += counts["anvil_count"] + counts["anvil_count"] * (counts["workbench_count"] * 0.01);
    counts["handle_count"] += counts["sawbench_count"] + counts["sawbench_count"] * (counts["workbench_count"] * 0.01);
    counts["strap_count"] += counts["skinning_table_count"] + counts["skinning_table_count"] * (counts["workbench_count"] * 0.01);
}

var intervalId = window.setInterval(function () {
    update_numbers();
    update_text();
}, 1000);

function capitalize(s) {
    return String(s[0]).toUpperCase() + String(s).slice(1);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Stops Enter from triggering form submissions or button clicks
    }
});

function round(number) {
    return number.toFixed(2);
}