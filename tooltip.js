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
                                    top: -40px;
                                    left: 20px;
                                    min-width: 200px;
                                    padding: 5px;
                                    margin: 2px;
                                    z-index: 10;
                                  }

                                  .icon {
                                    background-color: black;
                                    color: white;
                                    border-radius: 50%;
                                    padding: .15rem .5rem;
                                    text-align: center;
                                  }

                                  ::slotted(span){
                                    border: 3px red solid;
                                  }

                                  :host {
                                    background: #ccc;
                                  }

                                  :host-context(p) {
                                    color: green;
                                  }

                                  :host(.important) {
                                    background: var(--important-color)
                                  }


                                 </style>
                                 <slot>DEFAULT SLOT VALUE</slot>
                                 <span class="icon"> ? </span>`
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
