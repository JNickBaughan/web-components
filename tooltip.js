class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = "this is the default text";
    this.appendStyles()
  }

  appendStyles() {
    this._tooltipContainer.style.backgroundColor = "black";
    this._tooltipContainer.style.border = "1px solid white";
    this._tooltipContainer.style.color = "white";
    this._tooltipContainer.style.position = "absolute";
    this._tooltipContainer.style.top = "-20px";
    this._tooltipContainer.style.left = "20px";
    this._tooltipContainer.style.minWidth = "200px";
    this._tooltipContainer.style.padding = "5px";
    this._tooltipContainer.style.margin = "2px";
    this._tooltipContainer.style.zIndex = "10";
  }

  connectedCallback() {
    if(this.hasAttribute('text')){
      const text = this.getAttribute('text')
      this._tooltipContainer.textContent = text;
    }
    
    const span = document.createElement("span");
    span.textContent = " (?)";
    span.addEventListener("mouseenter", this._showTooltip.bind(this));
    span.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.appendChild(span);
    this.style.position = "relative"
  }

  _showTooltip() {
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define("tool-tip", Tooltip);
