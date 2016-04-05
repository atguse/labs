// JavaScript source code
function show(shown, hidden)
{
    document.getElementById(shown).style.display = 'block';
    document.getElementById(hidden).style.display = 'none';
    return false;
}
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}