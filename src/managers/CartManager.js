const fs = require('fs/promises')
const path = require('path')

class CartManager {

    #carts = []


    constructor(file){
        this.filepath = path.join(__dirname, '../data' ,file)
    
    }

    #readFile = async () => {
        const data = await fs.readFile(this.filepath, 'utf-8')
        this.#carts = JSON.parse(data)
      }
    
      #writeFile = async() => {
        const data = JSON.stringify(this.#carts, null, 2)
        await fs.writeFile(this.filepath, data)
      }

      async addCart(){
        console.log('entró')
        await this.#readFile()
        const cid = this.#carts.length  ? Math.max(...this.#carts.map(prd => prd.id)) + 1 : 1
        const cart = {'id': parseInt(cid), products:[]} 

        this.#carts.push(cart)
        this.#writeFile()
        return await this.getCartById(cid) 
    }

    // async addCart(pid, quantity){
    //     await this.#readFile()
    //     const cid = this.#carts.length  ? Math.max(...this.#carts.map(prd => prd.id)) + 1 : 1
    //     const prd = {'id': parseInt(pid), 'quantity':quantity}
    //     const cart = {'id': parseInt(cid), products:[]} 
    //     console.log(cart.products.length)
    //     cart.products.push(prd)

    //     this.#carts.push(cart)
    //     this.#writeFile()
    //     return cart 
    // }

    async getCartById(cid){
        await this.#readFile()
        return this.#carts.find(cart => cart.id == cid)
    }

    
    async updateCart(id, pid,quantity){
        await this.#readFile()
        //me quedo con el resto de los id de carrito
        const cartNew = this.#carts.filter(cart => cart.id != id)
        console.log(this.#carts)
        //
        const cart = this.#carts.find(cart => cart.id ==id)
        if(cart.products.some(prd => prd.id == pid)){
            console.log(' existe producto en el carrito')
            cart.products.forEach(element => {
                if (element.id == pid){
                    element.quantity+= parseInt(quantity)
                }
            })
            console.log(cart)
            cartNew.push(cart)
            console.log(cartNew)
            this.#carts = cartNew
            this.#writeFile()
            return cart
        }  else {
            const newProd = {'id': parseInt(pid), quantity:1}
            cart.products.push(newProd)
            cartNew.push(cart)
            console.log(cartNew)
            this.#carts = cartNew
            this.#writeFile()
            return cart
        }

    }
}

module.exports = CartManager