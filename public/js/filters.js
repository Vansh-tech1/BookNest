let taxSwitch=document.getElementById("flexSwitchCheckDefault");
  taxSwitch.addEventListener("click",()=>{
    let taxInfo=document.getElementsByClassName("tax-info");
    for(info of taxInfo){
      if(info.style.display!="inline"){
        info.style.display="inline";
      }else{
        info.style.display="none";
      }
      
    }
  })

  const filters = document.getElementById('filters');

  // Add horizontal scrolling on mouse wheel
  filters.addEventListener('wheel', (event) => {
      event.preventDefault();
      filters.scrollLeft += event.deltaY; // Scroll horizontally instead of vertically
  });