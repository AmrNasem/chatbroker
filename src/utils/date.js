export const day = 1000 * 60 * 60 * 24;

export const getTime = (date) => {
  const [time, amOrPm] = date.split(" ");
  return time.split(":").slice(0, 2).join(":") + " " + amOrPm;
};

export const getDate = (date) => {
  const createdAt = new Date(date);
  const diff = new Date() - createdAt;

  return diff >= 2 * day
    ? createdAt.toLocaleDateString()
    : diff >= day
    ? "Yesterday"
    : getTime(createdAt.toLocaleTimeString());
};
