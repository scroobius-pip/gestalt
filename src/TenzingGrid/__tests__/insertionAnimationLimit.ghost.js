/* global describe */
/* global it */
import assert from 'assert';
import ghost from 'ghostjs';

const selectors = {
  gridItem: '[data-grid-item]',
  afterGrid: '.afterGrid',
  insertItem: '#insert-item',
};

const getAnimationCount = async () => await ghost.script(() => window.TEST_ANIMATION_COUNT);

describe('TenzingGrid > Limited inserted item animation', () => {
  it('Can insert items into the grid', async () => {
    ghost.close();
    await ghost.open('http://localhost:3000/TenzingGrid');

    await ghost.script(() => {
      window.TEST_ANIMATION_COUNT = 0;
      window.addEventListener('animationend', () => {
        window.TEST_ANIMATION_COUNT += 1;
      });
    });

    const animCount = await getAnimationCount();
    assert.equal(animCount, 0);

    const insertTrigger = await ghost.findElement(selectors.insertItem);
    await insertTrigger.click();

    await ghost.wait(async () => (animCount + 1) === await getAnimationCount());

    // Scrol to bottom a few times to trigger virtualization.
    for (let i = 0; i < 5; i += 1) {
      await ghost.script(() => window.scrollTo(0, window.scrollMaxY));
      await ghost.wait(25);
    }

    // After scrolling to the top, we should not trigger additional animations.
    await ghost.script(() => window.scrollTo(0, 0));
    // The wait needs to be greater than tenzing grid animation time.
    await ghost.wait(500);
    assert.equal(animCount + 1, await getAnimationCount());
  });
});
