export function addHashtags(inputString: string) {
  // 쉼표로 단어들을 분리
  const words = inputString.split(", ");

  // 각 단어 앞에 "#"을 추가하여 새로운 배열 생성
  const hashtags = words.map((word) => `#${word}`);

  return hashtags;
}
