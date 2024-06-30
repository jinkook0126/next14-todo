import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export const useToast = () => {
  return {
    showToast: (message: string, options?: ToastOptions) =>
      toast(message, options),
    errorToast: (message: string, options?: ToastOptions) =>
      toast.error(message, options),
  };
};

export default ToastProvider;
