document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
});