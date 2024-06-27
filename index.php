<!DOCTYPE html>
<html>

<head>
    <title>Portfolio de Jeyron</title>
    <link rel="stylesheet" href="veille.css">
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            fetch('get_articles.php')
                .then(response => response.json())
                .then(data => {
                    const container = document.getElementById('articles-container');
                    data.forEach(article => {
                        const articleDiv = document.createElement('div');
                        articleDiv.className = 'article';
                        articleDiv.innerHTML = `
                            <img class="image" src="${article.image}">
                            <article>
                                <p>${article.name}</p>
                                <p id="desc">${article.description} et le prix : <span data-prix="${article.price}">${article.price}€</span></p>
                                <p>Note : <span data-note="${article.rating}">${article.rating} 🌟</span>| Date : <span data-date="${article.date}">${new Date(article.date).toLocaleDateString()}</span></p>
                            </article>
                            <button class="add-to-cart">Ajouter au panier</button>
                        `;
                        container.appendChild(articleDiv);
                    });
                });
        });
    </script>
</head>

<body>
    <div class="header">
        <img id="logo" src="logobmw.png" alt="BMW Logo">
        <h1>BMW FRANCE</h1>
        <button id="cart-button">Panier (<span id="cart-count">0</span>)</button>
    </div>
    <div id="cart" class="cart">
        <h2>Panier</h2>
        <ul id="cart-items"></ul>
        <p>Total : <span id="total">0</span>€</p>
        <button id="close-cart">Fermer</button>
    </div>
    <div class="contenu">
        <div class="section-tri">
            <h1>Filtre</h1>
            <label for="tri-select">Trier par : </label>
            <select id="tri-select">
                <option value="rating" data-tri="rating">Note</option>
                <option value="name" data-tri="nom">Nom</option>
            </select>
        </div>
        <div class="section-articles">
            <div class="conteneur-articles" id="articles-container">
                <!-- Articles will be loaded here via AJAX -->
            </div>
        </div>
    </div>
</body>

</html>
