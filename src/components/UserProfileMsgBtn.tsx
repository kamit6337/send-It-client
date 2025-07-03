import { ROOM, USER, USER_PROFILE } from "@/types";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Checkbox } from "./ui/checkbox";
import { useRef, useState } from "react";
import getGraphql from "@/utils/api/graphql";
import updateUserMsgToggleSchema, {
  updateUserMsgToggleDataQuery,
} from "@/graphql/user/updateUserMsgToggleSchema";
import Toastify from "@/lib/Toastify";
import { Button } from "./ui/button";
import Loading from "@/lib/Loading";
import { useQueryClient } from "@tanstack/react-query";
import createNewRoomSchema, {
  createNewRoomDataQuery,
} from "@/graphql/room/createNewRoomSchema";
import { useNavigate } from "react-router-dom";

type Props = {
  user: USER_PROFILE;
  actualUser: USER;
};

type CheckboxType = "anyone" | "followers" | "followings" | "no_one";

const UserProfileMsgBtn = ({ user, actualUser }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showAlertMessage, showErrorMessage } = Toastify();
  const [checkSelected, setCheckSelected] = useState<CheckboxType>(
    user.messageBy
  );
  const [isPending, setIsPending] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async () => {
    try {
      if (user.messageBy === checkSelected) {
        showAlertMessage({ message: "Update Message response to submit" });
        return;
      }

      setIsPending(true);
      const response = await getGraphql(
        updateUserMsgToggleSchema,
        updateUserMsgToggleDataQuery,
        {
          messageBy: checkSelected.toUpperCase(),
        }
      );

      const checkStatus = queryClient.getQueryState([
        "user profile",
        user.email,
      ]);

      if (checkStatus?.status === "success") {
        queryClient.setQueryData(
          ["user profile", user.email],
          (old: USER_PROFILE) => {
            return { ...old, messageBy: response };
          }
        );
      }

      closeRef.current?.click();
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsPending(false);
    }
  };

  const createNewRoom = async () => {
    try {
      setIsPending(true);

      const response: string = await getGraphql(
        createNewRoomSchema,
        createNewRoomDataQuery,
        {
          userId: user._id,
        }
      );

      console.log("response", response);

      navigate(`/messages/${response}`);
      closeRef.current?.click();
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsPending(false);
    }
  };

  if (actualUser._id !== user._id) {
    return (
      <AlertDialogContent>
        <AlertDialogTitle>Create Chat Message</AlertDialogTitle>
        <div>
          <p>You want to create a Chat message with {user.name}.</p>
          <p>Are you sure ?</p>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel ref={closeRef}>Cancel</AlertDialogCancel>
          <Button disabled={isPending} onClick={() => createNewRoom()}>
            {isPending ? <Loading height={"full"} small={true} /> : "Submit"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    );
  }

  return (
    <AlertDialogContent>
      <AlertDialogTitle>Update Message Response</AlertDialogTitle>

      <div className="text-sm space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={checkSelected === "anyone"}
            onCheckedChange={() => setCheckSelected("anyone")}
          />
          <p>Anyone can message to you</p>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={checkSelected === "followers"}
            onCheckedChange={() => setCheckSelected("followers")}
          />
          <p>Only your followers can message to you</p>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={checkSelected === "followings"}
            onCheckedChange={() => setCheckSelected("followings")}
          />
          <p>Only your following can message to you</p>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={checkSelected === "no_one"}
            onCheckedChange={() => setCheckSelected("no_one")}
          />
          <p>No one can message to you</p>
        </div>
      </div>

      <AlertDialogFooter>
        <AlertDialogCancel ref={closeRef}>Cancel</AlertDialogCancel>
        <Button disabled={isPending} onClick={() => onSubmit()}>
          {isPending ? <Loading height={"full"} small={true} /> : "Submit"}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default UserProfileMsgBtn;
