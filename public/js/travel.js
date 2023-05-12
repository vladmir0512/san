if (checkIfLoggedIn()){
    document.getElementById('btn-reservation-type1')
        .setAttribute('href', 'reservation')
    document.getElementById('btn-reservation-type2')
        .setAttribute('href', 'reservation')
    document.getElementById('btn-reservation-type3')
        .setAttribute('href', 'reservation')
}
else{
    document.getElementById('btn-reservation-type1')
        .setAttribute('href', 'profile')
    document.getElementById('btn-reservation-type2')
        .setAttribute('href', 'profile')
    document.getElementById('btn-reservation-type3')
        .setAttribute('href', 'profile')
}