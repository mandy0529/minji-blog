import { cookies } from "next/headers";

export default function Home() {
  const cookieStore = cookies();
  const cookie = cookieStore.get("accessToken");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      home
    </main>
  );
}
