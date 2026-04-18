# NYU iLearn Mandatory Online Course Completion Automation Browser Script

This repository contains a small browser-side automation script for a repetitive NYU iLearn mandatory online course flow.

It runs inside the browser page itself, so it does not move your real system cursor and does not take over your mouse the way desktop automation tools do.

The script looks for:

- a `NEXT` button
- an `OK` button that appears shortly after

It clicks `NEXT`, waits 1 second, clicks `OK`, and repeats on a timer.

There may still be a Q&A or other interaction somewhere in the flow where the user has to take over manually, but in practice that should be rare compared with the repetitive button-clicking path.

## Files

- `study_click_loop.js` - browser-console automation script

## How To Use

These instructions were written for Zen Browser, but they also apply to other Chromium- or Firefox-style browsers with DevTools.

1. Open the target NYU iLearn course page.
2. Open DevTools with `F12` or `Ctrl+Shift+I`.
3. Go to the `Console` tab.
4. Copy the contents of `study_click_loop.js`.
5. Paste the script into the console and press Enter.
6. Start the loop by running:

```js
startStudyClickLoop()
```

To stop the loop:

```js
stopStudyClickLoop()
```

## Timing

Default timing:

- `NEXT` click
- wait `1000ms`
- `OK` click
- wait until `10000ms` total have passed for the cycle
- repeat

You can override the timing:

```js
startStudyClickLoop({
  intervalMs: 10000,
  secondClickDelayMs: 1000,
  debug: true,
})
```

## What The Script Does

- Searches for the `NEXT` button by class or visible button text
- Searches for the `OK` button by class or visible button text
- Looks through same-origin iframes too
- Dispatches pointer and mouse click events directly in the page
- Logs what it is doing in the browser console

## Limitations

- If the site changes its HTML classes or button text, selectors may need to be updated
- If the page uses a cross-origin iframe or closed shadow DOM, extra work may be needed
- If a quiz, Q&A, acknowledgement prompt, or non-standard step appears, the user may need to take over manually for that part

## Console Output

Expected log output looks like:

```text
[study-click-loop] loaded
[study-click-loop] run startStudyClickLoop() to begin
[study-click-loop] run stopStudyClickLoop() to stop
[study-click-loop] starting: interval=10000ms, secondClickDelay=1000ms
[study-click-loop] clicked NEXT
[study-click-loop] clicked OK
```
