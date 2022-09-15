function dataParse(str) {
    const st1 = str.split(':');
    const hour = +st1[0];
    const st2 = st1[1].split(' ');
    const min = +st2[0];
    const mer = st2[1];
    return {hour, min, mer};
}

function intervalDuration(interval) {
    const start = dataParse(interval.split('-')[0]);
    const end = dataParse(interval.split('-')[1]);

    const startCombined = +`${start.hour}${start.min}`;
    const endCombined = +`${end.hour}${end.min}`;

//start and finish on morning of the same day
//start and finish on evening of the same day
    if (start.mer === end.mer && startCombined < endCombined) {
        const sMin = start.hour * 60 + start.min;
        const eMin = end.hour * 60 + end.min;
        return eMin - sMin
    }

// start on the morning and finish in the evening of the same day
    else if (start.mer === 'am' && end.mer === 'pm') {
        const sMin = start.hour * 60 + start.min;
        const eMin = (end.hour + 12) * 60 + end.min;
        return eMin - sMin;
    }
// start on the morning in one day and finish on the next morning
    else if (start.mer === 'am' && end.mer === 'am') {
        const sMin = start.hour * 60 + start.min;
        const eMin = (end.hour + 24) * 60 + end.min;
        return eMin - sMin;
    }
// start in the evening one day and finish next morning
    else if (start.mer === 'pm' && end.mer === 'am' && startCombined < endCombined) {
        const sMin = (start.hour + 12) * 60 + start.min;
        const eMin = (end.hour + 25) * 60 + end.min;
        return eMin - sMin;
    }
//start in the evening one day and finish next evening
    else if (start.mer === end.mer) {
        const sMin = start.hour * 60 + start.min;
        const eMin = (end.hour + 24) * 60 + end.min;
        return eMin - sMin;
    }

}

// console.log(timeDuration('10:10 am', '10:30 am')); // 20
// console.log(timeDuration('10:10 am', '11:30 am')); // 80
// console.log(timeDuration('10:10 am', '1:30 pm')); // 200
//
// console.log(timeDuration('1:10 pm', '1:30 pm')); // 20
// console.log(timeDuration('1:10 pm', '2:30 pm')); // 80
//
// console.log(timeDuration('10:10 am', '9:30 am')); // 1400
//
// console.log(timeDuration('1:10 pm', '10:30 am')); //1280
//
// console.log(timeDuration('1:10 pm', '1:05 pm')); //1435


module.exports = {intervalDuration};
