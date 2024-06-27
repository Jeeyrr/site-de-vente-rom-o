document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartButton = document.getElementById('cart-button');
    const closeCartButton = document.getElementById('close-cart');
    const cartElement = document.getElementById('cart');
    const cartItemsElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const cartCountElement = document.getElementById('cart-count');
    let total = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const article = event.target.closest('.article');
            const articleName = article.querySelector('p').textContent;
            const articlePrice = parseInt(article.querySelector('span[data-prix]').getAttribute('data-prix'));

            const listItem = document.createElement('li');
            listItem.textContent = `${articleName} - ${articlePrice}€`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Supprimer';
            removeButton.style.marginLeft = '10px';
            removeButton.addEventListener('click', () => {
                cartItemsElement.removeChild(listItem);
                total -= articlePrice;
                totalElement.textContent = total;
                cartCountElement.textContent = cartItemsElement.children.length;
            });

            listItem.appendChild(removeButton);
            cartItemsElement.appendChild(listItem);

            total += articlePrice;
            totalElement.textContent = total;
            cartCountElement.textContent = cartItemsElement.children.length;
        });
    });

    cartButton.addEventListener('click', () => {
        cartElement.style.display = 'block';
    });

    closeCartButton.addEventListener('click', () => {
        cartElement.style.display = 'none';
    });

    document.getElementById('tri-select').addEventListener('change', function () {
        const sortOption = this.value;
        if (sortOption === 'name') {
            sortArticlesByName();
        } else if (sortOption === 'rating') {
            sortArticlesByRating();
        } else {
            const container = document.querySelector('.conteneur-articles');
            const articles = document.querySelectorAll('.article');
            articles.forEach(article => {
                container.appendChild(article);
            });
        }
    });

    function sortArticlesByRating() {
        const articles = document.querySelectorAll('.article');
        const sortedArticles = Array.from(articles).sort((a, b) => {
            const ratingA = a.querySelector('span[data-note]').getAttribute('data-note');
            const ratingB = b.querySelector('span[data-note]').getAttribute('data-note');
            return ratingB.localeCompare(ratingA);
        });

        const container = document.querySelector('.conteneur-articles');
        container.innerHTML = '';
        sortedArticles.forEach(article => {
            container.appendChild(article);
        });
    }

    function sortArticlesByName() {
        const articles = document.querySelectorAll('.article');
        const sortedArticles = Array.from(articles).sort((a, b) => {
            const nameA = a.querySelector('p').textContent;
            const nameB = b.querySelector('p').textContent;
            return nameA.localeCompare(nameB);
        });

        const container = document.querySelector('.conteneur-articles');
        container.innerHTML = '';
        sortedArticles.forEach(article => {
            container.appendChild(article);
        });
    }
});
