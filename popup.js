console.log('popup.js loaded');
document.querySelector('.trigger').addEventListener('click', () => {
  console.log('Trigger clicked');
  const slider = document.getElementById('helpSlider');
  slider.classList.toggle('open');
});