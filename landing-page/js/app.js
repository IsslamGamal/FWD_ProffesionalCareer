/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/
/* !Description: Store the Section List in a variable */ 
const aSectionsList = document.querySelectorAll('section');

/* !Description: Create the Document Fragement */ 
const documentFragmentPage = document.createDocumentFragment();

const buttonElement = document.querySelector('.icon');

const menu = document.querySelector('#navbar__list');
/**
 * End Global Variables
 * Start Helper Functions
 *
*/



/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

/* !Description: The function of Highlighting the Currently Viewed section */
function scrollHighlighting ()
{
    for (section of aSectionsList)
    {

        if (section.getBoundingClientRect().top >=-400 &&
            section.getBoundingClientRect().top <=200)
        {
            section.classList.add('your-active-class');
            section.querySelector('h2').classList.add('your-active-class');

        }
        else 
        {
            section.classList.remove('your-active-class');
            section.querySelector('h2').classList.remove('your-active-class');

        }
    }
}


function navMenuCreateFunc()
{
    /* Note: Create the UL Element that will contains the menu list Items */ 
    const ulMenuElement = document.querySelector('#navbar__list');

    /* !COmment: Create the Temp menu Element Variable */
    let singleListElement;
    /* !Comment: Create the Temp Menu Link Element */
    let  anchorLink;

    ulMenuElement.classList.add('navbar__menu');

    /* !Note: Create the List dynamicly based on the Number of the implemented Sections */
    for (section of aSectionsList)
    {
        /* !Note: Create a List element */ 
        singleListElement = document.createElement('li');
        singleListElement.classList.add('navbar__menu');

        /* !Note: Create a Link that will refere to the coresponding Section */
        anchorLink = document.createElement('a');

        /* !Note: Add the Acnhor Link Classes */ 
        anchorLink.classList.add('navbar__menu');
        anchorLink.classList.add('menu__link');

        /* !Note: Add the Hyper Reference of Sections to the Link Text */ 
        anchorLink.href = `#${section.getAttribute('id')}`;

        /* !Note: Give the Link name of the Corresponding Section dynamicly */ 
        anchorLink.textContent = section.dataset.nav; 

        anchorLink.addEventListener('click', function smothSectionScroll( currEvent )
        {
            let currSection;
            /* !Comment: Stop the Default action of the Event */ 
            currEvent.preventDefault();

            /* !Comment: Get the Section name by extracting it from it's href and cut the '#' sign */
            currSection = document.querySelector(`#${currEvent.target.href.split('#')[1]}`);
            
            /* !Comment: Set the Scrolling Propertise */ 
            currSection.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'start'
                }
            )
        });
        /* !Note: Add the link to the List element */
        singleListElement.appendChild(anchorLink);
        /* !Note: Add the List element to the UL element */
        ulMenuElement.appendChild(singleListElement);
    }

    documentFragmentPage.appendChild(ulMenuElement);
    
    document.querySelector('nav').appendChild(documentFragmentPage);
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

/* !Description: Main Event of creating the navigator menu on Page Content loading */ 
document.addEventListener('DOMContentLoaded', navMenuCreateFunc)

// Scroll to section on link click

/* !Description: The event of highlighting the current text attached to the navigator */ 
window.addEventListener('scroll', scrollHighlighting);



/* !Description: Activate the menu Event */ 
buttonElement.addEventListener('click', function ()
{
    menu.classList.toggle('show');
})