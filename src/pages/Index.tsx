import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  sizes: string[];
  category: string;
}

const Index = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  const products: Product[] = [
    {
      id: 1,
      name: 'Минималистичная футболка',
      price: 2490,
      image: '/img/05455b00-8d3c-4b1f-b894-acae017f0dc9.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      category: 'футболки'
    },
    {
      id: 2,
      name: 'Стильные кроссовки',
      price: 8990,
      image: '/img/579bb874-9750-4340-8736-06446c7afd02.jpg',
      sizes: ['36', '37', '38', '39', '40', '41', '42'],
      category: 'обувь'
    },
    {
      id: 3,
      name: 'Элегантная куртка',
      price: 12990,
      image: '/img/2da42c11-2f95-494f-a5bd-a91d43cdbfa6.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'верхняя одежда'
    },
    {
      id: 4,
      name: 'Классические джинсы',
      price: 5990,
      image: '/img/fb3395ca-6f6f-4b40-8f82-4bb805ce3410.jpg',
      sizes: ['28', '30', '32', '34', '36'],
      category: 'брюки'
    },
    {
      id: 5,
      name: 'Трендовое худи',
      price: 4290,
      image: '/img/e03e4fc2-e1d3-4756-8d73-c00695916832.jpg',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      category: 'худи'
    },
    {
      id: 6,
      name: 'Строгая рубашка',
      price: 3490,
      image: '/img/aa310f5d-1bb0-41fe-8f88-1b95b4405286.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      category: 'рубашки'
    }
  ];

  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  
  const filteredProducts = selectedSizes.length > 0 
    ? products.filter(product => 
        product.sizes.some(size => selectedSizes.includes(size))
      )
    : products;

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product]);
  };

  const toggleSizeFilter = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wider">TRENDY STORE</h1>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-gray-300 transition-colors">Главная</a>
            <a href="#catalog" className="hover:text-gray-300 transition-colors">Каталог</a>
            <a href="#delivery" className="hover:text-gray-300 transition-colors">Доставка</a>
            <a href="#contacts" className="hover:text-gray-300 transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:bg-gray-800 relative">
              <Icon name="ShoppingBag" size={20} />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-white text-black px-1 min-w-[20px] h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 text-black">Новая коллекция</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Минималистичная одежда для современного стиля жизни
          </p>
          <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-3">
            Смотреть каталог
          </Button>
        </div>
      </section>

      {/* Size Filter */}
      <section id="catalog" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-black">Фильтр по размерам</h3>
            <div className="flex flex-wrap gap-2">
              {allSizes.map(size => (
                <Button
                  key={size}
                  variant={selectedSizes.includes(size) ? "default" : "outline"}
                  onClick={() => toggleSizeFilter(size)}
                  className={`border border-gray-300 ${
                    selectedSizes.includes(size) 
                      ? 'bg-black text-white' 
                      : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  {size}
                </Button>
              ))}
              {selectedSizes.length > 0 && (
                <Button
                  variant="ghost"
                  onClick={() => setSelectedSizes([])}
                  className="text-gray-500 hover:text-black"
                >
                  <Icon name="X" size={16} className="mr-1" />
                  Сбросить
                </Button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold mb-2 text-black">{product.name}</h4>
                    <p className="text-2xl font-bold mb-4 text-black">{product.price.toLocaleString()} ₽</p>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Размеры:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.sizes.map(size => (
                          <Badge 
                            key={size} 
                            variant="outline" 
                            className="text-xs border-gray-300 text-gray-600"
                          >
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-black text-white hover:bg-gray-800"
                    >
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section id="delivery" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-black">Доставка</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={24} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-black">Быстрая доставка</h4>
              <p className="text-gray-600">По Москве в день заказа, по России 2-3 дня</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-black">Гарантия качества</h4>
              <p className="text-gray-600">Возврат и обмен в течение 14 дней</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CreditCard" size={24} className="text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2 text-black">Удобная оплата</h4>
              <p className="text-gray-600">Карта, наличные, рассрочка</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-black">Контакты</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-black">Свяжитесь с нами</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} className="text-gray-600" />
                  <span className="text-gray-600">+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-gray-600" />
                  <span className="text-gray-600">info@trendystore.ru</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-gray-600" />
                  <span className="text-gray-600">Москва, ул. Тверская 1</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-black">Режим работы</h4>
              <div className="space-y-2 text-gray-600">
                <p>Пн-Пт: 10:00 - 21:00</p>
                <p>Сб-Вс: 11:00 - 20:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">TRENDY STORE</h2>
          <p className="text-gray-400">© 2024 Trendy Store. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;