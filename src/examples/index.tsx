import { Formik } from 'formik'
import React from 'react'
import { z } from 'zod'
// TODO: Remove this after initial release
// @ts-ignore
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
