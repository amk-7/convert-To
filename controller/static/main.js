let select_file_extension = document.getElementsByClassName('fileExtension');
let input_file_extension_origin = select_file_extension[0];
let select_file_extension_want = select_file_extension[1];
let input_file = document.getElementById('file');
let input_convert = document.getElementById('convert');
let a_download = document.getElementById('download_file');
clean()

let file_extensions = ['Sélectionner extension', 'pdf', 'docx', 'xlsx', 'ods', 'adoc', 'md', 'jpeg', 'jpg', 'png'];

addOptions(file_extensions, select_file_extension_want);

input_file.addEventListener('change', function (e){
    const extension = findFileExtension(this.value);
    input_file_extension_origin.value = extension;
    correspondances = convertionCorrespondances(extension);
    addOptions(correspondances, select_file_extension_want);
});

input_convert.addEventListener('click', function (e){
    //e.preventDefault();
});

function clean(){
  input_file_extension_origin.value = ""
}

function addOptions(options, select_box){
    while(select_box.options.length > 0){
      select_box.remove(0);
    }
    for(let i=0; i<options.length; i++){
        let option = document.createElement('option');
        option.value = options[i];
        option.innerText = option.value;
        select_box.appendChild(option);
    }
}

function selectExtension(select_file_extension, extension){
    for(let i=0; i<select_file_extension.options.length; i++){
        option_value = select_file_extension.options[i].value;
        if (option_value==extension){
            select_file_extension.value = option_value;
        }
    }
}

function convertionCorrespondances(extension){
    if (extension === "pdf"){
      return ['Sélectionner extension', 'docx'];
    }
    
    if (['jpeg', 'jpg', 'png'].includes(extension)){
      return ['Sélectionner extension', 'pdf', 'docx'];
    }
}

function findFileExtension(file){
    return file.split('.', 2)[1];
}

function setDownloadLink(){
    console.log('Ok');
    url = `${location.protocol}//${location.hostname}:${location.port}/null`;
    if (url != a_download.href){
        a_download.classList = "download";
    }
}

setDownloadLink();
a_download.addEventListener('click', function (e){
    url = `${location.protocol}//${location.hostname}:${location.port}/null`;
    if (url == this.href){
        e.preventDefault();
    }
});

document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");
  
    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });
  
    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });
  
    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });
  
    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });
  
    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();
  
      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }
  
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });
  
  /**
   * Updates the thumbnail on a drop zone element.
   *
   * @param {HTMLElement} dropZoneElement
   * @param {File} file
   */
  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
  
    // First time - remove the prompt
    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
      dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }
  
    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("drop-zone__thumb");
      dropZoneElement.appendChild(thumbnailElement);
    }
  
    thumbnailElement.dataset.label = file.name;
  
    // Show thumbnail for image files
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onload = () => {
        thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
      };
    } else {
      thumbnailElement.style.backgroundImage = null;
    }
  }