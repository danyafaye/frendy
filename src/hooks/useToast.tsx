import { toast } from 'react-toastify';

type ToastProps = {
  text: string;
};

const useToast = (): {
  success: (props: ToastProps) => void;
  defaultToast: (props: ToastProps) => void;
  warning: (props: ToastProps) => void;
  error: (e: unknown) => void;
  loading: (props: ToastProps) => void;
} => {
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

  const defaultToast = (props: ToastProps) => {
    toast(props.text, { position: 'bottom-right' });
  };

  return { success, error, warning, loading, defaultToast };
};

export { useToast };
