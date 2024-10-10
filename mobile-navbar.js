class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
      this.overlay = document.querySelector('.overlay');

      this.handleClick = this.handleClick.bind(this);
      this.handleOverlayClick = this.handleOverlayClick.bind(this);
      this.handleSubmenuClick = this.handleSubmenuClick.bind(this);
  }

  animateLinks() {
      this.navLinks.forEach((link, index) => {
          link.style.animation
              ? (link.style.animation = "")
              : (link.style.animation = `navLinkFade 0.5s ease forwards ${
                  index / 7 + 0.3
              }s`);
      });
  }

  handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
      this.toggleOverlay();
      this.toggleBodyScroll();
  }

  handleOverlayClick() {
      this.handleClick();
  }

  handleSubmenuClick(e) {
      if (window.innerWidth <= 999) {
          const listItem = e.target.closest('li');
          if (listItem && listItem.querySelector('.submenu')) {
              e.preventDefault();
              listItem.classList.toggle('active');
          }
      }
  }

  toggleOverlay() {
      this.overlay.style.display = this.navList.classList.contains(this.activeClass) ? 'block' : 'none';
  }

  toggleBodyScroll() {
      document.body.style.overflow = this.navList.classList.contains(this.activeClass) ? 'hidden' : 'auto';
  }

  addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
      this.overlay.addEventListener("click", this.handleOverlayClick);
      this.navList.addEventListener("click", this.handleSubmenuClick);
  }

  init() {
      if (this.mobileMenu) {
          this.addClickEvent();
      }
      return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li"
);
mobileNavbar.init();