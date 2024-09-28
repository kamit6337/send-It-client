import ReactIcons from "@/assets/icons";
import { User } from "@/types";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ImageCrop from "./ImageCrop";
import uploadUserProfile from "@/lib/uploadUserProfile";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import { patchReq } from "@/utils/api/api";
import Loading from "@/lib/Loading";
import useUpdateUserProfile from "@/hooks/mutation/User/useUpdateUserProfile";

type Props = {
  handleClose: () => void;
  handleScroll: (value: boolean) => void;
  user: User;
};

type FormData = {
  name: string;
  bio: string;
  location?: string;
  website: string;
};

type SelectedFile = File | null;

const EditProfile = ({ handleClose, user, handleScroll }: Props) => {
  const bg_image_ref = useRef<HTMLInputElement>(null);
  const profile_image_ref = useRef<HTMLInputElement>(null);
  const { showErrorMessage } = Toastify();
  const { photo, name, bg_photo, bio, location, website } = user;

  const [bgImageSelected, setBgImageSelected] = useState<SelectedFile>(null);
  const [profileImageSelected, setProfileImageSelected] =
    useState<SelectedFile>(null);
  const [profileImageCrop, setProfileImageCrop] = useState<SelectedFile>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name,
      bio,
      location,
      website,
    },
  });

  const { mutate, isPending } = useUpdateUserProfile(user);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("profileImageSelected", profileImageSelected);
      console.log("bgImageSelected", bgImageSelected);

      const response = await uploadUserProfile(
        profileImageSelected,
        bgImageSelected
      );

      console.log("response", response);

      const body = {
        ...user,
        name: data.name,
        bio: data.bio,
        location: data.location,
        website: data.website,
        photo: response.photo || user.photo,
        bg_photo: response.bg_photo || user.bg_photo,
      };

      console.log("body", body);

      mutate(body);

      setBgImageSelected(null);
      setProfileImageSelected(null);
      setProfileImageCrop(null);
      handleClose();
    } catch (error) {
      showErrorMessage({
        message: error instanceof Error ? error.message : "",
      });
    }
  };

  const handleOnCrop = (croppedFile: File) => {
    setProfileImageSelected(croppedFile);
    setProfileImageCrop(null);
    handleScroll(false);
    // Reset the file input value
    if (profile_image_ref.current) {
      profile_image_ref.current.value = "";
    }
  };

  const handleCancelCrop = () => {
    setProfileImageCrop(null);
    handleScroll(false);

    // Reset the file input value
    if (profile_image_ref.current) {
      profile_image_ref.current.value = "";
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <div className="sticky top-0 z-20 bg-background py-3 px-5 text-lg font-semibold tracking-wide">
          Edit Profile
        </div>
        <div className="mb-32">
          <div className="h-60 w-full bg-gray-100 relative flex justify-center">
            <img
              src={
                bgImageSelected
                  ? URL.createObjectURL(bgImageSelected)
                  : bg_photo
              }
              className="h-full w-full object-cover brightness-75"
            />

            <div className="absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-5 text-3xl text-white">
              <button
                type="button"
                className="p-3 bg-slate-700 rounded-full"
                onClick={() => bg_image_ref.current?.click()}
              >
                <ReactIcons.media />
                <input
                  ref={bg_image_ref}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setBgImageSelected(file);
                  }}
                  className="hidden"
                />
              </button>
              <button
                type="button"
                className="p-3 bg-slate-700 rounded-full"
                onClick={() => setBgImageSelected(null)}
              >
                <ReactIcons.cancel />
              </button>
            </div>
          </div>
          <div className="w-full relative">
            <div className="absolute z-10 top-1/2 -translate-y-1/2 left-0 w-36 rounded-full p-1 bg-background ml-5">
              <img
                src={
                  profileImageSelected
                    ? URL.createObjectURL(profileImageSelected)
                    : photo
                }
                className="w-full object-cover rounded-full brightness-75"
              />

              <button
                type="button"
                className="absolute z-20 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  text-white p-3 bg-slate-700 rounded-full"
                onClick={() => profile_image_ref.current?.click()}
              >
                <ReactIcons.media />
                <input
                  ref={profile_image_ref}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setProfileImageCrop(file);
                    handleScroll(true);
                  }}
                  className="hidden"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="px-3 space-y-10">
          <div>
            <div className="input_div_profile">
              <input
                {...register("name", { required: "Name is Required" })}
                placeholder="Name"
                className="input_profile"
              />
            </div>
            {errors.name?.message && (
              <p className="input_error">{errors.name.message}</p>
            )}
          </div>

          <div className="input_div_profile">
            <textarea
              {...register("bio")}
              placeholder="Bio (200 characters)"
              className="input_profile resize-none"
              rows={4}
              maxLength={200}
            />
          </div>
          <div className="input_div_profile">
            <input
              {...register("location")}
              placeholder="Location"
              className="input_profile"
            />
          </div>
          <div>
            <div className="input_div_profile">
              <input
                {...register("website", {
                  validate: (value) => {
                    if (!value) return true;

                    try {
                      new URL(value);
                      return true;
                    } catch (_) {
                      return "Please provide a valid url";
                    }
                  },
                })}
                placeholder="Website"
                className="input_profile"
              />
            </div>
            {errors.website?.message && (
              <p className="input_error">{errors.website.message}</p>
            )}
          </div>
        </div>
        <div className="mt-20 sticky bottom-0 border-t border-border z-10 bg-background py-3 px-5 text-lg font-semibold tracking-wide flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="border border-border px-5 py-2 rounded-full text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="bg-foreground text-background px-5 py-2 rounded-full text-sm"
          >
            {isPending ? (
              <Loading hScreen={false} small={true} darkLoader={true} />
            ) : (
              "Save"
            )}
          </button>
        </div>
        {profileImageCrop && (
          <ImageCrop
            image={profileImageCrop}
            onCrop={handleOnCrop}
            cancelCrop={handleCancelCrop}
          />
        )}
      </form>
      <ToastContainer />
    </>
  );
};

export default EditProfile;
