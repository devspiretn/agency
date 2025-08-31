/**
 * Improved Pagination for Sites for Sale Page
 * - Hides pagination when no projects
 * - Only shows pagination when needed
 * - Works with category filtering
 */
document.addEventListener('DOMContentLoaded', function() {
  const paginationContainer = document.querySelector('.projects-pagination');
  const paginationList = paginationContainer.querySelector('.pagination');
  const projectItems = document.querySelectorAll('.project-item');
  const itemsPerPage = 3; // Number of projects per page
  
  let currentPage = 1;
  let filteredProjects = Array.from(projectItems);
  
  // Initialize pagination
  updatePagination();
  
  // Function to update pagination based on visible projects
  function updatePagination() {
    // Get all visible projects (not filtered out)
    const visibleProjects = Array.from(projectItems).filter(item => 
      item.style.display !== 'none' && window.getComputedStyle(item).display !== 'none'
    );
    
    filteredProjects = visibleProjects;
    const pageCount = Math.ceil(visibleProjects.length / itemsPerPage);
    
    // Clear existing pagination
    paginationList.innerHTML = '';
    
    // If no projects or only one page, hide pagination
    if (visibleProjects.length === 0 || pageCount <= 1) {
      paginationContainer.style.display = 'none';
      return;
    }
    
    // Show pagination
    paginationContainer.style.display = 'block';
    
    // Previous button
    const prevItem = document.createElement('li');
    prevItem.className = 'page-item';
    const prevLink = document.createElement('a');
    prevLink.className = 'page-link';
    prevLink.href = '#';
    prevLink.innerHTML = '&laquo;';
    prevLink.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updatePaginationUI();
      }
    });
    prevItem.appendChild(prevLink);
    paginationList.appendChild(prevItem);
    
    // Create pagination items
    for (let i = 1; i <= pageCount; i++) {
      const pageItem = document.createElement('li');
      pageItem.className = 'page-item';
      if (i === currentPage) pageItem.classList.add('active');
      
      const pageLink = document.createElement('a');
      pageLink.className = 'page-link';
      pageLink.href = '#';
      pageLink.textContent = i;
      
      pageLink.addEventListener('click', function(e) {
        e.preventDefault();
        currentPage = i;
        showPage(currentPage);
        updatePaginationUI();
      });
      
      pageItem.appendChild(pageLink);
      paginationList.appendChild(pageItem);
    }
    
    // Next button
    const nextItem = document.createElement('li');
    nextItem.className = 'page-item';
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link';
    nextLink.href = '#';
    nextLink.innerHTML = '&raquo;';
    nextLink.addEventListener('click', function(e) {
      e.preventDefault();
      if (currentPage < pageCount) {
        currentPage++;
        showPage(currentPage);
        updatePaginationUI();
      }
    });
    nextItem.appendChild(nextLink);
    paginationList.appendChild(nextItem);
    
    // Show the first page
    showPage(currentPage);
  }
  
  // Function to show specific page
  function showPage(pageNumber) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Hide all projects first
    projectItems.forEach(item => {
      item.style.display = 'none';
    });
    
    // Show only projects for current page
    filteredProjects.forEach((item, index) => {
      if (index >= startIndex && index < endIndex) {
        item.style.display = 'block';
      }
    });
  }
  
  // Function to update pagination UI state
  function updatePaginationUI() {
    const pageItems = paginationList.querySelectorAll('.page-item');
    pageItems.forEach(item => item.classList.remove('active'));
    
    // The active page is at position currentPage + 1 (because of the previous button)
    if (pageItems[currentPage]) {
      pageItems[currentPage].classList.add('active');
    }
  }
  
  // Update pagination when category filtering changes
  const categoryLinks = document.querySelectorAll('.categories-widget a');
  categoryLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Reset to first page when category changes
      currentPage = 1;
      // Small delay to ensure DOM is updated before recalculating
      setTimeout(updatePagination, 50);
    });
  });
});



// 



/**
 * Functional Category Filtering with Project Counting
 */
document.addEventListener('DOMContentLoaded', function() {
  const categoryLinks = document.querySelectorAll('.categories-widget a');
  const projectItems = document.querySelectorAll('.project-item');
  const noProjectsMessage = document.getElementById('no-projects-message');
  
  // Initialize category counts
  updateCategoryCounts();
  
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      categoryLinks.forEach(l => l.parentElement.classList.remove('active'));
      
      // Add active class to clicked link
      this.parentElement.classList.add('active');
      
      const category = this.getAttribute('data-category') || 'all';
      
      // Count visible projects
      let visibleCount = 0;
      
      // Filter projects
      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || category === itemCategory) {
          item.style.display = 'block';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });
      
      // Show/hide no projects message
      if (visibleCount === 0) {
        noProjectsMessage.style.display = 'block';
      } else {
        noProjectsMessage.style.display = 'none';
      }
      
      // Pagination will automatically update through the event listener
    });
  });
  
  // Function to update category counts
  function updateCategoryCounts() {
    const categories = {
      'all': projectItems.length,
      'vitrine': 0,
      'landing': 0,
      'portfolio': 0,
      'blog': 0,
      'restaurant': 0
    };
    
    // Count projects in each category
    projectItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (category && categories.hasOwnProperty(category)) {
        categories[category]++;
      }
    });
    
    // Update count displays
    categoryLinks.forEach(link => {
      const category = link.getAttribute('data-category') || 'all';
      const countElement = link.querySelector('.count');
      if (countElement) {
        countElement.textContent = `(${categories[category]})`;
      }
    });
  }
});