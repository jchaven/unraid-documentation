// Get the sidebar and content containers
const sidebarContainer = document.getElementById('sidebar-container');
const contentContainer = document.getElementById('content-container');

// Load the sidebar HTML file
const sidebarRequest = new XMLHttpRequest();
sidebarRequest.open('GET', 'sidebar.html', true);
sidebarRequest.onload = function() {
  if (sidebarRequest.status >= 200 && sidebarRequest.status < 400) {
    sidebarContainer.innerHTML = sidebarRequest.responseText;
  } else {
    console.error('JCH - Error loading sidebar HTML file');
  }
};
sidebarRequest.onerror = function() {
  console.error('JCH - Error loading sidebar HTML file');
};
sidebarRequest.send();


// load content HTML files
function loadPage(pageName) {
  fetch(pageName)
    .then(response => {
      if (!response.ok) {
        throw new Error('Page not found');
      }
      return response.text();
    })
    .then(html => {
      console.log('JCH - highlight page:', pageName);
      contentContainer.innerHTML = html;
      highlightCurrentPage(pageName);
    })
    .catch(error => {
      console.error('Error loading page:', error);
    });
}


function highlightCurrentPage(pageName) {
  // Remove 'active' class from all links
  document.querySelectorAll('.sidebar-ul a').forEach(link => {
    console.log('JCH - Removing active from link:', link);
    link.classList.remove('active');
  });

  // Add 'active' class to the link corresponding to the current page
  const linkId = 'link' + pageName.replace('.html', '');
  console.log('JCH - Adding active to link:', linkId);
  document.getElementById(linkId).classList.add('active');
}


// Load a default HTML file when the page loads
window.onload = function() {
  console.log('JCH - Loading home page');
  loadPage('content/home/home.html'); 
};

