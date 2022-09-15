const assert = require('assert');
const timeDuration = require('../index');

it('Time duration in minutes', ()=> {
    assert.equal(timeDuration('10:10 am', '10:30 am'),20)
});
it('Time duration in minutes', ()=> {
    assert.equal(timeDuration('10:10 am', '11:30 am'),80)
});
it('Time duration in minutes', ()=> {
    assert.equal(timeDuration('10:10 am', '1:30 pm'),200)
});
it('Time duration in minutes', ()=> {
    assert.equal(timeDuration('1:10 pm', '1:30 pm'),20)
});
it('Time duration in minutes', ()=> {
    assert.equal(timeDuration('1:10 pm', '2:30 pm'),80)
});
it('Time duration in minutes', ()=> {
    assert.equal(timeDuration('10:10 am', '9:30 am'),1400)
});
it('Time duration in minutes', ()=> {
    assert.equal(timeDuration('1:10 pm', '9:30 am'),1280)
});
it('Time duration in minutes', ()=> {
    assert.equal(timeDuration('1:10 pm', '1:05 pm'), 1435)
});
