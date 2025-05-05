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
    iron_count: 1,
    wood_count: 1,
    leather_count: 1,

    //assembly count
    screw_count: 1,
    handle_count: 1,
    strap_count: 1,

    hammer_count: 1,
    axe_count: 1,
    knive_count: 1,
    toolbox_count: 1,

    workbench_count: 1,
    anvil_count: 1,
    sawbench_count: 1,
    skinning_table_count: 1

}



update_text();
// ----
buttons["iron_button"].onclick = function () {
    counts["iron_count"] += 1;
    update_text();
};

buttons["wood_button"].onclick = function () {
    counts["wood_count"] += 1;
    update_text();
};

buttons["leather_button"].onclick = function () {
    counts["leather_count"] += 1;
    update_text();
};
// ----

for (let item in data) {
    let button = buttons[item+"_button"];
    if (button) {
        button.onclick = function () {

            var buyable = true;

            for (let educt of data[item]) {
                console.log(`${educt[0]} required: ${educt[1]}, items available: ${counts[educt[0] + "_count"]}`);
                if (counts[educt[0] + "_count"] < educt[1]) {
                    buyable = false;
                }
            }

            if (buyable) {
                for (let educt of data[item]) {
                    console.log(`Will take away ${educt[1]} times ${educt[0]}`);
                    counts[educt[0] + "_count"] -= educt[1];

                }
                counts[item + "_count"] += 1;
            }


            update_text();
        };
    }
}



// ----


function update_text() {
    resources["iron_resource"].innerHTML = counts["iron_count"];
    resources["wood_resource"].innerHTML = counts["wood_count"];
    resources["leather_resource"].innerHTML = counts["leather_count"];

    for (let item in data) {
        let text = resources[item + "_resource"];
        text.innerHTML = counts[item + "_count"];
    }
}