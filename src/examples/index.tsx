import { Formik } from 'formik'
// use "zod/v3" if you are using zod v3
import * as z from 'zod'
// use "zod-formik-adapter/v3" if you are using zod v3
import { toFormikValidationSchema } from 'zod-adapter-formik'

const Schema = z.object({
  name: z.string(),
  age: z.number(),
})

const initialValues = {
  name: '',
  age: 1,
}

export const SampleForm = () => (
  <Formik
    initialValues={initialValues}
    validationSchema={toFormikValidationSchema(Schema)}
    onSubmit={console.log}
  >
    {({ errors, values, handleChange }) => (
      <form>
        <input value={values.name} onChange={handleChange('name')} />
        <span>{errors.name}</span>

        <input value={values.age} onChange={handleChange('age')} />
        <span>{errors.age}</span>
      </form>
    )}
  </Formik>
)
