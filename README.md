# NYU iLearn Mandatory Online Course Completion Automation Browser Script

This repository contains a lightweight browser script for automating a repetitive NYU iLearn mandatory online course flow.

The script runs directly inside the browser page. It does not move your real system cursor, does not take over your mouse, and does not require desktop-level automation tools.

At a high level, it:

- finds a `NEXT` button
- clicks it
- waits 1 second
- finds and clicks an `OK` button that appears afterward
- repeats on a timer

In most cases, that is enough to move through the repetitive course flow. There may still be an occasional quiz, Q&A, acknowledgement screen, or other step where the user has to take over manually, but that should be relatively rare.

## File

- `study_click_loop.js` - the browser-console automation script

## How To Run It

These instructions were written for Zen Browser, but the same basic approach works in other browsers with DevTools.

1. Open the target NYU iLearn course page.
2. Open DevTools with `F12` or `Ctrl+Shift+I`.
3. Go to the `Console` tab.
4. Open `study_click_loop.js` and copy its contents.
5. Paste the script into the console and press Enter.
6. Start the automation by running:

```js
startStudyClickLoop()
```

To stop it:

```js
stopStudyClickLoop()
```

## Default Timing

The default loop is:

- click `NEXT`
- wait `1000ms`
- click `OK`
- wait until `10000ms` total have passed in the cycle
- repeat

You can override the timing if needed:

```js
startStudyClickLoop({
  intervalMs: 10000,
  secondClickDelayMs: 1000,
  debug: true,
})
```

## What The Script Handles

- Matches the `NEXT` button by class or visible text
- Matches the `OK` button by class or visible text
- Searches through same-origin iframes
- Dispatches pointer and mouse events directly in the page
- Logs activity in the browser console

## Limitations

- If the site changes its HTML structure, class names, or button text, the selectors may need to be updated
- If the page uses cross-origin iframes or closed shadow DOM, extra handling may be required
- Some steps may still require manual user input

## Example Console Output

```text
[study-click-loop] loaded
[study-click-loop] run startStudyClickLoop() to begin
[study-click-loop] run stopStudyClickLoop() to stop
[study-click-loop] starting: interval=10000ms, secondClickDelay=1000ms
[study-click-loop] clicked NEXT
[study-click-loop] clicked OK
```
