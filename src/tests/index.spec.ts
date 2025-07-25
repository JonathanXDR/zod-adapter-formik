import * as z from 'zod'
import { toFormikValidate, toFormikValidationSchema } from 'zod-adapter-formik'

describe('toFormikValidationSchema', () => {
  it('should pass validate without errors', async () => {
    const object = { name: 'mock', age: 32 }
    const { schema } = makeSut()
    const { validate } = toFormikValidationSchema(schema)

    const errors = await validate(object)

    expect(errors).toEqual(undefined)
  })

  it('should fail validate with error object', async () => {
    const object = { name: undefined, age: '32' } as any
    const { schema } = makeSut()
    const { validate } = toFormikValidationSchema(schema)

    const error = {} as any
    error.inner = [
      {
        path: 'name',
        message: 'Required',
      },
      {
        path: 'age',
        message: 'Invalid input: expected number, received string',
      },
    ]

    await expect(validate(object)).rejects.toMatchObject(error)
  })
})

describe('toFormikValidate', () => {
  it('should pass validate without errors', async () => {
    const object = { name: 'mock', age: 32 }
    const { schema } = makeSut()
    const validate = toFormikValidate(schema)

    const errors = await validate(object)

    expect(errors).toEqual(undefined)
  })

  it('should fail validate with error object', async () => {
    const object = { name: undefined, age: '32' } as any
    const { schema } = makeSut()
    const validate = toFormikValidate(schema)

    const error = {
      name: 'Required',
      age: 'Invalid input: expected number, received string',
    }

    const errors = await validate(object)

    expect(errors).toMatchObject(error)
  })
})

function makeSut() {
  const schema = z.object({
    name: z.string(),
    age: z.number().optional(),
  })

  return {
    schema,
  }
}
