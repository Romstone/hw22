    //elements
    const formLoader = document.getElementById('loader');
    const side_nav = document.getElementById('side-nav');
    const prodTab = document.getElementById('productsLink');
    const content = document.getElementById('content');
    const addTab = document.getElementById('addLink');
    const special = document.getElementById('special');
    const section = document.getElementById('section');

    ////////////////////

    formLoader.addEventListener('change', e => {
        let productType = e.target.value;
        switch (productType) {
            case 'milk': {
                special.innerHTML = `
            <input class="form-control" type="number" name="fat"
                   placeholder="fat">`;
                break;
            }
            case 'chocolate': {
                special.innerHTML = `
            <input class="form-control" type="text" name="kind"
                   placeholder="kind">`;
                break;
            }
            case 'wine': {
                special.innerHTML = `
            <input class="form-control" type="number" name="alcohol"
                   placeholder="alcohol">`;
                break;
            }
        }
    });

    formLoader.onsubmit = e => {
        e.preventDefault();
        let res = {};
        switch (e.target.prod_type.value) {
            case "milk": {
                res = new Milk(Number(e.target.id.value),
                    e.target.title.value,
                    e.target.manufc.value,
                    e.target.price.value,
                    e.target.fat.value);
                break;
            }
            case "chocolate": {
                res = new Chocolate(e.target.id.value,
                    e.target.title.value,
                    e.target.manufc.value,
                    e.target.price.value,
                    e.target.kind.value);
                break;
            }
            case "wine": {
                res = new Wine(e.target.id.value,
                    e.target.title.value,
                    e.target.manufc.value,
                    e.target.price.value,
                    e.target.alcohol.value);
                break;
            }
        }
        myStore.addProduct(res);
        console.log(myStore);
        formLoader.reset();
    }

    /////////////////////////////

    function render(product) {
        function getOwnProperty(product) {
            if (product.fat)
                return `fat: ${product.fat}%`;
            else if (product.kind)
                return `kind: ${product.kind}`;
            else if (product.alcohol)
                return `alcohol: ${product.alcohol}%`
        }

        content.innerHTML = product.map(function (product) {
            return `<div class="card">
                     <h2>${product.constructor.name}</h2>
                     <h4>${product.title}</h4>
                     <h3>${product.manufacture}</h3>
                     <h4>${getOwnProperty(product)}</h4>
                     <h4>Price: ${product.price}</h4>
                     </div>`
        }).join('\n');
    }
    render(myStore.getAllProducts());

    /////////////////////////////

    function activeHandler() {
        const elements = document.querySelectorAll('li');
        elements.forEach(e => {
            e.classList.remove('active');
        });
        elements.item(2).classList.add('active');
    }

    prodTab.addEventListener('click', e => {
        formLoader.style.display = 'none';
        side_nav.style.display = 'block';
        content.style.display = 'flex';
        activeHandler();
        prodTab.classList.add('active');
        render(myStore.getAllProducts());
    });

    addTab.onclick = e => {
        formLoader.style.display = 'flex';
        formLoader.style.position = 'absolute';
        formLoader.style.left = '40vw'
        content.style.display = 'none';
        side_nav.style.display = 'none';
        prodTab.classList.remove('active');
        addTab.classList.add('active');
    }

    //////////////////////////////

    side_nav.addEventListener('click', e => {
        if (e.target.dataset.name === 'All products') {
            render(myStore.getAllProducts());
            let siblings = e.target.parentElement.children;
            for (let sib of siblings)
                sib.classList.remove('active');
            e.target.classList.add('active');
        } else {
            render(myStore.getByType(e.target.dataset.name));
            let siblings = e.target.parentElement.children;
            for (let sib of siblings)
                sib.classList.remove('active');
            e.target.classList.add('active');
        }
    });