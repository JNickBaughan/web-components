class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = "this is the default text";
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>
                                  div { 
                                    background-color: black;
                                    color: white;
                                    border: 1px solid white;
                                    position: absolute;
                                    top: -20px;
                                    left: 20px;
                                    min-width: 200px;
                                    padding: 5px;
                                    margin: 2px;
                                    z-index: 10;
                                  }
                                 </style>
                                 <slot>DEFAULT SLOT VALUE</slot>
                                 <span> (?)</span>`
  }

  connectedCallback() {
    if(this.hasAttribute('text')){
      const text = this.getAttribute('text')
      this._tooltipContainer.textContent = text;
    }
    const tooltipIcon = this.shadowRoot.querySelector('span')
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative"
  }

  _showTooltip() {
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("tool-tip", Tooltip);
