(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const html = document.documentElement;
  const transitionLayer = document.querySelector(".page-transition");
  let lenis;

  html.classList.remove("no-js");

  const getStoredTheme = () => localStorage.getItem("samayanta-theme");

  const setTheme = (theme) => {
    const selected = theme === "light" ? "light" : "dark";
    html.dataset.theme = selected;
    localStorage.setItem("samayanta-theme", selected);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.setAttribute("aria-pressed", String(selected === "light"));
    });
  };

  const initialTheme = getStoredTheme() || "dark";
  setTheme(initialTheme);

  const updateActiveLinks = (namespace) => {
    const currentPage = `${namespace || "home"}.html`.replace("home.html", "index.html");
    document.querySelectorAll("[data-nav-link]").forEach((link) => {
      const href = link.getAttribute("href");
      if (href === currentPage) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const initHeader = () => {
    const header = document.querySelector("[data-header]");
    const menuButton = document.querySelector("[data-menu-toggle]");
    const mobileMenu = document.querySelector("[data-mobile-menu]");

    const onScroll = () => {
      header?.classList.toggle("is-scrolled", window.scrollY > 18);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        setTheme(html.dataset.theme === "light" ? "dark" : "light");
      });
    });

    menuButton?.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      if (mobileMenu) {
        mobileMenu.hidden = isOpen;
      }
      document.body.classList.toggle("is-locked", !isOpen);
    });

    mobileMenu?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuButton?.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
        document.body.classList.remove("is-locked");
      });
    });
  };

  const initLenis = () => {
    if (reduceMotion || !window.Lenis) return;

    lenis = new window.Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  };

  const initReveals = (scope = document) => {
    const revealTargets = scope.querySelectorAll("[data-reveal]");
    const lineTargets = scope.querySelectorAll("[data-reveal-line]");

    if (reduceMotion || !window.gsap) {
      [...revealTargets, ...lineTargets].forEach((target) => {
        target.style.opacity = 1;
        target.style.transform = "none";
      });
      return;
    }

    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    revealTargets.forEach((target, index) => {
      const isHeroTarget = Boolean(target.closest(".hero"));
      const options = {
        autoAlpha: 1,
        y: 0,
        delay: isHeroTarget ? 0.16 + index * 0.04 : 0,
        duration: 0.9,
        ease: "power3.out",
      };

      if (!isHeroTarget) {
        options.scrollTrigger = {
          trigger: target,
          start: "top 86%",
          once: true,
        };
      }

      gsap.fromTo(target, { autoAlpha: 0, y: 28 }, options);
    });

    lineTargets.forEach((target, index) => {
      gsap.fromTo(
        target,
        { autoAlpha: 0, yPercent: 18 },
        {
          autoAlpha: 1,
          yPercent: 0,
          delay: index * 0.04,
          duration: 1,
          ease: "power4.out",
        },
      );
    });
  };

  const initParallax = (scope = document) => {
    if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;

    scope.querySelectorAll("[data-parallax]").forEach((target) => {
      gsap.to(target, {
        yPercent: Number(target.dataset.parallax) || -8,
        ease: "none",
        scrollTrigger: {
          trigger: target.closest("section") || target,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  };

  const initBriefForm = (scope = document) => {
    const form = scope.querySelector("[data-brief-form]");
    if (!form || form.dataset.bound === "true") return;

    form.dataset.bound = "true";
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const status = form.querySelector("[data-form-status]");
      const brief = [
        `Name: ${data.get("name") || ""}`,
        `Focus: ${data.get("focus") || ""}`,
        `Message: ${data.get("message") || ""}`,
        "Preferred contact: phone or Instagram",
      ].join("\n");

      try {
        await navigator.clipboard.writeText(brief);
        if (status) status.textContent = "Brief copied. Use the direct links beside the form to send it.";
      } catch {
        if (status) status.textContent = "Brief prepared. Select the text fields and use the direct links beside the form.";
      }
    });
  };

  const initMagneticLinks = (scope = document) => {
    if (reduceMotion) return;

    scope.querySelectorAll("[data-magnetic]").forEach((element) => {
      if (element.dataset.bound === "true") return;
      element.dataset.bound = "true";

      element.addEventListener("mousemove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate(${x * 0.08}px, ${y * 0.16}px)`;
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform = "";
      });
    });
  };

  const initPage = (scope = document, namespace = document.querySelector("[data-barba-namespace]")?.dataset.barbaNamespace) => {
    updateActiveLinks(namespace);
    initReveals(scope);
    initParallax(scope);
    initBriefForm(scope);
    initMagneticLinks(scope);
    document.querySelector("[data-year]")?.replaceChildren(String(new Date().getFullYear()));
    window.ScrollTrigger?.refresh();
  };

  const initBarba = () => {
    initPage(document);

    if (!window.barba || reduceMotion || !window.gsap || !transitionLayer) {
      return;
    }

    barba.init({
      preventRunning: true,
      transitions: [
        {
          name: "cinematic-fade",
          async leave(data) {
            await gsap.fromTo(transitionLayer, {
              yPercent: 100,
            }, {
              yPercent: 0,
              duration: 0.62,
              ease: "power4.inOut",
            });
            data.current.container.remove();
          },
          enter(data) {
            window.scrollTo(0, 0);
            lenis?.scrollTo(0, { immediate: true });
            initPage(data.next.container, data.next.namespace);
            return gsap.fromTo(
              transitionLayer,
              { yPercent: 0 },
              {
                yPercent: -100,
                duration: 0.62,
                ease: "power4.inOut",
                onComplete: () => gsap.set(transitionLayer, { yPercent: 100 }),
              },
            );
          },
        },
      ],
    });
  };

  initHeader();
  initLenis();
  initBarba();
})();
