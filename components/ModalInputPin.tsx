import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
} from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ErrorMessage from "./ErrorMessage";

type ModalInputPinProps = {
  pin: string;
  setPin: Dispatch<SetStateAction<string>>;
  handleCheckPin: (e: FormEvent<HTMLFormElement>) => void;
  closeModal: () => void;
  errorMessage: boolean;
};

const ModalInputPin: FC<ModalInputPinProps> = ({
  pin,
  setPin,
  handleCheckPin,
  closeModal,
  errorMessage,
}) => {
  const handleInputPinChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
      <div className="bg-white w-full max-w-md shadow-lg p-6 rounded-t-2xl">
        <div className="flex justify-end items-center mb-4">
          <button onClick={closeModal} className="text-black">
            &#10005;
          </button>
        </div>

        <form onSubmit={handleCheckPin}>
          {errorMessage && <ErrorMessage message="PIN anda salah" />}
          <h2 className="text-lg font-bold text-center">Masukkan PIN</h2>

          {/* Input PIN */}
          <p className="text-gray-600 mb-4 text-center text-xs my-8">
            Masukkan 6 digit angka PIN anda
          </p>

          <Input
            type="password"
            name="pin"
            value={pin}
            onChange={handleInputPinChange}
            className="mb-4"
          />

          <Button
            type="submit"
            label="KIRIM"
            className="bg-base-accent text-white rounded-full w-full p-2 my-6"
          />
        </form>
      </div>
    </div>
  );
};

export default ModalInputPin;
