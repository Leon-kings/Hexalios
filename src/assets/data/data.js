import React from "react";
import menside from "../images/baner-right-image-02.jpg";
import kidsside from "../images/baner-right-image-03.jpg";
import accesside from "../images/baner-right-image-04.jpg";
import womenside from "../images/baner-right-image-01.jpg";
// men
import classicman from '../images/men-01.jpg'
import classicman1 from '../images/men-02.jpg'
import classicman2 from '../images/men-03.jpg'

export const categories = {
  Women: [
    {
      id: 1,
      name: "Summer Dress",
      type: "Dress",
      sizes: ["S", "M", "L"],
      stock: 24,
      price: "$59.99",
    },
    {
      id: 2,
      name: "Denim Jacket",
      type: "Jacket",
      sizes: ["XS", "S", "M", "L"],
      stock: 12,
      price: "$79.99",
    },
    {
      id: 3,
      name: "Casual Blouse",
      type: "Top",
      sizes: ["S", "M"],
      stock: 8,
      price: "$39.99",
    },
    {
      id: 4,
      name: "Ankle Boots",
      type: "Shoes",
      sizes: ["6", "7", "8", "9"],
      stock: 15,
      price: "$89.99",
    },
  ],
  Men: [
    {
      id: 5,
      name: "Classic Suit",
      type: "Suit",
      sizes: ["S", "M", "L", "XL"],
      stock: 10,
      price: "$199.99",
    },
    {
      id: 6,
      name: "Casual T-Shirt",
      type: "Top",
      sizes: ["S", "M", "L", "XL"],
      stock: 32,
      price: "$29.99",
    },
    {
      id: 7,
      name: "Sneakers",
      type: "Shoes",
      sizes: ["8", "9", "10", "11", "12"],
      stock: 18,
      price: "$69.99",
    },
    {
      id: 8,
      name: "Jeans",
      type: "Pants",
      sizes: ["28", "30", "32", "34"],
      stock: 22,
      price: "$49.99",
    },
  ],
  Kids: [
    {
      id: 9,
      name: "Colorful T-Shirt",
      type: "Top",
      sizes: ["4", "6", "8", "10"],
      stock: 14,
      price: "$19.99",
    },
    {
      id: 10,
      name: "Denim Overalls",
      type: "Overalls",
      sizes: ["2T", "3T", "4T"],
      stock: 7,
      price: "$34.99",
    },
    {
      id: 11,
      name: "Sandals",
      type: "Shoes",
      sizes: ["10", "11", "12", "13"],
      stock: 11,
      price: "$24.99",
    },
    {
      id: 12,
      name: "Winter Jacket",
      type: "Jacket",
      sizes: ["S", "M", "L"],
      stock: 5,
      price: "$44.99",
    },
  ],
  Accessories: [
    {
      id: 13,
      name: "Leather Belt",
      type: "Belt",
      sizes: ["S", "M", "L"],
      stock: 20,
      price: "$29.99",
    },
    {
      id: 14,
      name: "Silk Scarf",
      type: "Scarf",
      sizes: ["One Size"],
      stock: 16,
      price: "$19.99",
    },
    {
      id: 15,
      name: "Designer Handbag",
      type: "Bag",
      sizes: ["One Size"],
      stock: 8,
      price: "$129.99",
    },
    {
      id: 16,
      name: "Aviator Sunglasses",
      type: "Eyewear",
      sizes: ["One Size"],
      stock: 13,
      price: "$49.99",
    },
  ],
};
export const bannerItems = [
  {
    title: "Women",
    subtitle: "Best Clothes For Women",
    description: "Wow!! fency make our beauty Collection.",
    img: womenside,
  },
  {
    title: "Men",
    subtitle: "Best Clothes For Men",
    description: "Perfection men's Collection",
    img: menside,
  },
  {
    title: "Kids",
    subtitle: "Best Clothes For Kids",
    description: "When parents looks good, why does child don't.",
    img: kidsside,
  },
  {
    title: "Accessories",
    subtitle: "Best Trend Accessories",
    description: "Accessories to beautify our picture",
    img: accesside,
  },
];
// Product data
export const menProducts = [
    {
      id: 1,
      name: "Classic Spring",
      price: 120.0,
      image: classicman,
      rating: 5,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Navy", "Gray"],
      description: "Premium quality spring collection with comfortable fit.",
      stock: 15,
    },
    {
      id: 2,
      name: "Air Force 1 X",
      price: 90.0,
      image: classicman1,
      rating: 5,
      sizes: ["8", "9", "10", "11"],
      colors: ["White", "Black"],
      description: "Classic sneakers with updated cushioning.",
      stock: 8,
    },
    {
      id: 3,
      name: "Love Nana '20",
      price: 150.0,
      image: classicman2,
      rating: 5,
      sizes: ["S", "M", "L"],
      colors: ["Red", "White", "Blue"],
      description: "Limited edition designer collaboration.",
      stock: 5,
    },
    {
      id: 4,
      name: "Urban Jacket",
      price: 110.0,
      image: "https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg",
      rating: 4,
      sizes: ["M", "L", "XL"],
      colors: ["Black", "Olive", "Brown"],
      description: "Water-resistant jacket with multiple pockets.",
      stock: 12,
    },
    {
      id: 5,
      name: "Denim Classic",
      price: 85.0,
      image: classicman,
      rating: 4,
      sizes: ["28", "30", "32", "34"],
      colors: ["Blue", "Black"],
      description: "Classic fit denim jeans with stretch technology.",
      stock: 20,
    },
    {
      id: 6,
      name: "Premium Polo",
      price: 65.0,
      image: classicman2,
      rating: 4,
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Navy", "Green"],
      description: "Breathable polo shirt with moisture-wicking.",
      stock: 18,
    },
    {
      id: 7,
      name: "Sport Shorts",
      price: 45.0,
      image: classicman1,
      rating: 4,
      sizes: ["S", "M", "L"],
      colors: ["Black", "Gray", "Blue"],
      description: "Lightweight running shorts with pocket.",
      stock: 10,
    },
    {
      id: 8,
      name: "Leather Belt",
      price: 55.0,
      image: "https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg",
      rating: 5,
      sizes: ["32", "34", "36", "38"],
      colors: ["Brown", "Black"],
      description: "Genuine leather belt with steel buckle.",
      stock: 25,
    },
  ];
//   
export const womenProducts = [
    {
      id: 1,
      name: "Classic Spring Dress",
      price: 120.0,
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9",
      rating: 5,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Navy", "Pink"],
      description:
        "Elegant spring dress with comfortable fit and modern design.",
      stock: 15,
    },
    {
      id: 2,
      name: "Summer Breeze Top",
      price: 65.0,
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03",
      rating: 4,
      sizes: ["S", "M", "L"],
      colors: ["White", "Blue", "Yellow"],
      description: "Lightweight summer top with breathable fabric.",
      stock: 10,
    },
    {
      id: 3,
      name: "Elegant Evening Gown",
      price: 220.0,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
      rating: 5,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Red", "Navy"],
      description: "Stunning evening gown for special occasions.",
      stock: 8,
    },
    {
      id: 4,
      name: "Casual Denim Jacket",
      price: 95.0,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
      rating: 4,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "Black", "White"],
      description: "Versatile denim jacket for any casual outfit.",
      stock: 12,
    },
    {
      id: 5,
      name: "Office Blazer Set",
      price: 145.0,
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e4",
      rating: 5,
      sizes: ["S", "M", "L"],
      colors: ["Black", "Gray", "Navy"],
      description: "Professional blazer set for office wear.",
      stock: 7,
    },
    {
      id: 6,
      name: "Yoga Pants Set",
      price: 75.0,
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9",
      rating: 4,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Gray", "Blue"],
      description: "Comfortable yoga pants with matching top.",
      stock: 20,
    },
    {
      id: 7,
      name: "Winter Wool Coat",
      price: 180.0,
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03",
      rating: 5,
      sizes: ["S", "M", "L"],
      colors: ["Beige", "Black", "Camel"],
      description: "Warm wool coat for winter season.",
      stock: 9,
    },
    {
      id: 8,
      name: "Casual Sneakers",
      price: 85.0,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
      rating: 4,
      sizes: ["6", "7", "8", "9"],
      colors: ["White", "Black", "Pink"],
      description: "Comfortable casual sneakers for everyday wear.",
      stock: 14,
    },
  ];

  export   // Product data
    const kidsProducts = [
      {
        id: 1,
        name: "School Collection",
        price: 80.0,
        image:
          "https://images.pexels.com/photos/5069450/pexels-photo-5069450.jpeg",
        rating: 5,
        sizes: ["4-5Y", "6-7Y", "8-9Y"],
        colors: ["Blue", "Red", "Gray"],
        description: "Comfortable and durable school collection for kids.",
        stock: 15,
      },
      {
        id: 2,
        name: "Summer Cap",
        price: 12.0,
        image:
          "https://images.pexels.com/photos/5069450/pexels-photo-5069450.jpeg",
        rating: 4,
        sizes: ["One Size"],
        colors: ["Red", "Blue", "Green"],
        description: "Lightweight summer cap for sun protection.",
        stock: 8,
      },
      {
        id: 3,
        name: "Classic Kid",
        price: 30.0,
        image:
          "https://images.pexels.com/photos/5069450/pexels-photo-5069450.jpeg",
        rating: 4,
        sizes: ["2-3Y", "4-5Y", "6-7Y"],
        colors: ["White", "Black", "Navy"],
        description: "Classic outfit for kids that never goes out of style.",
        stock: 12,
      },
      {
        id: 4,
        name: "Classic Spring",
        price: 120.0,
        image:
          "https://images.pexels.com/photos/5069450/pexels-photo-5069450.jpeg",
        rating: 5,
        sizes: ["3-4Y", "5-6Y", "7-8Y"],
        colors: ["Yellow", "Pink", "Light Blue"],
        description: "Spring collection featuring breathable fabrics.",
        stock: 5,
      },
      {
        id: 5,
        name: "Denim Kids",
        price: 45.0,
        image:
          "https://images.pexels.com/photos/5069450/pexels-photo-5069450.jpeg",
        rating: 4,
        sizes: ["4-5Y", "6-7Y", "8-9Y"],
        colors: ["Blue", "Black"],
        description: "Durable denim with stretch technology.",
        stock: 18,
      },
      {
        id: 6,
        name: "Kids Hoodie",
        price: 35.0,
        image:
          "https://images.pexels.com/photos/5069450/pexels-photo-5069450.jpeg",
        rating: 4,
        sizes: ["4-5Y", "6-7Y", "8-9Y"],
        colors: ["Red", "Blue", "Green"],
        description: "Cozy hoodie with kangaroo pocket.",
        stock: 10,
      },
      {
        id: 7,
        name: "Play Shorts",
        price: 25.0,
        image:
          "https://images.pexels.com/photos/5069450/pexels-photo-5069450.jpeg",
        rating: 4,
        sizes: ["4-5Y", "6-7Y", "8-9Y"],
        colors: ["Black", "Gray", "Navy"],
        description: "Lightweight shorts with reinforced knees.",
        stock: 20,
      },
      {
        id: 8,
        name: "Kids Backpack",
        price: 40.0,
        image:
          "https://images.pexels.com/photos/5069450/pexels-photo-5069450.jpeg",
        rating: 5,
        sizes: ["One Size"],
        colors: ["Blue", "Pink", "Black"],
        description: "Durable backpack with multiple compartments.",
        stock: 15,
      },
    ];
  export // Shop data
  const shops = [
    {
      id: 1,
      name: "Urban Fashion Hub",
      category: "Clothing & Accessories",
      rating: 4.7,
      location: "123 Main Street, New York",
      phone: "+1 (555) 123-4567",
      email: "urban@example.com",
      hours: "Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-8PM",
      description: "Trendy urban fashion for men and women. Latest collections from top designers.",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      products: [
        {
          id: 101,
          name: "Denim Jacket",
          price: "$89.99",
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
          id: 102,
          name: "Graphic T-Shirt",
          price: "$29.99",
          rating: 4.2,
          image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: 2,
      name: "Tech Haven",
      category: "Electronics & Gadgets",
      rating: 4.9,
      location: "456 Tech Avenue, San Francisco",
      phone: "+1 (555) 987-6543",
      email: "tech@example.com",
      hours: "Mon-Sun: 10AM-10PM",
      description: "Cutting-edge technology and gadgets. Authorized dealer for all major brands.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      products: [
        {
          id: 201,
          name: "Wireless Earbuds",
          price: "$129.99",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
          id: 202,
          name: "Smart Watch",
          price: "$199.99",
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: 3,
      name: "Home & Living",
      category: "Home Decor & Furniture",
      rating: 4.6,
      location: "789 Design Blvd, Chicago",
      phone: "+1 (555) 456-7890",
      email: "home@example.com",
      hours: "Mon-Sat: 10AM-8PM, Sun: 11AM-6PM",
      description: "Beautiful home furnishings and decor to transform your living space.",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      products: [
        {
          id: 301,
          name: "Modern Sofa",
          price: "$899.99",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        },
        {
          id: 302,
          name: "Ceramic Vase Set",
          price: "$49.99",
          rating: 4.4,
          image: "https://images.unsplash.com/photo-1583524505974-6facd53f4597?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
        }
      ]
    }
  ];

  export const sampleProducts = [
            {
              id: 1,
              name: "Men's T-Shirt",
              category: "men",
              price: 19.99,
              rating: 4,
              description: "Comfortable cotton t-shirt for men",
              image: classicman,
              sizes: ['S', 'M', 'L', 'XL'],
              colors: ['Black', 'Blue', 'White', 'Red']
            },
            {
              id: 2,
              name: "Women's Jacket",
              category: "women",
              price: 59.99,
              rating: 5,
              description: "Stylish jacket for women",
              image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
              sizes: ['S', 'M', 'L', 'XL'],
              colors: ['Black', 'Blue', 'White', 'Red']
            },
            {
              id: 3,
              name: "Kids' T-Shirt",
              category: "kids",
              price: 14.99,
              rating: 4,
              description: "Colorful t-shirt for kids",
              image: "https://m.media-amazon.com/images/I/61-jBuhtgZL._AC_UX679_.jpg",
              sizes: ['4', '6', '8', '10', '12'],
              colors: ['Blue', 'Red', 'Yellow']
            }
          ];
 export const products = {
            fashion: [
              {
                id: 1,
                name: "Summer Dress Collection",
                price: "$49.99",
                rating: 4.7,
                description:
                  "Lightweight and comfortable summer dresses in various patterns.",
                image:
                  "https://images.unsplash.com/photo-1585487000160-6ebcfceb095d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
              },
              {
                id: 2,
                name: "Men's Casual Shirt",
                price: "$39.99",
                rating: 4.5,
                description: "Breathable cotton shirts perfect for summer outings.",
                image:
                  "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
              },
            ],
            new: [
              {
                id: 3,
                name: "Wireless Headphones",
                price: "$129.99",
                rating: 4.8,
                description: "Latest noise-cancelling headphones with 30hr battery life.",
                image:
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
              },
            ],
            brand: [
              {
                id: 4,
                name: "Designer Handbag",
                price: "$199.99",
                rating: 4.9,
                description: "Luxury handbag with genuine leather and gold accents.",
                image:
                  "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
              },
            ],
            makeup: [
              {
                id: 5,
                name: "Premium Makeup Kit",
                price: "$89.99",
                rating: 4.6,
                description: "Complete makeup set with 12 eye shadows and 6 lip colors.",
                image:
                  "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
              },
            ],
            leather: [
              {
                id: 6,
                name: "Genuine Leather Jacket",
                price: "$179.99",
                rating: 4.8,
                description: "High-quality leather jacket with adjustable waist.",
                image:
                  "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
              },
            ],
            bag: [
              {
                id: 7,
                name: "Canvas Backpack",
                price: "$59.99",
                rating: 4.4,
                description:
                  "Durable backpack with laptop compartment and water-resistant coating.",
                image:
                  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
              },
            ],
          };