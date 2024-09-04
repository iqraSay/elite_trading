import demoT from '../assets/demoShirt.png';
import demoS from '../assets/demoShoes.png';
import demoJ from '../assets/demoAcc.png';
import demoGown from '../assets/demoGown.jpg';
import demoSuit from '../assets/demoSuit.png';
import demoKurti from '../assets/demoKurti.jpg';
import demoTshirt from '../assets/demoTshirt.png';
import demoHoodie from '../assets/demoHoodie.jpg';
import demoWatch from '../assets/demoWatch.jpeg';

export const products = [

  // Shirts
  { id: '1t', name: 'Shirt 1', image: demoT, imageB: demoT, originalPrice: 159.99, offerPrice: 129.99, rating: 4.5, reviews: 10, category: 'Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '2t', name: 'Shirt 2', image: demoT, imageB: demoT, originalPrice: 179.99, rating: 4.0, reviews: 8, category: 'Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '3t', name: 'Shirt 3', image: demoT, imageB: demoT, originalPrice: 149.99, offerPrice: 119.99, rating: 4.7, reviews: 12, category: 'Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '4t', name: 'Shirt 4', image: demoT, imageB: demoT, originalPrice: 189.99, rating: 4.3, reviews: 7, category: 'Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '5t', name: 'Shirt 5', image: demoT, imageB: demoT, originalPrice: 169.99, offerPrice: 139.99, rating: 4.8, reviews: 15, category: 'Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '6t', name: 'Shirt 6', image: demoT, imageB: demoT, originalPrice: 199.99, rating: 4.6, reviews: 11, category: 'Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '7t', name: 'Shirt 7', image: demoT, imageB: demoT, originalPrice: 159.99, offerPrice: 119.99, rating: 4.4, reviews: 9, category: 'Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '8t', name: 'Shirt 8', image: demoT, imageB: demoT, originalPrice: 149.99, rating: 4.2, reviews: 6, category: 'Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },

  // Shoes
  { id: '1s', name: 'Shoe 1', image: demoS, imageB: demoS, originalPrice: 159.99, offerPrice: 129.99, rating: 4.5, reviews: 10, category: 'Shoes', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '2s', name: 'Shoe 2', image: demoS, imageB: demoS, originalPrice: 179.99, offerPrice: 149.99, rating: 4.2, reviews: 8, category: 'Shoes', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '3s', name: 'Shoe 3', image: demoS, imageB: demoS, originalPrice: 139.99, offerPrice: 109.99, rating: 4.8, reviews: 12, category: 'Shoes', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '4s', name: 'Shoe 4', image: demoS, imageB: demoS, originalPrice: 199.99, offerPrice: 169.99, rating: 4.6, reviews: 15, category: 'Shoes', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '5s', name: 'Shoe 5', image: demoS, imageB: demoS, originalPrice: 119.99, offerPrice: 89.99, rating: 4.3, reviews: 9, category: 'Shoes', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '6s', name: 'Shoe 6', image: demoS, imageB: demoS, originalPrice: 159.99, offerPrice: 129.99, rating: 4.4, reviews: 11, category: 'Shoes', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '7s', name: 'Shoe 7', image: demoS, imageB: demoS, originalPrice: 189.99, offerPrice: 159.99, rating: 4.7, reviews: 13, category: 'Shoes', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '8s', name: 'Shoe 8', image: demoS, imageB: demoS, originalPrice: 149.99, offerPrice: 119.99, rating: 4.9, reviews: 14, category: 'Shoes', description: 'Lorem ipsum dolor sit amet consectetur...' },

  // Jewelry
  { id: '1j', name: 'Jewelry 1', image: demoJ, imageB: demoJ, originalPrice: 159.99, offerPrice: 129.99, rating: 4.5, reviews: 10, category: 'Jewelry', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '2j', name: 'Jewelry 2', image: demoJ, imageB: demoJ, originalPrice: 179.99, offerPrice: 149.99, rating: 4.7, reviews: 15, category: 'Jewelry', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '3j', name: 'Jewelry 3', image: demoJ, imageB: demoJ, originalPrice: 129.99, offerPrice: 109.99, rating: 4.3, reviews: 8, category: 'Jewelry', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '4j', name: 'Jewelry 4', image: demoJ, imageB: demoJ, originalPrice: 199.99, offerPrice: 169.99, rating: 4.8, reviews: 20, category: 'Jewelry', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '5j', name: 'Jewelry 5', image: demoJ, imageB: demoJ, originalPrice: 139.99, offerPrice: 119.99, rating: 4.6, reviews: 12, category: 'Jewelry', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '6j', name: 'Jewelry 6', image: demoJ, imageB: demoJ, originalPrice: 189.99, offerPrice: 159.99, rating: 4.9, reviews: 18, category: 'Jewelry', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '7j', name: 'Jewelry 7', image: demoJ, imageB: demoJ, originalPrice: 119.99, offerPrice: 99.99, rating: 4.2, reviews: 5, category: 'Jewelry', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '8j', name: 'Jewelry 8', image: demoJ, imageB: demoJ, originalPrice: 149.99, offerPrice: 129.99, rating: 4.4, reviews: 9, category: 'Jewelry', description: 'Lorem ipsum dolor sit amet consectetur...' },

  // Gowns
  { id: '1g', name: 'Gown 1', image: demoGown, imageB: demoGown, originalPrice: 199.99, offerPrice: 169.99, rating: 4.8, reviews: 15, category: 'Gown', description: 'Elegant and flowing, this gown is perfect for formal occasions. Made with high-quality fabric and intricate details.' },
  { id: '2g', name: 'Gown 2', image: demoGown, imageB: demoGown, originalPrice: 249.99, offerPrice: 219.99, rating: 4.7, reviews: 18, category: 'Gown', description: 'A stunning gown with a fitted bodice and a full skirt, designed to make a grand entrance.' },
  { id: '3g', name: 'Gown 3', image: demoGown, imageB: demoGown, originalPrice: 299.99, offerPrice: 259.99, rating: 5.0, reviews: 22, category: 'Gown', description: 'A timeless classic, this gown features delicate lace details and a flattering silhouette.' },
  { id: '4g', name: 'Gown 4', image: demoGown, imageB: demoGown, originalPrice: 179.99, offerPrice: 149.99, rating: 4.5, reviews: 13, category: 'Gown', description: 'Perfect for a night out or a special occasion, this gown offers comfort and style.' },
  { id: '5g', name: 'Gown 5', image: demoGown, imageB: demoGown, originalPrice: 229.99, offerPrice: 199.99, rating: 4.6, reviews: 17, category: 'Gown', description: 'An enchanting gown with a sweetheart neckline and a flowy skirt, great for weddings and parties.' },
  { id: '6g', name: 'Gown 6', image: demoGown, imageB: demoGown, originalPrice: 279.99, offerPrice: 239.99, rating: 4.9, reviews: 20, category: 'Gown', description: 'Elegant and sophisticated, this gown is adorned with sequins and features a flattering fit.' },
  { id: '7g', name: 'Gown 7', image: demoGown, imageB: demoGown, originalPrice: 319.99, offerPrice: 289.99, rating: 5.0, reviews: 25, category: 'Gown', description: 'A luxurious gown with a unique design, perfect for making a statement at any event.' },
  { id: '8g', name: 'Gown 8', image: demoGown, imageB: demoGown, originalPrice: 159.99, offerPrice: 129.99, rating: 4.3, reviews: 11, category: 'Gown', description: 'Chic and stylish, this gown is designed for comfort and elegance, ideal for evening wear.' },

  // Suits
  { id: '1su', name: 'Suit 1', image: demoSuit, imageB: demoSuit, originalPrice: 299.99, offerPrice: 269.99, rating: 5.0, reviews: 20, category: 'Suit', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '2su', name: 'Suit 2', image: demoSuit, imageB: demoSuit, originalPrice: 329.99, offerPrice: 289.99, rating: 4.8, reviews: 18, category: 'Suit', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '3su', name: 'Suit 3', image: demoSuit, imageB: demoSuit, originalPrice: 319.99, offerPrice: 279.99, rating: 4.7, reviews: 22, category: 'Suit', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '4su', name: 'Suit 4', image: demoSuit, imageB: demoSuit, originalPrice: 289.99, offerPrice: 259.99, rating: 4.9, reviews: 25, category: 'Suit', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '5su', name: 'Suit 5', image: demoSuit, imageB: demoSuit, originalPrice: 359.99, offerPrice: 329.99, rating: 5.0, reviews: 30, category: 'Suit', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '6su', name: 'Suit 6', image: demoSuit, imageB: demoSuit, originalPrice: 279.99, offerPrice: 249.99, rating: 4.6, reviews: 15, category: 'Suit', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '7su', name: 'Suit 7', image: demoSuit, imageB: demoSuit, originalPrice: 349.99, offerPrice: 319.99, rating: 4.8, reviews: 27, category: 'Suit', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '8su', name: 'Suit 8', image: demoSuit, imageB: demoSuit, originalPrice: 269.99, offerPrice: 239.99, rating: 4.5, reviews: 13, category: 'Suit', description: 'Lorem ipsum dolor sit amet consectetur...' },

  // Kurtis
  { id: '1k', name: 'Kurti 1', image: demoKurti, imageB: demoKurti, originalPrice: 59.99, offerPrice: 49.99, rating: 4.2, reviews: 5, category: 'Kurti', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '2k', name: 'Kurti 2', image: demoKurti, imageB: demoKurti, originalPrice: 69.99, offerPrice: 55.99, rating: 4.0, reviews: 8, category: 'Kurti', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '3k', name: 'Kurti 3', image: demoKurti, imageB: demoKurti, originalPrice: 49.99, offerPrice: 39.99, rating: 4.5, reviews: 12, category: 'Kurti', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '4k', name: 'Kurti 4', image: demoKurti, imageB: demoKurti, originalPrice: 79.99, offerPrice: 69.99, rating: 4.7, reviews: 15, category: 'Kurti', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '5k', name: 'Kurti 5', image: demoKurti, imageB: demoKurti, originalPrice: 99.99, offerPrice: 89.99, rating: 4.3, reviews: 7, category: 'Kurti', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '6k', name: 'Kurti 6', image: demoKurti, imageB: demoKurti, originalPrice: 89.99, offerPrice: 74.99, rating: 4.1, reviews: 10, category: 'Kurti', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '7k', name: 'Kurti 7', image: demoKurti, imageB: demoKurti, originalPrice: 119.99, offerPrice: 99.99, rating: 4.8, reviews: 18, category: 'Kurti', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '8k', name: 'Kurti 8', image: demoKurti, imageB: demoKurti, originalPrice: 109.99, offerPrice: 89.99, rating: 4.4, reviews: 14, category: 'Kurti', description: 'Lorem ipsum dolor sit amet consectetur...' },

  // T-Shirts
  { id: '1ts', name: 'T-Shirt 1', image: demoTshirt, imageB: demoTshirt, originalPrice: 29.99, offerPrice: 19.99, rating: 4.0, reviews: 6, category: 'T-Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '2ts', name: 'T-Shirt 2', image: demoTshirt, imageB: demoTshirt, originalPrice: 34.99, offerPrice: 24.99, rating: 4.3, reviews: 8, category: 'T-Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '3ts', name: 'T-Shirt 3', image: demoTshirt, imageB: demoTshirt, originalPrice: 39.99, offerPrice: 29.99, rating: 4.1, reviews: 10, category: 'T-Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '4ts', name: 'T-Shirt 4', image: demoTshirt, imageB: demoTshirt, originalPrice: 44.99, offerPrice: 34.99, rating: 4.6, reviews: 7, category: 'T-Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '5ts', name: 'T-Shirt 5', image: demoTshirt, imageB: demoTshirt, originalPrice: 49.99, offerPrice: 39.99, rating: 4.4, reviews: 12, category: 'T-Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '6ts', name: 'T-Shirt 6', image: demoTshirt, imageB: demoTshirt, originalPrice: 54.99, offerPrice: 44.99, rating: 4.7, reviews: 9, category: 'T-Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '7ts', name: 'T-Shirt 7', image: demoTshirt, imageB: demoTshirt, originalPrice: 59.99, offerPrice: 49.99, rating: 4.2, reviews: 11, category: 'T-Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '8ts', name: 'T-Shirt 8', image: demoTshirt, imageB: demoTshirt, originalPrice: 64.99, offerPrice: 54.99, rating: 4.5, reviews: 15, category: 'T-Shirt', description: 'Lorem ipsum dolor sit amet consectetur...' },

  // Hoodies
  { id: '1h', name: 'Hoodie 1', image: demoHoodie, imageB: demoHoodie, originalPrice: 89.99, offerPrice: 79.99, rating: 4.6, reviews: 14, category: 'Hoodie', description: 'Lorem ipsum dolor sit amet consectetur...' },
  { id: '2h', name: 'Hoodie 2', image: demoHoodie, imageB: demoHoodie, originalPrice: 99.99, offerPrice: 89.99, rating: 4.8, reviews: 22, category: 'Hoodie', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: '3h', name: 'Hoodie 3', image: demoHoodie, imageB: demoHoodie, originalPrice: 79.99, offerPrice: 69.99, rating: 4.5, reviews: 18, category: 'Hoodie', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: '4h', name: 'Hoodie 4', image: demoHoodie, imageB: demoHoodie, originalPrice: 109.99, offerPrice: 99.99, rating: 4.7, reviews: 25, category: 'Hoodie', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { id: '5h', name: 'Hoodie 5', image: demoHoodie, imageB: demoHoodie, originalPrice: 89.99, offerPrice: 79.99, rating: 4.6, reviews: 12, category: 'Hoodie', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
  { id: '6h', name: 'Hoodie 6', image: demoHoodie, imageB: demoHoodie, originalPrice: 95.99, offerPrice: 85.99, rating: 4.9, reviews: 30, category: 'Hoodie', description: 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.' },
  { id: '7h', name: 'Hoodie 7', image: demoHoodie, imageB: demoHoodie, originalPrice: 79.99, offerPrice: 69.99, rating: 4.4, reviews: 15, category: 'Hoodie', description: 'Integer in mauris eu nibh euismod gravida non ac sapien.' },
  { id: '8h', name: 'Hoodie 8', image: demoHoodie, imageB: demoHoodie, originalPrice: 119.99, offerPrice: 109.99, rating: 4.8, reviews: 20, category: 'Hoodie', description: 'Fusce vel sapien eget ligula egestas mollis a at neque.' },

  // Watches
  { id: '1w', name: 'Watch 1', image: demoWatch, imageB: demoWatch, originalPrice: 149.99, offerPrice: 129.99, rating: 4.5, reviews: 11, category: 'Watch', description: 'Lorem ipsum dolor sit amet consectetur...' },
    { id: '2w', name: 'Watch 2', image: demoWatch, imageB: demoWatch, originalPrice: 199.99, offerPrice: 179.99, rating: 4.7, reviews: 22, category: 'Watch', description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: '3w', name: 'Watch 3', image: demoWatch, imageB: demoWatch, originalPrice: 129.99, offerPrice: 109.99, rating: 4.3, reviews: 15, category: 'Watch', description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
    { id: '4w', name: 'Watch 4', image: demoWatch, imageB: demoWatch, originalPrice: 249.99, offerPrice: 219.99, rating: 4.8, reviews: 8, category: 'Watch', description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
    { id: '5w', name: 'Watch 5', image: demoWatch, imageB: demoWatch, originalPrice: 179.99, offerPrice: 159.99, rating: 4.6, reviews: 20, category: 'Watch', description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: '6w', name: 'Watch 6', image: demoWatch, imageB: demoWatch, originalPrice: 159.99, offerPrice: 139.99, rating: 4.4, reviews: 10, category: 'Watch', description: 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit.' },
    { id: '7w', name: 'Watch 7', image: demoWatch, imageB: demoWatch, originalPrice: 219.99, offerPrice: 199.99, rating: 4.9, reviews: 5, category: 'Watch', description: 'Vestibulum auctor dapibus neque. Nunc dignissim risus id metus tincidunt, id cursus nisi egestas.' },
    { id: '8w', name: 'Watch 8', image: demoWatch, imageB: demoWatch, originalPrice: 299.99, offerPrice: 269.99, rating: 4.2, reviews: 30, category: 'Watch', description: 'Fusce tincidunt, elit at tempor dignissim, libero nunc interdum augue, sed convallis ligula orci ut urna.' }

  // Add more elements as needed
];
