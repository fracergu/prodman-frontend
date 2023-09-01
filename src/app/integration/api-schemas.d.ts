/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/auth/login": {
    /** Login a user */
    post: operations["login"];
  };
  "/auth/register": {
    /** Register a new user */
    post: operations["register"];
  };
  "/auth/logout": {
    /** Logout a user */
    delete: operations["logout"];
  };
  "/auth/session": {
    /** Endpoint to check if session is active */
    get: operations["session"];
  };
  "/config": {
    /** Get all configurations */
    get: operations["getConfig"];
    /** Update a configuration */
    put: operations["updateConfig"];
  };
  "/users": {
    /** Get users with pagination and search */
    get: operations["getUsers"];
    /** Create a user */
    post: operations["createUser"];
  };
  "/users/{id}": {
    /** Update a user */
    put: operations["updateUser"];
  };
  "/users/{id}/credentials": {
    /** Update user's username or password */
    put: operations["updateUserCredentials"];
  };
  "/products/categories": {
    /** Get all categories */
    get: operations["getCategories"];
    /** Create a category */
    post: operations["createCategory"];
  };
  "/products/categories/{id}": {
    /** Update a category */
    put: operations["updateCategory"];
    /** Delete a category */
    delete: operations["deleteCategory"];
  };
  "/products": {
    /** Get products with pagination and search */
    get: operations["getProducts"];
    /** Create a product */
    post: operations["createProduct"];
  };
  "/products/{id}": {
    /** Update a product */
    put: operations["updateProduct"];
    /** Delete a product */
    delete: operations["deleteProduct"];
  };
  "/tasks": {
    /** Get tasks with optional filters */
    get: operations["getTasks"];
    /** Create a new task */
    post: operations["createTask"];
  };
  "/tasks/{taskId}": {
    /** Update a task by ID */
    put: operations["updateTask"];
    /** Delete a task by ID */
    delete: operations["deleteTask"];
  };
  "/worker/active": {
    /** Get all active workers */
    get: operations["active"];
  };
  "/worker/task": {
    /** Get next task and subtasks */
    get: operations["task"];
  };
  "/worker/completeSubtask": {
    post: operations["completeSubtask"];
  };
  "/production": {
    /** Get all productions */
    get: operations["getProduction"];
  };
  "/production/report": {
    /** Generates a production report */
    get: operations["getProductionReport"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    LoginRequest: {
      /**
       * @description Whether to remember the user or not
       * @example true
       */
      rememberMe?: boolean;
    };
    RegisterRequest: {
      /**
       * @description The user's name
       * @example John
       */
      name?: string;
      /**
       * @description The user's last name
       * @example Doe
       */
      lastName?: string;
      /**
       * @description The user's username
       * @example johndo3
       */
      username?: string;
      /**
       * @description The user's password
       * @example Very$ecureP@ssword
       */
      password?: string;
    };
    ConfigResponse: {
      /**
       * @description Whether registration is enabled or not
       * @example true
       */
      registerEnabled?: boolean;
      /**
       * @description The timeout for the worker to automatically log out
       * @example 60
       */
      workerAutoTimeout?: number;
      /**
       * @description Whether the worker should get the next subtask or the whole list of subtasks
       * @example true
       */
      workerGetNextSubtask?: boolean;
    };
    ConfigRequest: {
      /**
       * @description Whether registration is enabled or not
       * @example true
       */
      registerEnabled?: boolean;
      /**
       * @description The timeout for the worker to automatically log out
       * @example 60
       */
      workerAutoTimeout?: number;
      /**
       * @description Whether the worker should get the next subtask or the whole list of subtasks
       * @example true
       */
      workerGetNextSubtask?: boolean;
    };
    UserResponse: {
      /**
       * @description The user's id
       * @example 1
       */
      id?: number;
      /**
       * @description The user's username
       * @example johndo3
       */
      username?: string;
      /**
       * @description The user's name
       * @example John
       */
      name?: string;
      /**
       * @description The user's last name
       * @example Doe
       */
      lastName?: string;
      /**
       * @description The user's role
       * @example admin
       */
      role?: string;
      /**
       * @description Whether the user is active or not
       * @example true
       */
      active?: boolean;
      /**
       * Format: date-time
       * @description The user's creation date
       * @example 2021-01-01T00:00:00.000Z
       */
      createdAt?: string;
      /**
       * Format: date-time
       * @description The user's update date
       * @example 2021-01-01T00:00:00.000Z
       */
      updatedAt?: string;
    };
    UserCreationRequest: {
      /**
       * @description The user's username
       * @example johndo3
       */
      username?: string;
      /**
       * @description The user's name
       * @example John
       */
      name?: string;
      /**
       * @description The user's last name
       * @example Doe
       */
      lastName?: string;
      /**
       * @description The user's password
       * @example Very$ecureP@ssword
       */
      password?: string;
      /**
       * @description The user's role
       * @example admin
       */
      role?: string;
      /**
       * @description Whether the user is active or not
       * @example true
       */
      active?: boolean;
    };
    UserUpdateRequest: {
      /**
       * @description The user's name
       * @example John
       */
      name?: string;
      /**
       * @description The user's last name
       * @example Doe
       */
      lastName?: string;
      /**
       * @description The user's role
       * @example admin
       */
      role?: string;
      /**
       * @description Whether the user is active or not
       * @example true
       */
      active?: boolean;
    };
    UserCredentialsRequest: {
      /**
       * @description The user's username
       * @example johndo3
       */
      username?: string;
      /**
       * @description The user's password
       * @example Very$ecureP@ssword
       */
      password?: string;
    };
    CategoryResponse: {
      /**
       * @description The category's id
       * @example 1
       */
      id?: number;
      /**
       * @description The category's name
       * @example category 1
       */
      name?: string;
      /**
       * @description The category's description
       * @example category 1 description
       */
      description?: string;
    };
    CategoryRequest: {
      /**
       * @description The category's name
       * @example category 1
       */
      name?: string;
      /**
       * @description The category's description
       * @example category 1 description
       */
      description?: string;
    };
    ProductResponse: {
      /**
       * @description The product's id
       * @example 1
       */
      id?: number;
      /**
       * @description The product's name
       * @example Product 1
       */
      name?: string;
      /**
       * @description The product's description
       * @example Product 1 description
       */
      description?: string;
      /**
       * @description The product's price
       * @example 10.99
       */
      price?: number;
      /**
       * @description The product's reference
       * @example REF-001
       */
      reference?: string;
      /**
       * Format: date-time
       * @description The user's creation date
       * @example 2021-01-01T00:00:00.000Z
       */
      createdAt?: string;
      /**
       * Format: date-time
       * @description The user's update date
       * @example 2021-01-01T00:00:00.000Z
       */
      updatedAt?: string;
      /** @description The product's categories */
      categories?: components["schemas"]["CategoryResponse"][];
      /**
       * @description The product's active status
       * @default true
       * @example true
       */
      active?: boolean;
      /** @description The product's components */
      components?: {
          product?: {
            /**
             * @description The component's product id
             * @example 2
             */
            id?: number;
            /**
             * @description The component's product name
             * @example Product 2
             */
            name?: string;
            /**
             * @description The component's product description
             * @example Product 2 description
             */
            description?: string;
            /**
             * @description The component's product price
             * @example 10.99
             */
            price?: number;
            /**
             * @description The component's product reference
             * @example REF-002
             */
            reference?: string;
            /**
             * Format: date-time
             * @description The user's creation date
             * @example 2021-01-01T00:00:00.000Z
             */
            createdAt?: string;
            /**
             * Format: date-time
             * @description The user's update date
             * @example 2021-01-01T00:00:00.000Z
             */
            updatedAt?: string;
          };
          /**
           * @description The quantity of the component
           * @example 3
           */
          quantity?: number;
        }[];
    };
    ProductRequest: {
      /**
       * @description The product's name
       * @example Product 1
       */
      name?: string;
      /**
       * @description The product's description
       * @example Product 1 description
       */
      description?: string;
      /**
       * Format: float
       * @description The product's price
       * @example 10.99
       */
      price?: number;
      /** @description The product's category ids */
      categories?: number[];
      /**
       * @description The product's reference
       * @example REF-001
       */
      reference?: string;
      /**
       * @description The product's image
       * @example https://example.com/image.png
       */
      image?: string;
      /**
       * @description The product's active status
       * @default true
       * @example true
       */
      active?: boolean;
      /** @description The product's components */
      components?: {
          /**
           * @description The component's product id
           * @example 2
           */
          productId?: number;
          /**
           * @description The quantity of the component
           * @example 3
           */
          quantity?: number;
        }[];
    };
    SubtaskEvent: {
      id?: number;
      /** Format: date-time */
      timestamp?: string;
      quantityCompleted?: number;
    };
    Subtask: {
      id?: number;
      product?: {
        id?: number;
        name?: string;
      };
      quantity?: number;
      /** @enum {string} */
      status?: "pending" | "completed" | "cancelled";
      events?: components["schemas"]["SubtaskEvent"][];
    };
    TaskResponse: {
      /** @example 1 */
      id?: number;
      /** @example 0.5 */
      percentageCompleted?: number;
      user?: {
        /** @example 1 */
        id?: number;
        /** @example John */
        name?: string;
        /** @example Doe */
        lastName?: string;
      };
      /**
       * Format: date-time
       * @example 2021-01-01T00:00:00.000Z
       */
      createdAt?: string;
      /**
       * Format: date-time
       * @example 2021-01-01T00:00:00.000Z
       */
      updatedAt?: string;
      /** @example Some notes */
      notes?: string;
      subtasks?: components["schemas"]["Subtask"][];
    };
    SubtaskCreationRequest: {
      /** @example 1 */
      productId?: number;
      /** @example 1 */
      quantity?: number;
      /**
       * @example pending
       * @enum {string}
       */
      status?: "pending" | "completed" | "cancelled";
    };
    TaskCreationRequest: {
      /** @example Some notes */
      notes?: string;
      /** @example 1 */
      userId?: number;
      /**
       * @example pending
       * @enum {string}
       */
      status?: "pending" | "completed" | "cancelled";
      subtasks?: components["schemas"]["SubtaskCreationRequest"][];
    };
    ActiveWorkersResponse: unknown[];
    CompleteSubtaskRequest: {
      /**
       * @description The quantity of the subtask completed
       * @example 3
       */
      quantityCompleted?: number;
    };
    ProductionResponse: {
      /** @example 1 */
      id?: number;
      /**
       * Format: date-time
       * @example 2023-08-28T13:58:44.563Z
       */
      timestamp?: string;
      /** @example 1 */
      quantityCompleted?: number;
      subtask?: {
        /** @example 5 */
        id?: number;
        /** @example 2 */
        quantity?: number;
        /** @example 0 */
        order?: number;
        /** @example completed */
        status?: string;
        product?: {
          /** @example 43 */
          id?: number;
          /** @example Product 35 */
          name?: string;
        };
        task?: {
          /** @example 1 */
          id?: number;
          /** @example completed */
          status?: string;
          user?: {
            /** @example 5 */
            id?: number;
            /** @example Ana */
            name?: string;
            /** @example Alvarez */
            lastName?: string;
          };
        };
      };
    };
    ProductionReportResponse: {
      generalStats?: {
        /** @description Total units produced. */
        totalProduced?: number;
        /** @description Total number of unique employees. */
        totalEmployees?: number;
        /** @description Average production per employee. */
        avgProductionPerEmployee?: number;
        /** @description List of days where production was higher than the average. */
        highProductionDays?: string[][];
        /** @description Ranking of employees by production quantity. */
        employeeRanking?: string[][];
        employeesList?: {
          [key: string]: {
            name?: string;
            lastName?: string;
          };
        };
        productsList?: {
          [key: string]: {
            name?: string;
            reference?: string;
          };
        };
      };
      /** @description Total production quantities grouped by day. */
      byDay?: {
        [key: string]: number;
      };
      /** @description Total production quantities grouped by employee ID. */
      byEmployee?: {
        [key: string]: number;
      };
      /** @description Total production quantities grouped by product ID. */
      byProduct?: {
        [key: string]: number;
      };
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** Login a user */
  login: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["LoginRequest"];
      };
    };
    responses: {
      /** @description Successful operation */
      200: {
        content: never;
      };
      /** @description Invalid credentials */
      401: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Register a new user */
  register: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["RegisterRequest"];
      };
    };
    responses: {
      /** @description Created */
      201: {
        content: never;
      };
      /** @description Forbidden */
      403: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Logout a user */
  logout: {
    responses: {
      /** @description Successful operation */
      200: {
        content: never;
      };
      /** @description Unauthorized */
      401: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Endpoint to check if session is active */
  session: {
    responses: {
      /** @description Successful operation */
      200: {
        content: never;
      };
      /** @description Login timeout */
      440: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Get all configurations */
  getConfig: {
    responses: {
      /** @description Successful operation */
      200: {
        content: {
          "application/json": components["schemas"]["ConfigResponse"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: never;
      };
      /** @description Forbidden */
      403: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Update a configuration */
  updateConfig: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ConfigRequest"];
      };
    };
    responses: {
      /** @description Successful operation */
      200: {
        content: {
          "application/json": components["schemas"]["ConfigResponse"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: never;
      };
      /** @description Forbidden */
      403: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Get users with pagination and search */
  getUsers: {
    parameters: {
      query?: {
        /** @description Limit number of users returned */
        limit?: number;
        /** @description The current page number for results */
        page?: number;
        /** @description Search term to filter users by name */
        search?: string;
        /** @description Role term to filter users by role */
        role?: string;
        /** @description Inactive term to filter users by active/inactive */
        inactive?: boolean;
      };
    };
    responses: {
      /** @description Successful operation */
      200: {
        content: {
          "application/json": {
            data?: components["schemas"]["UserResponse"][];
            /** @example null */
            nextPage?: number | null;
            /** @example null */
            prevPage?: number | null;
            /** @example 1 */
            total?: number;
          };
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Create a user */
  createUser: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCreationRequest"];
      };
    };
    responses: {
      /** @description User created */
      201: {
        content: {
          "application/json": components["schemas"]["UserResponse"];
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Update a user */
  updateUser: {
    parameters: {
      path: {
        /** @description User ID */
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserUpdateRequest"];
      };
    };
    responses: {
      /** @description User updated */
      200: {
        content: {
          "application/json": components["schemas"]["UserResponse"];
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description User not found */
      404: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Update user's username or password */
  updateUserCredentials: {
    parameters: {
      path: {
        /** @description User ID */
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserCredentialsRequest"];
      };
    };
    responses: {
      /** @description Credentials updated */
      200: {
        content: {
          "application/json": components["schemas"]["UserResponse"];
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description User not found */
      404: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Get all categories */
  getCategories: {
    parameters: {
      query?: {
        /**
         * @description Search term to filter categories by name or description
         * @example category
         */
        search?: string;
      };
    };
    responses: {
      /** @description Successful operation */
      200: {
        content: {
          "application/json": components["schemas"]["CategoryResponse"][];
        };
      };
      /** @description Unauthorized */
      401: {
        content: never;
      };
      /** @description Forbidden */
      403: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Create a category */
  createCategory: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CategoryRequest"];
      };
    };
    responses: {
      /** @description category created */
      201: {
        content: {
          "application/json": components["schemas"]["CategoryResponse"];
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Update a category */
  updateCategory: {
    parameters: {
      path: {
        /** @description category ID */
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CategoryRequest"];
      };
    };
    responses: {
      /** @description category updated */
      200: {
        content: {
          "application/json": components["schemas"]["CategoryResponse"];
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description category not found */
      404: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Delete a category */
  deleteCategory: {
    parameters: {
      path: {
        /** @description category ID */
        id: number;
      };
    };
    responses: {
      /** @description category deleted */
      200: {
        content: never;
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description category not found */
      404: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Get products with pagination and search */
  getProducts: {
    parameters: {
      query?: {
        /** @description Limit number of products returned */
        limit?: number;
        /** @description The current page number for results */
        page?: number;
        /** @description Search term to filter products by name */
        search?: string;
        /** @description category id to filter products by category */
        category?: number;
        /** @description Filter inactive products */
        inactive?: boolean;
      };
    };
    responses: {
      /** @description Successful operation */
      200: {
        content: {
          "application/json": {
            data?: components["schemas"]["ProductResponse"][];
            nextPage?: number | null;
            prevPage?: number | null;
          };
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Create a product */
  createProduct: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["ProductRequest"];
      };
    };
    responses: {
      /** @description Product created */
      201: {
        content: {
          "application/json": components["schemas"]["ProductResponse"];
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Update a product */
  updateProduct: {
    parameters: {
      path: {
        /** @description Product ID */
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ProductRequest"];
      };
    };
    responses: {
      /** @description Product updated */
      200: {
        content: {
          "application/json": components["schemas"]["ProductResponse"];
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description Product not found */
      404: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Delete a product */
  deleteProduct: {
    parameters: {
      path: {
        /** @description Product ID */
        id: number;
      };
    };
    responses: {
      /** @description Product deleted */
      200: {
        content: never;
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description Product not found */
      404: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Get tasks with optional filters */
  getTasks: {
    parameters: {
      query?: {
        limit?: number;
        page?: number;
        userId?: string;
        status?: string;
        startDate?: string;
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        content: {
          "application/json": {
            data?: components["schemas"]["TaskResponse"][];
            /** @example null */
            nextPage?: number | null;
            /** @example null */
            prevPage?: number | null;
            /** @example 1 */
            total?: number;
          };
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Create a new task */
  createTask: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["TaskCreationRequest"];
      };
    };
    responses: {
      /** @description Task created successfully */
      201: {
        content: {
          "application/json": components["schemas"]["TaskResponse"];
        };
      };
      /** @description Invalid request body */
      400: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Update a task by ID */
  updateTask: {
    parameters: {
      path: {
        taskId: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["TaskCreationRequest"];
      };
    };
    responses: {
      /** @description Task updated successfully */
      200: {
        content: {
          "application/json": components["schemas"]["TaskResponse"];
        };
      };
      /** @description Invalid task ID */
      400: {
        content: never;
      };
      /** @description Not found */
      404: {
        content: never;
      };
      /** @description Internal server error' */
      500: {
        content: never;
      };
    };
  };
  /** Delete a task by ID */
  deleteTask: {
    parameters: {
      path: {
        taskId: number;
      };
    };
    responses: {
      /** @description Task deleted successfully */
      204: {
        content: never;
      };
      /** @description Invalid task ID */
      400: {
        content: never;
      };
      /** @description Not found */
      404: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Get all active workers */
  active: {
    responses: {
      /** @description Successful operation */
      200: {
        content: {
          "application/json": components["schemas"]["ActiveWorkersResponse"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: never;
      };
      /** @description Forbidden */
      403: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Get next task and subtasks */
  task: {
    responses: {
      /** @description Successful operation */
      200: {
        content: {
          "application/json": components["schemas"]["TaskResponse"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: never;
      };
      /** @description Forbidden */
      403: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  completeSubtask: {
    parameters: {
      path: {
        /** @description Subtask ID */
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CompleteSubtaskRequest"];
      };
    };
    responses: {
      /** @description Subtask completed */
      200: {
        content: never;
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description Subtask not found */
      404: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Get all productions */
  getProduction: {
    parameters: {
      query?: {
        limit?: number;
        page?: number;
        userId?: number;
        startDate?: string;
        endDate?: string;
        productId?: number;
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        content: {
          "application/json": {
            data?: components["schemas"]["ProductionResponse"][];
            /** @example null */
            nextPage?: number | null;
            /** @example null */
            prevPage?: number | null;
            /** @example 1 */
            total?: number;
          };
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** Generates a production report */
  getProductionReport: {
    parameters: {
      query: {
        userId?: number;
        startDate: string;
        endDate: string;
        productId?: number;
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        content: {
          "application/json": components["schemas"]["ProductionReportResponse"];
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
}
