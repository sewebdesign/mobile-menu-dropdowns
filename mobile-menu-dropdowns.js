function mobileMenuDropdown(options = {}) {
  // Convert string "true"/"false" to boolean if needed
  const closeOthers = options.closeOthers === "true" || options.closeOthers === true;
  
 // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Add extra delay after DOM is loaded
      setTimeout(() => initDropdowns(closeOthers), 500);
    });
  } else {
    // DOM is already loaded, but still add the delay
    setTimeout(() => initDropdowns(closeOthers), 500);
  }
}

function initDropdowns(closeOthers) {
  // Get all folder link elements
  const folderLinks = document.querySelectorAll('.header-menu-nav-item a[data-folder-id]');
  
  // Loop through each folder link
  folderLinks.forEach(folderLink => {
    folderLink.classList.add('cse-dropdown-trigger');
    folderLink.setAttribute('tabindex', '0');
    
    // Extract the folder ID from the link
    const folderIdName = folderLink.getAttribute('data-folder-id');
    
    // Find the corresponding folder element
    const folderElement = document.querySelector('[data-folder="' + folderIdName + '"]');
    
    // Only proceed if we found a corresponding folder element
    if (folderElement) {
      folderElement.classList.add('cse-dropdown-content');
      
      // Insert the folder element after the folder link
      folderLink.after(folderElement);
      
      // Add click event listener to the folder link
      folderLink.addEventListener('click', function(event) {
        // Prevent the default behavior of the link
        event.preventDefault();
        
        // If closeOthers option is enabled, close all other dropdowns
        if (closeOthers) {
          folderLinks.forEach(link => {
            if (link !== folderLink) {
              link.classList.remove('open');
            }
          });
        }
        
        // Toggle the 'open' class on the folder link
        folderLink.classList.toggle('open');
        
        // Reset tabindex for all links
        setTimeout(() => {
          folderLinks.forEach(link => {
            link.setAttribute('tabindex', '0');
          });
        }, 300);
      });
    }
  });
}

// Make the plugin globally available
window.mobileMenuDropdown = mobileMenuDropdown;
