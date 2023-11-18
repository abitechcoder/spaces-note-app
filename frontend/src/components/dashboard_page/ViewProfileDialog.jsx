import { useContext } from "react";
import { Dialog } from "@headlessui/react";
import { useSelector } from "react-redux";
import { HiOutlineXMark } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { DashboardContext } from "../../context/DashboardContextProvider";
import { useUserProfile } from "../../hooks/dataFetcher";

function ViewProfileDialog({ isOpen, setIsOpen }) {
  const { user } = useSelector((state) => state.auth);
  const { profile } = useUserProfile(user?.userAccount._id);
  const email = user?.userAccount.email;
  const onClose = () => {
    setIsOpen(false);
  };
  const { setCanEditProfile } = useContext(DashboardContext);

  const handleShowEditProfile = () => {
    setCanEditProfile(true);
    setIsOpen(false);
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
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-[#181818] p-4 overflow-y-auto">
          <div className="grid place-items-center gap-4 relative">
            <p className="text-white text-sm">{email}</p>
            <CgProfile className="w-32 h-32 text-white/60" />
            <div className="text-center">
              <p className="text-white text-lg font-inter">
                {!!profile?.firstName
                  ? `Hi, ${profile?.firstName} ${profile?.lastName} !`
                  : `Hi, ${email?.substring(0, email.indexOf("@"))} !`}
              </p>
              {!!profile?.profession && (
                <p className="text-white/60 text-md font-inter">
                  {profile?.profession}
                </p>
              )}
            </div>
            <div className="w-full">
              <p className="text-white text-lg font-inter">Access Token:</p>
              <textarea
                className="w-full bg-[#181818] text-white text-sm"
                disabled
                name=""
                id=""
                rows="4"
                value={user?.accessToken}
              ></textarea>
            </div>
            <button
              className="rounded md:rounded-lg px-4 md:px-8 py-3 md:py-2 text-sm font-dm bg-[#7F6BFF] text-white font-bold"
              onClick={handleShowEditProfile}
            >
              Edit Profile
            </button>
            <HiOutlineXMark
              className="h-7 w-7 text-red-200 absolute top-0 right-3 cursor-pointer"
              onClick={onClose}
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ViewProfileDialog;
