import React, { useState } from "react";
import { Link, useParams } from 'react-router-dom'; 
import Card from '../../components/Card/Card';
import PaginationButtons from '../../components/PaginationButtons/PaginationButtons'; 
import SearchBar from '../../components/SearchBar/SearchBar';
import Filters from '../../components/Filters/Filters';
import './Home.css'

const db = [
    {
      "id": "1f4dfdb8-6be6-4d9e-b6c3-8d0f5f33614b",
      "name": "Colombian Medium Roast",
      "description": "A balanced and flavorful medium roast coffee from the hills of Colombia.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 12000,
      "stock": 15,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Medium Roast"
      }
    },
    {
      "id": "d07c3d4c-49f8-4c95-9ee1-5ce671f14812",
      "name": "Ethiopian Yirgacheffe Light Roast",
      "description": "A bright and floral light roast coffee with notes of citrus and jasmine.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 14000,
      "stock": 20,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Light Roast"
      }
    },
    {
      "id": "1a1b2c3d-1111-2222-3333-abcdef123456",
      "name": "Ethiopian Yirgacheffe",
      "description": "A bright and floral coffee with notes of jasmine and citrus.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 12000,
      "stock": 15,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Light Roast"
      }
    },
    {
      "id": "2e2f3g4h-4444-5555-6666-ghijkl789012",
      "name": "Colombian Supremo",
      "description": "A balanced coffee with hints of chocolate and caramel sweetness.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 9500,
      "stock": 20,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Ground coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Medium Roast"
      }
    },
    {
      "id": "1c6b6a79-6b3f-4e4b-aa71-8f0f23ef562a",
      "name": "Ethiopian Yirgacheffe",
      "description": "Delight in the fruity and floral notes of Ethiopian Yirgacheffe coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 12000,
      "stock": 15,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Light Roast"
      }
    },
    {
      "id": "e2dd4a3b-0cb3-4c2b-8c71-61427df5057a",
      "name": "Colombian Supremo",
      "description": "Indulge in the rich and nutty flavors of Colombian Supremo coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 10500,
      "stock": 20,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Ground coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Medium Roast"
      }
    },
    {
      "id": "7b0e9e08-b662-45c9-b7ca-d0a2611a617c",
      "name": "Brazilian Santos",
      "description": "Experience the smooth and chocolatey notes of Brazilian Santos coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 9000,
      "stock": 18,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Capsule coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Medium Roast"
      }
    },
    {
      "id": "ed0a6311-253c-472e-bcc4-74b3a39d2e06",
      "name": "Sumatra Mandheling",
      "description": "Savor the bold and earthy flavors of Sumatra Mandheling coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 13500,
      "stock": 12,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Dark Roast"
      }
    },
    {
      "id": "e47f255e-3e8d-4c1f-9710-6b9d5f184c63",
      "name": "Kenyan AA",
      "description": "Discover the bright and fruity notes of Kenyan AA coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 13000,
      "stock": 8,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Ground coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Light Roast"
      }
    },
    {
      "id": "6cf34b45-4917-4ae5-baac-c4429171aa23",
      "name": "Italian Espresso Blend",
      "description": "Experience the bold and intense flavors of our Italian Espresso Blend.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 15000,
      "stock": 10,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Blend of Coffee"
      },
      "RoastingProfile": {
        "profile": "Dark Roast"
      }
    },
    {
      "id": "c9a42917-8df0-4d1b-b3ef-af9d50042dd0",
      "name": "Guatemala Antigua",
      "description": "Enjoy the well-balanced and smooth flavors of Guatemala Antigua coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 11500,
      "stock": 14,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Capsule coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Medium Roast"
      }
    },
    {
      "id": "b156e242-8509-4ad5-8a14-5c2d4b7a8f3d",
      "name": "Decaf Swiss Water Process",
      "description": "Experience the rich and smooth flavors of our Decaf Swiss Water Process coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 9500,
      "stock": 25,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Ground coffee"
      },
      "Origin": {
        "origin": "Blend of Coffee"
      },
      "RoastingProfile": {
        "profile": "Medium Roast"
      }
    },
    {
      "id": "3b4fc2c2-ff7c-4cfd-8c3d-1b2b78679fb4",
      "name": "Costa Rican Tarrazú",
      "description": "Indulge in the sweet and citrusy notes of Costa Rican Tarrazú coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 11000,
      "stock": 9,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Light Roast"
      }
    },
    {
      "id": "5467b1bf-1db9-4b97-b268-d87993a95f20",
      "name": "French Roast Blend",
      "description": "Experience the bold and smoky flavors of our French Roast Blend.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 12500,
      "stock": 7,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Ground coffee"
      },
      "Origin": {
        "origin": "Blend of Coffee"
      },
      "RoastingProfile": {
        "profile": "Dark Roast"
      }
    },
    {
      "id": "1f4dfdb8-6be6-4d9e-b6c3-8d0f5f33614b",
      "name": "Colombian Medium Roast",
      "description": "A balanced and flavorful medium roast coffee from the hills of Colombia.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 12000,
      "stock": 15,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Medium Roast"
      }
    },
    {
      "id": "d07c3d4c-49f8-4c95-9ee1-5ce671f14812",
      "name": "Ethiopian Yirgacheffe Light Roast",
      "description": "A bright and floral light roast coffee with notes of citrus and jasmine.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 14000,
      "stock": 20,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Light Roast"
      }
    },
    {
      "id": "1a1b2c3d-1111-2222-3333-abcdef123456",
      "name": "Ethiopian Yirgacheffe",
      "description": "A bright and floral coffee with notes of jasmine and citrus.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 12000,
      "stock": 15,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Light Roast"
      }
    },
    {
      "id": "2e2f3g4h-4444-5555-6666-ghijkl789012",
      "name": "Colombian Supremo",
      "description": "A balanced coffee with hints of chocolate and caramel sweetness.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 9500,
      "stock": 20,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Ground coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Medium Roast"
      }
    },
    {
      "id": "1c6b6a79-6b3f-4e4b-aa71-8f0f23ef562a",
      "name": "Ethiopian Yirgacheffe",
      "description": "Delight in the fruity and floral notes of Ethiopian Yirgacheffe coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 12000,
      "stock": 15,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Light Roast"
      }
    },
    {
      "id": "e2dd4a3b-0cb3-4c2b-8c71-61427df5057a",
      "name": "Colombian Supremo",
      "description": "Indulge in the rich and nutty flavors of Colombian Supremo coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 10500,
      "stock": 20,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Ground coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Medium Roast"
      }
    },
    {
      "id": "7b0e9e08-b662-45c9-b7ca-d0a2611a617c",
      "name": "Brazilian Santos",
      "description": "Experience the smooth and chocolatey notes of Brazilian Santos coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 9000,
      "stock": 18,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Capsule coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Medium Roast"
      }
    },
    {
      "id": "ed0a6311-253c-472e-bcc4-74b3a39d2e06",
      "name": "Sumatra Mandheling",
      "description": "Savor the bold and earthy flavors of Sumatra Mandheling coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 13500,
      "stock": 12,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Dark Roast"
      }
    },
    {
      "id": "e47f255e-3e8d-4c1f-9710-6b9d5f184c63",
      "name": "Kenyan AA",
      "description": "Discover the bright and fruity notes of Kenyan AA coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 13000,
      "stock": 8,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Ground coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Light Roast"
      }
    },
    {
      "id": "6cf34b45-4917-4ae5-baac-c4429171aa23",
      "name": "Italian Espresso Blend",
      "description": "Experience the bold and intense flavors of our Italian Espresso Blend.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 15000,
      "stock": 10,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Blend of Coffee"
      },
      "RoastingProfile": {
        "profile": "Dark Roast"
      }
    },
    {
      "id": "c9a42917-8df0-4d1b-b3ef-af9d50042dd0",
      "name": "Guatemala Antigua",
      "description": "Enjoy the well-balanced and smooth flavors of Guatemala Antigua coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 11500,
      "stock": 14,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Capsule coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Medium Roast"
      }
    },
    {
      "id": "b156e242-8509-4ad5-8a14-5c2d4b7a8f3d",
      "name": "Decaf Swiss Water Process",
      "description": "Experience the rich and smooth flavors of our Decaf Swiss Water Process coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 9500,
      "stock": 25,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Ground coffee"
      },
      "Origin": {
        "origin": "Blend of Coffee"
      },
      "RoastingProfile": {
        "profile": "Medium Roast"
      }
    },
    {
      "id": "3b4fc2c2-ff7c-4cfd-8c3d-1b2b78679fb4",
      "name": "Costa Rican Tarrazú",
      "description": "Indulge in the sweet and citrusy notes of Costa Rican Tarrazú coffee.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 11000,
      "stock": 9,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Whole bean coffee"
      },
      "Origin": {
        "origin": "Single Origin Coffee"
      },
      "RoastingProfile": {
        "profile": "Light Roast"
      }
    },
    {
      "id": "5467b1bf-1db9-4b97-b268-d87993a95f20",
      "name": "French Roast Blend",
      "description": "Experience the bold and smoky flavors of our French Roast Blend.",
      "image": "https://i.pinimg.com/564x/d8/92/f1/d892f19e758c315b4a6539fb1bd10945.jpg",
      "price": 12500,
      "stock": 7,
      "isActive": true,
      "TypeOfCoffee": {
        "type": "Ground coffee"
      },
      "Origin": {
        "origin": "Blend of Coffee"
      },
      "RoastingProfile": {
        "profile": "Dark Roast"
      }
    }
  ]


const Home = () => {

    //PAGINATION:
    //const productRender = useSelector((state) => state.filtredPeople);
    const productRender = db;

    const { page } = useParams();
    const pageNumber = page ? parseInt(page) : 1;
    const [currentPage, setCurrentPage] = useState(pageNumber);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(productRender.length / itemsPerPage);

    const visibleProduct = productRender.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    return (
        <div className="home-container">
          
            <div className="home-banner">
             <p className='home-banner-msj'>NUESTROS PRODUCTOS</p>
             <SearchBar />
             <img className='home-image-banner' src="/assets/images/bannere-home.webp" alt="banner" />
            </div>

            <Filters />

            <div  className="home-card-container">
                {visibleProduct.map((product) => (
                <Link to={`/detail/${product.id}`} key={product.id}>
                <Card
                    id={product.id}
                    image={product.image}
                    title={product.name}
                    /* reviews={product.height} */
                    price={product.price}
                />
                </Link>
                ))}
            </div>
            
            <PaginationButtons
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />

        </div>
    );
};

export default Home;
