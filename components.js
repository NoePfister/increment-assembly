class IdleButton extends HTMLElement {

    connectedCallback() {

        var item_name = this.name;
        const template = document.getElementById("idle-button-template");
        const clonedTemplate = template.content.cloneNode(true);
        this.appendChild(clonedTemplate);

        var button = document.getElementById("button_template");
        var persecond = document.getElementById("persecond_template");
        var resource = document.getElementById("resource_template");
        var requirements = document.getElementById("template_requirements");



        button.setAttribute("id", "button_" + item_name);
        button.innerHTML = item_name;
        persecond.setAttribute("id", "persecond_" + item_name);
        resource.setAttribute("id", "resource_" + item_name);
        requirements.setAttribute("id", item_name + "_requirements");



    }

    static get observedAttributes() {
        return ['name'];
    }

    attributeChangedCallback(property, oldValue, newValue) {

        if (oldValue === newValue) return;
        this[property] = newValue;

    }
}

customElements.define("idle-button", IdleButton);