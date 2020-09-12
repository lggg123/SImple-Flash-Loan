function toggleOtherTextboxVisible(){
    var check = document.getElementById('OtherCheckBox')
    if (check.checked) {
        document.getElementById('OtherTextBox').style.display = 'block';
    } else {
        document.getElementById('OtherTextBox').style.display = 'none';
    }
}