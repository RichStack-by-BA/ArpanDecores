const LOCAL_CART_KEY = "local_cart_v2"

export const localCart = {
  getCart() {
    try {
      const saved = localStorage.getItem(LOCAL_CART_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  },

  saveCart(items: any[]) {
    try {
      localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items))
    } catch {}
  },

  addItem(item: any) {
    const items = this.getCart()

    const index = items.findIndex((i: any) => i.productId === item.productId)

    if (index !== -1) {
      items[index] = {
        ...items[index],
        quantity: items[index].quantity + item.quantity,
        addedAt: new Date().toISOString(),
      }
    } else {
      items.push({
        ...item,
        _id: `${item.productId}_${Date.now()}`,
        addedAt: new Date().toISOString(),
      })
    }

    this.saveCart(items)
  },

  updateQuantity(pid: string, qty: number) {
    const items = this.getCart().map((i: any) =>
      i._id === pid ? { ...i, quantity: qty } : i
    )

    this.saveCart(items)
  },

  removeItem(pid: string) {
    const items = this.getCart().filter((i: any) => i.productId !== pid)
    this.saveCart(items)
  },

  clear() {
    localStorage.removeItem(LOCAL_CART_KEY)
  }
}
