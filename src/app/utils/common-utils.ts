export function TimestampToDate(timestamp : number, onlyDate : Boolean = false): string {
  const now: Date = timestamp ? new Date(timestamp) : new Date();
  const year: number = now.getFullYear();
  let month: string | number = now.getMonth() + 1;
  let day: string | number = now.getDate();
  let hours: string | number = now.getHours();
  let minutes: string | number = now.getMinutes();
  let seconds: string | number = now.getSeconds();

  // Pastikan format bulan, tanggal, jam, menit, dan detik memiliki dua digit
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  let formattedDate: string = `${year}-${month}-${day}`;
  if(!onlyDate) {
    formattedDate += ` ${hours}:${minutes}:${seconds}`
  }
  return formattedDate;
}