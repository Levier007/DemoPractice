// goods-card.js
class GoodsCard extends HTMLElement {
  constructor() {
    super()
    const template = document.createElement('template')
    template.innerHTML = /*html*/ `
      <style>
        .goods-card-container {
          width: 200px;
          border: 1px solid #ddd;
        }
        .goods-img {
          width: 100%;
          height: 200px;
        }
        .goods-name {
          padding: 10px 4px;
          margin: 0;
          text-align: center;
        }
        .add-cart-btn {
          width: 100%;
        }
      </style>
      <div class="goods-card-container">
        <img class="goods-img" />
        <p class="goods-name"></p>
        <button class="add-cart-btn">加入购物车</button>
      </div>
    `
    const _shadowRoot = this.attachShadow({ mode: 'open' })
    const content = template.content.cloneNode(true)
    _shadowRoot.appendChild(content)
    this._goodsNameDom = _shadowRoot.querySelector('.goods-name')
    this._goodsImgDom = _shadowRoot.querySelector('.goods-img')
    this._btnDom = _shadowRoot.querySelector('.add-cart-btn')
    this._btnDom.addEventListener('click', e => {
      /* 派发一个事件，此处是组件自定义事件，事件名字自定义，配置对象中的detail传递事件信息 */
      this.dispatchEvent(new CustomEvent('click', { detail: e }))
    })
  }
  attributeChangedCallback(key, oldVal, newVal) {
    console.log(key, oldVal, newVal)
    this.render()
  }
  /* 该函数是与attributeChangedCallback配套使用的，
  如果没写observedAttributes或属性值发生改变的参数名称没有在observedAttributes函数返回的数组里，
  attributeChangedCallback是不会触发。
   */
  static get observedAttributes() {
    return ['img', 'name']
  }

  get name() {
    return this.getAttribute('name')
  }

  get img() {
    return this.getAttribute('img')
  }

  render() {
    this._goodsNameDom.innerHTML = this.name
    this._goodsImgDom.src = this.img
  }
}

window.customElements.define('goods-card', GoodsCard)
