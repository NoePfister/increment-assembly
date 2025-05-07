import data from './data.json' with { type: 'json' };

var reset_save_button = document.getElementById("reset-save")

var multibuy_1_button = document.getElementById("multibuy_1");
var multibuy_10_button = document.getElementById("multibuy_10");
var multibuy_100_button = document.getElementById("multibuy_100");

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
    iron_count: 0,
    wood_count: 0,
    leather_count: 0,

    //assembly count
    screw_count: 0,
    handle_count: 0,
    strap_count: 0,

    hammer_count: 0,
    axe_count: 0,
    knive_count: 0,
    toolbox_count: 0,

    workbench_count: 0,
    anvil_count: 0,
    sawbench_count: 0,
    skinning_table_count: 0

}

var buy_multiplier = 1;

load();
update_text();
update_ingredients();
multibuy(1);
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



multibuy_1_button.onclick = function () {
    multibuy(1);
};

multibuy_10_button.onclick = function () {
    multibuy(10);
};

multibuy_100_button.onclick = function () {
    multibuy(100);
};



// ----

function update_ingredients() {
    for (let item in data) {
        let requirerment = requirerments[item + "_requirerment"]

        requirerment.innerHTML = "Requires: "

        for (let ingredient of data[item]["ingredients"]) {
            let price = get_price(ingredient[1], counts[item + "_count"], data[item]["coefficient"]);
            requirerment.innerHTML += `${price} ${capitalize(ingredient[0])}; `
        }
        requirerment.innerHTML = requirerment.innerHTML.slice(0, -2);
    }

}


for (let item in data) {
    let button = buttons[item + "_button"];
    if (button) {
        button.onclick = function () {

            var buyable = true;

            for (let educt of data[item]["ingredients"]) {
                // console.log(`${educt[0]} required: ${educt[1]}, items available: ${counts[educt[0] + "_count"]}`);

                let price = get_price(educt[1], counts[item + "_count"], data[item]["coefficient"]) * buy_multiplier;
                if (counts[educt[0] + "_count"] < price) {
                    buyable = false;
                }
            }

            if (buyable) {
                for (let educt of data[item]["ingredients"]) {
                    // console.log(`Will take away ${educt[1]} times ${educt[0]}`);
                    let price = get_price(educt[1], counts[item + "_count"], data[item]["coefficient"]) * buy_multiplier;

                    counts[educt[0] + "_count"] -= price;

                }
                counts[item + "_count"] += buy_multiplier;
            }


            update_text();
            update_ingredients();
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

var intervalsave = window.setInterval(function () {
    save()
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
    return Math.round((number * 100) / 100);
}

function save() {
    for (let count in counts) {
        localStorage.setItem(count, counts[count])
    }
}

function load() {
    for (let count in counts) {
        counts[count] = Number(localStorage.getItem(count))
    }
}

reset_save_button.onclick = function () {
    localStorage.clear();
    load();
    update_text();
    update_ingredients();
}

function multibuy(number) {
    var green = "#2fe684"
    var gray = "#e9e8f0"

    if (number == 1) {
        multibuy_1_button.style.backgroundColor = green;
        multibuy_10_button.style.backgroundColor = gray;
        multibuy_100_button.style.backgroundColor = gray;
        buy_multiplier = 1;

    } else if (number == 10) {
        multibuy_1_button.style.backgroundColor = gray;
        multibuy_10_button.style.backgroundColor = green;
        multibuy_100_button.style.backgroundColor = gray;
        buy_multiplier = 10;

    } else {
        multibuy_1_button.style.backgroundColor = gray;
        multibuy_10_button.style.backgroundColor = gray;
        multibuy_100_button.style.backgroundColor = green;
        buy_multiplier = 100;
    }
}

function get_price(base_cost, level, coefficientlevel) {
    return base_cost * (coefficientlevel ** level)
}