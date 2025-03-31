import { useDataContext } from "@/app/_libs/contexts/providers/ServerContextProvider";
import { Post, ProfileImageSchema } from "@/app/_libs/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { clientApi } from "../axios";
import { fromError } from "../utils";
export default function useUploadProfileImage() {
  const queryClient = useQueryClient();
  const { authProfile, setAuthProfile } = useDataContext();

  const mutation = useMutation({
    mutationFn: upload,
    onSuccess: (resp) => {
      setAuthProfile({
        ...authProfile,
        profileImageUrl: resp.profileImageUrl,
      });
      queryClient.setQueriesData(
        { queryKey: ["posts"], type: "active" },
        (data: any) => {
          // check if query cache is pointing to paginated data
          if ("pages" in data) {
            const newPages = data.pages.map((page: any) => {
              const newPosts = page.data.map((post: Post) => {
                if (post.owner.userUid === authProfile.userUid) {
                  const update: Partial<Post> = {
                    owner: {
                      ...post.owner,
                      profileImageUrl: resp.profileImageUrl,
                    },
                  };
                  return { ...post, ...update };
                }
                return post;
              });
              return { ...page, data: newPosts };
            });
            return { ...data, pages: newPages };
          }
        },
      );

      toast("Profile picture uploaded successfully");
    },
    onError: (e) => {
      const apiError = fromError(e);
      toast(apiError.message);
    },
  });

  return { mutation };
}

const upload = async (profileImageForm: FormData) => {
  const resp = await clientApi.post(
    "account/change-profile-image",
    profileImageForm,
  );
  return ProfileImageSchema.parse(resp.data.payload);
};
