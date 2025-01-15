interface Product {
  id: string;
  name: string;
  costPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  category: 'A' | 'B' | 'C';
}

class InventoryManager {
  private products: Product[] = [];
  private discountRules: Record<string, number> = {
    'A': 0.05,
    'B': 0.03,
    'C': 0.01
  };
  private taxRate: number = 0.08;

  constructor(initialProducts: Product[]) {
    this.products = initialProducts;
  }

   // Bug: ไม่ตรวจสอบว่าสินค้าซ้ำกันหรือไม่
   public addProduct(product: Product): void {
    const existingProductIndex = this.products.findIndex(p => p.id === product.id);
    if (existingProductIndex !== -1) {
      // ถ้ามีสินค้าอยู่แล้ว ให้ทำการอัปเดตข้อมูลของสินค้าตัวนั้น
      this.products[existingProductIndex] = product;
    } else {
      this.products.push(product);
    }
  }

  public updateStock(productId: string, newQuantity: number): void {
    const productIndex = this.products.findIndex(p => p.id === productId);
      // ตรวจสอบว่า newQuantity เป็นจำนวนเต็มบวกหรือไม่
    if ( productIndex !== -1 && Number.isInteger(newQuantity) && newQuantity > 0 ) {
      // Bug: ไม่ตรวจสอบว่า newQuantity เป็นจำนวนเต็มบวกหรือไม่
      this.products[productIndex].stockQuantity = newQuantity;
    }else{
      throw new Error('Invalid quantity or product not found.');
    }
  }

  public calculateRevenue(soldQuantity: number, productId: string): number {
    const product = this.getProductById(productId);
    if (!product) return 0;
  // ตรวจสอบว่า soldQuantity ไม่เกิน stockQuantity ของสินค้า
  if (soldQuantity > product.stockQuantity) {
    throw new Error('Sold quantity exceeds available stock.');
  }
    const discountedPrice = product.sellingPrice * (1 - this.getDiscount(product.category));
    const taxAmount = discountedPrice * soldQuantity * this.taxRate;
    const revenue = discountedPrice * soldQuantity + taxAmount;
    // Bug: ไม่ตรวจสอบว่า soldQuantity เกิน stockQuantity หรือไม่
    return revenue;
  }

  public calculateProfit(soldQuantity: number, productId: string): number {
    const product = this.getProductById(productId);
    if (!product) return 0;

    const discountedPrice = product.sellingPrice * (1 - this.getDiscount(product.category));
    const cost = product.costPrice * soldQuantity;
    // คำนวณภาษีในการคำนวณกำไร
    const taxAmount = discountedPrice * soldQuantity * this.taxRate;
    const profit = discountedPrice * soldQuantity - cost - taxAmount;
    // Bug: ไม่คำนวณภาษีในการคำนวณกำไร
    return profit;
  }

  private getProductById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  private getDiscount(category: string): number {
    return this.discountRules[category] || 0;
  }

  public restock(productId: string, additionalQuantity: number): void {
    const productIndex = this.products.findIndex(p => p.id === productId);
    //ตรวจสอบว่า additionalQuantity เป็นจำนวนเต็มบว
    if (productIndex !== -1 && Number.isInteger(additionalQuantity)) {
      // Bug: ไม่ตรวจสอบว่า additionalQuantity เป็นจำนวนเต็มบวกหรือไม่
      this.products[productIndex].stockQuantity += additionalQuantity;
    }else {
      throw new Error(`Product with ID ${productId} not found.`);
  }
  }

  public getLowStockProducts(threshold: number): Product[] {
    return this.products.filter(p => p.stockQuantity <= threshold);
  }
}

// Usage example
const inventory = new InventoryManager([
  { id: 'P001', name: 'Laptop', costPrice: 800, sellingPrice: 1200, stockQuantity: 50, category: 'A' },
  { id: 'P002', name: 'Smartphone', costPrice: 300, sellingPrice: 600, stockQuantity: 100, category: 'B' },
]);

inventory.addProduct({ id: 'P003', name: 'Tablet', costPrice: 250, sellingPrice: 400, stockQuantity: 75, category: 'C' });
console.log(inventory);

console.log(inventory.calculateRevenue(50, 'P001'));
 console.log(inventory.calculateProfit(5, 'P001'));

inventory.updateStock('P001', 5);
console.log(inventory.getLowStockProducts(50));


inventory.restock('P002', 20);
console.log(inventory.getLowStockProducts(50));


