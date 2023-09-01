import { DecimalNumberDirective } from './decimal-number.directive'
import { NgControl } from '@angular/forms'

describe('DecimalNumberDirective', () => {
  let directive: DecimalNumberDirective
  let mockNgControl: Partial<NgControl>
  let event: KeyboardEvent

  beforeEach(() => {
    mockNgControl = {}
    directive = new DecimalNumberDirective(mockNgControl as NgControl)
  })

  describe("@HostListener('keydown')", () => {
    it('should allow backspace key', () => {
      event = new KeyboardEvent('keydown', { key: 'Backspace' })
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault')

      directive.handleKeydown(event)

      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('should allow delete key', () => {
      event = new KeyboardEvent('keydown', { key: 'Delete' })
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault')

      directive.handleKeydown(event)

      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('should prevent non-decimal characters', () => {
      ;(mockNgControl as any).value = '12.3'
      event = new KeyboardEvent('keydown', { key: 'a' })
      const preventDefaultSpy = jest.spyOn(event, 'preventDefault')

      directive.handleKeydown(event)

      expect(preventDefaultSpy).toHaveBeenCalled()
    })
  })
})
