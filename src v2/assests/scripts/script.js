function previewImage(event) {
    var preview = document.getElementById('preview');
    var submitButton=document.getElementById("submitButton");
    submitButton.style.display="block";
    preview.src = URL.createObjectURL(event.target.files[0]);
    preview.onload = function() {
        preview.parentNode.classList.add('fade-in');
        preview.parentNode.style.display = 'block';
    
    }
}
