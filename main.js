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



update_text();
// ----
buttons["iron_button"].onclick = function () {
    counts["iron_count"] += (counts["screw_count"] + 1);
    update_text();
};

buttons["wood_button"].onclick = function () {
    counts["wood_count"] += (counts["handle_count"] + 1);
    update_text();
};

buttons["leather_button"].onclick = function () {
    counts["leather_count"] += (counts["strap_count"] + 1);
    update_text();
};
// ----

for (let item in data) {
    let button = buttons[item + "_button"];
    if (button) {
        button.onclick = function () {

            var buyable = true;

            for (let educt of data[item]["ingredients"]) {
                console.log(`${educt[0]} required: ${educt[1]}, items available: ${counts[educt[0] + "_count"]}`);
                if (counts[educt[0] + "_count"] < educt[1]) {
                    buyable = false;
                }
            }

            if (buyable) {
                for (let educt of data[item]["ingredients"]) {
                    console.log(`Will take away ${educt[1]} times ${educt[0]}`);
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
    resources["iron_resource"].innerHTML = (counts["iron_count"] * Math.max((1.5 * counts["toolbox_count"]),1));
    resources["wood_resource"].innerHTML = (counts["wood_count"] * Math.max((1.5 * counts["toolbox_count"]), 1));
    resources["leather_resource"].innerHTML = (counts["leather_count"] * Math.max((1.5 * counts["toolbox_count"]), 1));

    for (let item in data) {
        let text = resources[item + "_resource"];
        text.innerHTML = counts[item + "_count"];
    }
}

function update_numbers() {
    counts["iron_count"] += counts["hammer_count"];
    counts["wood_count"] += counts["axe_count"];
    counts["leather_count"] += counts["knive_count"];
}

var intervalId = window.setInterval(function () {
    update_numbers();
    update_text();
}, 1000);