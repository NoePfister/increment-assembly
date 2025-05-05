


const iron_button = document.getElementById("button-iron");
const wood_button = document.getElementById("button-wood");
const leather_button = document.getElementById("button-leather");

const iron_resource = document.getElementById("resource-iron");
const wood_resource = document.getElementById("resource-wood");
const leather_resource = document.getElementById("resource-leather");




var iron_count = 1;
var wood_count = 1;
var leather_count = 1;

update_text();

iron_button.onclick = function () {
    iron_count += 1;
    update_text();
};

wood_button.onclick = function () {
    wood_count += 1;
    update_text();
};

leather_button.onclick = function () {
    leather_count += 1;
    update_text();
};


function update_text() {
    iron_resource.innerHTML = iron_count;
    wood_resource.innerHTML = wood_count;
    leather_resource.innerHTML = leather_count;
}