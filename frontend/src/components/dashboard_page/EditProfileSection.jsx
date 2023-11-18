import React, { useEffect, useState, useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { TextInput } from "../auth";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUserProfile } from "../../hooks/dataFetcher";
import { puter } from "../../util/fetcher";
import { toast } from "react-toastify";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { Axios } from "../../Axios";

function EditProfileSection() {
  const { user } = useSelector((state) => state.auth);
  const { profile } = useUserProfile(user?.userAccount._id);
  const [firstname, setFirstname] = useState(profile?.firstName);
  const [lastname, setLastname] = useState(profile?.lastName);
  const [profession, setProfession] = useState(profile?.profession);
  const [isLoading, setIsLoading] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const { setCanEditProfile } = useContext(DashboardContext);
  const [imageUrl, setImageUrl] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      firstName: firstname,
      lastName: lastname,
      profession: profession,
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await puter(`/user/profile/${user?.userAccount._id}`, data);
      toast.success("Profile updated successfully!!!");
      setIsLoading(false);
      setCanEditProfile(false);
    } catch (error) {
      toast.error("Error occured while updating user profile");
      setIsLoading(false);
    }
    // setValue("firstName", "Abiola");
  };

  const handleClose = () => {
    setCanEditProfile(false);
  };

  const handleImageSelect = (e) => {
    if (!e.target.files[0]) {
      console.log("Image not selected");
      return;
    }
    // console.log("Selected Files:", e.target.files[0]);
    setImageSelected(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleImageUpload = () => {
    if (!imageSelected) {
      alert("No Image Selected, please select an image.");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    Axios.put(`/user/uploadimage/${user?.userAccount._id}`, formData)
      .then((res) => {
        console.log("Uploading Image:", res);
      })
      .catch((error) =>
        console.log("Error occured while uploading image:", error)
      );
  };

  return (
    <div className="grid h-full w-full place-items-center">
      <div className="w-[80%] lg:w-[460px] grid gap-3 place-items-center">
        <div className="flex items-center gap-3">
          <div>
            <label htmlFor="image">
              {!!imageUrl ? (
                <img className="w-32 h-32 rounded-full" src={imageUrl} />
              ) : (
                <CgProfile className="w-32 h-32 text-white/60 hover:cursor-pointer hover:opacity-50" />
              )}
            </label>
            <input
              id="image"
              type="file"
              className="hidden"
              onChange={handleImageSelect}
            />
          </div>
          <div className="grid gap-2">
            <p className="text-white">{imageSelected?.name}</p>
            <button
              className="custom-button font-dm bg-[#7F6BFF] text-white hover:bg-[#7F6BFF]/70"
              onClick={handleImageUpload}
            >
              Upload
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[300px] grid gap-4">
            <div className="grid gap-2">
              <label
                htmlFor="title"
                className="font-inter text-sm text-white font-bold"
              >
                First Name
              </label>
              <TextInput
                id="title"
                type="text"
                placeholder="First Name"
                className="bg-[#1c1c1c] text-white text-sm"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be more than 2 characters",
                  },
                })}
              />
              {errors.firstName && (
                <p role="alert" className="text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="title"
                className="font-inter text-sm text-white font-bold"
              >
                Last Name
              </label>
              <TextInput
                id="title"
                type="text"
                placeholder="Last Name"
                className="bg-[#1c1c1c] text-white text-sm"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be more than 2 characters",
                  },
                })}
              />
              {errors.lastName && (
                <p role="alert" className="text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="title"
                className="font-inter text-sm text-white font-bold"
              >
                Profession
              </label>
              <TextInput
                id="title"
                type="text"
                placeholder="Profession"
                className="bg-[#1c1c1c] text-white text-sm"
                {...register("profession", {
                  required: "Profession is required",
                  minLength: {
                    value: 2,
                    message: "Profession must be more than 2 characters",
                  },
                })}
              />
              {errors.profession && (
                <p role="alert" className="text-red-500">
                  {errors.profession.message}
                </p>
              )}
            </div>
            <div className="flex justify-between mt-2">
              <button
                className="custom-button font-dm bg-red-500 text-white hover:bg-red-500/70"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="custom-button font-dm bg-[#7F6BFF] text-white hover:bg-[#7F6BFF]/70"
                type="submit"
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileSection;
