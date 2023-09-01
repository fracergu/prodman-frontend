import { AutoGenerateUsernameDirective } from './auto-generate-username.directive'
import { FormGroup, FormControl } from '@angular/forms'

describe('AutoGenerateUsernameDirective', () => {
  let directive: AutoGenerateUsernameDirective
  let formGroup: FormGroup
  let unsubscribeSpy: jest.SpyInstance

  beforeEach(() => {
    formGroup = new FormGroup({
      name: new FormControl('John'),
      lastName: new FormControl('Doe'),
      username: new FormControl(''),
    })
    directive = new AutoGenerateUsernameDirective()
    directive.form = formGroup

    unsubscribeSpy = jest.spyOn(directive['_unsubscribe$'], 'next')
  })

  afterEach(() => {
    // Limpiamos los espías
    unsubscribeSpy.mockRestore()
  })

  it('should create an instance', () => {
    expect(directive).toBeTruthy()
  })

  describe('ngOnInit', () => {
    it('should auto-generate username when name and lastName change', () => {
      directive.ngOnInit()

      formGroup.patchValue({
        name: 'Jane',
        lastName: 'Smith',
      })

      const username = formGroup.get('username')?.value
      expect(username).toBeTruthy()
      expect(username).toMatch(/^janesmit\d+$/)
    })
  })

  describe('ngOnDestroy', () => {
    it('should call next on _unsubscribe$ subject', () => {
      directive.ngOnDestroy()
      expect(unsubscribeSpy).toHaveBeenCalled()
    })
  })

  describe('generateUsername', () => {
    it('should generate a username based on name and lastName', () => {
      const username = directive.generateUsername('Firstname', 'Lastname')
      expect(username).toMatch(/^firslast\d+$/)
    })
  })
})
