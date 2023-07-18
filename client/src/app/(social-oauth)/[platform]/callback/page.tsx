import SocialLogin from "@/components/SocialLogin";
import { getAccessToken } from "@/utils/get-social-token";

async function RedirectPage(props: any) {
  const {
    params: { platform },
    searchParams: { code },
  } = props;

  // google callback page에서 getAccessToken()를 호출 => 로그인한 유저 token get
  const result = await getAccessToken(code, platform);

  return (
    <div>
      {/* props socialLogin에 넘겨주기 */}
      <SocialLogin
        refresh_token={result.refresh_token}
        access_token={result.access_token}
      />
    </div>
  );
}

export default RedirectPage;
