export const koreanDateTime = (currentTime: Date) => {
  const koreanTime = currentTime.toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
  });
  const dateObj = new Date(koreanTime);

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
