import React, { useRef } from "react";
import { toast } from "react-toastify";
import { errorToast, successToast, warningToast } from "../../../utils/toast";
import {
  containsOnlyDigits,
  updateDocumentTitle,
} from "../../../utils/helpers";
import { callAxios } from "../../../plugins/axios";
import { useNavigate } from "react-router-dom";

//interfaces
interface IError {
  [key: string]: boolean;
}

interface IResponse {
  status: number;
  message: string;
  data: { message: string };
}

let currentIndex: number = 0;

const VerificationCode = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = React.useState<IError>({});
  const [activeInputField, setActiveInputField] = React.useState<number>(0);
  const [verificationCode, setVerificationCode] = React.useState<string[]>(
    new Array(6).fill("")
  );

  //on-change handler
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    //logic for clipboard copy
    if (value?.trim() && value?.length === verificationCode?.length) {
      const newVerificationCode = [...verificationCode];
      const clipboardDigits = Array.from(String(value), String);
      for (let i = 0; i < verificationCode?.length; i++) {
        newVerificationCode[i] = clipboardDigits[i];
      }
      setVerificationCode(newVerificationCode);
      setActiveInputField(verificationCode?.length - 1);
      return;
    }

    //logic for handling clipboard pasted code that is higher than the designated verificationCode's length
    if (
      value &&
      value?.length > verificationCode?.length &&
      currentIndex === 0
    ) {
      toast("Invalid verification code!", warningToast);
      return;
    }

    //logic for adding/updating entries into the setVerificationCode state
    if (value && value?.substring(value?.length - 1)?.length === 1) {
      setVerificationCode((prevVerificationCode) => {
        const newVerificationCode = [...prevVerificationCode];
        newVerificationCode[currentIndex] = value?.substring(value?.length - 1);
        return newVerificationCode;
      });
      setActiveInputField(
        currentIndex === verificationCode?.length - 1
          ? currentIndex
          : currentIndex + 1
      );
    }

    //logic for removing the existing entries from the setVerificationCode state
    if (!value) {
      setVerificationCode((prevVerificationCode) => {
        const newVerificationCode = [...prevVerificationCode];
        newVerificationCode[currentIndex] = "";

        // for (let i = currentIndex + 1; i < newVerificationCode.length; i++) {
        //   newVerificationCode[i] = "";
        // }

        setActiveInputField(
          currentIndex === 0 ? currentIndex : currentIndex - 1
        );
        return newVerificationCode;
      });
      return;
    }
  };

  //on-key handler
  const onKeyHandler = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentIndex = index;
    if (e?.key === "e" || e?.key === "+" || e?.key === "-" || e?.key === ".") {
      e.preventDefault();
    }
    if (e?.key === "Backspace") {
      setActiveInputField(currentIndex === 0 ? currentIndex : currentIndex - 1);
    }
  };

  //validation
  const validateForm = () => {
    const newErrors: IError = {};
    verificationCode?.map((value, key) => {
      return !containsOnlyDigits(value) ? (newErrors[key] = true) : null;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //on-submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      try {
        const res: IResponse = await callAxios({
          method: "POST",
          url: "verify",
          data: {
            code: verificationCode.join(""),
          },
        });

        if (res?.status === 200) {
          toast(res?.data?.message, successToast);
          navigate("/success");
        } else if (res?.status === 400) {
          toast(res?.data?.message, errorToast);
        } else {
          toast(res?.data?.message ?? res?.message?.toLowerCase(), errorToast);
        }
      } catch (error) {
        toast("Something went wrong!", errorToast);
      }
    } else {
      toast("Invalid code!", errorToast);
    }
  };

  React.useEffect(() => {
    ref?.current?.focus();
  }, [activeInputField]);

  React.useEffect(() => {
    updateDocumentTitle("Email Verify");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 h-screen w-full relative left-[50%] translate-x-[-50%]">
      <div className="flex flex-col items-center justify-start gap-4">
        <div className="text-left font-semibold w-full text-base text-lime-500">
          Enter your OTP :
        </div>
        <div className="flex items-center justify-start gap-4">
          {verificationCode?.map((data: string, key: number) => (
            <React.Fragment key={key}>
              <input
                min={"0"}
                max={"9"}
                // disabled={activeInputField !== key}
                ref={activeInputField === key ? ref : null}
                id={`verification-code-${key}-key`}
                name={`verification-code-${key}-key`}
                type="number"
                className={`font-semibold w-8 md:w-12 lg:w-16 aspect-square border-2 pl-2 md:pl-4 lg:pl-6 outline-8 outline-lime-700 disabled:bg-neutral-800 disabled:border-none disabled:text-white focus:border-none hover:shadow-2xl hover:shadow-white focus:shadow-2xl focus:shadow-white transition ease-in-out disabled:hover:shadow-2xl disabled:hover:shadow-white disabled:hover:cursor-not-allowed ${
                  !!errors[key] && "outline-8 bg-red-500 text-white"
                }`}
                value={verificationCode[key]}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChangeHandler(e)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  onKeyHandler(e, key);
                }}
              />
              {key !== verificationCode?.length - 1 && (
                <span className="text-neutral-200 font-semibold hidden lg:block">
                  -
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
        <form
          className="flex flex-col items-center justify-center gap-4 w-full"
          onSubmit={handleSubmit}
        >
          <button
            type="submit"
            className="text-center bg-lime-700 hover:bg-lime-900 text-white py-2 w-full transition ease-in-out font-semibold hover:shadow-2xl hover:shadow-lime-900 capitalize"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerificationCode;
