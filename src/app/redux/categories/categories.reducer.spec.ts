import { CategoriesActions } from './categories.actions'
import { categoriesReducer } from './categories.reducer'
import { CategoriesState, initialCategoryState } from './categories.state'

describe('GIVEN: CategoriesReducer', () => {
  let someInitialState: CategoriesState

  beforeEach(() => {
    someInitialState = {
      ...initialCategoryState,
    }
  })

  it('should return loading state after loadCategories action', () => {
    const newState = categoriesReducer(
      someInitialState,
      CategoriesActions.loadCategories({ params: {} }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should return loaded state and updated entities after loadCategoriesSuccess action', () => {
    const categories = [
      { id: 1, name: 'Category1', description: 'Description1' },
      { id: 2, name: 'Category2', description: 'Description2' },
    ]
    const newState = categoriesReducer(
      someInitialState,
      CategoriesActions.loadCategoriesSuccess({ payload: categories }),
    )

    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
    expect(Object.keys(newState.entities).length).toBe(2)
  })

  it('should return error state after loadCategoriesFailure action', () => {
    const newState = categoriesReducer(
      someInitialState,
      CategoriesActions.loadCategoriesFailure({ error: 'Error' }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toBe('Error')
  })

  it('should return loading state after createCategory action', () => {
    const newState = categoriesReducer(
      someInitialState,
      CategoriesActions.createCategory({ payload: {} }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should add a new category after createCategorySuccess action', () => {
    const category = { id: 3, name: 'Category3', description: 'Description3' }
    const newState = categoriesReducer(
      someInitialState,
      CategoriesActions.createCategorySuccess({ payload: category }),
    )

    expect(newState.entities['3']).toEqual(category)
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after createCategoryFailure action', () => {
    const newState = categoriesReducer(
      someInitialState,
      CategoriesActions.createCategoryFailure({ error: 'Error' }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toBe('Error')
  })

  it('should return loading state after updateCategory action', () => {
    const newState = categoriesReducer(
      someInitialState,
      CategoriesActions.updateCategory({ payload: {} }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should update a category after updateCategorySuccess action', () => {
    const initialEntities = {
      '1': { id: 1, name: 'Category1', description: 'Description1' },
    }
    someInitialState = { ...someInitialState, entities: initialEntities }

    const updatedCategory = { id: 1, name: 'UpdatedCategory', description: '' }
    const newState = categoriesReducer(
      someInitialState,
      CategoriesActions.updateCategorySuccess({ payload: updatedCategory }),
    )

    expect(newState.entities['1']).toEqual(updatedCategory)
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after updateCategoryFailure action', () => {
    const newState = categoriesReducer(
      someInitialState,
      CategoriesActions.updateCategoryFailure({ error: 'Error' }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toBe('Error')
  })

  it('should return loading state after deleteCategory action', () => {
    const newState = categoriesReducer(
      someInitialState,
      CategoriesActions.deleteCategory({ id: 1 }),
    )
    expect(newState.loading).toBe(true)
  })

  it('should remove a category after deleteCategorySuccess action', () => {
    const initialEntities = {
      '1': { id: 1, name: 'Category1', description: 'Description1' },
      '2': { id: 2, name: 'Category2', description: 'Description2' },
    }
    someInitialState = { ...someInitialState, entities: initialEntities }

    const newState = categoriesReducer(
      someInitialState,
      CategoriesActions.deleteCategorySuccess({ id: 2 }),
    )

    expect(newState.entities['2']).toBeUndefined()
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(true)
  })

  it('should return error state after deleteCategoryFailure action', () => {
    const newState = categoriesReducer(
      someInitialState,
      CategoriesActions.deleteCategoryFailure({ error: 'Error' }),
    )
    expect(newState.loading).toBe(false)
    expect(newState.loaded).toBe(false)
    expect(newState.error).toBe('Error')
  })
})
