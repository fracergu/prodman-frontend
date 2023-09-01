import { CustomValidators } from './custom-validators'

describe('GIVEN: CustomValidators', () => {
  describe('WHEN: calling the passwordMatchValidator method', () => {
    it('THEN: should return null if passwords match', () => {
      const result = CustomValidators.PasswordMatch({
        parent: {
          get: jest.fn().mockReturnValue({ value: 'test' }),
        },
        value: 'test',
      } as any)
      expect(result).toBeNull()
    })

    it('THEN: should return an error if passwords do not match', () => {
      const result = CustomValidators.PasswordMatch({
        parent: {
          get: jest.fn().mockReturnValue({ value: 'test' }),
        },
        value: 'test2',
      } as any)
      expect(result).toEqual({ mismatch: true })
    })
  })

  describe('WHEN: calling the noSpacesValidator method', () => {
    it('THEN: should return null if value does not contain spaces', () => {
      const result = CustomValidators.NoSpaces({
        value: 'test',
      } as any)
      expect(result).toBeNull()
    })

    it('THEN: should return an error if value contains spaces', () => {
      const result = CustomValidators.NoSpaces({
        value: 'test test',
      } as any)
      expect(result).toEqual({ spacesNotAllowed: true })
    })
  })
})
