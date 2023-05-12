if (checkIfLoggedIn()) {
    document.getElementById('btn-reservation-1')
        .setAttribute('href', 'reservation')
    document.getElementById('btn-reservation-2')
        .setAttribute('href', 'reservation')
    document.getElementById('btn-med-1')
        .setAttribute('href', 'medicine')
    document.getElementById('btn-med-2')
        .setAttribute('href', 'medicine')

}
else {
    document.getElementById('btn-reservation-1')
        .setAttribute('href', 'profile')
    document.getElementById('btn-reservation-2')
        .setAttribute('href', 'profile')
    document.getElementById('btn-med-1')
        .setAttribute('href', 'profile')
    document.getElementById('btn-med-2')
        .setAttribute('href', 'profile')
}