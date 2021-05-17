let speedOfDevWork = [15,8,12,22,5,43,50]; // This array represents the speed of work of different team members.
// number of employees is equal to the number of elements in the given array - 7.
// each figure in this array represents the efficiency of each employee: how many storypoints one can fulfill in 1 day.

let backLog = [33,22,15,90,49,88,277,312,41];
// backlog - ​a quantity of work that should have been done already, but has not been done yet.

// let speedOfDevWork = [8];
// let backLog = [8];

// --------------------------------------------
let deadlineString = prompt("Please enter the DEADLINE in format dd.mm.yyyy:", "dd.mm.yyyy");

function validDeadline (deadlineString) {
    const validDateString = deadlineString
        .split('.')
        .reverse()
        .join('-');
    return validDateString;
};

const deadlineDate = new Date(validDeadline(deadlineString));
const currentDate = new Date();
console.log(`Current Date:  ` + currentDate);
console.log(`Deadline Date:  ` + deadlineDate);
// --------------------------------------------

    let sPointsProcessedDaily = speedOfDevWork.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // Объем работы в единицах измерения "story points", который может выполнить команда из разработчиков за 1 рабочий день.
    console.log(`               sPointsProcessedDaily:  ` + sPointsProcessedDaily);

    let sPointsProcessedHourly = sPointsProcessedDaily/8;
    console.log(`               sPointsProcessedHourly:  ` + sPointsProcessedHourly.toFixed(2));

    let totalBackLog = backLog.reduce((accumulator, currentValue) => accumulator +currentValue, 0);
    // Общий объем работы в единицах измерения "story points", который нужно выполнить разработчикам.
    console.log(`Total amount of work in Story Points(totalBackLog):  ` +totalBackLog);

    let numOfDaysTillDeadline = (deadlineDate - currentDate)/(60*1000*60*24);
    console.log(`Number of days till deadline (numOfDaysTillDeadline):  ` + numOfDaysTillDeadline.toFixed(2));

// --------------------------------------------
function addToThePage (content) {
    let resultingParagraph = document.createElement("p");
    document.body.appendChild(resultingParagraph);
    resultingParagraph.innerHTML = content;
}

function ActualCompletionDate() {
    let temporaryDate = currentDate;
    let totalBackLogRemaining = totalBackLog;
    let dateInclDeadline = Math.ceil(numOfDaysTillDeadline)+1;
    console.log(`Number of days till deadline including the deadline day:` + dateInclDeadline );
    // Предполагается, что работа должна быть сдана до дня дедлайна включительно!
    for (i=1; i<=dateInclDeadline; i++) {
        if (temporaryDate.getDay()!== 0 && temporaryDate.getDay()!== 6) {
            totalBackLogRemaining -= sPointsProcessedDaily;
                if (totalBackLogRemaining<=0) {
                    let aheadOfDeadline = Math.round((deadlineDate - temporaryDate)/(60*1000*60*24));
                    if (aheadOfDeadline<0) {aheadOfDeadline=0};
                        if (aheadOfDeadline===0 && deadlineDate.getDate()===temporaryDate.getDate()) {
                            let content =`Задача будет выполнена в день дедлайна! До конца рабочего дня... :)`;
                            return addToThePage(content);
                        };
                        if (aheadOfDeadline===0 && deadlineDate.getDate()===(temporaryDate.getDate()+1)) {
                            let content =`Задача будет выполнена вечером в предверии дня дедлайна. `;
                            return addToThePage(content);
                        };

                        let content =`На выполнение всех задач уйдёт <strong>${i}</strong> календарных дней с текущего момента.
Все задачи будут успешно выполнены за <strong>${aheadOfDeadline}</strong> календарных дней до наступления дедлайна!`;
                    return addToThePage(content);
                };
        };
        temporaryDate.setDate(temporaryDate.getDate() + 1); // в конце цикла for добавляем к нашей дате +1 день.
    };

    if (totalBackLogRemaining>0) {
        console.log(`totalBackLogRemaining (in StoryPoints): ` + totalBackLogRemaining);
        console.log(`sPointsProcessedHourly                : ` + sPointsProcessedHourly);

        let content = `Команде разработчиков придется потратить дополнительно <strong>${(totalBackLogRemaining/sPointsProcessedHourly).toFixed(2)}</strong> рабочих часов (или около ${Math.round(totalBackLogRemaining/sPointsProcessedHourly/8)} рабочих дней) после дедлайна, чтобы выполнить все задачи в беклоге.`;
        addToThePage(content);
    };
}

ActualCompletionDate(); // Выполняем нашу основную функцию.
