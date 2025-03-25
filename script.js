const productsData = {
    electronics: [
        { id: 1, name: 'CG Therma-FIT ADV Lunar Lake', description: 'Размер:XL(маломерит на один размер)', price: 6500, imageUrl: 'images/1.jpg', category: 'Clothes' },
        { id: 2, name: 'Baggy jeans Dime black', description: 'Размер: S, M , L, XL', price:3200 , imageUrl: 'images/1 (2).jpg', category: 'Clothes' },
        { id: 3, name: 'Polo Ralph Lauren zip hoodie ', description: 'Размер:L', price: 3200, imageUrl: 'images/1 (3).jpg', category: 'Clothes' },
        { id: 4, name: 'Polo Ralph Lauren zip hoodie ', description: 'Размер:L', price: 3200, imageUrl: 'images/1 (4).jpg', category: 'Clothes' },
        { id: 5, name: 'Футболка Rules the world Corteiz', description: 'Размер: L', price: 1590, imageUrl: 'images/1 (5).jpg', category: 'Clothes' },
        { id: 6, name: 'Футболка Gallery Dept', description: '3XL (маломерит на 3 размера)', price: 1590, imageUrl: 'images/1 (6).jpg', category: 'Clothes' },
        { id: 7, name: "Штаны Nike Tech Fleece Nocta", description: "Размер: XL", price: 3290, imageUrl: 'images/1 (7).jpg', category: 'Clothes' },
        { id: 8, name: 'Футболка Corteiz', description: 'Размер: XXL (маломерит на размер)', price: 1290, imageUrl: 'images/1 (8).jpg', category: 'Clothes' },
        { id: 9, name: 'Zip hoodie Lactose ', description: 'Размер: L', price: 2600, imageUrl: 'images/1 (9).jpg', category: 'Clothes' },
    ],
    clothes: [
        { id: 10, name: 'Nike air max 95 Corteiz', description: 'Размер:44', price: 3690, imageUrl: 'images/2.jpg', category: 'Footwear' },
    ],
    books: [
            { id: 11, name: 'Шапка Moncler', description: 'Размер: one size', price: 1300, imageUrl: 'images/3.jpg', category: 'Accessories' },
            { id: 12, name: 'Шапка Moncler', description: 'Размер: one size', price: 1300, imageUrl: 'images/3 (2).jpg', category: 'Accessories' },
            { id: 13, name: 'Шапка Glo Gang', description: 'Размер: one size', price: 800, imageUrl: 'images/3 (3).jpg', category: 'Accessories' },
            { id: 14, name: 'Картхолдер Goyard', description: 'ее', price: 800, imageUrl: 'images/3 (4).jpg', category: 'Accessories' },
            { id: 15, name: 'Шапка Aphex Twin', description: 'Размер: One size', price: 1100, imageUrl: 'images/3 (5).jpg', category: 'Accessories' },
        ]
};

console.log("productsData:", productsData);

let cart = [];





function updateCartUI() {
    //  Ваш код для обновления интерфейса корзины
    //  Например, обновление количества товаров в корзине, общей суммы и т.д.
    console.log("Функция updateCartUI() вызвана!"); // Для проверки
    //  Временная реализация:
    const cartCountElement = document.getElementById("cart-count");
    const cartTotalElement = document.getElementById("cart-total");

    if (cartCountElement && cartTotalElement) {
        cartCountElement.textContent = cart.length; // Предполагаем, что `cart` - это массив товаров
        let total = 0;
        cart.forEach(item => {
            total += item.price; // Предполагаем, что у каждого товара есть свойство `price`
        });
        cartTotalElement.textContent = total;
    } else {
        console.error("Не найдены элементы для отображения информации о корзине.");
    }
}

// Функция для отображения товаров
function displayProducts(category) {
    console.log("displayProducts called with category:", category);
    const productsGrid = document.querySelector('.products-grid'); // Замените '.products-grid' на ваш селектор
    productsGrid.innerHTML = ''; // Очищаем контейнер

    let productsToDisplay = [];
    if (category === 'all') {
        // Выводим все товары
        for (let key in productsData) {
            productsToDisplay = productsToDisplay.concat(productsData[key]);
        }
    } else {
        // Выводим товары по категории
        for (let key in productsData) {  // Corrected loop to iterate through all categories
            if (key === category) {       // Check if category matches the current key
                productsToDisplay = productsData[key] || [];
                break;  // Stop looping when category is found
            }
        }
    }

    productsToDisplay.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item'); // Добавьте класс для стилизации (если есть)

        const img = document.createElement('img');
        img.src = product.imageUrl; //Исправьте тут: imageUrl
        img.alt = product.name;
        productDiv.appendChild(img);

        const name = document.createElement('h3');
        name.textContent = product.name;
        productDiv.appendChild(name);

        const price = document.createElement('p');
        price.textContent = `Цена: ${product.price} ₽`;
        productDiv.appendChild(price);

        productsGrid.appendChild(productDiv);
    });
    }

document.addEventListener('DOMContentLoaded', () => {
    displayProducts('all'); // Показываем все товары по умолчанию
    updateCartUI();

    // Обработчики событий для кнопок категорий
    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            displayProducts(category);
        });
    });

    // Добавляем обработчик клика на кнопку "Оформить заказ"
    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
      console.log("Кнопка 'Оформить заказ' найдена, добавляем обработчик.");
      checkoutButton.addEventListener("click", function() {
        console.log("Кнопка 'Оформить заказ' нажата!");
        window.location.href = "https://t.me/orderSTUF";
      });
    } else {
      console.error("Кнопка 'Оформить заказ' не найдена.");
    }
});
