function mobileMenuDropdown(e = {}) {
  var closeOthers = e.closeOthers === "true" || e.closeOthers === true;
  var icon = e.icon === "plus" ? "plus" : "arrow";

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      setTimeout(function() {
        initDropdowns(closeOthers, icon);
      }, 500);
    });
  } else {
    setTimeout(function() {
      initDropdowns(closeOthers, icon);
    }, 500);
  }
}

function initDropdowns(closeOthers, icon) {
  var allTriggers = [];

  function isAncestorTrigger(potentialAncestor, trigger) {
    var parent = trigger.parentElement;
    while (parent) {
      if (parent.previousElementSibling === potentialAncestor) {
        return true;
      }
      parent = parent.parentElement;
    }
    return false;
  }

  function setupTrigger(trigger, content) {
    trigger.classList.add("cse-dropdown-trigger");
    trigger.setAttribute("tabindex", "0");

    var useEl = trigger.querySelector(".header-dropdown-icon svg use");
    if (useEl && icon === "plus") {
      useEl.setAttribute("href", "#plus");
    }

    content.classList.add("cse-dropdown-content");
    allTriggers.push(trigger);

    trigger.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (closeOthers) {
        allTriggers.forEach(function(otherTrigger) {
          if (otherTrigger !== trigger && !isAncestorTrigger(otherTrigger, trigger)) {
            otherTrigger.classList.remove("open");
          }
        });
      }
      trigger.classList.toggle("open");
    });
  }

  var folderTriggers = document.querySelectorAll(".header-menu-nav-item a[data-folder-id], .language-picker-mobile a[data-folder-id]");

  folderTriggers.forEach(function(trigger) {
    var folderId = trigger.getAttribute("data-folder-id");
    var folder = document.querySelector('[data-folder="' + folderId + '"]');

    if (!folder && folderId === "language-picker") {
      folder = document.getElementById("multilingual-language-picker-mobile");
    }

    if (folder) {
      trigger.after(folder);
      setupTrigger(trigger, folder);
    }
  });

  var subFolders = document.querySelectorAll("[data-sub-folder]");

  subFolders.forEach(function(subFolder) {
    var subFolderId = subFolder.getAttribute("data-sub-folder");
    var originalLink = document.querySelector('.header-menu-nav-item a[href="' + subFolderId + '"]');

    if (originalLink) {
      var parentItem = originalLink.closest(".header-menu-nav-item");

      if (parentItem) {
        var newTrigger = originalLink.cloneNode(true);

        var existingIcon = newTrigger.querySelector(".header-dropdown-icon");
        if (!existingIcon) {
          var iconTemplate = document.querySelector(".header-dropdown-icon");
          if (iconTemplate) {
            var iconClone = iconTemplate.cloneNode(true);
            var itemContent = newTrigger.querySelector(".header-menu-nav-item-content");
            if (itemContent) {
              itemContent.appendChild(iconClone);
            } else {
              newTrigger.appendChild(iconClone);
            }
          }
        }

        parentItem.innerHTML = "";
        parentItem.appendChild(newTrigger);
        parentItem.appendChild(subFolder);

        setupTrigger(newTrigger, subFolder);
      }
    }
  });

  var activeSlides = document.querySelectorAll(".header-menu-nav-folder--active");
  activeSlides.forEach(function(el) {
    el.classList.remove("header-menu-nav-folder--active");
  });
}

window.mobileMenuDropdown = mobileMenuDropdown;
