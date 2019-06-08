export function setCookie (name, value, days) {
  let expires = ''

  if (days) {
    let date = new Date()

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}
export function getCookie (name) {
  let nameEQ = name + '='
  let ca = document.cookie.split(';')

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]

    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }
  return null
}

export function removeCookie (name) {
  document.cookie = name + '=; Max-Age=-99999999;'
}

export function getParsedDateTime (dateTime) {
  return {
    year: dateTime.getFullYear(),
    month: dateTime.getMonth() + 1,
    day: dateTime.getDate(),
    hours: dateTime.getHours(),
    minutes: dateTime.getMinutes(),
    seconds: dateTime.getSeconds()
  }
}

export function getParsedDate (date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  }
}

export function getParsedTime (time) {
  const timeArr = time.split(':')

  return {
    hours: timeArr[0],
    minutes: timeArr[1],
    seconds: timeArr[2]
  }
}

export function getTimeInMinutes (timeObject) {
  const { hours, minutes, seconds } = timeObject

  return (+hours) * 60 + (+minutes) + (+seconds)
}

export function getTimeInObject (timeInMinutes) {
  return {
    hours: Math.floor(timeInMinutes / 60),
    minutes: timeInMinutes % 60,
    seconds: timeInMinutes % 3600
  }
}

export function getReceptions (startWorkDay, endWorkDay, startDinner, endDinner, receptionDuration) {
  const startWorkDayInMinutes = getTimeInMinutes(startWorkDay)
  const endWorkDayInMinutes = getTimeInMinutes(endWorkDay)
  const startDinnerInMinutes = getTimeInMinutes(startDinner)
  const endDinnerInMinutes = getTimeInMinutes(endDinner)
  let receptions = []

  for (let time = startWorkDayInMinutes; time < endWorkDayInMinutes; time += receptionDuration) {
    if (time >= startDinnerInMinutes && time < endDinnerInMinutes) {
      time = endDinnerInMinutes
    }
    receptions = [...receptions, getTimeInObject(time)]
  }

  return receptions
}
