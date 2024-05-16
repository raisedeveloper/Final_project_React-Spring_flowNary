export function genTime() {
  const timeArray = [];
  for (let hour=0; hour<24; hour++)
    for (let min=0; min<60; min+=30) 
      timeArray.push(`${twoDigit(hour)}:${twoDigit(min)}`);
  return timeArray;
}

export function nearTime() {
  const today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();
  if (min < 30)
    return { startTime: twoDigit(hour) + ':30', endTime: twoDigit((hour+1) % 24) + ':30' };
  else
    return { startTime: twoDigit((hour + 1) % 24) + ':00', endTime: twoDigit((hour + 2) % 24) + ':00' };
}

function twoDigit(num) {
  return num > 9 ? '' + num : '0' + num;
}

export function getToday() {
  const today = new Date();
  return dateFormat(today);   
}

export function getDayInfo(ymd) {
  const someday = ymd ? 
    new Date(ymd.substring(0,4) + '-' + ymd.substring(4,6) + '-' + ymd.substring(6)) :
    new Date();
  const year = someday.getFullYear();
  const month = someday.getMonth() + 1;
  const day = someday.getDate();   // 날짜
  const date = someday.getDay();   // 요일
  return {year, month, day, date};    
}

export function getYearMonth(yearMonth, arrow) {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  if (yearMonth) {
    year = parseInt(yearMonth.substring(0, 4));
    month = parseInt(yearMonth.substring(5));
  }
  switch(arrow) {
    case "left":
      month -= 1;
      if (month === 0) { year -= 1; month = 12; }
      break;
    case "right":
      month += 1;
      if (month === 13) { year += 1; month = 1; }
      break;
    case "left2":
      year -= 1; 
      break;
    case "right2":
      year += 1; 
      break;
    default:
      break;
  }
  // console.log(yearMonth, arrow, year, month);
  return year + '.' + twoDigit(month);
}

export async function getCalendar(yearMonth) {
  const calendar = [];
  const year = parseInt(yearMonth.substring(0, 4));
  const month = parseInt(yearMonth.substring(5));
  const startDay = new Date(year, month-1, 1);
  const startDate = startDay.getDay();
  const lastDay = new Date(year, month, 0);
  const lastDate = lastDay.getDay();
  
  // k는 날짜, i는 요일
  // 첫번째 주
  let week = [];
  if (startDate !== 0) {   // 지난 달이 포함
    const prevSunDay = new Date(year, month-1, 1);
    prevSunDay.setDate(prevSunDay.getDate() - startDate);
    const prevDay  = prevSunDay.getDate();
    const prevMonth = prevSunDay.getMonth();
    const prevYear = prevSunDay.getFullYear();
    for (let i = 0; i < startDate; i++) {
      week.push(prevYear + twoDigit(prevMonth+1) + twoDigit(prevDay + i));
    }
  }
  for (let i = startDate, k = 1; i < 7; i++, k++) {   // 이번 달
    week.push(year + twoDigit(month) + twoDigit(k));
  }
  calendar.push(week);

  // 둘째 주부터 해당월의 마지막 날까지
  for (let k = 8 - startDate, i = 0; k <= lastDay.getDate(); k++, i++) {
    if (i % 7 === 0)
      week = [];
    week.push(year + twoDigit(month) + twoDigit(k));
    if (i % 7 === 6)
      calendar.push(week);
  }

  // 다음 달 1일부터 그주 토요일까지
  if (lastDate !== 6) {
    const nextDay = new Date(year, month-1, lastDay.getDate());
    nextDay.setDate(nextDay.getDate() + 1);
    const nextMonth = nextDay.getMonth() + 1;
    const nextYear = nextDay.getFullYear();
    for (let i = lastDate + 1, k = 1; i < 7; i++, k++) {
      week.push(nextYear + twoDigit(nextMonth) + twoDigit(k));
    }
    calendar.push(week);
  }

  return calendar;
}

function dateFormat(d) {
  return `${d.getFullYear()}${twoDigit(d.getMonth()+1)}${twoDigit(d.getDate())}`;
}
