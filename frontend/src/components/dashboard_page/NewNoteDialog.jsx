import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { TextInput } from "../auth";
import CustomListbox from "./CustomListbox";
import { useSelector } from "react-redux";
import { useUserCategories } from "../../hooks/dataFetcher";
import { HiOutlineXMark } from "react-icons/hi2";
import { poster } from "../../util/fetcher";
import { mutate } from "swr";
import { toast } from "react-toastify";

function NewNoteDialog({ isOpen, setIsOpen }) {
  const { user } = useSelector((state) => state.auth);
  const { data: categoriesData, isError } = useUserCategories(
    user?.userAccount?._id
  );
  const [isLoading, setIsLoading] = useState(false);
  const [folderSelected, setFolderSelected] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onClose = () => {
    setIsOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = {
      ...data,
      categoryId: folderSelected._id,
      userId: user?.userAccount._id,
    };
    try {
      await poster("/note", formData);
      mutate(`/note/user/${user?.userAccount._id}`);
      toast.success("Note created successfully!");
      setIsLoading(false);
      onClose();
    } catch (error) {
      toast.error("Error occured while creating note");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-white/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-lg bg-[#181818] p-4 overflow-y-auto">
          <form
            className="w-full px-4 relative"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="font-inter text-white text-2xl pb-4 md:pb-4 text-center md:text-left">
              Create New Note
            </h1>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label
                  htmlFor="title"
                  className="font-inter text-white font-bold"
                >
                  Title
                </label>
                <TextInput
                  id="title"
                  type="text"
                  placeholder="Note title"
                  className="bg-[#1c1c1c] text-white"
                  {...register("title", {
                    required: "Note title is required",
                  })}
                  aria-invalid={errors.title ? "true" : "false"}
                />
                {errors.title && (
                  <p role="alert" className="text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="title"
                  className="font-inter text-white font-bold"
                >
                  Folder
                </label>
                {!isError && (
                  <CustomListbox
                    data={categoriesData?.categories}
                    setItemSelected={setFolderSelected}
                  />
                )}
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="title"
                  className="font-inter text-white font-bold"
                >
                  Note
                </label>
                <TextInput
                  type="text"
                  placeholder="Start typing"
                  {...register("description", {
                    required: "Note is required",
                  })}
                  aria-invalid={errors.description ? "true" : "false"}
                  className="bg-[#1c1c1c] text-white"
                />
                {errors.description && (
                  <p role="alert" className="text-red-600">{errors.description.message}</p>
                )}
              </div>
              <div className="grid place-items-center">
                <button
                  className="custom-button font-dm bg-[#7F6BFF] text-white font-bold"
                  type="submit"
                >
                  {isLoading ? "Saving" : "SAVE"}
                </button>
              </div>
            </div>
            <HiOutlineXMark
              className="h-7 w-7 text-red-200 absolute top-0 right-3 cursor-pointer"
              onClick={onClose}
            />
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default NewNoteDialog;
