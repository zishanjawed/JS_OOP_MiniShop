class Product {
  
    constructor(title,imageURL,description,price){
        this.title = title;
        this.imageURL = imageURL;
        this.description = description;
        this.price = price;
    }
}


class ElementAttribute {
    constructor(attrName,attrValue){
        this.name = attrName;
        this.value = attrValue;
    }
}
 


class Component {

    constructor (renderHookID , shouldRender =true){
        this.hookId = renderHookID;
        if (shouldRender ){
            this.render();
        }
        
    }


    render(){}

    createRootElement(tag,cssClasses,attributes){
        const rootElement = document.createElement(tag);
        if (cssClasses){
            rootElement.className = cssClasses;
        }
        if (attributes && attributes.length > 0){
            for (const attr of attributes ){
                rootElement.setAttribute(attr.name,attr.value );
            }
        }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
    }
}


class ShoppingCart extends Component {
    item = [];

    set cartItem(value){
        this.item = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;

    }

    get totalAmount(){
        const sum = this.item.reduce((prevValue, curItme) => {
            return prevValue + curItme.price;
        },
        0);
        return sum;
    }
    constructor(renderHookID){
        super(renderHookID,false);
        this.orderProduct = () => {
            console.log('..orderig..');
            console.log(this.item)
       };
       this.render();
    }

    addProduct(product){
        const updateItems = [...this.item]
        updateItems.push(product);
        this.cartItem = updateItems; 
    }

   

    render(){
        const cartEl = this.createRootElement('section','cart')
        cartEl.innerHTML = `
            <h2>Total : \$${0}</h2>
            <button>Order Now!</button>
        `;
        const orderButton = cartEl.querySelector('button');
        orderButton.addEventListener('click', this.orderProduct);
        this.totalOutput = cartEl.querySelector('h2');
        return cartEl;
    }
}

class ProductItem extends Component {
    constructor(product,renderHookID){
        super(renderHookID,false);
        this.product = product;
        this.render(); 
    } 

    addToCart(){
        App.addProductToCart(this.product);
    }
     
    render(){
        const prodEl = this.createRootElement('li','product-item');
        // prodEl.className = 'product-item';
        prodEl.innerHTML = `
        <div>
            <img src="${this.product.imageURL} alt="${this.product.title}">
            <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
            </div> 
        </div>
        `;
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click',this.addToCart.bind(this))
    }
}

class ProducctList extends Component {
    products  = [];
    constructor(renderHookID){
        super(renderHookID);
        this.fetchProducts()
        
    }

    fetchProducts(){
        this.products = [
            new Product(
                'A Pillow',
                'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ikea.com%2Fin%2Fen%2Fp%2Fvildkorn-pillow-high-10460572%2F&psig=AOvVaw1SNyPL7X-rxArUjwDU2zed&ust=1607164477534000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLjQ4LGQtO0CFQAAAAAdAAAAABAJ',
                'A Short Pillow',
                16.99
            ),
            new Product(
                'A Carpet',
                'https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.indiamart.com%2Fproddetail%2Fpolyester-floor-carpet-12377878973.html&psig=AOvVaw1S8LznuJKPCzBsa5eOrCkC&ust=1607164578528000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLicguSQtO0CFQAAAAAdAAAAABAE',
                'A buetiful carpet',
                200
            )
        ];
        this.renderProducts();   
    }
    renderProducts(){

        for (const prod of this.products){
            new ProductItem(prod,'prod-list');
            
        }
    }

    render(){
        
        const productList = this.createRootElement('ul','product-list',[new ElementAttribute('id','prod-list')]);
        
        if (this.products && this.products.length >0){
            this.renderProducts()
        }
        
    }
}


class Shop {
    constructor(){
        this.render(); 
    }
    render (){
        this.cart = new ShoppingCart('app');
        new ProducctList('app');
        
      
    }
}

class App {
    static cart;
    static init (){
        const shop = new Shop();
        this.cart = shop.cart;

        
    }
    static addProductToCart(product){
        this.cart.addProduct(product);
    }
}

App.init();