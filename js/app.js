/*********** Global variables *************/
const navList = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section")
const docFrag = document.createDocumentFragment();
let timeoutHandle = null;
/*********** End of global variables *************/


/*********** Dynamically create a navigation list *************/
for(let i=0; i< sections.length; i++){
    const navEl = document.createElement("li");
    navEl.setAttribute('id', sections[i].id+'-nav');
    navEl.textContent = sections[i].dataset.nav;
    navEl.className = "menu__link";

    docFrag.appendChild(navEl);
}

navList.appendChild(docFrag);

/*********** End of Dynamically create a navigation list *************/


/*********** Event listeners *************/
navList.addEventListener('click', function(event){

    // Parse the section ID from the target ID:
    const targetId =  event.target.id;
    const sectionid = targetId.substring(0, targetId.indexOf("-nav"));

    // Scroll to section:
    document.getElementById(sectionid).scrollIntoView({ behavior: 'smooth', block: 'end'});

    // Reset hide timer:
    window.clearTimeout(timeoutHandle);
    timeoutHandle = window.setTimeout(hideWhenIdle, 1500);
});

document.addEventListener('scroll', function(){
    // Show hidden navList:
    navList.removeAttribute("hidden");
    window.clearTimeout(timeoutHandle);
    timeoutHandle = window.setTimeout(hideWhenIdle, 1500);

    sections.forEach(s => {
        const isVisible = isInViewport(s);
        const sectionLink = document.getElementById(s.id+'-nav')
        if(isVisible){
            s.classList.add('your-active-class');

            // Highlight nav link:
            sectionLink.classList.add('selected__section__link');
        }
        else{
            s.classList.remove('your-active-class');
            sectionLink.classList.remove('selected__section__link');
        }
    });
})

timeoutHandle = window.setTimeout(hideWhenIdle, 1500);

/*********** End of Event listeners *************/


/*********** Helpfer functions *************/
// Check if element is in viewport:
function isInViewport(el){
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        (rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100)
    );
  }

// Hide nav when idle:
function hideWhenIdle(){
    navList.setAttribute("hidden", true);
}
/*********** End of helper functinos *************/




