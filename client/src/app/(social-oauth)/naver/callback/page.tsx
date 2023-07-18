import { getAccessToken } from "@/utils/get-social-token";

const NaverRedirectPage = async (props: any) => {
  const result = await getAccessToken(props, "naver");
  console.log(result, "naver result");
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

export default NaverRedirectPage;
