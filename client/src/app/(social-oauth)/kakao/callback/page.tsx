import { getAccessToken } from "@/utils/get-social-token";

const KakaoRedirectPage = async (props: any) => {
  const result = await getAccessToken(props, "kakao");

  console.log(result, "kakao result");
  return (
    <div>
      {/* //@ts-ignore */}
      {/* <h1>{aaa.user.email}</h1> */}
      <form>
        {/* <input type="text" value={aaa?.result?.user?.email} /> */}
        <input type="text" />
      </form>
    </div>
  );
};

export default KakaoRedirectPage;
