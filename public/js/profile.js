

if (checkIfLoggedIn()){
    document.getElementById('sancard-reservation-medicine')
        .setAttribute('style', 'display: inline-block; visibility: visible')

    document.getElementById('please-login')
        .setAttribute('style', 'display: none; visibility: hidden');
}
else{
    document.getElementById('sancard-reservation-medicine')
        .setAttribute('style', 'display: none; visibility: hidden');

    document.getElementById('please-login')
        .setAttribute('style', 'display: inline-block; visibility: visible')
}