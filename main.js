import data from './data.json' with { type: 'json' };

var buttons = {
    button_iron: button_iron,
    button_wood: button_wood,
    button_leather: button_leather,
    button_screw: button_screw,
    button_handle: button_handle,
    button_strap: button_strap,
    button_hammer: button_hammer,
    button_axe: button_axe,
    button_knive: button_knive,
    button_toolbox: button_toolbox,
    button_workbench: button_workbench,
    button_anvil: button_anvil,
    button_sawbench: button_sawbench,
    button_skinning_table: button_skinning_table
}

var resources = {
    resource_iron: resource_iron,
    resource_wood: resource_wood,
    resource_leather: resource_leather,
    resource_screw: resource_screw,
    resource_handle: resource_handle,
    resource_strap: resource_strap,
    resource_hammer: resource_hammer,
    resource_axe: resource_axe,
    resource_knive: resource_knive,
    resource_toolbox: resource_toolbox,
    resource_workbench: resource_workbench,
    resource_anvil: resource_anvil,
    resource_sawbench: resource_sawbench,
    resource_skinning_table: resource_skinning_table,
}

var requirements = {

    screw_requirements: screw_requirements,
    handle_requirements: handle_requirements,
    strap_requirements: strap_requirements,
    hammer_requirements: hammer_requirements,
    axe_requirements: axe_requirements,
    knive_requirements: knive_requirements,
    toolbox_requirements: toolbox_requirements,
    workbench_requirements: workbench_requirements,
    anvil_requirements: anvil_requirements,
    sawbench_requirements: sawbench_requirements,
    skinning_table_requirements: skinning_table_requirements,
}

var persecond = {
    //resource text
    iron_persecond: persecond_iron,
    wood_persecond: persecond_wood,
    leather_persecond: persecond_leather,

    // assembly text
    screw_persecond: persecond_screw,
    handle_persecond: persecond_handle,
    strap_persecond: persecond_strap,

    hammer_persecond: persecond_hammer,
    axe_persecond: persecond_axe,
    knive_persecond: persecond_knive,
    toolbox_persecond: persecond_toolbox,

    workbench_persecond: persecond_workbench,
    anvil_persecond: persecond_anvil,
    sawbench_persecond: persecond_sawbench,
    skinning_table_persecond: persecond_skinning_table
}

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
// ____
buttons["button_iron"].onclick = function () {
    counts["iron_count"] += (counts["screw_count"] + 1) * Math.max((1.5 * counts["toolbox_count"]), 1);
    update_text();
};

buttons["button_wood"].onclick = function () {
    counts["wood_count"] += (counts["handle_count"] + 1) * Math.max((1.5 * counts["toolbox_count"]), 1);
    update_text();
};

buttons["button_leather"].onclick = function () {
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



// ____

function update_ingredients() {
    for (let item in data) {
        let requirerment = requirements[item + "_requirements"]

        requirerment.innerHTML = "Requires: "

        for (let ingredient of data[item]["ingredients"]) {
            let price = round(get_price(ingredient[1], counts[item + "_count"], data[item]["coefficient"]));
            requirerment.innerHTML += `${price} ${capitalize(ingredient[0])}; `
        }
        requirerment.innerHTML = requirerment.innerHTML.slice(0, -2);
    }

}


for (let item in data) {
    let button = buttons["button_" + item];
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



// ____


function update_text() {
    // update gathering count
    resources["resource_iron"].innerHTML = round(counts["iron_count"]);
    resources["resource_wood"].innerHTML = round(counts["wood_count"]);
    resources["resource_leather"].innerHTML = round(counts["leather_count"]);

    // update resources count
    for (let item in data) {
        let text = resources["resource_" + item];
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