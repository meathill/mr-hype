const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export interface TodayInfo {
  dateText: string;
  dateLabel: string;
  time: string;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** 取真实当前日期/时间（客户端调用，避免把固定占位值烧进壁纸） */
export function getToday(): TodayInfo {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return {
    dateText: `${now.getFullYear()}.${pad(month)}.${pad(day)}`,
    dateLabel: `${month}月${day}日 星期${WEEKDAYS[now.getDay()]}`,
    time: `${now.getHours()}:${pad(now.getMinutes())}`,
  };
}
