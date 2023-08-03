import { Dispatch, SetStateAction, useState } from "react";
import { useContact } from "../../../api/hooks/useContact";
import { Button } from "../../Atoms";
import { Loader } from "../../Atoms/Loader";
import { StandardModal } from "../../Compounds/Modals/StandardModal";
import { ContactInput, ContactTextArea } from "./ContactInput";

interface ContactModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setShowSnackbar: Dispatch<SetStateAction<boolean>>;
}

export function ContactModal({ show, setShow, setShowSnackbar }: ContactModalProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const { loading, error, sendMessage } = useContact();

  const handleSubmit = async () => {
    await sendMessage(name, email, subject, message);
    setShowSnackbar(true);
    setShow(false);
  };

  return (
    <StandardModal
      show={show}
      setShow={setShow}
      root="modal2"
      className="flex flex-col gap-4 w-[85%] md:w-auto p-6">
      <span className="text-xl">Let's get in touch!</span>
      <form className="flex flex-col items-center gap-4">
        <ContactInput
          placeholder="Name"
          value={name}
          setValue={setName}
        />
        <ContactInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />
        <ContactInput
          placeholder="Subject"
          value={subject}
          setValue={setSubject}
        />
        <ContactTextArea
          placeholder="Message"
          value={message}
          setValue={setMessage}
        />
        {loading ? (
          <Loader width="w-12" />
        ) : (
          <Button
            className="p-2 rounded-lg"
            label="Submit"
            onClick={async () => await handleSubmit()}
          />
        )}
      </form>
    </StandardModal>
  );
}
