const toCurrency = price =>{
    return new Intl.NumberFormat('az-Cyrl',{
        currency:'azn',
        style:'currency'
    }).format(price);
}
document.querySelectorAll('.price').forEach(el =>{
   el.textContent = toCurrency(el.textContent);
});