document.addEventListener("DOMContentLoaded", () => {

    const current_page = document.querySelector("#current_page");
    
    function set_page(page) {
        switch (page) {
            case "Homepage":
                set_page_homepage();
                break;
        
            default:
                set_page_placeholder();
                break;
        }
    }



    function set_page_placeholder() {
        current_page.innerHTML = 
        `
        <h1>Placeholder</h1>
        `
    }

    function set_page_homepage() {
        current_page.innerHTML = 
        `
        <h1>Homepage</h1>
        `
    }

    console.log("I sure as hell exist")
})