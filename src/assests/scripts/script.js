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

function openForm(){
  var popup=document.getElementById("popup");
  var blurBack=document.getElementById("toBlur");
  // blurBack.classList.toggle("blur")
  
  var hideDiv=document.getElementById("myDiv")
  hideDiv.style.display="none";
  popup.style.display="block";
  
}

function closeForm(){
  var popup=document.getElementById("popup");
  var blurBack=document.getElementById("toBlur");
  // blurBack.classList.toggle("blur")
  var hideDiv=document.getElementById("myDiv")
  hideDiv.style.display="block";
  popup.style.display="none";
 
}

function submitForm(){

 

  document.getElementById("myForm").submit();


  
}
