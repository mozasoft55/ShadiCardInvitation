// ============================================================================
// WEDDINGHUB — ROYAL HEIRLOOM 5-SCREEN WEDDING EXPERIENCE
// template-02.js
// No framework / No dependency
// ============================================================================

const DEFAULT_WEDDING_DATE = "2026-10-27T21:30:00";


// ============================================================================
// SECURITY
// ============================================================================

function esc(value) {
  return String(value ?? "")
    .replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
}


// ============================================================================
// DATE / TIME
// ============================================================================

function parseWeddingDate(date, time) {

  if (!date) {
    return new Date(DEFAULT_WEDDING_DATE);
  }

  let raw = String(date).trim();

  // Handle Google Sheets / Apps Script 1899 timestamps
  if (
    raw.includes("1899-") ||
    raw.includes("1899/") ||
    raw.includes("1900-")
  ) {
    raw = "";
  }

  if (raw.includes("T")) {

    const parsed = new Date(raw);

    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }

  // YYYY-MM-DD + time
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {

    let cleanTime = String(time || "21:30:00")
      .replace(/\s+/g, "")
      .toUpperCase();

    const ampm = cleanTime.match(/(AM|PM)$/);

    if (ampm) {

      const match = cleanTime.match(
        /^(\d{1,2}):(\d{2})(?::(\d{2}))?(AM|PM)$/
      );

      if (match) {

        let hour = Number(match[1]);
        const minute = Number(match[2]);
        const second = Number(match[3] || 0);

        if (match[5] === "PM" && hour !== 12) {
          hour += 12;
        }

        if (match[5] === "AM" && hour === 12) {
          hour = 0;
        }

        return new Date(
          `${raw}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`
        );
      }
    }

    return new Date(`${raw}T${cleanTime}`);
  }

  const fallback = new Date(raw);

  return isNaN(fallback.getTime())
    ? new Date(DEFAULT_WEDDING_DATE)
    : fallback;
}


function formatDate(date, options = {}) {

  const d = date instanceof Date
    ? date
    : new Date(date);

  if (isNaN(d.getTime())) {
    return "";
  }

  return d.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: options.month || "long",
      year: "numeric"
    }
  );
}


function formatTime(value) {

  if (!value) return "";

  const raw = String(value).trim();

  // Remove fake Google Sheets dates
  if (
    raw.includes("1899-") ||
    raw.includes("1899/")
  ) {

    const match = raw.match(
      /T(\d{2}):(\d{2})(?::(\d{2}))?/
    );

    if (match) {

      return new Date(
        `1970-01-01T${match[1]}:${match[2]}:${match[3] || "00"}`
      ).toLocaleTimeString(
        "en-IN",
        {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }
      );
    }

    return "";
  }

  // ISO datetime
  if (raw.includes("T")) {

    const d = new Date(raw);

    if (!isNaN(d.getTime())) {

      return d.toLocaleTimeString(
        "en-IN",
        {
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        }
      );
    }
  }

  // HH:mm / HH:mm:ss
  const match = raw.match(
    /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?$/i
  );

  if (match) {

    let hour = Number(match[1]);
    const minute = Number(match[2]);
    const second = Number(match[3] || 0);
    const suffix = match[4];

    if (suffix) {

      if (
        suffix.toUpperCase() === "PM" &&
        hour !== 12
      ) {
        hour += 12;
      }

      if (
        suffix.toUpperCase() === "AM" &&
        hour === 12
      ) {
        hour = 0;
      }
    }

    const d = new Date();

    d.setHours(hour, minute, second, 0);

    return d.toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }
    );
  }

  return raw;
}


// ============================================================================
// SVG ICONS
// ============================================================================

function icon(name) {

  const map = {

    location: `
      <svg viewBox="0 0 24 24">
        <path d="M12 21s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12Z"/>
        <circle cx="12" cy="9" r="2"/>
      </svg>
    `,

    calendar: `
      <svg viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="16" rx="2"/>
        <path d="M7 3v4M17 3v4M3 10h18"/>
      </svg>
    `,

    whatsapp: `
      <svg viewBox="0 0 24 24">
        <path d="M20 11.5a8 8 0 0 1-12 7L4 20l1.7-4A8 8 0 1 1 20 11.5Z"/>
        <path d="M8.5 8.5c.2-.4.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.3 0 .5-.2.7l-.6.6c.8 1.3 1.8 2.4 3.2 3.1l.6-.6c.2-.2.4-.3.7-.2l1.7.7c.3.1.4.3.4.5v.5c0 .3-.1.5-.4.7-.6.3-1.2.4-1.8.2-2.3-.7-4.5-2.9-5.7-4.7-.7-1-.9-2.1-.3-3.1Z"/>
      </svg>
    `,

    music: `
      <svg viewBox="0 0 24 24">
        <path d="M9 18V5l11-2v13"/>
        <circle cx="6.5" cy="18" r="3"/>
        <circle cx="17.5" cy="16" r="3"/>
      </svg>
    `,

    share: `
      <svg viewBox="0 0 24 24">
        <circle cx="18" cy="5" r="2.5"/>
        <circle cx="6" cy="12" r="2.5"/>
        <circle cx="18" cy="19" r="2.5"/>
        <path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5"/>
      </svg>
    `,

    arrow: `
      <svg viewBox="0 0 24 24">
        <path d="M5 12h14M13 6l6 6-6 6"/>
      </svg>
    `

  };

  return map[name] || "";
}


// ============================================================================
// RENDER
// ============================================================================

export default function render({
  guest = {},
  wedding: w = {},
  events = []
}) {

  const bride =
    esc(w.bride_name || "Tarana");

  const groom =
    esc(w.groom_name || "Akbar");

  const brideFull =
    esc(w.bride_full || bride);

  const groomFull =
    esc(w.groom_full || groom);

  const guestName =
    esc(guest.name || "Respected Guest");

  const persons =
    Number(guest.persons || 1);

  const withFamily =
    guest.with_family === true ||
    guest.with_family === "1";

  const initials =
    `${bride.charAt(0)}${groom.charAt(0)}`.toUpperCase();

  // EXACT DATE FROM YOUR SCREENSHOT
  const weddingDate =
    parseWeddingDate(
      w.date || "2026-10-27",
      w.time || "21:30"
    );

  const dateDisplay =
    formatDate(weddingDate);

  const timeDisplay =
    formatTime(
      w.time || "21:30"
    ) || "09:30 PM";

  const rsvpNumber =
    String(
      w.rsvp_number ||
      "919432168956"
    ).replace(/[^\d]/g, "");

  const mapUrl =
    w.map_url || "#";

  const calendarUrl =
    buildCalendarUrl(
      bride,
      groom,
      weddingDate,
      w.venue,
      w.address
    );

  const whatsappUrl =
    `https://wa.me/${rsvpNumber}?text=${
      encodeURIComponent(
        `Assalamualaikum, I would like to confirm my attendance for the wedding of ${bride} & ${groom}. Guest: ${guest.name || "Guest"}`
      )
    }`;

  return `

  <!-- =========================================================
       FONTS
       ========================================================= -->

  <link rel="preconnect" href="https://fonts.googleapis.com">

  <link
    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&family=Playfair+Display:wght@500;600;700&display=swap"
    rel="stylesheet"
  >


  <!-- =========================================================
       COMPLETE ROYAL EXPERIENCE
       ========================================================= -->

  <div
    class="rh-app"
    data-wedding-date="${esc(weddingDate.toISOString())}"
  >

    <!-- AUDIO -->

    <button
      class="rh-audio"
      id="rhAudio"
      type="button"
      aria-label="Wedding music"
    >
      ${icon("music")}

      <audio
        id="rhSong"
        preload="none"
        loop
      >
        ${
          w.music_url
            ? `<source src="${esc(w.music_url)}" type="audio/mpeg">`
            : ""
        }
      </audio>
    </button>


    <!-- =======================================================
         SCREEN 0 — WELCOME
         ======================================================= -->

    <section
      class="rh-screen rh-welcome"
      data-screen="0"
    >

      <div class="rh-arch">

        <div class="rh-arch-glow"></div>

        <div class="rh-crest">
          <span>${initials}</span>
        </div>

        <div class="rh-mini-ornament">
          <i></i><span></span><i></i>
        </div>

        <div class="rh-welcome-script">
          Welcome
        </div>

        <div class="rh-welcome-title">
          TO OUR BEAUTIFUL BEGINNING
        </div>

        <div class="rh-guest">
          Dear <strong>${guestName}</strong>
          ${withFamily ? " & Family" : ""}
        </div>

        <p class="rh-welcome-text">
          With hearts full of joy, we invite you to
          celebrate a beautiful new chapter with us.
        </p>

        <button
          id="openInvitation"
          class="rh-open"
          type="button"
        >
          <span>OPEN INVITATION</span>
          ${icon("arrow")}
        </button>

      </div>

    </section>


    <!-- =======================================================
         SCREEN 1 — ROYAL INVITATION PASS
         ======================================================= -->

    <section
      class="rh-screen rh-card-screen"
      data-screen="1"
    >

      <div class="rh-paper">

        <div class="rh-paper-inner">

          <div class="rh-eyebrow">
            WEDDING INVITATION
          </div>

          <div class="rh-gold-line">
            <span></span>
            ◆
            <span></span>
          </div>

          <div class="rh-save">
            SAVE THE DATE
          </div>

          <div class="rh-date">
            ${dateDisplay}
          </div>

          <div class="rh-time">
            Ceremony • ${timeDisplay}
          </div>

          <div class="rh-couple">

            <div class="rh-script-name">
              ${brideFull}
            </div>

            <div class="rh-weds">
              WEDS
            </div>

            <div class="rh-script-name">
              ${groomFull}
            </div>

          </div>

          <div class="rh-to">

            <span>TO</span>

            <div class="rh-to-line">
              ${guestName}
            </div>

          </div>

          <div class="rh-pass-meta">

            <div>
              <small>GUESTS</small>
              <strong>${persons}</strong>
              <span>PERSONS</span>
            </div>

            <div>
              <small>FAMILY</small>
              <strong>
                ${withFamily ? "✓" : "—"}
              </strong>
              <span>
                ${withFamily ? "INVITED" : "INDIVIDUAL"}
              </span>
            </div>

          </div>

          <div class="rh-host">

            <div>
              ${esc(
                w.host_name ||
                "With the blessings of our families"
              )}
            </div>

            ${
              w.address
                ? `<small>${esc(w.address)}</small>`
                : ""
            }

          </div>

        </div>

      </div>

    </section>


    <!-- =======================================================
         SCREEN 2 — CEREMONY
         ======================================================= -->

    <section
      class="rh-screen rh-card-screen"
      data-screen="2"
    >

      <div class="rh-paper ceremony-card">

        <div class="rh-paper-inner">

          <div class="rh-invocation">

            ${esc(
              w.invocation ||
              "In the name of Allah, the Most Beneficent & Merciful"
            )}

          </div>

          <div class="rh-floral">
            ✦
          </div>

          <p class="rh-solicit">
            ${esc(
              w.host_announcement ||
              "The family solicit your gracious presence at the marriage ceremony of"
            )}
          </p>

          <div class="rh-ceremony-title">
            MARRIAGE CEREMONY
          </div>

          <div class="rh-full-couple">

            <div class="rh-full-name">
              ${brideFull}
            </div>

            ${
              w.bride_parents
                ? `
                  <div class="rh-parents">
                    ${esc(w.bride_parents)}
                  </div>
                `
                : ""
            }

            <div class="rh-weds-large">
              Weds
            </div>

            <div class="rh-full-name">
              ${groomFull}
            </div>

            ${
              w.groom_parents
                ? `
                  <div class="rh-parents">
                    ${esc(w.groom_parents)}
                  </div>
                `
                : ""
            }

          </div>

          <div class="rh-compliments">

            <small>
              WITH BEST COMPLIMENTS FROM
            </small>

            <strong>
              ${esc(
                w.compliments ||
                "The Family & All Loved Ones"
              )}
            </strong>

          </div>

          <div class="rh-rsvp">

            <span>R.S.V.P.</span>

            <strong>
              ${esc(
                w.rsvp_display ||
                "9432168956"
              )}
            </strong>

          </div>

        </div>

      </div>

    </section>


    <!-- =======================================================
         SCREEN 3 — PROGRAMME
         ======================================================= -->

    <section
      class="rh-screen rh-card-screen"
      data-screen="3"
    >

      <div class="rh-paper programme-card">

        <div class="rh-paper-inner">

          <div class="rh-eyebrow">
            THE WEDDING PROGRAMME
          </div>

          <div class="rh-gold-line">
            <span></span>
            ◆
            <span></span>
          </div>

          <div class="rh-programme-intro">
            ${esc(
              w.programme_intro ||
              "Insha Allah, to be solemnised as per the following programme"
            )}
          </div>

          <div class="rh-events">

            ${
              events.length
                ? events
                    .map((event, index) => {

                      const eventDate =
                        event.event_date
                          ? formatDate(
                              new Date(event.event_date)
                            )
                          : "";

                      const eventTime =
                        formatTime(
                          event.event_time
                        );

                      return `

                        <article
                          class="rh-event"
                          style="--delay:${index * 70}ms"
                        >

                          <div class="rh-event-number">
                            ${String(index + 1).padStart(2, "0")}
                          </div>

                          <div class="rh-event-content">

                            <div class="rh-event-name">
                              ${esc(
                                event.event_name ||
                                "Wedding Function"
                              )}
                            </div>

                            <div class="rh-event-meta">

                              ${
                                eventDate
                                  ? `<span>${eventDate}</span>`
                                  : ""
                              }

                              ${
                                eventTime
                                  ? `<span>${eventTime}</span>`
                                  : ""
                              }

                            </div>

                            ${
                              event.note
                                ? `
                                  <div class="rh-event-note">
                                    ${esc(event.note)}
                                  </div>
                                `
                                : ""
                            }

                          </div>

                        </article>

                      `;
                    })
                    .join("")
                : `
                    <div class="rh-no-events">
                      Wedding celebrations to follow
                    </div>
                  `
            }

          </div>

          <div class="rh-venue">

            <div class="rh-venue-label">
              CEREMONY VENUE
            </div>

            <div class="rh-venue-name">
              ${esc(
                w.venue ||
                "Wedding Venue"
              )}
            </div>

            ${
              w.address
                ? `
                  <div class="rh-venue-address">
                    ${esc(w.address)}
                  </div>
                `
                : ""
            }

          </div>

        </div>

      </div>

    </section>


    <!-- =======================================================
         SCREEN 4 — CLOSING + CONCIERGE
         ======================================================= -->

    <section
      class="rh-screen rh-card-screen"
      data-screen="4"
    >

      <div class="rh-paper closing-card">

        <div class="rh-paper-inner">

          <div class="rh-crest small">
            ${initials}
          </div>

          <div class="rh-closing-script">
            With Love
          </div>

          <div class="rh-closing-sub">
            & WARMEST REGARDS
          </div>

          <div class="rh-closing-family">

            ${esc(
              w.closing_signature ||
              w.host_name ||
              "Our Families"
            )}

          </div>


          <!-- SCRATCH CARD -->

          <div class="rh-scratch-wrap">

            <div class="rh-scratch-title">
              A LITTLE SURPRISE FOR YOU
            </div>

            <div class="rh-scratch-card">

              <div class="rh-scratch-message">

                <div class="rh-surprise-symbol">
                  ✦
                </div>

                <strong>
                  A Special Blessing
                </strong>

                <p>
                  May this beautiful beginning
                  be filled with love, happiness,
                  peace & endless blessings.
                </p>

              </div>

              <canvas
                id="scratchCanvas"
              ></canvas>

            </div>

            <div class="rh-scratch-hint">
              ✨ Scratch gently to reveal
            </div>

          </div>


          <!-- CONCIERGE -->

          <div class="rh-concierge">

            <a
              href="${esc(mapUrl)}"
              target="_blank"
              rel="noopener"
              class="rh-action"
            >
              ${icon("location")}
              <span>
                <small>FIND US</small>
                View Venue
              </span>
            </a>

            <a
              href="${calendarUrl}"
              target="_blank"
              rel="noopener"
              class="rh-action"
            >
              ${icon("calendar")}
              <span>
                <small>SAVE THE DATE</small>
                Google Calendar
              </span>
            </a>

            <a
              href="${whatsappUrl}"
              target="_blank"
              rel="noopener"
              class="rh-action"
            >
              ${icon("whatsapp")}
              <span>
                <small>RESPOND</small>
                Confirm RSVP
              </span>
            </a>

          </div>


          <button
            id="shareWedding"
            class="rh-share"
            type="button"
          >
            ${icon("share")}
            SHARE THIS INVITATION
          </button>


          <div class="rh-final-monogram">
            ${initials}
          </div>

          <div class="rh-final-line">
            A beautiful beginning · A lifetime of memories
          </div>

        </div>

      </div>

    </section>


    <!-- =======================================================
         NAVIGATION
         ======================================================= -->

    <div
      class="rh-pagination"
      aria-label="Invitation navigation"
    >

      <button data-go="0" class="active"></button>
      <button data-go="1"></button>
      <button data-go="2"></button>
      <button data-go="3"></button>
      <button data-go="4"></button>

    </div>


    <button
      id="rhNext"
      class="rh-next"
      type="button"
      aria-label="Next"
    >
      ${icon("arrow")}
    </button>


    <div
      id="rhToast"
      class="rh-toast"
    ></div>

  </div>

  ${styles()}

  `;
}


// ============================================================================
// GOOGLE CALENDAR
// ============================================================================

function buildCalendarUrl(
  bride,
  groom,
  date,
  venue,
  address
) {

  const start =
    formatCalendarDate(date);

  const end =
    formatCalendarDate(
      new Date(
        date.getTime() + 3 * 60 * 60 * 1000
      )
    );

  const title =
    encodeURIComponent(
      `Wedding of ${bride} & ${groom}`
    );

  const location =
    encodeURIComponent(
      `${venue || ""}, ${address || ""}`
    );

  const details =
    encodeURIComponent(
      `Wedding celebration of ${bride} & ${groom}`
    );

  return (
    "https://calendar.google.com/calendar/render" +
    `?action=TEMPLATE` +
    `&text=${title}` +
    `&dates=${start}/${end}` +
    `&location=${location}` +
    `&details=${details}`
  );
}


function formatCalendarDate(date) {

  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}


// ============================================================================
// MOUNT
// ============================================================================

export function mount(root) {

  const app =
    root.querySelector(".rh-app");

  if (!app) return;


  // --------------------------------------------------------------------------
  // CAROUSEL
  // --------------------------------------------------------------------------

  const screens =
    [...app.querySelectorAll(".rh-screen")];

  const dots =
    [...app.querySelectorAll(".rh-pagination button")];

  const next =
    app.querySelector("#rhNext");

  let current = 0;


  function goTo(index) {

    index =
      Math.max(
        0,
        Math.min(
          screens.length - 1,
          index
        )
      );

    current = index;

    screens[index].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });

    dots.forEach(
      (dot, i) => {
        dot.classList.toggle(
          "active",
          i === index
        );
      }
    );

    next.style.display =
      index === screens.length - 1
        ? "none"
        : "flex";
  }


  dots.forEach(dot => {

    dot.addEventListener(
      "click",
      () => {

        goTo(
          Number(
            dot.dataset.go
          )
        );

      }
    );

  });


  next.addEventListener(
    "click",
    () => goTo(current + 1)
  );


  // --------------------------------------------------------------------------
  // OPEN INVITATION
  // --------------------------------------------------------------------------

  const open =
    app.querySelector("#openInvitation");

  if (open) {

    open.addEventListener(
      "click",
      () => {

        app.classList.add(
          "rh-opened"
        );

        setTimeout(
          () => goTo(1),
          300
        );

      }
    );

  }


  // --------------------------------------------------------------------------
  // ACTIVE SLIDE OBSERVER
  // --------------------------------------------------------------------------

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting &&
            entry.intersectionRatio > .65
          ) {

            const index =
              Number(
                entry.target.dataset.screen
              );

            current = index;

            dots.forEach(
              (dot, i) =>
                dot.classList.toggle(
                  "active",
                  i === index
                )
            );

            next.style.display =
              index === screens.length - 1
                ? "none"
                : "flex";
          }

        });

      },
      {
        root: app,
        threshold: [.65]
      }
    );


  screens.forEach(
    screen =>
      observer.observe(screen)
  );


  // --------------------------------------------------------------------------
  // AUDIO
  // --------------------------------------------------------------------------

  const audioButton =
    app.querySelector("#rhAudio");

  const audio =
    app.querySelector("#rhSong");

  if (
    audioButton &&
    audio
  ) {

    audioButton.addEventListener(
      "click",
      async () => {

        if (!audio.src) {

          showToast(
            app,
            "No wedding music added"
          );

          return;
        }

        if (audio.paused) {

          try {

            await audio.play();

            audioButton.classList.add(
              "playing"
            );

          } catch {

            showToast(
              app,
              "Tap again to play music"
            );

          }

        } else {

          audio.pause();

          audioButton.classList.remove(
            "playing"
          );

        }

      }
    );

  }


  // --------------------------------------------------------------------------
  // SHARE
  // --------------------------------------------------------------------------

  const share =
    app.querySelector("#shareWedding");

  if (share) {

    share.addEventListener(
      "click",
      async () => {

        const data = {
          title: "Wedding Invitation",
          text: "You are invited to our wedding celebration.",
          url: window.location.href
        };

        try {

          if (navigator.share) {

            await navigator.share(data);

          } else if (navigator.clipboard) {

            await navigator.clipboard.writeText(
              window.location.href
            );

            showToast(
              app,
              "Invitation link copied"
            );

          }

        } catch {
          // user cancelled
        }

      }
    );

  }


  // --------------------------------------------------------------------------
  // SCRATCH CARD
  // --------------------------------------------------------------------------

  initScratchCard(app);


  // --------------------------------------------------------------------------
  // START
  // --------------------------------------------------------------------------

  goTo(0);
}


// ============================================================================
// SCRATCH CARD ENGINE
// ============================================================================

function initScratchCard(app) {

  const canvas =
    app.querySelector("#scratchCanvas");

  if (!canvas) return;

  const card =
    canvas.parentElement;

  const rect =
    card.getBoundingClientRect();

  const dpr =
    Math.min(
      window.devicePixelRatio || 1,
      2
    );

  canvas.width =
    rect.width * dpr;

  canvas.height =
    rect.height * dpr;

  canvas.style.width =
    `${rect.width}px`;

  canvas.style.height =
    `${rect.height}px`;

  const ctx =
    canvas.getContext("2d");

  ctx.scale(dpr, dpr);


  // Gold foil surface

  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      rect.width,
      rect.height
    );

  gradient.addColorStop(
    0,
    "#9d7124"
  );

  gradient.addColorStop(
    .25,
    "#f2d477"
  );

  gradient.addColorStop(
    .5,
    "#b98727"
  );

  gradient.addColorStop(
    .75,
    "#f5dc88"
  );

  gradient.addColorStop(
    1,
    "#8b621b"
  );

  ctx.fillStyle =
    gradient;

  ctx.fillRect(
    0,
    0,
    rect.width,
    rect.height
  );


  // Premium pattern

  ctx.globalAlpha = .25;

  for (
    let x = -rect.height;
    x < rect.width + rect.height;
    x += 18
  ) {

    ctx.beginPath();

    ctx.moveTo(x, 0);

    ctx.lineTo(
      x + rect.height,
      rect.height
    );

    ctx.strokeStyle =
      "#fff2b5";

    ctx.lineWidth = 1;

    ctx.stroke();
  }

  ctx.globalAlpha = 1;


  // Label

  ctx.fillStyle =
    "#fff5cf";

  ctx.font =
    "600 12px Cinzel, serif";

  ctx.textAlign =
    "center";

  ctx.textBaseline =
    "middle";

  ctx.fillText(
    "SCRATCH TO REVEAL",
    rect.width / 2,
    rect.height / 2
  );


  let scratching = false;
  let revealed = false;


  function scratch(event) {

    if (!scratching || revealed) {
      return;
    }

    const bounds =
      canvas.getBoundingClientRect();

    const point =
      event.touches
        ? event.touches[0]
        : event;

    const x =
      point.clientX -
      bounds.left;

    const y =
      point.clientY -
      bounds.top;

    ctx.globalCompositeOperation =
      "destination-out";

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      23,
      0,
      Math.PI * 2
    );

    ctx.fill();


    checkReveal();
  }


  function checkReveal() {

    const pixels =
      ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      ).data;

    let transparent = 0;

    for (
      let i = 3;
      i < pixels.length;
      i += 40
    ) {

      if (
        pixels[i] === 0
      ) {
        transparent++;
      }

    }

    const percentage =
      transparent /
      (pixels.length / 40);

    if (percentage > .48) {

      revealed = true;

      canvas.style.transition =
        "opacity .5s ease";

      canvas.style.opacity =
        "0";

      setTimeout(
        () => {
          canvas.remove();
        },
        550
      );

    }

  }


  canvas.addEventListener(
    "pointerdown",
    event => {

      scratching = true;

      canvas.setPointerCapture(
        event.pointerId
      );

      scratch(event);

    }
  );


  canvas.addEventListener(
    "pointermove",
    scratch
  );


  canvas.addEventListener(
    "pointerup",
    () => {
      scratching = false;
    }
  );

  canvas.addEventListener(
    "pointercancel",
    () => {
      scratching = false;
    }
  );

}


// ============================================================================
// TOAST
// ============================================================================

function showToast(
  app,
  message
) {

  const toast =
    app.querySelector("#rhToast");

  if (!toast) return;

  toast.textContent =
    message;

  toast.classList.add(
    "show"
  );

  clearTimeout(
    toast._timer
  );

  toast._timer =
    setTimeout(
      () => {
        toast.classList.remove(
          "show"
        );
      },
      2400
    );
}


// ============================================================================
// MASTER CSS
// ============================================================================

function styles() {

return `

<style>

:root {

  --wine:
    #590817;

  --wine-dark:
    #260209;

  --wine-light:
    #781126;

  --gold:
    #c99a32;

  --gold-light:
    #f3d681;

  --gold-dark:
    #8a621d;

  --ivory:
    #fbf5e8;

  --paper:
    #fffdf7;

  --ink:
    #47111b;

}


* {
  box-sizing: border-box;
}


.rh-app {

  position: relative;

  width: 100%;
  height: 100dvh;

  overflow: hidden;

  color: var(--ink);

  background:

    radial-gradient(
      circle at 50% 0%,
      #6b1021,
      #28030b 52%,
      #0b0103 100%
    );

  font-family:
    "Cormorant Garamond",
    Georgia,
    serif;

  touch-action:
    pan-x;

  overscroll-behavior:
    none;
}


/* ==============================================================
   SCREENS
   ============================================================== */

.rh-screen {

  position: relative;

  width: 100%;
  height: 100dvh;

  flex:
    0 0 100%;

  overflow-y: auto;
  overflow-x: hidden;

  scroll-snap-align: center;

  scrollbar-width: none;

  display: flex;

  justify-content: center;
  align-items: center;

  padding:
    24px 16px 80px;

  scroll-behavior: smooth;

  overscroll-behavior:
    contain;
}

.rh-screen::-webkit-scrollbar {
  display: none;
}


.rh-app {
  display: flex;

  overflow-x: auto;
  overflow-y: hidden;

  scroll-snap-type:
    x mandatory;
}


/* ==============================================================
   AMBIENT GOLD
   ============================================================== */

.rh-screen::before {

  content: "";

  position: absolute;

  width: 450px;
  height: 450px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(212,175,55,.13),
      transparent 68%
    );

  top:
    -200px;

  left:
    50%;

  transform:
    translateX(-50%);

  pointer-events: none;
}


/* ==============================================================
   WELCOME
   ============================================================== */

.rh-welcome {

  background:

    radial-gradient(
      circle at 50% 25%,
      rgba(212,175,55,.16),
      transparent 28%
    ),

    linear-gradient(
      160deg,
      #5d0a19,
      #26030a 70%,
      #100104
    );
}


.rh-arch {

  width:
    min(430px, 100%);

  min-height:
    720px;

  border-radius:
    230px 230px 30px 30px;

  border:
    1px solid var(--gold);

  position: relative;

  display:
    flex;

  flex-direction:
    column;

  align-items:
    center;

  justify-content:
    center;

  padding:
    65px 28px 40px;

  text-align:
    center;

  background:

    linear-gradient(
      180deg,
      rgba(255,255,255,.045),
      rgba(255,255,255,.01)
    );

  box-shadow:

    inset
    0 0 0 5px rgba(212,175,55,.035),

    inset
    0 0 0 7px rgba(212,175,55,.22),

    0 30px 80px rgba(0,0,0,.45);
}


.rh-arch::before {

  content: "";

  position: absolute;

  inset: 10px;

  border:
    1px solid rgba(212,175,55,.4);

  border-radius:
    220px 220px 22px 22px;

  pointer-events: none;
}


.rh-arch-glow {

  position: absolute;

  width: 260px;
  height: 260px;

  top: -100px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(245,213,130,.2),
      transparent 70%
    );

  filter:
    blur(8px);
}


.rh-crest {

  width: 106px;
  height: 106px;

  border-radius: 50%;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  position: relative;

  color:
    var(--gold-light);

  font-family:
    Cinzel,
    serif;

  font-size: 24px;

  font-weight: 700;

  border:
    1px solid var(--gold);

  box-shadow:

    inset
    0 0 0 6px rgba(255,255,255,.025),

    inset
    0 0 0 7px rgba(212,175,55,.35),

    0 0 35px rgba(212,175,55,.12);
}


.rh-crest::before,
.rh-crest::after {

  content: "";

  position: absolute;

  inset: -10px;

  border-radius: 50%;

  border:
    1px solid rgba(212,175,55,.22);
}


.rh-crest::after {

  inset: -19px;

  border:
    1px dashed rgba(212,175,55,.16);
}


.rh-mini-ornament {

  display:
    flex;

  align-items:
    center;

  gap: 8px;

  margin:
    30px 0 10px;

  color:
    var(--gold);
}


.rh-mini-ornament span {

  width: 60px;

  height: 1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      var(--gold)
    );
}


.rh-mini-ornament span {
  background:
    linear-gradient(
      90deg,
      var(--gold),
      transparent
    );
}


.rh-mini-ornament i {

  width: 6px;
  height: 6px;

  border:
    1px solid var(--gold);

  transform:
    rotate(45deg);
}


.rh-welcome-script {

  font-family:
    "Great Vibes",
    cursive;

  font-size:
    clamp(66px, 18vw, 94px);

  line-height:
    .9;

  color:
    var(--gold-light);

  text-shadow:
    0 5px 25px rgba(0,0,0,.3);
}


.rh-welcome-title {

  margin-top:
    13px;

  font-family:
    Cinzel,
    serif;

  font-size:
    9px;

  letter-spacing:
    3px;

  color:
    #ead69b;
}


.rh-guest {

  margin-top:
    34px;

  color:
    #f4e8cc;

  font-size:
    17px;
}


.rh-guest strong {

  display:
    block;

  margin-top:
    5px;

  color:
    white;

  font-family:
    "Playfair Display",
    serif;

  font-size:
    22px;
}


.rh-welcome-text {

  max-width:
    290px;

  margin:
    14px auto 30px;

  color:
    rgba(255,244,224,.7);

  line-height:
    1.65;

  font-size:
    13px;
}


.rh-open {

  position:
    relative;

  min-width:
    230px;

  min-height:
    54px;

  border-radius:
    40px;

  border:
    1px solid var(--gold-light);

  background:
    linear-gradient(
      135deg,
      #edcf76,
      #a87822
    );

  color:
    #39040d;

  font-family:
    Cinzel,
    serif;

  font-size:
    10px;

  letter-spacing:
    2px;

  font-weight:
    700;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    12px;

  box-shadow:

    0 10px 30px rgba(0,0,0,.3),

    0 0 30px rgba(212,175,55,.18);

  cursor:
    pointer;

  transition:
    transform .2s ease,
    box-shadow .2s ease;
}


.rh-open:active {

  transform:
    scale(.96);
}


.rh-open svg {

  width:
    18px;

  height:
    18px;

  fill:
    none;

  stroke:
    currentColor;

  stroke-width:
    1.5;
}


/* ==============================================================
   PAPER
   ============================================================== */

.rh-card-screen {

  background:
    radial-gradient(
      circle at 50% 0%,
      #fff8e9,
      #eee1ca
    );
}


.rh-paper {

  width:
    min(500px, 100%);

  max-height:
    calc(100dvh - 55px);

  overflow:
    auto;

  scrollbar-width:
    none;

  border:
    1px solid rgba(171,126,35,.75);

  background:
    linear-gradient(
      145deg,
      #fffdf8,
      #f6ead4
    );

  box-shadow:

    0 20px 60px rgba(63,6,19,.22),

    0 0 0 5px rgba(212,175,55,.055);

  position:
    relative;

  border-radius:
    12px;

}


.rh-paper::-webkit-scrollbar {
  display:
    none;
}


.rh-paper::before {

  content: "";

  position:
    absolute;

  inset:
    7px;

  border:
    1px solid rgba(180,137,44,.4);

  pointer-events:
    none;

  border-radius:
    7px;
}


.rh-paper-inner {

  position:
    relative;

  z-index:
    1;

  padding:
    40px 24px 30px;

  text-align:
    center;
}


/* ==============================================================
   TYPOGRAPHY
   ============================================================== */

.rh-eyebrow {

  font-family:
    Cinzel,
    serif;

  font-size:
    10px;

  letter-spacing:
    3.2px;

  font-weight:
    700;

  color:
    var(--gold-dark);
}


.rh-gold-line {

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    9px;

  margin:
    12px auto 20px;

  color:
    var(--gold-dark);

  font-size:
    8px;
}


.rh-gold-line span {

  width:
    65px;

  height:
    1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      var(--gold)
    );
}


.rh-gold-line span:last-child {

  background:
    linear-gradient(
      90deg,
      var(--gold),
      transparent
    );
}


.rh-save {

  font-family:
    Cinzel,
    serif;

  font-size:
    10px;

  letter-spacing:
    4px;

  color:
    #92702a;

  margin-bottom:
    8px;
}


.rh-date {

  font-family:
    "Playfair Display",
    serif;

  font-weight:
    700;

  font-size:
    clamp(27px, 8vw, 38px);

  color:
    #650b20;

  line-height:
    1.1;
}


.rh-time {

  margin-top:
    6px;

  font-family:
    "Playfair Display",
    serif;

  font-size:
    15px;

  color:
    #79525a;

  font-weight:
    600;
}


.rh-couple {

  margin:
    32px auto 28px;
}


.rh-script-name {

  font-family:
    "Great Vibes",
    cursive;

  font-size:
    clamp(49px, 15vw, 72px);

  line-height:
    .95;

  color:
    #710d27;
}


.rh-weds {

  margin:
    14px auto;

  font-family:
    Cinzel,
    serif;

  font-size:
    9px;

  letter-spacing:
    4px;

  color:
    var(--gold-dark);

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    9px;
}


.rh-weds::before,
.rh-weds::after {

  content: "";

  width:
    35px;

  height:
    1px;

  background:
    var(--gold);
}


/* ==============================================================
   TO
   ============================================================== */

.rh-to {

  margin:
    25px auto;

  max-width:
    310px;
}


.rh-to span {

  display:
    block;

  font-family:
    Cinzel,
    serif;

  font-size:
    8px;

  letter-spacing:
    3px;

  color:
    #9b762d;
}


.rh-to-line {

  padding:
    7px 10px 5px;

  border-bottom:
    1px solid #a97e27;

  font-family:
    "Cormorant Garamond",
    serif;

  font-size:
    20px;

  font-style:
    italic;

  color:
    #5c101d;
}


/* ==============================================================
   META
   ============================================================== */

.rh-pass-meta {

  display:
    grid;

  grid-template-columns:
    1fr 1fr;

  gap:
    8px;

  margin:
    24px auto;

  max-width:
    300px;
}


.rh-pass-meta > div {

  padding:
    11px;

  border:
    1px solid rgba(175,132,41,.3);

  background:
    rgba(255,255,255,.45);

  border-radius:
    6px;
}


.rh-pass-meta small {

  display:
    block;

  font-family:
    Cinzel,
    serif;

  font-size:
    7px;

  letter-spacing:
    2px;

  color:
    #a07b30;
}


.rh-pass-meta strong {

  display:
    block;

  font-family:
    "Playfair Display",
    serif;

  font-size:
    20px;

  color:
    #6d0c23;

  margin:
    2px;
}


.rh-pass-meta span {

  font-size:
    7px;

  letter-spacing:
    1px;

  color:
    #87686d;
}


.rh-host {

  margin-top:
    30px;

  padding-top:
    15px;

  border-top:
    1px solid rgba(175,132,41,.25);

  font-family:
    "Cormorant Garamond",
    serif;

  font-size:
    15px;

  font-weight:
    600;

  color:
    #661021;
}


.rh-host small {

  display:
    block;

  margin-top:
    5px;

  color:
    #83666a;

  font-size:
    11px;

  line-height:
    1.4;
}


/* ==============================================================
   CEREMONY
   ============================================================== */

.rh-invocation {

  max-width:
    330px;

  margin:
    0 auto;

  font-family:
    "Cormorant Garamond",
    serif;

  font-size:
    15px;

  font-style:
    italic;

  line-height:
    1.55;

  color:
    #6d3a43;
}


.rh-floral {

  color:
    var(--gold);

  margin:
    14px;
}


.rh-solicit {

  max-width:
    320px;

  margin:
    15px auto;

  font-size:
    13px;

  line-height:
    1.65;

  color:
    #76585d;
}


.rh-ceremony-title {

  font-family:
    Cinzel,
    serif;

  font-size:
    14px;

  letter-spacing:
    3px;

  font-weight:
    700;

  color:
    #700b23;

  margin:
    20px 0;
}


.rh-full-name {

  font-family:
    "Playfair Display",
    serif;

  font-size:
    25px;

  font-weight:
    600;

  color:
    #670b21;
}


.rh-parents {

  max-width:
    280px;

  margin:
    5px auto;

  font-size:
    10px;

  line-height:
    1.5;

  color:
    #83666a;
}


.rh-weds-large {

  font-family:
    "Great Vibes",
    cursive;

  font-size:
    42px;

  color:
    #b08429;

  margin:
    10px;
}


.rh-compliments {

  margin-top:
    25px;

  padding:
    17px;

  border-top:
    1px solid rgba(180,135,38,.25);

  border-bottom:
    1px solid rgba(180,135,38,.25);
}


.rh-compliments small {

  display:
    block;

  font-family:
    Cinzel,
    serif;

  font-size:
    7px;

  letter-spacing:
    2px;

  color:
    #a07c31;
}


.rh-compliments strong {

  display:
    block;

  margin-top:
    6px;

  font-family:
    "Cormorant Garamond",
    serif;

  font-size:
    15px;

  color:
    #680d22;
}


.rh-rsvp {

  margin-top:
    18px;

  display:
    flex;

  justify-content:
    center;

  gap:
    10px;

  font-family:
    Cinzel,
    serif;

  font-size:
    9px;

  letter-spacing:
    1px;

  color:
    #87662a;
}


.rh-rsvp strong {
  color:
    #670b20;
}


/* ==============================================================
   EVENTS
   ============================================================== */

.rh-programme-intro {

  margin:
    15px auto 23px;

  max-width:
    330px;

  font-style:
    italic;

  font-size:
    14px;

  color:
    #75575c;

  line-height:
    1.6;
}


.rh-events {

  text-align:
    left;

  position:
    relative;

  padding-left:
    10px;
}


.rh-events::before {

  content: "";

  position:
    absolute;

  left:
    21px;

  top:
    15px;

  bottom:
    15px;

  width:
    1px;

  background:
    linear-gradient(
      180deg,
      transparent,
      #c99a32 10%,
      #c99a32 90%,
      transparent
    );
}


.rh-event {

  position:
    relative;

  display:
    flex;

  gap:
    13px;

  margin-bottom:
    11px;

  padding:
    11px;

  background:
    rgba(255,255,255,.48);

  border:
    1px solid rgba(178,133,39,.23);

  border-radius:
    7px;

  animation:
    eventIn .5s ease both;

  animation-delay:
    var(--delay);
}


@keyframes eventIn {

  from {
    opacity: 0;
    transform:
      translateX(-8px);
  }

  to {
    opacity: 1;
    transform:
      translateX(0);
  }

}


.rh-event-number {

  width:
    22px;

  height:
    22px;

  min-width:
    22px;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  border-radius:
    50%;

  background:
    #f7e8c9;

  border:
    1px solid #bd8e2b;

  font-family:
    Cinzel,
    serif;

  font-size:
    7px;

  color:
    #805d1e;

  position:
    relative;

  z-index:
    2;
}


.rh-event-name {

  font-family:
    "Playfair Display",
    serif;

  font-weight:
    700;

  font-size:
    15px;

  color:
    #690c21;
}


.rh-event-meta {

  display:
    flex;

  gap:
    10px;

  margin-top:
    3px;

  font-family:
    Cinzel,
    serif;

  font-size:
    7px;

  letter-spacing:
    .7px;

  color:
    #98732a;

  text-transform:
    uppercase;
}


.rh-event-note {

  margin-top:
    3px;

  font-size:
    9px;

  color:
    #82666b;
}


.rh-no-events {

  text-align:
    center;

  color:
    #83656a;

  font-size:
    13px;
}


/* ==============================================================
   VENUE
   ============================================================== */

.rh-venue {

  margin-top:
    25px;

  padding:
    17px;

  border:
    1px solid rgba(180,135,39,.3);

  background:
    rgba(255,255,255,.45);

  border-radius:
    7px;
}


.rh-venue-label {

  font-family:
    Cinzel,
    serif;

  font-size:
    7px;

  letter-spacing:
    2px;

  color:
    #9d7629;
}


.rh-venue-name {

  margin-top:
    5px;

  font-family:
    "Playfair Display",
    serif;

  font-size:
    19px;

  font-weight:
    700;

  color:
    #680c21;
}


.rh-venue-address {

  margin-top:
    5px;

  font-size:
    10px;

  line-height:
    1.5;

  color:
    #7c6065;
}


/* ==============================================================
   CLOSING
   ============================================================== */

.rh-crest.small {

  width:
    76px;

  height:
    76px;

  margin:
    0 auto 18px;

  font-size:
    17px;

  background:
    #5c091b;
}


.rh-closing-script {

  font-family:
    "Great Vibes",
    cursive;

  font-size:
    clamp(55px, 16vw, 75px);

  line-height:
    .9;

  color:
    #720c25;
}


.rh-closing-sub {

  margin-top:
    8px;

  font-family:
    Cinzel,
    serif;

  font-size:
    9px;

  letter-spacing:
    3px;

  color:
    #9a742a;
}


.rh-closing-family {

  margin:
    20px auto;

  font-family:
    "Playfair Display",
    serif;

  font-size:
    18px;

  color:
    #6c1022;
}


/* ==============================================================
   SCRATCH CARD
   ============================================================== */

.rh-scratch-wrap {

  margin:
    25px auto;

  max-width:
    310px;
}


.rh-scratch-title {

  font-family:
    Cinzel,
    serif;

  font-size:
    8px;

  letter-spacing:
    2px;

  color:
    #9a742b;

  margin-bottom:
    8px;
}


.rh-scratch-card {

  position:
    relative;

  width:
    100%;

  min-height:
    145px;

  overflow:
    hidden;

  border-radius:
    10px;

  border:
    1px solid #c2983b;

  background:
    linear-gradient(
      145deg,
      #fffaf0,
      #f1e2c4
    );
}


.rh-scratch-message {

  position:
    absolute;

  inset:
    0;

  display:
    flex;

  flex-direction:
    column;

  justify-content:
    center;

  align-items:
    center;

  padding:
    20px;
}


.rh-surprise-symbol {

  color:
    #b1842a;

  font-size:
    20px;

  margin-bottom:
    3px;
}


.rh-scratch-message strong {

  font-family:
    "Playfair Display",
    serif;

  font-size:
    18px;

  color:
    #6c0b20;
}


.rh-scratch-message p {

  max-width:
    250px;

  margin:
    5px 0 0;

  font-size:
    10px;

  line-height:
    1.5;

  color:
    #80636a;
}


#scratchCanvas {

  position:
    absolute;

  inset:
    0;

  width:
    100%;

  height:
    100%;

  touch-action:
    none;

  cursor:
    crosshair;
}


.rh-scratch-hint {

  margin-top:
    7px;

  font-size:
    9px;

  color:
    #977431;
}


/* ==============================================================
   CONCIERGE
   ============================================================== */

.rh-concierge {

  display:
    grid;

  gap:
    8px;

  margin-top:
    25px;
}


.rh-action {

  min-height:
    54px;

  display:
    flex;

  align-items:
    center;

  gap:
    13px;

  padding:
    8px 14px;

  border-radius:
    28px;

  text-decoration:
    none;

  color:
    #fdf4df;

  background:
    linear-gradient(
      135deg,
      #781027,
      #4d0616
    );

  border:
    1px solid rgba(214,173,67,.7);

  box-shadow:
    0 7px 18px rgba(80,5,25,.13);

  text-align:
    left;
}


.rh-action svg {

  width:
    19px;

  height:
    19px;

  flex:
    0 0 auto;

  fill:
    none;

  stroke:
    currentColor;

  stroke-width:
    1.5;
}


.rh-action span {

  font-family:
    Cinzel,
    serif;

  font-size:
    9px;

  letter-spacing:
    1px;
}


.rh-action small {

  display:
    block;

  margin-bottom:
    2px;

  font-size:
    6px;

  letter-spacing:
    1.5px;

  color:
    #e5c774;
}


.rh-share {

  margin:
    11px auto 0;

  width:
    100%;

  min-height:
    45px;

  border:
    1px solid rgba(117,13,35,.25);

  border-radius:
    24px;

  background:
    rgba(255,255,255,.5);

  color:
    #680c21;

  font-family:
    Cinzel,
    serif;

  font-size:
    8px;

  letter-spacing:
    1.5px;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  gap:
    8px;

  cursor:
    pointer;
}


.rh-share svg {

  width:
    15px;

  height:
    15px;

  fill:
    none;

  stroke:
    currentColor;

  stroke-width:
    1.5;
}


.rh-final-monogram {

  margin:
    25px auto 7px;

  width:
    42px;

  height:
    42px;

  border-radius:
    50%;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  background:
    #5b0819;

  border:
    1px solid #c99a32;

  color:
    #ebcb76;

  font-family:
    Cinzel,
    serif;

  font-size:
    10px;
}


.rh-final-line {

  font-size:
    8px;

  color:
    #9a762e;

  letter-spacing:
    .7px;
}


/* ==============================================================
   AUDIO
   ============================================================== */

.rh-audio {

  position:
    fixed;

  right:
    14px;

  top:
    14px;

  z-index:
    1000;

  width:
    44px;

  height:
    44px;

  border-radius:
    50%;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  border:
    1px solid #d2a53e;

  background:
    rgba(57,4,15,.94);

  color:
    #e9c96f;

  box-shadow:
    0 8px 25px rgba(0,0,0,.3);

  cursor:
    pointer;
}


.rh-audio svg {

  width:
    18px;

  height:
    18px;

  fill:
    none;

  stroke:
    currentColor;

  stroke-width:
    1.5;
}


.rh-audio.playing {

  box-shadow:
    0 0 0 5px rgba(212,175,55,.1),
    0 8px 25px rgba(0,0,0,.3);

  animation:
    musicPulse 1.5s infinite;
}


@keyframes musicPulse {

  50% {
    box-shadow:
      0 0 0 10px rgba(212,175,55,0),
      0 8px 25px rgba(0,0,0,.3);
  }

}


/* ==============================================================
   PAGINATION
   ============================================================== */

.rh-pagination {

  position:
    fixed;

  z-index:
    999;

  bottom:
    18px;

  left:
    50%;

  transform:
    translateX(-50%);

  display:
    flex;

  gap:
    7px;

  padding:
    8px 12px;

  border-radius:
    20px;

  background:
    rgba(39,3,10,.78);

  backdrop-filter:
    blur(10px);

  border:
    1px solid rgba(212,175,55,.25);
}


.rh-pagination button {

  width:
    6px;

  height:
    6px;

  padding:
    0;

  border:
    0;

  border-radius:
    10px;

  background:
    rgba(235,205,119,.35);

  transition:
    width .25s ease,
    background .25s ease;

  cursor:
    pointer;
}


.rh-pagination button.active {

  width:
    22px;

  background:
    #e0bd5d;
}


/* ==============================================================
   NEXT
   ============================================================== */

.rh-next {

  position:
    fixed;

  right:
    15px;

  bottom:
    15px;

  z-index:
    999;

  width:
    43px;

  height:
    43px;

  border-radius:
    50%;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  background:
    #62091c;

  color:
    #efd37f;

  border:
    1px solid #c99a32;

  cursor:
    pointer;
}


.rh-next svg {

  width:
    17px;

  height:
    17px;

  fill:
    none;

  stroke:
    currentColor;

  stroke-width:
    1.5;
}


/* ==============================================================
   TOAST
   ============================================================== */

.rh-toast {

  position:
    fixed;

  left:
    50%;

  bottom:
    75px;

  transform:
    translate(-50%, 15px);

  opacity:
    0;

  pointer-events:
    none;

  z-index:
    2000;

  padding:
    10px 17px;

  border-radius:
    25px;

  background:
    #4e0718;

  color:
    #f3dfaa;

  border:
    1px solid rgba(212,175,55,.55);

  font-family:
    Cinzel,
    serif;

  font-size:
    8px;

  letter-spacing:
    1px;

  transition:
    .25s ease;
}


.rh-toast.show {

  opacity:
    1;

  transform:
    translate(-50%, 0);
}


/* ==============================================================
   DESKTOP
   ============================================================== */

@media (min-width: 768px) {

  .rh-screen {
    padding:
      35px 20px 70px;
  }

  .rh-paper {
    max-width:
      540px;
  }

  .rh-arch {
    min-height:
      760px;
  }

}


/* ==============================================================
   REDUCED MOTION
   ============================================================== */

@media (prefers-reduced-motion: reduce) {

  *,
  *::before,
  *::after {

    animation-duration:
      .01ms !important;

    animation-iteration-count:
      1 !important;

    transition-duration:
      .01ms !important;

  }

}

</style>

`;

}
