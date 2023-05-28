import { toast } from 'react-toastify';

type ToastProps = {
  text: string;
};

type ReturnValue = {
  success: (props: ToastProps) => void;
  error: (e: unknown) => void;
  warning: (props: ToastProps) => void;
  loading: (props: ToastProps) => void;
};

const useToast = (): ReturnValue => {
  const success = (props: ToastProps) => {
    toast.success(props.text);
  };

  const error = (e: unknown) => {
    toast.error((e as { data: { message: string } }).data?.message);
  };

  const warning = (props: ToastProps) => {
    toast.warning(props.text);
  };

  const loading = (props: ToastProps) => {
    toast.loading(props.text);
  };

  return { success, error, warning, loading };
};

export { useToast };
