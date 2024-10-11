export const useSign = () => {
  const user = useState("user");

  onMounted(async () => {
    user.value = (await useSupabase().auth.getUser()).data.user;
  });

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

  return { user, loginForKakao };
};
