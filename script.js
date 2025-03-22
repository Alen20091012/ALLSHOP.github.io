const productsData = {
    electronics: [
        { id: 1, name: 'Смартфон XYZ', description: 'Отличный смартфон', price: 20000, imageUrl: 'https://img.mvideo.ru/Pdb/400156696b2.jpg', category: 'electronics' },
        { id: 2, name: 'Наушники ABC', description: 'Беспроводные наушники', price: 5000, imageUrl: 'https://avatars.mds.yandex.net/get-yabs_performance/14105033/hatf5918fcb6f16cfaab299e620bd907b88/hugeX', category: 'electronics' }
    ],
    clothes: [
        { id: 3, name: 'Футболка', description: 'Хлопковая футболка', price: 1000, imageUrl: 'https://images.51microshop.com/713/product/20180725/copy_of_Balenciaga_BB_logo_T_shirts_1532528558481_4.jpg', category: 'clothes' },
        { id: 4, name: 'Джинсы', description: 'Синие джинсы', price: 3000, imageUrl: 'https://i.ebayimg.com/00/s/Nzg4WDk0MA==/z/6b4AAOSwwk5h1e63/$_57.JPG?set_id=8800005007', category: 'clothes' }
    ],
    books: [
        { id: 5, name: 'Война и мир', description: 'класика', price: 500, imageUrl: 'https://sun9-2.userapi.com/impf/9NARYsi__uQ--nbgZpxi9t6_F5xDefPh1khE-w/0T0rF9WcQo8.jpg?size=550x535&quality=96&sign=7b4b75cd331a1f2e104051668c7eea64&type=album', category: 'books' },
    ]
};

console.log("productsData:", productsData);

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    displayProducts('all'); // Показываем все товары по умолчанию
    updateCartUI();
});

// Функция для отображения товаров
function displayProducts(category) {
    console.log("displayProducts called with category:", category);
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    let productsToDisplay = [];
    if (category === 'all') {
        for (const cat in productsData) {
            productsToDisplay = productsToDisplay.concat(productsData[cat]);
        }
    } else {
        productsToDisplay = productsData[category] || [];
    }

    if (productsToDisplay.length === 0) {
        productsGrid.textContent = 'Товаров в данной категории нет.';
        return;
    }

    productsToDisplay.forEach(product => {
        const img = document.createElement('img');
        img.src = product.imageUrl;
        img.alt = product.name;

        const h3 = document.createElement('h3');
        h3.textContent = product.name;

        const pDescription = document.createElement('p');
        pDescription.textContent = product.description;

        const pPrice = document.createElement('p');
        pPrice.textContent = `Цена: ${product.price} ₽`;

        const button = document.createElement('button');
        button.textContent = 'Добавить в корзину';
        button.onclick = () => addToCart(product.id);

        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.appendChild(img);
        productItem.appendChild(h3);
        productItem.appendChild(pDescription);
        productItem.appendChild(pPrice);
        productItem.appendChild(button);

        productsGrid.appendChild(productItem);
    });
}

// Функция добавления товара в корзину
function addToCart(productId) {
    let productToAdd;

    for (const cat in productsData) {
        productToAdd = productsData[cat].find(p => p.id === Number(productId));
        if (productToAdd) break;
    }

    if (productToAdd) {
        cart.push(productToAdd);
        updateCartUI();
    } else {
        console.warn(`Product with id ${productId} not found`);
    }
}

// Функция для обновления отображения корзины
function updateCartUI() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    const cartCountSpan = document.getElementById('cart-count');

    cartItemsDiv.innerHTML = ''; // Очищаем список товаров

    let total = 0;
    cart.forEach(item => {
        const cartItemEl = document.createElement('div');
        cartItemEl.classList.add('cart-item');
        cartItemEl.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price} ₽</span>
            <button onclick="removeFromCart(${item.id})">Удалить</button>
        `;
        cartItemsDiv.appendChild(cartItemEl);
        total += item.price;
    });

    cartTotalSpan.textContent = total;
    cartCountSpan.textContent = cart.length;
}

// Обработчики событий для кнопок категорий
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        displayProducts(category);
    });
});

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}
