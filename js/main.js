// ============================================
// NILEX - Shared JavaScript
// Mobile menu, filters, inquire buttons
// ============================================

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.querySelector('.menu-icon');
  const navLinks = document.querySelector('.nav-links');
  
  if(menuIcon) {
    menuIcon.addEventListener('click', () => {
      if(navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        if(window.innerWidth <= 900) {
          navLinks.style.flexDirection = 'column';
          navLinks.style.position = 'absolute';
          navLinks.style.top = '70px';
          navLinks.style.left = '0';
          navLinks.style.width = '100%';
          navLinks.style.backgroundColor = 'white';
          navLinks.style.padding = '2rem';
          navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        }
      }
    });
  }
  
  window.addEventListener('resize', () => {
    if(window.innerWidth > 900) {
      if(navLinks) navLinks.style.display = 'flex';
    } else if(navLinks && navLinks.style.display !== 'flex') {
      navLinks.style.display = 'none';
    }
  });

  // Filter functionality (only on collections page)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const products = document.querySelectorAll('.product-card');
  
  if(filterBtns.length > 0 && products.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        products.forEach(product => {
          if(filterValue === 'all' || product.getAttribute('data-category') === filterValue) {
            product.style.display = 'block';
          } else {
            product.style.display = 'none';
          }
        });
      });
    });
  }

  // Inquire buttons -> open Gmail
  const inquireBtns = document.querySelectorAll('.inquire-btn');
  inquireBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productName = btn.getAttribute('data-product');
      const card = btn.closest('.product-card');
      let size = 'Not specified';
      let color = 'Not specified';
      if(card) {
        const sizeSelect = card.querySelector('.size-select');
        const colorSelect = card.querySelector('.color-select');
        if(sizeSelect) size = sizeSelect.value;
        if(colorSelect) color = colorSelect.value;
      }
      const subject = `Inquiry about ${productName}`;
      const body = `Hello Nilex,%0A%0AI am interested in: ${productName}%0ASize: ${size}%0AColor: ${color}%0A%0AAdditional questions: %0A%0ABest regards.`;
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=hello@nilex.com&su=${encodeURIComponent(subject)}&body=${body}`;
      window.open(gmailUrl, '_blank');
    });
  });
});