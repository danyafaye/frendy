import { FormikValues, useFormik } from 'formik';

import { useToast } from '@hooks/useToast';

type FormErrorType = {
  data: {
    message: string;
    errors: {
      errors: [
        {
          value: string;
          msg: string;
          param: string;
          location: string;
        },
      ];
    };
  };
};

const handleFormError = <Values extends FormikValues = FormikValues>(
  e: unknown,
  form: ReturnType<typeof useFormik<Values>>,
) => {
  const toast = useToast();
  const errors = (e as FormErrorType).data.errors?.errors;

  if (errors) {
    errors.forEach((it) => {
      form.setFieldError(it.param, it.msg);
    });
  }
  toast.error(e);
};

export { handleFormError };
