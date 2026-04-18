(() => {
  const config = {
    intervalMs: 10_000,
    secondClickDelayMs: 1_000,
    debug: true,
  };

  let intervalId = null;
  let timeoutId = null;

  function log(message) {
    if (config.debug) {
      console.log(`[study-click-loop] ${message}`);
    }
  }

  function normalizeText(text) {
    return text.replace(/\s+/g, " ").trim().toUpperCase();
  }

  function allDocuments(rootDocument = document) {
    const docs = [rootDocument];

    for (const frame of rootDocument.querySelectorAll("iframe")) {
      try {
        if (frame.contentDocument) {
          docs.push(...allDocuments(frame.contentDocument));
        }
      } catch (_) {
        // Cross-origin frame. Skip it.
      }
    }

    return docs;
  }

  function isVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function dispatchRealClick(element) {
    for (const type of ["pointerdown", "mousedown", "pointerup", "mouseup", "click"]) {
      element.dispatchEvent(
        new MouseEvent(type, {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );
    }
  }

  function findButton(label, className) {
    const wanted = normalizeText(label);

    for (const doc of allDocuments()) {
      const byClass = doc.querySelector(className);
      if (byClass && isVisible(byClass)) {
        return byClass;
      }

      const candidates = Array.from(
        doc.querySelectorAll("button, [role='button'], input[type='button'], input[type='submit']")
      );

      const byText = candidates.find((element) => normalizeText(element.textContent || element.value || "") === wanted);
      if (byText && isVisible(byText)) {
        return byText;
      }
    }

    return null;
  }

  function nextButton() {
    return findButton("NEXT", ".navigation-controls__button_next");
  }

  function okButton() {
    return findButton("OK", ".message-box-buttons__window-button");
  }

  function clickIfFound(button, name) {
    if (!button) {
      log(`${name} button not found`);
      return false;
    }

    button.scrollIntoView({ block: "center", inline: "center" });
    dispatchRealClick(button);
    log(`clicked ${name}`);
    return true;
  }

  function runCycle() {
    clickIfFound(nextButton(), "NEXT");

    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      clickIfFound(okButton(), "OK");
    }, config.secondClickDelayMs);
  }

  window.startStudyClickLoop = (overrides = {}) => {
    Object.assign(config, overrides);

    window.stopStudyClickLoop();
    log(
      `starting: interval=${config.intervalMs}ms, secondClickDelay=${config.secondClickDelayMs}ms`
    );

    runCycle();
    intervalId = window.setInterval(runCycle, config.intervalMs);
  };

  window.stopStudyClickLoop = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    log("stopped");
  };

  log("loaded");
  log("run startStudyClickLoop() to begin");
  log("run stopStudyClickLoop() to stop");
})();
