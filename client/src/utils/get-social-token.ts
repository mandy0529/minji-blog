export const getAccessToken = async (props: any, type: string) => {
  try {
    // Google 로그인 콜백 후 받은 인증 코드를 서버로 전송하여 인증 토큰을 요청합니다.
    const response = await fetch(
      `http://localhost:3333/api/v1/auth/${type}/redirect?code=${props.searchParams.code}`
    );
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("인증 토큰 요청 오류:", error);
  }
};
