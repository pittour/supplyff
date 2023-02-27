import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios"; Vue
import Vue from 'vue';

declare module 'axios' {
    export interface AxiosRequestConfig {
        raw?: boolean
        silent?: boolean
    }
}

interface HttpData {
    code: string
    description?: string
    status?: number
}

type THttpError = Error | AxiosError | null

export class HttpError extends Error {
    constructor(message?: string) {
        super(message) // 'Error' breaks prototype chain here
        this.name = 'HttpError'
        Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    }
}


function responseHandler(response: AxiosResponse<any>) {
    const config = response?.config
    if (config.raw) {
        return response
    }
    if (response.status == 200 || response.status == 201 || response.status == 202 || response.status == 203) {
        const data = response?.data
        if (!data) {
            throw new HttpError('API Error. No data!')
        }
        return data
    }
    throw new HttpError('API Error! Invalid status code!')
}



interface ErrorHandlerObject {
    after?(error?: THttpError, options?: ErrorHandlerObject): void
    before?(error?: THttpError, options?: ErrorHandlerObject): void
    message?: string
}

type ErrorHandlerFunction = (error?: THttpError) => ErrorHandlerObject | boolean | undefined
type ErrorHandler = ErrorHandlerFunction | ErrorHandlerObject | string

interface ErrorHandlerMany {
    [key: string]: ErrorHandler
}

function isErrorHandlerObject(value: any): value is ErrorHandlerObject {
    if (typeof value === 'object') {
        return ['message', 'after', 'before'].some((k) => k in value)
    }
    return false
}

class ErrorHandlerRegistry {
    private handlers = new Map<string, ErrorHandler>()
    private parent: ErrorHandlerRegistry | null = null

    constructor(parent?: ErrorHandlerRegistry, input?: ErrorHandlerMany) {
        if (typeof parent !== 'undefined') this.parent = parent
        if (typeof input !== 'undefined') this.registerMany(input)
    }

    register(key: string, handler: ErrorHandler) {
        this.handlers.set(key, handler)
        return this
    }

    unregister(key: string) {
        this.handlers.delete(key)
        return this
    }

    find(seek: string): ErrorHandler | undefined {
        const handler = this.handlers.get(seek)
        if (handler) return handler
        return this.parent?.find(seek)

    }

    registerMany(input: ErrorHandlerMany) {
        for (const [key, value] of Object.entries(input)) {
            this.register(key, value)
        }
        return this
    }

    handleError(
        this: ErrorHandlerRegistry,
        seek: (string | undefined)[] | string,
        error: THttpError): boolean {
        if (Array.isArray(seek)) {
            return seek.some((key) => {
                if (key !== undefined) return this.handleError(String(key), error)
            })
        }
        const handler = this.find(String(seek))
        if (!handler) {
            return false
        } else if (typeof handler === 'string') {
            return this.handleErrorObject(error, { message: handler })
        } else if (typeof handler === 'function') {
            const result = handler(error)
            if (isErrorHandlerObject(result)) return this.handleErrorObject(error, result)
            return !!result
        } else if (isErrorHandlerObject(handler)) {
            return this.handleErrorObject(error, handler)
        }
        return false
    }

    handleErrorObject(error: THttpError, options: ErrorHandlerObject = {}) {
        options?.before?.(error, options)
        console.log(options.message ?? 'Erreur inconnue', options, 'error')
        return true
    }

    responseErrorHandler(this: ErrorHandlerRegistry, error: THttpError, direct?: boolean) {
        if (error === null) throw new Error('Erreur irrécupérable')
        if (axios.isAxiosError(error)) {
            const response = error?.response
            const config = error?.config
            const data = response?.data as HttpData
            if (!direct && config?.raw) throw error
            const seekers = [
                data?.code,
                error.code,
                error?.name,
                String(data?.status),
                String(response?.status),
            ]
            const result = this.handleError(seekers, error)
            if (!result) {
                if (data?.code && data?.description) {
                    return this.handleErrorObject(error, {
                        message: data?.description,
                    })
                }
            }
        } else if (error instanceof Error) {
            return this.handleError(error.name, error)
        }
        throw error
    }
}

const globalHandlers = new ErrorHandlerRegistry()

globalHandlers.registerMany({
    login_required: {
        message: 'Login required!',
        //the after function will be called when the message hides.
        after: () => console.log('redirect user to /login'),
    },
    no_input_data: 'You must fill form values here!',
    //this key is sent by api on login error.
    invalid_login: {
        message: 'Invalid credentials!',
    },
    '404': { message: 'API Page Not Found!' },
    ERR_FR_TOO_MANY_REDIRECTS: 'Too many redirects.',
})

globalHandlers.register('HttpError', (error) => {
    return { message: 'Internal server errror! We already notify developers!' }
    //when we return an valid ErrorHandlerObject, will be processed as well.
    //this allow we to perform custom behavior like sending email and default one,
    //like showing an message to user.
})

function createHttpInstance() {
    const instance = axios.create({
        baseURL: process.env.baseUrl,
        withCredentials: true,
    })
    const responseError = (error: any) => globalHandlers.responseErrorHandler(error)
    instance.interceptors.response.use(responseHandler, responseError)
    return instance
}

declare module 'vue/types/vue' {
    interface Vue {
        $http: AxiosInstance
    }
}

const http: AxiosInstance = createHttpInstance()

Vue.prototype.$http = http
