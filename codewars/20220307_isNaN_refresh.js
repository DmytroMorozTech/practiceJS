const log = console.log;

log(`isNaN(true) -> ${isNaN(true)}`); //1 //false
log(`isNaN(false) -> ${isNaN(false)}`); //0 //false
log(`isNaN(null) -> ${isNaN(null)}`); //0 //false
log(`isNaN(undefined) -> ${isNaN(undefined)}`); //NaN    -> true

log(`isNaN(33) -> ${isNaN(33)}`); //false
log(`isNaN(\'33\') -> ${isNaN('33')}`); //false
log(`isNaN(\'\') -> ${isNaN('')}`); //0 false
log(`isNaN(\'         \') -> ${isNaN('         ')}`); //0 false
log(`isNaN(new Date()) -> ${isNaN(new Date())}`); //timestamp  false
log(`isNaN(new Date(\'24 February, 2022\')) -> ${isNaN(new Date('24 February, 2022'))}`); //false
