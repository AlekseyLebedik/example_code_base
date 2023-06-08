import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string()
    .max(100, 'Must be 100 characters or less')
    .required('* Required'),
  type: Yup.string().required('* Required'),
  title: Yup.string().required('* Required'),
  owner: Yup.string()
    .max(50, 'Must be 50 characters or less')
    .required('* Required'),
  hypothesis: Yup.string()
    .max(200, 'Must be 200 characters or less')
    .required('* Required'),
  status: Yup.string().required('* Required'),
  responsibilities: Yup.string().max(2000, 'Must be 2000 characters or less'),
  moreUrl: Yup.string().url('Must enter URL in http://www.example.com format'),
});
