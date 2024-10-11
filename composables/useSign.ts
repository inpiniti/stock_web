export const useSign = () => {
  const user = useState<any>("user");

  const loginForKakao = async () => {
    const { data, error } = await useSupabase().auth.signInWithOAuth({
      provider: "kakao",
    });
    if (error) {
      console.error("error", error, "카카오 로그인에 실패하였습니다.");
      //   toast({
      //     title: "카카오 로그인에 실패하였습니다.",
      //     description: `Error: ${error.message}`,
      //     variant: "destructive",
      //   });
    } else {
      user.value = (await useSupabase().auth.getUser()).data.user;
    }
  };

  const logout = async () => {
    const { error } = await useSupabase().auth.signOut();
    if (error) {
      console.error("로그아웃 실패", error);
    } else {
      user.value = null; // 사용자 상태를 null로 설정하여 로그아웃 상태 반영
    }
  };

  return { user, loginForKakao, logout };
};
